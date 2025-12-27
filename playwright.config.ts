import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright Configuration for Arquimedes E2E Tests
 * 
 * This configuration file sets up Playwright for comprehensive E2E testing
 * of critical application flows including authentication, navigation, exercises,
 * gamification, and admin functionalities.
 */
export default defineConfig({
  // Test directory
  testDir: './tests/e2e',
  
  // Run tests in files in parallel
  fullyParallel: true,
  
  // Fail the build on CI if you accidentally left test.only in the source code
  forbidOnly: !!process.env.CI,
  
  // Retry on CI only
  retries: process.env.CI ? 2 : 0,
  
  // Opt out of parallel tests on CI
  workers: process.env.CI ? 1 : undefined,
  
  // Reporter to use
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['json', { outputFile: 'test-results/results.json' }],
    ['list']
  ],
  
  // Shared settings for all the projects below
  use: {
    // Base URL to use in actions like `await page.goto('/')`
    baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:5000',
    
    // Collect trace when retrying the failed test
    trace: 'on-first-retry',
    
    // Screenshot on failure
    screenshot: 'only-on-failure',
    
    // Video on failure
    video: 'retain-on-failure',
    
    // Maximum time each action can take
    actionTimeout: 10000,
  },
  
  // Global timeout for each test
  timeout: 30000,
  
  // Expect timeout
  expect: {
    timeout: 5000,
  },
  
  // Configure projects for major browsers
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    
    // Test against mobile viewports
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],
  
  // Run your local dev server before starting the tests
  // Uncomment if you want Playwright to start the server automatically
  // webServer: {
  //   command: 'pnpm run dev',
  //   url: 'http://localhost:5000',
  //   reuseExistingServer: !process.env.CI,
  //   timeout: 120000,
  // },
});
