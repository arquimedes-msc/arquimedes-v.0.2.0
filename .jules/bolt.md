## 2024-07-31 - Memoize Stable Child Components
**Learning:** A common performance anti-pattern in this React codebase is a stateful parent component (like a Dashboard) causing stable, prop-less child components (like `MobileNav` or `Sidebar`) to re-render unnecessarily on every state change. `React.memo` is highly effective here.
**Action:** When profiling, specifically look for layout components or other static UI elements rendered inside components with significant state or frequent data fetching. Wrap them in `React.memo` to prevent these wasteful renders.
