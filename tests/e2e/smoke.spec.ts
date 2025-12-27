import { expect, test } from "@playwright/test";

const exampleHeadline = "Example Domain";

// Basic smoke test to validate Playwright wiring. It works with either a
// locally served instance (default) or an externally provided BASE_URL.
test("renders the landing page", async ({ page, baseURL }) => {
  const targetUrl = baseURL ?? "https://example.com";
  await page.goto(targetUrl);

  const heading = page.getByRole("heading", { level: 1 });
  await expect(heading).toBeVisible();

  // When pointed at the default example.com fallback, assert the expected copy
  // to guarantee the request actually completed.
  if (targetUrl.includes("example.com")) {
    await expect(heading).toHaveText(exampleHeadline);
  }
});
