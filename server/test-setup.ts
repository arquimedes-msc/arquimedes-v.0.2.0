/**
 * Test Setup File for Vitest
 * Configures the test environment before running tests
 */

import { beforeAll, afterAll, vi } from 'vitest';

// Mock environment variables for testing
vi.stubEnv('NODE_ENV', 'test');
vi.stubEnv('DATABASE_URL', 'mysql://test:test@localhost:3306/test');
vi.stubEnv('JWT_SECRET', 'test-jwt-secret-key-for-testing');

// Mock database connection
vi.mock('./db', () => ({
  db: {
    query: vi.fn(),
    select: vi.fn(),
    insert: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
  // Export mock functions for common database operations
  getUserById: vi.fn(),
  getUserByOpenId: vi.fn(),
  getDisciplines: vi.fn(),
  getModules: vi.fn(),
  getPages: vi.fn(),
  getExercises: vi.fn(),
  getStandaloneExercises: vi.fn(),
  getUserProgress: vi.fn(),
  getUserXP: vi.fn(),
  getUserAchievements: vi.fn(),
  getStreak: vi.fn(),
  getUserPoints: vi.fn(),
  getModuleVideos: vi.fn(),
  getDailyChallenge: vi.fn(),
}));

// Global setup before all tests
beforeAll(() => {
  console.log('🧪 Test environment initialized');
});

// Global cleanup after all tests
afterAll(() => {
  console.log('🧹 Test environment cleaned up');
  vi.restoreAllMocks();
});

// Export test utilities
export const createMockUser = (overrides = {}) => ({
  id: 1,
  openId: 'test-open-id',
  name: 'Test User',
  email: 'test@example.com',
  role: 'user' as const,
  hasCompletedOnboarding: true,
  createdAt: new Date(),
  updatedAt: new Date(),
  lastSignedIn: new Date(),
  ...overrides,
});

export const createMockContext = (user = createMockUser()) => ({
  user,
  req: {} as any,
  res: {} as any,
});
