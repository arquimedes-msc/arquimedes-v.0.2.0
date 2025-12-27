import { Page, expect } from '@playwright/test';

/**
 * Test utility functions for Arquimedes E2E tests
 */

/**
 * Wait for the application to be fully loaded
 */
export async function waitForAppReady(page: Page) {
  // Wait for the main content to be visible
  await page.waitForLoadState('networkidle');
  await page.waitForLoadState('domcontentloaded');
}

/**
 * Check if user is on login page
 */
export async function isOnLoginPage(page: Page): Promise<boolean> {
  const url = page.url();
  return url.includes('/login') || url === new URL('/', page.url()).href;
}

/**
 * Navigate to login page
 */
export async function navigateToLogin(page: Page) {
  await page.goto('/login');
  await waitForAppReady(page);
}

/**
 * Navigate to dashboard
 */
export async function navigateToDashboard(page: Page) {
  await page.goto('/dashboard');
  await waitForAppReady(page);
}

/**
 * Check if element exists and is visible
 */
export async function expectElementVisible(page: Page, selector: string) {
  await expect(page.locator(selector)).toBeVisible();
}

/**
 * Check if text is present on page
 */
export async function expectTextPresent(page: Page, text: string) {
  await expect(page.getByText(text)).toBeVisible();
}

/**
 * Wait for toast notification
 */
export async function waitForToast(page: Page, message?: string) {
  const toast = page.locator('[data-sonner-toast]');
  await expect(toast).toBeVisible();
  if (message) {
    await expect(toast).toContainText(message);
  }
}

/**
 * Close all toast notifications
 */
export async function closeAllToasts(page: Page) {
  const closeButtons = page.locator('[data-sonner-toast] button[aria-label="Close"]');
  const count = await closeButtons.count();
  for (let i = 0; i < count; i++) {
    await closeButtons.nth(i).click({ force: true });
  }
}

/**
 * Wait for API call to complete
 */
export async function waitForApiCall(page: Page, urlPattern: string | RegExp) {
  await page.waitForResponse(response => {
    const url = response.url();
    if (typeof urlPattern === 'string') {
      return url.includes(urlPattern);
    }
    return urlPattern.test(url);
  });
}

/**
 * Get current user from page context
 */
export async function getCurrentUser(page: Page): Promise<any> {
  return await page.evaluate(() => {
    return (window as any).__USER__;
  });
}

/**
 * Mock successful exercise submission
 */
export async function mockExerciseSuccess(page: Page) {
  await page.route('**/trpc/exercises.submit*', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        result: {
          data: {
            isCorrect: true,
            pointsEarned: 10,
            attemptNumber: 1,
          }
        }
      })
    });
  });
}

/**
 * Mock failed exercise submission
 */
export async function mockExerciseFailed(page: Page, correctAnswer?: string) {
  await page.route('**/trpc/exercises.submit*', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        result: {
          data: {
            isCorrect: false,
            attemptNumber: 1,
            correctAnswer: correctAnswer || '42',
          }
        }
      })
    });
  });
}

/**
 * Get XP display value
 */
export async function getXPValue(page: Page): Promise<number> {
  const xpText = await page.locator('[data-testid="xp-value"], text=/\\d+ XP/').first().textContent();
  if (!xpText) return 0;
  const match = xpText.match(/(\d+)\s*XP/);
  return match ? parseInt(match[1]) : 0;
}

/**
 * Get level value
 */
export async function getLevelValue(page: Page): Promise<number> {
  const levelText = await page.locator('text=/Nível \\d+/').first().textContent();
  if (!levelText) return 0;
  const match = levelText.match(/Nível\s*(\d+)/);
  return match ? parseInt(match[1]) : 0;
}

/**
 * Fill and submit exercise answer
 */
export async function submitExerciseAnswer(page: Page, answer: string) {
  await page.fill('input[placeholder*="resposta"]', answer);
  await page.click('button:has-text("Enviar")');
}

/**
 * Wait for navigation to complete
 */
export async function waitForNavigation(page: Page, expectedUrl?: string) {
  await page.waitForLoadState('networkidle');
  if (expectedUrl) {
    await expect(page).toHaveURL(new RegExp(expectedUrl));
  }
}

/**
 * Check if sidebar is visible
 */
export async function isSidebarVisible(page: Page): Promise<boolean> {
  const sidebar = page.locator('aside, [role="navigation"]');
  return await sidebar.isVisible();
}

/**
 * Check if mobile navigation is visible
 */
export async function isMobileNavVisible(page: Page): Promise<boolean> {
  const mobileNav = page.locator('[data-testid="mobile-nav"], nav.mobile');
  return await mobileNav.isVisible();
}
