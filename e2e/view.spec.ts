import { test, expect } from "@playwright/test";

test("should open view details modal on click", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  await page.getByText("Alderaan").click();
  await expect(
    await page
      .getByRole("dialog", { name: "Alderaan" })
      .locator("div")
      .filter({
        hasText:
          "Diameter: 12,500 kmClimates: temperateTerrains: grasslands, mountainsPopulation:",
      })
      .nth(1)
  ).toBeVisible();
  await page.getByText("Close").click();
});
