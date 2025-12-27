import { test, expect } from '@playwright/test';
import { waitForAppReady, waitForToast } from '../helpers/test-utils';
import { mockAuthenticatedUser } from '../fixtures/auth';

/**
 * E2E Tests for Daily Challenge Feature
 * 
 * Tests cover:
 * - Display of daily challenge
 * - 3 exercises in challenge
 * - Double points on correct answers
 * - Challenge completion marking
 * - Prevention of same-day retries
 */

test.describe('Daily Challenge', () => {
  test.beforeEach(async ({ page }) => {
    // Mock authenticated user
    await mockAuthenticatedUser(page);
  });
  
  test('should display daily challenge page', async ({ page }) => {
    // Mock daily challenge data
    await page.route('**/trpc/dailyChallenge.getToday*', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          result: {
            data: {
              challenge: {
                id: 1,
                date: new Date().toISOString().split('T')[0],
                difficulty: 'moderate'
              },
              exercises: [
                {
                  id: 1,
                  question: 'Quanto é 5 + 3?',
                  options: [
                    { id: 'a', text: '6' },
                    { id: 'b', text: '8' },
                    { id: 'c', text: '7' },
                    { id: 'd', text: '9' }
                  ],
                  correctOptionIndex: 1
                },
                {
                  id: 2,
                  question: 'Quanto é 10 - 4?',
                  options: [
                    { id: 'a', text: '5' },
                    { id: 'b', text: '6' },
                    { id: 'c', text: '7' },
                    { id: 'd', text: '14' }
                  ],
                  correctOptionIndex: 1
                },
                {
                  id: 3,
                  question: 'Quanto é 3 × 4?',
                  options: [
                    { id: 'a', text: '7' },
                    { id: 'b', text: '12' },
                    { id: 'c', text: '10' },
                    { id: 'd', text: '15' }
                  ],
                  correctOptionIndex: 1
                }
              ]
            }
          }
        })
      });
    });
    
    await page.route('**/trpc/dailyChallenge.hasCompleted*', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          result: {
            data: false
          }
        })
      });
    });
    
    await page.route('**/trpc/dailyChallenge.getStats*', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          result: {
            data: {
              totalCompleted: 5,
              currentStreak: 3,
              longestStreak: 7
            }
          }
        })
      });
    });
    
    await page.goto('/desafio-do-dia');
    await waitForAppReady(page);
    
    // Check if daily challenge page elements are visible
    await expect(page.locator('text=/desafio|challenge/i')).toBeVisible({ timeout: 5000 });
  });
  
  test('should show exactly 3 exercises in daily challenge', async ({ page }) => {
    await page.route('**/trpc/dailyChallenge.getToday*', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          result: {
            data: {
              challenge: {
                id: 1,
                date: new Date().toISOString().split('T')[0],
                difficulty: 'moderate'
              },
              exercises: [
                {
                  id: 1,
                  question: 'Exercício 1',
                  options: [{ id: 'a', text: '1' }, { id: 'b', text: '2' }],
                  correctOptionIndex: 0
                },
                {
                  id: 2,
                  question: 'Exercício 2',
                  options: [{ id: 'a', text: '3' }, { id: 'b', text: '4' }],
                  correctOptionIndex: 0
                },
                {
                  id: 3,
                  question: 'Exercício 3',
                  options: [{ id: 'a', text: '5' }, { id: 'b', text: '6' }],
                  correctOptionIndex: 0
                }
              ]
            }
          }
        })
      });
    });
    
    await page.route('**/trpc/dailyChallenge.hasCompleted*', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          result: {
            data: false
          }
        })
      });
    });
    
    await page.route('**/trpc/dailyChallenge.getStats*', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          result: {
            data: {
              totalCompleted: 0,
              currentStreak: 0,
              longestStreak: 0
            }
          }
        })
      });
    });
    
    await page.goto('/desafio-do-dia');
    await waitForAppReady(page);
    
    // Count exercise cards
    await expect(page.getByText('Exercício 1')).toBeVisible({ timeout: 5000 });
    await expect(page.getByText('Exercício 2')).toBeVisible();
    await expect(page.getByText('Exercício 3')).toBeVisible();
  });
  
  test('should award double points for correct answers in daily challenge', async ({ page }) => {
    await page.route('**/trpc/dailyChallenge.getToday*', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          result: {
            data: {
              challenge: {
                id: 1,
                date: new Date().toISOString().split('T')[0],
                difficulty: 'moderate'
              },
              exercises: [
                {
                  id: 1,
                  question: 'Quanto é 2 + 2?',
                  options: [
                    { id: 'a', text: '3' },
                    { id: 'b', text: '4' },
                    { id: 'c', text: '5' }
                  ],
                  correctOptionIndex: 1
                }
              ]
            }
          }
        })
      });
    });
    
    await page.route('**/trpc/dailyChallenge.hasCompleted*', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          result: {
            data: false
          }
        })
      });
    });
    
    await page.route('**/trpc/dailyChallenge.getStats*', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          result: {
            data: {
              totalCompleted: 0,
              currentStreak: 0,
              longestStreak: 0
            }
          }
        })
      });
    });
    
    // Mock submission with double points
    await page.route('**/trpc/dailyChallenge.submit*', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          result: {
            data: {
              isCorrect: true,
              pointsEarned: 20, // Double points (10 * 2)
              isDoubled: true
            }
          }
        })
      });
    });
    
    await page.goto('/desafio-do-dia');
    await waitForAppReady(page);
    
    // Select correct answer
    await page.click('text=4');
    
    // Submit
    const submitButton = page.locator('button:has-text("Enviar"), button:has-text("Responder")').first();
    await submitButton.click();
    
    // Check for doubled points message
    await expect(page.locator('text=/20.*pontos|dobrados|doubled/i')).toBeVisible({ timeout: 5000 });
  });
  
  test('should mark challenge as complete after finishing all exercises', async ({ page }) => {
    let hasCompleted = false;
    
    await page.route('**/trpc/dailyChallenge.getToday*', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          result: {
            data: {
              challenge: {
                id: 1,
                date: new Date().toISOString().split('T')[0],
                difficulty: 'easy'
              },
              exercises: [
                {
                  id: 1,
                  question: 'Exercício 1',
                  options: [{ id: 'a', text: '1' }],
                  correctOptionIndex: 0
                }
              ]
            }
          }
        })
      });
    });
    
    await page.route('**/trpc/dailyChallenge.hasCompleted*', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          result: {
            data: hasCompleted
          }
        })
      });
    });
    
    await page.route('**/trpc/dailyChallenge.getStats*', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          result: {
            data: {
              totalCompleted: hasCompleted ? 1 : 0,
              currentStreak: hasCompleted ? 1 : 0,
              longestStreak: 1
            }
          }
        })
      });
    });
    
    await page.route('**/trpc/dailyChallenge.submit*', async route => {
      hasCompleted = true;
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          result: {
            data: {
              isCorrect: true,
              pointsEarned: 20,
              challengeCompleted: true
            }
          }
        })
      });
    });
    
    await page.goto('/desafio-do-dia');
    await waitForAppReady(page);
    
    // Complete the exercise
    await page.click('text=1');
    const submitButton = page.locator('button:has-text("Enviar"), button:has-text("Responder")').first();
    await submitButton.click();
    
    // Should show completion message
    await expect(page.locator('text=/completo|concluído|completed/i')).toBeVisible({ timeout: 5000 });
  });
  
  test('should not allow retrying daily challenge on same day', async ({ page }) => {
    // Mock completed challenge
    await page.route('**/trpc/dailyChallenge.getToday*', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          result: {
            data: {
              challenge: {
                id: 1,
                date: new Date().toISOString().split('T')[0],
                difficulty: 'moderate'
              },
              exercises: []
            }
          }
        })
      });
    });
    
    await page.route('**/trpc/dailyChallenge.hasCompleted*', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          result: {
            data: true
          }
        })
      });
    });
    
    await page.route('**/trpc/dailyChallenge.getStats*', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          result: {
            data: {
              totalCompleted: 1,
              currentStreak: 1,
              longestStreak: 1
            }
          }
        })
      });
    });
    
    await page.goto('/desafio-do-dia');
    await waitForAppReady(page);
    
    // Should show message that challenge is already completed
    await expect(page.locator('text=/já completou|already completed|volte amanhã|come back tomorrow/i')).toBeVisible({ timeout: 5000 });
    
    // Should not show exercise submission buttons
    const submitButtons = page.locator('button:has-text("Enviar"), button:has-text("Responder")');
    expect(await submitButtons.count()).toBe(0);
  });
  
  test('should show challenge statistics', async ({ page }) => {
    await page.route('**/trpc/dailyChallenge.getToday*', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          result: {
            data: {
              challenge: {
                id: 1,
                date: new Date().toISOString().split('T')[0],
                difficulty: 'moderate'
              },
              exercises: []
            }
          }
        })
      });
    });
    
    await page.route('**/trpc/dailyChallenge.hasCompleted*', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          result: {
            data: false
          }
        })
      });
    });
    
    await page.route('**/trpc/dailyChallenge.getStats*', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          result: {
            data: {
              totalCompleted: 15,
              currentStreak: 5,
              longestStreak: 10
            }
          }
        })
      });
    });
    
    await page.goto('/desafio-do-dia');
    await waitForAppReady(page);
    
    // Check for statistics display
    await expect(page.locator('text=/15|5|10/').first()).toBeVisible({ timeout: 5000 });
  });
  
  test('should handle challenge loading errors', async ({ page }) => {
    await page.route('**/trpc/dailyChallenge.getToday*', async route => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({
          error: {
            message: 'Failed to load challenge'
          }
        })
      });
    });
    
    await page.goto('/desafio-do-dia');
    await waitForAppReady(page);
    
    // Should show error message
    await expect(page.locator('text=/erro|error|falha/i')).toBeVisible({ timeout: 5000 });
  });
});
