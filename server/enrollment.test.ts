import { describe, it, expect, beforeAll } from "vitest";
import * as db from "./db";

describe("Auto-Enrollment in Aritmética", () => {
  let testUserId: number;

  beforeAll(async () => {
    // Create a test user
    const openId = `test-auto-enroll-${Date.now()}`;
    await db.upsertUser({
      openId,
      name: "Test Auto Enroll User",
      email: "test-auto-enroll@example.com",
    });

    const user = await db.getUserByOpenId(openId);
    if (!user) throw new Error("Failed to create test user");
    testUserId = user.id;
  });

  it("should automatically enroll user in Aritmética", async () => {
    // Call auto-enrollment function
    await db.autoEnrollInAritmetica(testUserId);

    // Verify enrollment
    const enrollments = await db.getUserEnrollments(testUserId);
    
    expect(enrollments).toBeDefined();
    expect(enrollments.length).toBeGreaterThan(0);
    
    const aritmeticaEnrollment = enrollments.find(e => e.slug === "aritmetica");
    expect(aritmeticaEnrollment).toBeDefined();
    expect(aritmeticaEnrollment?.name).toBe("Aritmética");
  });

  it("should not create duplicate enrollments", async () => {
    // Call auto-enrollment twice
    await db.autoEnrollInAritmetica(testUserId);
    await db.autoEnrollInAritmetica(testUserId);

    // Verify only one enrollment exists
    const enrollments = await db.getUserEnrollments(testUserId);
    const aritmeticaEnrollments = enrollments.filter(e => e.slug === "aritmetica");
    
    expect(aritmeticaEnrollments.length).toBe(1);
  });

  it("should work for multiple users", async () => {
    // Create second test user
    const openId2 = `test-auto-enroll-2-${Date.now()}`;
    await db.upsertUser({
      openId: openId2,
      name: "Test Auto Enroll User 2",
      email: "test-auto-enroll-2@example.com",
    });

    const user2 = await db.getUserByOpenId(openId2);
    if (!user2) throw new Error("Failed to create second test user");

    // Enroll second user
    await db.autoEnrollInAritmetica(user2.id);

    // Verify both users are enrolled
    const enrollments1 = await db.getUserEnrollments(testUserId);
    const enrollments2 = await db.getUserEnrollments(user2.id);

    expect(enrollments1.some(e => e.slug === "aritmetica")).toBe(true);
    expect(enrollments2.some(e => e.slug === "aritmetica")).toBe(true);
  });
});
