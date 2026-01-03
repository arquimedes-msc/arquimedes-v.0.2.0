import { describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";
import dotenv from "dotenv";

dotenv.config();

// Mock notification to prevent "Notification service URL is not configured" error
vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(undefined),
}));

vi.mock("./db", () => {
    // Mock data
    const mockDisciplines = [
      { id: 1, name: "Aritmética", slug: "aritmetica", description: "A base de tudo", order: 1 },
    ];
    const mockModules = [
      { id: 1, name: "Adição e Subtração", slug: "adicao-subtracao", disciplineId: 1, order: 1 },
    ];
    const mockPages = [
      { id: 1, title: "O que é Adicionar?", slug: "o-que-e-adicionar", moduleId: 1, mainText: "Texto principal", conceptSummary: "Resumo", order: 1 },
    ];
    const mockExercises = [
      { id: 1, pageId: 1, question: "Quanto é 7 + 1?", expectedAnswer: "8", order: 1, alternativeAnswers: [] },
    ];
    const mockUserProgress = [
        { id: 1, userId: 1, pageId: 1, completed: true, score: 100, lastAccessedAt: new Date(), completedAt: new Date() }
    ];
    const mockAchievements = [
        { id: 1, userId: 1, type: "first_lesson", title: "Primeira Aula", createdAt: new Date() }
    ];

    return {
      getAllDisciplines: vi.fn().mockResolvedValue(mockDisciplines),
      getDisciplineBySlug: vi.fn().mockImplementation((slug) =>
        Promise.resolve(mockDisciplines.find(d => d.slug === slug))
      ),
      getModulesByDiscipline: vi.fn().mockImplementation((disciplineId) =>
        Promise.resolve(mockModules.filter(m => m.disciplineId === disciplineId))
      ),
      getModuleBySlug: vi.fn().mockImplementation((disciplineId, slug) =>
        Promise.resolve(mockModules.find(m => m.disciplineId === disciplineId && m.slug === slug))
      ),
      getPagesByModule: vi.fn().mockImplementation((moduleId) =>
        Promise.resolve(mockPages.filter(p => p.moduleId === moduleId))
      ),
      getPageBySlug: vi.fn().mockImplementation((moduleId, slug) =>
        Promise.resolve(mockPages.find(p => p.moduleId === moduleId && p.slug === slug))
      ),
      getExercisesByPage: vi.fn().mockImplementation((pageId) =>
        Promise.resolve(mockExercises.filter(e => e.pageId === pageId))
      ),
      getExerciseById: vi.fn().mockImplementation((exerciseId) =>
        Promise.resolve(mockExercises.find(e => e.id === exerciseId))
      ),
      createExerciseAttempt: vi.fn().mockImplementation((data) =>
        Promise.resolve({ ...data, id: Math.random(), attemptNumber: 1, createdAt: new Date() })
      ),
      upsertPageProgress: vi.fn().mockResolvedValue(undefined),
      getAllUserProgress: vi.fn().mockResolvedValue(mockUserProgress),
      getUserAchievements: vi.fn().mockResolvedValue(mockAchievements),
      getAllCurriculum: vi.fn().mockResolvedValue({
        disciplines: mockDisciplines,
        modules: mockModules,
        pages: mockPages,
      }),
      getPageById: vi.fn().mockImplementation((pageId) =>
        Promise.resolve(mockPages.find(p => p.id === pageId))
      ),
       awardXP: vi.fn().mockResolvedValue(null),
       addPoints: vi.fn().mockResolvedValue(undefined),
       checkAndAwardAchievements: vi.fn().mockResolvedValue([]),
       createAchievement: vi.fn().mockResolvedValue({}),
       getDb: vi.fn().mockResolvedValue({
        select: () => ({ from: () => ({ where: () => ({ limit: () => Promise.resolve([]) }) }) }),
      }),
    };
});

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAuthContext(userId: number = 1): TrpcContext {
  const user: AuthenticatedUser = {
    id: userId,
    openId: "test-user",
    email: "test@example.com",
    name: "Test User",
    loginMethod: "manus",
    role: "user",
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

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };
}

describe("Disciplines Router", () => {
  it("should list all disciplines", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const disciplines = await caller.disciplines.list();

    expect(disciplines).toBeDefined();
    expect(Array.isArray(disciplines)).toBe(true);
    expect(disciplines.length).toBeGreaterThan(0);
    expect(disciplines[0]).toHaveProperty("name");
    expect(disciplines[0]).toHaveProperty("slug");
  });

  it("should get discipline by slug", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const discipline = await caller.disciplines.getBySlug({ slug: "aritmetica" });

    expect(discipline).toBeDefined();
    expect(discipline?.name).toBe("Aritmética");
    expect(discipline?.slug).toBe("aritmetica");
  });
});

describe("Modules Router", () => {
  it("should list modules by discipline", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    // First get discipline
    const discipline = await caller.disciplines.getBySlug({ slug: "aritmetica" });
    expect(discipline).toBeDefined();

    // Then get modules
    const modules = await caller.modules.listByDiscipline({ disciplineId: discipline!.id });

    expect(modules).toBeDefined();
    expect(Array.isArray(modules)).toBe(true);
    expect(modules.length).toBeGreaterThan(0);
    expect(modules[0]).toHaveProperty("name");
    expect(modules[0]).toHaveProperty("slug");
  });

  it("should get module by slug", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const discipline = await caller.disciplines.getBySlug({ slug: "aritmetica" });
    const module = await caller.modules.getBySlug({
      disciplineId: discipline!.id,
      slug: "adicao-subtracao",
    });

    expect(module).toBeDefined();
    expect(module?.name).toBe("Adição e Subtração");
    expect(module?.slug).toBe("adicao-subtracao");
  });
});

