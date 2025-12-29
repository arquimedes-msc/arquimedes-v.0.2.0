import { describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";
import * as db from "./db";

vi.mock("./db");

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAdminAuthContext(userId: number = 1): TrpcContext {
  const user: AuthenticatedUser = {
    id: userId,
    openId: "test-admin-user",
    email: "admin@example.com",
    name: "Admin User",
    loginMethod: "manus",
    role: "admin",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  return {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };
}

describe("Admin Router", () => {
  describe("resetUserProgress", () => {
    it("should call db.resetUserProgress with the provided userId", async () => {
      const ctx = createAdminAuthContext();
      const caller = appRouter.createCaller(ctx);
      const targetUserId = 123;

      const resetMock = vi
        .spyOn(db, "resetUserProgress")
        .mockResolvedValue({ success: true, message: "Progress reset" });

      const result = await caller.admin.resetUserProgress({
        userId: targetUserId,
      });

      expect(resetMock).toHaveBeenCalledWith(targetUserId);
      expect(result).toEqual({
        success: true,
        message: "Progress reset",
      });
    });

    it("should throw an error if no userId is provided", async () => {
      const ctx = createAdminAuthContext();
      const caller = appRouter.createCaller(ctx);

      await expect(caller.admin.resetUserProgress({})).rejects.toThrow(
        "A userId must be provided to reset progress."
      );
    });
  });
});
