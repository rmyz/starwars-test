import { test, expect } from "@playwright/test";

test("remove a planet", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page
    .locator("div:nth-child(2) > .absolute > button:nth-child(2)")
    .click();
  await page.getByRole("button", { name: "Delete" }).click();
  await expect(
    page
      .locator("div")
      .filter({
        hasText:
          "Aleen MinorDiameter: 0 kmClimates: unknownTerrains: unknownPopulation: 0",
      })
      .first()
  ).not.toBeVisible();
});