describe("Pages Router", () => {
  it("should list pages by module", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const discipline = await caller.disciplines.getBySlug({ slug: "aritmetica" });
    const module = await caller.modules.getBySlug({
      disciplineId: discipline!.id,
      slug: "adicao-subtracao",
    });

    const pages = await caller.pages.listByModule({ moduleId: module!.id });

    expect(pages).toBeDefined();
    expect(Array.isArray(pages)).toBe(true);
    expect(pages.length).toBeGreaterThan(0);
    expect(pages[0]).toHaveProperty("title");
    expect(pages[0]).toHaveProperty("slug");
    expect(pages[0]).toHaveProperty("mainText");
  });

  it("should get page by slug", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const discipline = await caller.disciplines.getBySlug({ slug: "aritmetica" });
    const module = await caller.modules.getBySlug({
      disciplineId: discipline!.id,
      slug: "adicao-subtracao",
    });

    const page = await caller.pages.getBySlug({
      moduleId: module!.id,
      slug: "o-que-e-adicionar",
    });

    expect(page).toBeDefined();
    expect(page?.title).toContain("Adicionar");
    expect(page?.mainText).toBeDefined();
    expect(page?.conceptSummary).toBeDefined();
  });
});

describe("Exercises Router", () => {
  it("should list exercises by page", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const discipline = await caller.disciplines.getBySlug({ slug: "aritmetica" });
    const module = await caller.modules.getBySlug({
      disciplineId: discipline!.id,
      slug: "adicao-subtracao",
    });
    const page = await caller.pages.getBySlug({
      moduleId: module!.id,
      slug: "o-que-e-adicionar",
    });

    const exercises = await caller.exercises.listByPage({ pageId: page!.id });

    expect(exercises).toBeDefined();
    expect(Array.isArray(exercises)).toBe(true);
    expect(exercises.length).toBeGreaterThan(0);
    expect(exercises[0]).toHaveProperty("question");
    expect(exercises[0]).toHaveProperty("expectedAnswer");
  });

  it("should submit correct answer", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const discipline = await caller.disciplines.getBySlug({ slug: "aritmetica" });
    const module = await caller.modules.getBySlug({
      disciplineId: discipline!.id,
      slug: "adicao-subtracao",
    });
    const page = await caller.pages.getBySlug({
      moduleId: module!.id,
      slug: "o-que-e-adicionar",
    });
    const exercises = await caller.exercises.listByPage({ pageId: page!.id });

    // Submit correct answer (7 + 8 = 15)
    const result = await caller.exercises.submit({
      exerciseId: exercises[0]!.id,
      answer: "8",
    });

    expect(result).toBeDefined();
    expect(result.isCorrect).toBe(true);
    expect(result.attemptNumber).toBeGreaterThan(0);
  });

  it("should submit incorrect answer", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const discipline = await caller.disciplines.getBySlug({ slug: "aritmetica" });
    const module = await caller.modules.getBySlug({
      disciplineId: discipline!.id,
      slug: "adicao-subtracao",
    });
    const page = await caller.pages.getBySlug({
      moduleId: module!.id,
      slug: "o-que-e-adicionar",
    });
    const exercises = await caller.exercises.listByPage({ pageId: page!.id });

    const result = await caller.exercises.submit({
      exerciseId: exercises[0]!.id,
      answer: "999",
    });

    expect(result).toBeDefined();
    expect(result.isCorrect).toBe(false);
    expect(result.correctAnswer).toBeDefined();
  });
});

describe("Progress Router", () => {
  it("should update page progress", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const discipline = await caller.disciplines.getBySlug({ slug: "aritmetica" });
    const module = await caller.modules.getBySlug({
      disciplineId: discipline!.id,
      slug: "adicao-subtracao",
    });
    const page = await caller.pages.getBySlug({
      moduleId: module!.id,
      slug: "o-que-e-adicionar",
    });

    const result = await caller.moduleProgress.updatePage({
      pageId: page!.id,
      completed: true,
      score: 100,
    });

    expect(result).toBeDefined();
    expect(result.success).toBe(true);
  });

  it("should get user progress", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const progress = await caller.moduleProgress.getAll();

    expect(progress).toBeDefined();
    expect(Array.isArray(progress)).toBe(true);
  });
});

describe("Dashboard Router", () => {
  it("should get dashboard summary", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const summary = await caller.dashboard.summary();

    expect(summary).toBeDefined();
    expect(summary).toHaveProperty("completedPages");
    expect(summary).toHaveProperty("totalAchievements");
    expect(summary).toHaveProperty("averageScore");
    expect(typeof summary.completedPages).toBe("number");
    expect(typeof summary.averageScore).toBe("number");
  });

  it("should get recommendations", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const recommendation = await caller.dashboard.recommendations();

    // Recommendation might be null if all content is completed
    if (recommendation) {
      expect(recommendation).toHaveProperty("discipline");
      expect(recommendation).toHaveProperty("module");
      expect(recommendation).toHaveProperty("page");
    }
  });
});
