import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";
import * as db from "./db";

vi.mock("./db");

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAuthContext(role: "user" | "admin" = "user"): { ctx: TrpcContext } {
  const user: AuthenticatedUser = {
    id: 1000,
    openId: "test-points-user",
    email: "points@test.com",
    name: "Test Points User",
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

describe("Points System", () => {
  beforeEach(() => {
    const dbMock = vi.mocked(db, true);
    dbMock.addPoints.mockImplementation(async () => {});
  });

  it("should allow admin to add points to a user", async () => {
    const { ctx } = createAuthContext("admin");
    const caller = appRouter.createCaller(ctx);

    const result = await caller.points.addPoints({
      userId: 1000,
      action: "manual_adjustment",
      points: 100,
    });

    expect(result.success).toBe(true);
    expect(db.addPoints).toHaveBeenCalledWith(1000, "manual_adjustment", 100, undefined);
  });

  it("should prevent non-admin user from adding points", async () => {
    const { ctx } = createAuthContext("user");
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.points.addPoints({
        userId: 1000,
        action: "manual_adjustment",
        points: 100,
      })
    ).rejects.toThrow("You do not have required permission");
  });
});
