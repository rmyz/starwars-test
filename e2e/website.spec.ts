import { test, expect } from "@playwright/test";

test("should render website without crashes", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  expect(await page.getByRole("heading", { name: "Planets" })).toBeVisible();
});
