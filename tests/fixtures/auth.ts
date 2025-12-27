import { test as base, Page, Browser } from '@playwright/test';

/**
 * Authentication fixtures for Arquimedes E2E tests
 * 
 * Since the app uses OAuth (Google) for authentication which cannot be easily
 * automated in E2E tests, these fixtures provide utilities for:
 * 1. Mocking authenticated state
 * 2. Using dev login endpoint when available
 * 3. Managing authentication cookies
 */

interface AuthFixtures {
  authenticatedPage: Page;
}

/**
 * Mock authenticated user data
 */
export const mockAuthUser = {
  id: 1,
  name: 'Test User',
  email: 'test@example.com',
  role: 'user',
  avatarUrl: null,
  createdAt: new Date().toISOString(),
};

/**
 * Mock admin user data
 */
export const mockAdminUser = {
  id: 2,
  name: 'Admin User',
  email: 'admin@example.com',
  role: 'admin',
  avatarUrl: null,
  createdAt: new Date().toISOString(),
};

/**
 * Set authentication cookie for testing
 */
export async function setAuthCookie(page: Page, userId: number = 1, role: string = 'user') {
  // In development, the app has a /api/dev/login endpoint
  // For production-like testing, we would need to mock the session cookie
  
  const baseURL = page.context().browser()?.version() ? 'http://localhost:5000' : '';
  
  // Try to use dev login endpoint if available
  try {
    await page.goto(`${baseURL}/api/dev/login`);
    await page.waitForLoadState('networkidle');
  } catch (error) {
    // If dev login is not available, we'll need to mock the authentication
    console.warn('Dev login endpoint not available, tests may fail if authentication is required');
  }
}

/**
 * Mock tRPC auth.me response
 */
export async function mockAuthMe(page: Page, user: typeof mockAuthUser | null = mockAuthUser) {
  await page.route('**/trpc/auth.me*', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        result: {
          data: user
        }
      })
    });
  });
}

/**
 * Mock tRPC calls for authenticated user
 */
export async function mockAuthenticatedUser(page: Page, isAdmin: boolean = false) {
  const user = isAdmin ? mockAdminUser : mockAuthUser;
  
  // Mock auth.me
  await page.route('**/trpc/auth.me*', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        result: {
          data: user
        }
      })
    });
  });
  
  // Mock gamification.xp
  await page.route('**/trpc/gamification.xp*', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        result: {
          data: {
            totalXP: 150,
            level: 2,
            xpToNextLevel: 50,
          }
        }
      })
    });
  });
  
  // Mock gamification.streak
  await page.route('**/trpc/gamification.streak*', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        result: {
          data: {
            currentStreak: 5,
            longestStreak: 10,
          }
        }
      })
    });
  });
}

/**
 * Logout user
 */
export async function logout(page: Page) {
  await page.goto('/api/auth/logout');
  await page.waitForLoadState('networkidle');
}

/**
 * Extended test with authenticated page fixture
 */
export const test = base.extend<AuthFixtures>({
  authenticatedPage: async ({ page, browser }, use) => {
    // Setup: Mock authenticated user before each test
    await mockAuthenticatedUser(page, false);
    
    // Provide the authenticated page to the test
    await use(page);
    
    // Teardown: Clean up after test
    // (Browser context is automatically cleaned up by Playwright)
  },
});

export { expect } from '@playwright/test';
