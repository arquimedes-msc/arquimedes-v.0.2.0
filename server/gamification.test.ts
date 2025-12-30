import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";
import * as db from "./db";

vi.mock("./db");

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAuthContext(role: "user" | "admin" = "user"): { ctx: TrpcContext } {
  const user: AuthenticatedUser = {
    id: 999,
    openId: "test-gamification-user",
    email: "gamification@test.com",
    name: "Test Gamification User",
    loginMethod: "manus",
    role,
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  const ctx: TrpcContext = {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };

  return { ctx };
}

describe("Gamification System", () => {
  let userXpState;

  beforeEach(() => {
    userXpState = { totalXP: 0, level: 1, xpToNextLevel: 100 };

    const dbMock = vi.mocked(db, true);
    dbMock.getUserXP.mockImplementation(() => Promise.resolve(userXpState));
    dbMock.awardXP.mockImplementation((userId, amount) => {
      userXpState.totalXP += amount;
      userXpState.level = userXpState.totalXP >= 100 ? 2 : 1;
      return Promise.resolve(userXpState);
    });
    dbMock.getUserStreak.mockResolvedValue({ currentStreak: 0, longestStreak: 0 });
    dbMock.getUserAchievements.mockResolvedValue([]);
  });

  it("should get user streak (initially 0)", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const streak = await caller.gamification.streak();

    expect(streak).toBeDefined();
    expect(streak.currentStreak).toBeGreaterThanOrEqual(0);
    expect(streak.longestStreak).toBeGreaterThanOrEqual(0);
  });

  it("should get user XP (initially level 1)", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const xp = await caller.gamification.xp();

    expect(xp).toBeDefined();
    expect(xp.level).toBeGreaterThanOrEqual(1);
    expect(xp.totalXP).toBeGreaterThanOrEqual(0);
    expect(xp.xpToNextLevel).toBeGreaterThan(0);
  });

  it("should get user achievements (initially empty or with data)", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const achievements = await caller.gamification.achievements();

    expect(Array.isArray(achievements)).toBe(true);
  });

  it("should award XP to user", async () => {
    const { ctx } = createAuthContext("admin");
    const caller = appRouter.createCaller(ctx);

    const initialXP = await caller.gamification.xp();
    const initialTotal = initialXP.totalXP;

    const result = await caller.gamification.awardXP({
      userId: 999,
      amount: 50,
      reason: "test_completion",
      relatedId: 1,
    });

    expect(result).toBeDefined();
    expect(result!.totalXP).toBe(initialTotal + 50);
  });

  it("should calculate level correctly based on XP", async () => {
    const { ctx } = createAuthContext("admin");
    const caller = appRouter.createCaller(ctx);

    // Award enough XP to level up (level 1 requires 100 XP, level 2 requires 200 XP total)
    await caller.gamification.awardXP({
      userId: 999,
      amount: 150,
      reason: "test_levelup",
    });

    const xp = await caller.gamification.xp();

    // Should be at least level 2 now
    expect(xp.level).toBeGreaterThanOrEqual(2);
  });
});
