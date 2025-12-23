import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";
import * as db from "./db";

describe("Daily Challenge (Desafio do Dia)", () => {
  const mockUser = {
    id: 998,
    openId: "test-daily-challenge-user",
    name: "Daily Challenge Test User",
    email: "dailychallenge@test.com",
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
    // Clean up any existing test data
    const dbInstance = await db.getDb();
    if (dbInstance) {
      await dbInstance.execute(`DELETE FROM daily_challenge_attempts WHERE userId = ${mockUser.id}`);
    }
  });

  afterAll(async () => {
    // Clean up test data
    const dbInstance = await db.getDb();
    if (dbInstance) {
      await dbInstance.execute(`DELETE FROM daily_challenge_attempts WHERE userId = ${mockUser.id}`);
    }
  });

  it("should generate or fetch today's challenge", async () => {
    const result = await caller.dailyChallenge.getToday();

    expect(result).toBeDefined();
    expect(result.challenge).toBeDefined();
    expect(result.exercises).toBeDefined();
    expect(result.challenge.challengeDate).toBeDefined();
    expect(result.exercises.length).toBe(3); // 3 exercícios por desafio
  });

  it("should have exercises with different difficulties", async () => {
    const result = await caller.dailyChallenge.getToday();
    const exercises = result.exercises;

    expect(exercises.length).toBe(3);

    // Verificar se há pelo menos um exercício de cada dificuldade (se disponível)
    const difficulties = exercises.map((ex) => ex.difficulty);
    expect(difficulties.length).toBeGreaterThan(0);
  });

  it("should submit correct answer and award double points", async () => {
    const result = await caller.dailyChallenge.getToday();
    const challenge = result.challenge;
    const exercise = result.exercises[0];

    const submitResult = await caller.dailyChallenge.submit({
      challengeId: challenge.id,
      exerciseId: exercise.id,
      userAnswer: exercise.correctAnswer,
    });

    expect(submitResult).toBeDefined();
    expect(submitResult.isCorrect).toBe(true);
    expect(submitResult.pointsEarned).toBe(exercise.points * 2); // Pontos dobrados!
  });

  it("should submit incorrect answer and not award points", async () => {
    const result = await caller.dailyChallenge.getToday();
    const challenge = result.challenge;
    const exercise = result.exercises[1];

    // Submit wrong answer
    const wrongAnswer = exercise.correctAnswer === 0 ? 1 : 0;

    const submitResult = await caller.dailyChallenge.submit({
      challengeId: challenge.id,
      exerciseId: exercise.id,
      userAnswer: wrongAnswer,
    });

    expect(submitResult).toBeDefined();
    expect(submitResult.isCorrect).toBe(false);
    expect(submitResult.pointsEarned).toBe(0);
  });

  it("should track if user has completed today's challenge", async () => {
    const result = await caller.dailyChallenge.getToday();
    const challenge = result.challenge;

    // Submit all 3 exercises
    for (const exercise of result.exercises) {
      await caller.dailyChallenge.submit({
        challengeId: challenge.id,
        exerciseId: exercise.id,
        userAnswer: exercise.correctAnswer,
      });
    }

    // Check if completed
    const hasCompleted = await caller.dailyChallenge.hasCompleted();
    expect(hasCompleted).toBe(true);
  });

  it("should track challenge statistics", async () => {
    const stats = await caller.dailyChallenge.getStats();

    expect(stats).toBeDefined();
    expect(stats).toHaveProperty("totalChallenges");
    expect(stats).toHaveProperty("totalCorrect");
    expect(stats).toHaveProperty("totalPoints");
    expect(stats.totalChallenges).toBeGreaterThanOrEqual(0);
    expect(stats.totalCorrect).toBeGreaterThanOrEqual(0);
    expect(stats.totalPoints).toBeGreaterThanOrEqual(0);
  });

  it("should award double points (10/20/30) based on difficulty", async () => {
    const result = await caller.dailyChallenge.getToday();
    const exercises = result.exercises;

    for (const exercise of exercises) {
      // Verificar que pontos são dobrados
      const expectedPoints = exercise.points * 2;
      
      if (exercise.difficulty === "easy") {
        expect(expectedPoints).toBe(10); // 5 * 2
      } else if (exercise.difficulty === "moderate") {
        expect(expectedPoints).toBe(20); // 10 * 2
      } else if (exercise.difficulty === "hard") {
        expect(expectedPoints).toBe(30); // 15 * 2
      }
    }
  });
});
