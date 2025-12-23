import { describe, it, expect, beforeAll } from "vitest";
import { appRouter } from "./routers";
import * as db from "./db";
import type { TrpcContext } from "./_core/context";

describe("Points System", () => {
  const mockUser = {
    id: 999,
    openId: "test-points-user",
    name: "Points Test User",
    email: "points@test.com",
    role: "user" as const,
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
    loginMethod: "test",
  };

  const mockContext: TrpcContext = {
    user: mockUser,
    req: {} as any,
    res: {} as any,
  };

  const caller = appRouter.createCaller(mockContext);

  beforeAll(async () => {
    // Ensure user exists in database
    await db.upsertUser({
      openId: mockUser.openId,
      name: mockUser.name,
      email: mockUser.email,
      loginMethod: mockUser.loginMethod,
      lastSignedIn: new Date(),
    });
  });

  it("should add points for an action", async () => {
    const result = await caller.points.addPoints({
      action: "exercise_completed",
      points: 5,
    });

    expect(result.success).toBe(true);
  });

  it("should get points summary", async () => {
    // Add some points first
    await caller.points.addPoints({
      action: "video_watched",
      points: 3,
    });

    const summary = await caller.points.getSummary();

    expect(summary).toHaveProperty("today");
    expect(summary).toHaveProperty("thisWeek");
    expect(summary).toHaveProperty("thisMonth");
    expect(summary).toHaveProperty("allTime");
    expect(summary.allTime).toBeGreaterThan(0);
  });

  it("should give daily login points only once per day", async () => {
    const firstLogin = await caller.points.checkDailyLogin();
    expect(firstLogin.earned).toBe(true);
    expect(firstLogin.points).toBe(10);

    const secondLogin = await caller.points.checkDailyLogin();
    expect(secondLogin.earned).toBe(false);
    expect(secondLogin.points).toBe(0);
  });

  it("should track points by different actions", async () => {
    const summaryBefore = await caller.points.getSummary();

    await caller.points.addPoints({
      action: "podcast_listened",
      points: 7,
    });

    await caller.points.addPoints({
      action: "task_completed",
      points: 15,
    });

    const summaryAfter = await caller.points.getSummary();

    expect(summaryAfter.allTime).toBeGreaterThan(summaryBefore.allTime);
    expect(summaryAfter.allTime - summaryBefore.allTime).toBe(22); // 7 + 15
  });
});
