import { describe, it, expect } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

describe("Module Videos Integration", () => {
  const mockUser = {
    id: 999,
    openId: "test-video-user",
    name: "Video Test User",
    email: "video@test.com",
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

  it("should fetch videos by module ID", async () => {
    // Módulo 1: Adição e Subtração
    const videos = await caller.standaloneVideos.getByModule({ moduleId: 1 });

    expect(videos).toBeDefined();
    expect(Array.isArray(videos)).toBe(true);
    expect(videos.length).toBeGreaterThan(0);
  });

  it("should have videos with YouTube IDs", async () => {
    const videos = await caller.standaloneVideos.getByModule({ moduleId: 1 });

    if (videos.length > 0) {
      const video = videos[0];
      expect(video).toHaveProperty("youtubeId");
      expect(video.youtubeId).toBeTruthy();
      expect(typeof video.youtubeId).toBe("string");
      expect(video.youtubeId.length).toBeGreaterThan(0);
    }
  });

  it("should have videos with required fields", async () => {
    const videos = await caller.standaloneVideos.getByModule({ moduleId: 1 });

    if (videos.length > 0) {
      const video = videos[0];
      expect(video).toHaveProperty("id");
      expect(video).toHaveProperty("title");
      expect(video).toHaveProperty("youtubeId");
      expect(video).toHaveProperty("moduleId");
      expect(video.moduleId).toBe(1);
    }
  });

  it("should return videos for multiple modules", async () => {
    // Módulo 2: Multiplicação
    const module2Videos = await caller.standaloneVideos.getByModule({ moduleId: 2 });
    expect(module2Videos).toBeDefined();
    expect(Array.isArray(module2Videos)).toBe(true);

    // Módulo 3: Divisão
    const module3Videos = await caller.standaloneVideos.getByModule({ moduleId: 3 });
    expect(module3Videos).toBeDefined();
    expect(Array.isArray(module3Videos)).toBe(true);
  });

  it("should return empty array for module without videos", async () => {
    // Módulo que não tem vídeos
    const videos = await caller.standaloneVideos.getByModule({ moduleId: 99999 });
    expect(videos).toBeDefined();
    expect(Array.isArray(videos)).toBe(true);
    expect(videos.length).toBe(0);
  });

  it("should have videos with duration and description", async () => {
    const videos = await caller.standaloneVideos.getByModule({ moduleId: 1 });

    if (videos.length > 0) {
      const video = videos[0];
      expect(video).toHaveProperty("duration");
      expect(video).toHaveProperty("description");
      
      if (video.duration) {
        expect(typeof video.duration).toBe("string");
      }
      
      if (video.description) {
        expect(typeof video.description).toBe("string");
      }
    }
  });
});
