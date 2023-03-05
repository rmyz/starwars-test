import { test, expect } from "@playwright/test";

test("check pagination works correctly", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  await page.getByRole("button", { name: "3" }).click();
  await page.getByRole("button", { name: ">" }).click();
  await page.getByRole("button", { name: ">" }).click();
  await page.getByRole("button", { name: ">" }).click();
  await page.getByRole("button", { name: "4" }).click();
  await page.getByRole("button", { name: "<" }).click();
  await page.getByRole("button", { name: "<" }).click();
  await page.getByRole("button", { name: "<" }).click();
  await page.getByRole("button", { name: ">" }).click();

  await expect(await page.getByRole("button", { name: "2" })).toHaveCSS(
    "color",
    "rgb(0, 0, 0)"
  );
});
