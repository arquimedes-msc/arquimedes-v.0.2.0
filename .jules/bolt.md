## 2024-07-25 - Memoizing Stable Children of Stateful Components

**Learning:** Stateful parent components like `Dashboard.tsx`, which manage multiple data fetches and state changes, can cause significant performance degradation by forcing stable, prop-less child components to re-render unnecessarily.

**Action:** Identify and wrap stable, prop-less child components (e.g., `MobileNav`, `Sidebar`) with `React.memo`. This is a high-impact, low-risk optimization that prevents wasted renders and improves UI responsiveness. It's a go-to pattern for this application's architecture.
