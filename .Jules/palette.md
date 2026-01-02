## 2024-07-26 - Hiding Decorative Icons for Cleaner Accessibility

**Learning:** When an icon-only button has a clear, descriptive `aria-label` providing an accessible name, the `<svg>` icon inside it is purely decorative. If the icon isn't explicitly hidden, screen readers might announce both the label and the icon's intrinsic role or filename (e.g., "Desativar som, graphic volume icon"), creating a redundant and clunky user experience.

**Action:** For all icon-only buttons that already have a sufficient `aria-label`, I will add the `aria-hidden="true"` attribute to the icon element itself. This will ensure the screen reader only announces the button's intended function, providing a smoother and more professional accessible experience.
