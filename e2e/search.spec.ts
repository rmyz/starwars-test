import { test, expect } from "@playwright/test";

test("search by name", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByLabel("Search", { exact: true }).click();
  await page.getByLabel("Search", { exact: true }).fill("IV");

  await expect(await page.getByText("Yavin IV")).toBeVisible();
});

test("search by climates", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page
    .getByRole("combobox", { name: "Search by" })
    .selectOption("Climates");
  await page.getByRole("combobox", { name: "Search by" }).click();
  await page.getByLabel("Search", { exact: true }).click();
  await page.getByLabel("Search", { exact: true }).fill("unknown");

  await expect(await page.getByText("Serenno")).toBeVisible();
});

test("search by terrains", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page
    .getByRole("combobox", { name: "Search by" })
    .selectOption("Terrains");
  await page.getByLabel("Search", { exact: true }).click();
  await page.getByLabel("Search", { exact: true }).fill("desert");

  await expect(await page.getByText("Ryloth")).toBeVisible();
});
