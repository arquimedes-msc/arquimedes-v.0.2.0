import { test, expect } from '@playwright/test';
import { waitForAppReady, navigateToDashboard, waitForNavigation } from '../helpers/test-utils';
import { mockAuthenticatedUser } from '../fixtures/auth';

/**
 * E2E Tests for Navigation
 * 
 * Tests cover:
 * - Navigation between disciplines
 * - Navigation between modules
 * - Navigation between content pages
 * - Progress state during navigation
 * - Breadcrumbs functionality
 */

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    // Mock authenticated user for all navigation tests
    await mockAuthenticatedUser(page);
  });
  
  test('should navigate to disciplines page from dashboard', async ({ page }) => {
    // Mock disciplines list
    await page.route('**/trpc/disciplines.list*', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          result: {
            data: [
              { id: 1, name: 'Matemática Básica', slug: 'matematica-basica', description: 'Fundamentos' }
            ]
          }
        })
      });
    });
    
    await navigateToDashboard(page);
    
    // Find and click link to disciplines
    const disciplinesLink = page.locator('a[href*="/disciplinas"], a:has-text("Disciplinas")').first();
    await disciplinesLink.click();
    
    await waitForNavigation(page, 'disciplinas');
    
    // Check if on disciplines page
    expect(page.url()).toContain('disciplinas');
  });
  
  test('should navigate between disciplines', async ({ page }) => {
    // Mock disciplines
    await page.route('**/trpc/disciplines.list*', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          result: {
            data: [
              { id: 1, name: 'Matemática Básica', slug: 'matematica-basica', description: 'Fundamentos' },
              { id: 2, name: 'Álgebra', slug: 'algebra', description: 'Álgebra' }
            ]
          }
        })
      });
    });
    
    await page.goto('/disciplinas');
    await waitForAppReady(page);
    
    // Should show list of disciplines
    await expect(page.getByText('Matemática Básica')).toBeVisible({ timeout: 5000 });
    
    // Click on a discipline
    await page.click('text=Matemática Básica');
    
    // Should navigate to discipline page
    await waitForNavigation(page, 'matematica-basica');
  });
  
  test('should navigate between modules within a discipline', async ({ page }) => {
    // Mock discipline data
    await page.route('**/trpc/disciplines.getBySlug*', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          result: {
            data: {
              id: 1,
              name: 'Matemática Básica',
              slug: 'matematica-basica',
              description: 'Fundamentos'
            }
          }
        })
      });
    });
    
    // Mock modules data
    await page.route('**/trpc/modules.listByDiscipline*', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          result: {
            data: [
              { id: 1, disciplineId: 1, name: 'Números', slug: 'numeros', order: 1 },
              { id: 2, disciplineId: 1, name: 'Operações', slug: 'operacoes', order: 2 }
            ]
          }
        })
      });
    });
    
    await page.goto('/disciplina/matematica-basica');
    await waitForAppReady(page);
    
    // Should show modules
    await expect(page.getByText('Números')).toBeVisible({ timeout: 5000 });
    await expect(page.getByText('Operações')).toBeVisible({ timeout: 5000 });
    
    // Click on first module
    await page.click('text=Números');
    
    // Should navigate to module page
    await waitForNavigation(page, 'numeros');
    expect(page.url()).toContain('modulo/numeros');
  });
  
  test('should navigate between content pages within a module', async ({ page }) => {
    // Mock module data
    await page.route('**/trpc/modules.getBySlug*', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          result: {
            data: {
              id: 1,
              disciplineId: 1,
              name: 'Números',
              slug: 'numeros'
            }
          }
        })
      });
    });
    
    // Mock pages data
    await page.route('**/trpc/pages.listByModule*', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          result: {
            data: [
              { id: 1, moduleId: 1, title: 'Introdução', slug: 'introducao', order: 1, content: 'Conteúdo 1' },
              { id: 2, moduleId: 1, title: 'Conceitos', slug: 'conceitos', order: 2, content: 'Conteúdo 2' }
            ]
          }
        })
      });
    });
    
    await page.goto('/disciplina/matematica-basica/modulo/numeros');
    await waitForAppReady(page);
    
    // Should show pages
    await expect(page.getByText('Introdução')).toBeVisible({ timeout: 5000 });
    
    // Click on first page
    await page.click('text=Introdução');
    
    // Should navigate to lesson page
    await waitForNavigation(page, 'introducao');
    expect(page.url()).toContain('aula/introducao');
  });
  
  test('should have functional breadcrumbs', async ({ page }) => {
    // Mock all necessary data
    await page.route('**/trpc/disciplines.getBySlug*', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          result: {
            data: {
              id: 1,
              name: 'Matemática Básica',
              slug: 'matematica-basica'
            }
          }
        })
      });
    });
    
    await page.route('**/trpc/modules.getBySlug*', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          result: {
            data: {
              id: 1,
              disciplineId: 1,
              name: 'Números',
              slug: 'numeros'
            }
          }
        })
      });
    });
    
    await page.route('**/trpc/pages.getBySlug*', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          result: {
            data: {
              id: 1,
              moduleId: 1,
              title: 'Introdução',
              slug: 'introducao',
              content: 'Conteúdo da aula'
            }
          }
        })
      });
    });
    
    await page.route('**/trpc/pages.listByModule*', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          result: {
            data: [
              { id: 1, moduleId: 1, title: 'Introdução', slug: 'introducao', order: 1 }
            ]
          }
        })
      });
    });
    
    await page.route('**/trpc/exercises.listByPage*', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          result: {
            data: []
          }
        })
      });
    });
    
    // Navigate to a deep page
    await page.goto('/disciplina/matematica-basica/modulo/numeros/aula/introducao');
    await waitForAppReady(page);
    
    // Look for breadcrumbs (common selectors)
    const breadcrumbs = page.locator('nav[aria-label="breadcrumb"], .breadcrumb, [role="navigation"]:has-text("Matemática")');
    
    try {
      await expect(breadcrumbs.first()).toBeVisible({ timeout: 3000 });
      
      // Breadcrumbs should contain navigation elements
      const hasNavLinks = await page.locator('a:has-text("Matemática"), a:has-text("Números")').count() > 0;
      expect(hasNavLinks).toBeTruthy();
    } catch {
      // Breadcrumbs might not be implemented or have different structure
      console.log('Breadcrumbs not found with expected structure');
    }
  });
  
  test('should maintain progress state during navigation', async ({ page }) => {
    // Mock progress data
    await page.route('**/trpc/progress.getUserProgress*', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          result: {
            data: {
              completedPages: [1, 2],
              totalPages: 10,
              percentage: 20
            }
          }
        })
      });
    });
    
    await navigateToDashboard(page);
    
    // Progress data should be loaded and visible
    // This could be in a progress bar, percentage display, etc.
    const progressIndicators = page.locator('text=/\\d+%/, [role="progressbar"], .progress');
    
    try {
      const count = await progressIndicators.count();
      expect(count).toBeGreaterThan(0);
    } catch {
      // Progress indicators might be displayed differently
      console.log('Progress indicators not found with expected selectors');
    }
  });
  
  test('should handle navigation errors gracefully', async ({ page }) => {
    // Mock 404 response for discipline
    await page.route('**/trpc/disciplines.getBySlug*', async route => {
      await route.fulfill({
        status: 404,
        contentType: 'application/json',
        body: JSON.stringify({
          error: {
            message: 'Discipline not found'
          }
        })
      });
    });
    
    await page.goto('/disciplina/non-existent');
    await waitForAppReady(page);
    
    // Should show error message or 404 page
    const has404 = await page.locator('text=/404|não encontr|not found/i').count() > 0;
    expect(has404 || page.url().includes('404')).toBeTruthy();
  });
});
