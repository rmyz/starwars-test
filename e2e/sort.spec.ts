import { test, expect } from "@playwright/test";

test("sort by Name", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("combobox", { name: "Sort by" }).selectOption("Name");

  await expect(
    await page
      .locator('[id="__next"] div')
      .filter({
        hasText:
          "AlderaanDiameter: 12,500 kmClimates: temperateTerrains: grasslands, mountainsPop",
      })
      .nth(3)
  ).toBeVisible();
});

test("sort by Diameter", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page
    .getByRole("combobox", { name: "Sort by" })
    .selectOption("Diameter");

  await expect(await page.getByText("Polis Massa")).toBeVisible();
});

test("sort by Climates", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page
    .getByRole("combobox", { name: "Sort by" })
    .selectOption("Climates");

  await expect(await page.getByText("Mygeeto")).toBeVisible();
});

test("sort by Terrains", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page
    .getByRole("combobox", { name: "Sort by" })
    .selectOption("Terrains");

  await expect(await page.getByText("Coruscant")).toBeVisible();
});

test("sort by Population", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page
    .getByRole("combobox", { name: "Sort by" })
    .selectOption("Population");

  await expect(await page.getByText("Iktotch")).toBeVisible();
});
