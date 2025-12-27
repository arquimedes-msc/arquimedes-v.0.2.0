# Playwright E2E Tests

This directory contains comprehensive End-to-End (E2E) tests for the Arquimedes platform using Playwright.

## Test Structure

```
tests/
├── e2e/                      # E2E test specifications
│   ├── auth.spec.ts         # Authentication flow tests
│   ├── navigation.spec.ts   # Navigation and routing tests
│   ├── exercises.spec.ts    # Exercise functionality tests
│   ├── gamification.spec.ts # XP, levels, streaks, achievements
│   ├── daily-challenge.spec.ts # Daily challenge tests
│   ├── admin.spec.ts        # Admin access control tests
│   ├── progress.spec.ts     # Progress tracking tests
│   └── performance.spec.ts  # Performance and optimization tests
├── fixtures/                # Test fixtures and helpers
│   └── auth.ts             # Authentication mocking utilities
└── helpers/                 # Shared test utilities
    └── test-utils.ts       # Common test helper functions
```

## Test Coverage

### Authentication (`auth.spec.ts`)
- Login page rendering
- Google OAuth button with loading state (PR #18)
- Protected route access control
- Logout functionality
- Session persistence

### Navigation (`navigation.spec.ts`)
- Navigation between disciplines, modules, and content pages
- Breadcrumb functionality
- Progress state maintenance during navigation
- Error handling for invalid routes

### Exercises (`exercises.spec.ts`)
- Exercise card rendering (ExerciseCard component - PR #13)
- Correct/incorrect answer submission
- Feedback and hints display
- Progress updates after completion
- Exercise statistics
- Memoization verification (PR #13)

### Gamification (`gamification.spec.ts`)
- XP display (XPDisplay component - PR #15)
- Level progression
- Streak tracking
- Achievements system
- Points system
- Memoization verification (PR #15)

### Daily Challenge (`daily-challenge.spec.ts`)
- Daily challenge display
- 3 exercises per challenge
- Double points for correct answers
- Completion tracking
- Same-day retry prevention

### Admin (`admin.spec.ts`)
- **Security validation (PR #17 & #14)**
- Admin vs regular user access control
- `resetUserProgress` endpoint protection
- `adminProcedure` middleware verification
- UI element visibility based on role

### Progress Tracking (`progress.spec.ts`)
- Page completion saving
- Module percentage calculation
- Completed pages display
- Content unlocking based on prerequisites
- Progress persistence

### Performance (`performance.spec.ts`)
- Page load time (< 3 seconds)
- Navigation smoothness
- Component memoization validation
- Bundle size checks
- API response monitoring
- Memory leak detection

## Running Tests

### Run all tests
```bash
pnpm test:e2e
```

### Run specific test file
```bash
pnpm exec playwright test auth.spec.ts
```

### Run tests in headed mode (see browser)
```bash
pnpm exec playwright test --headed
```

### Run tests in specific browser
```bash
pnpm exec playwright test --project=chromium
pnpm exec playwright test --project=firefox
pnpm exec playwright test --project=webkit
```

### Run tests in debug mode
```bash
pnpm exec playwright test --debug
```

### Run tests with UI mode
```bash
pnpm exec playwright test --ui
```

## Test Configuration

Tests are configured in `playwright.config.ts`:
- Base URL: `http://localhost:5000` (configurable via `PLAYWRIGHT_BASE_URL`)
- Multiple browsers: chromium, firefox, webkit, mobile
- Retries: 2 on CI, 0 locally
- Screenshot on failure
- Video on failure
- Parallel execution
- HTML, JSON, and list reporters

## CI Integration

Tests run automatically on CI with:
- Playwright report uploaded as artifact (30 days retention)
- Test results and screenshots uploaded on failure (30 days retention)
- Multi-browser testing matrix

## Mocking Strategy

Since the app uses OAuth (Google) for authentication, tests use mocking strategies:
1. **tRPC endpoint mocking**: Mock API responses for authenticated state
2. **Dev login endpoint**: Use `/api/dev/login` when available in development
3. **Cookie management**: Set authentication cookies for testing

## Key Features Validated

### PR #13: ExerciseCard Memoization
- Component wrapped with `React.memo`
- Prevents unnecessary re-renders
- Verified in `exercises.spec.ts` and `performance.spec.ts`

### PR #15: XPDisplay Memoization
- Component wrapped with `React.memo`
- Optimizes gamification display
- Verified in `gamification.spec.ts` and `performance.spec.ts`

### PR #17 & #14: Admin Security
- `adminProcedure` middleware protection
- `resetUserProgress` endpoint restricted to admins
- Regular users blocked from admin operations
- Verified in `admin.spec.ts`

### PR #18: Login Button Loading State
- Google login button shows spinner during redirect
- Button disabled while loading
- "Redirecionando..." text displayed
- Verified in `auth.spec.ts`

## Best Practices

1. **Independent tests**: Each test can run in isolation
2. **Mocking**: Use route mocking for reliable, fast tests
3. **Selectors**: Prefer text content over brittle selectors
4. **Waits**: Use `waitForAppReady()` and explicit waits
5. **Cleanup**: Playwright handles browser cleanup automatically
6. **Assertions**: Use Playwright's built-in assertions with timeout

## Troubleshooting

### Tests failing due to authentication
- Ensure mock routes are set up in `beforeEach`
- Check that `mockAuthenticatedUser()` is called
- Verify cookie settings if using real auth

### Timeout errors
- Increase timeout in test or config
- Check if app is running on correct port
- Verify network requests aren't blocked

### Flaky tests
- Add explicit waits with `waitForAppReady()`
- Use `waitForLoadState('networkidle')`
- Increase retry count in config

## Contributing

When adding new tests:
1. Place them in the appropriate test file
2. Use descriptive test names
3. Mock external dependencies
4. Follow existing patterns
5. Add comments for complex logic
6. Ensure tests are independent
7. Use helper functions from `test-utils.ts`

## Test Metrics

- **Total Tests**: 70 tests
- **Test Files**: 8 files
- **Browser Configurations**: 5 (chromium, firefox, webkit, mobile chrome, mobile safari)
- **Total Test Runs**: 350 (70 tests × 5 browsers)
- **Coverage Areas**: 
  - Authentication ✓
  - Navigation ✓
  - Exercises ✓
  - Gamification ✓
  - Daily Challenges ✓
  - Admin Security ✓
  - Progress Tracking ✓
  - Performance ✓
