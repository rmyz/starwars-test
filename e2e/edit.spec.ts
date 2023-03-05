import { test, expect } from "@playwright/test";

test("edit by entering modal", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  await page.getByText("Cato Neimoidia").click();
  await page.getByRole("button", { name: "Edit" }).click();
  await page.getByLabel("Population").click();
  await page.getByLabel("Population").fill("10,000,000,000");
  await page.getByLabel("Residents").click();
  await page.getByLabel("Residents").fill("Nute Gunray, yoda");
  await page.getByRole("button", { name: "Save" }).click();
  await page
    .locator('[id="__next"] div')
    .filter({
      hasText:
        "Cato NeimoidiaDiameter: 0 kmClimates: temperate, moistTerrains: mountains, field",
    })
    .nth(3)
    .click();
  await expect(
    await page
      .getByRole("dialog", { name: "Cato Neimoidia" })
      .getByText("Population: 10,000,000,000")
  ).toBeVisible();
  await expect(
    await page.getByText("Residents: Nute Gunray, yoda")
  ).toBeVisible();
});

test("edit by icon", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  await page.goto("http://localhost:3000/");
  await page.locator("div:nth-child(5) > .absolute > button").first().click();
  await page.getByLabel("Population").click();
  await page.getByLabel("Population").fill("10,000,000,000");
  await page.getByLabel("Residents").click();
  await page.getByLabel("Residents").fill("Nute Gunray, yoda");
  await page.getByRole("button", { name: "Save" }).click();
  await page
    .locator('[id="__next"] div')
    .filter({
      hasText:
        "Cato NeimoidiaDiameter: 0 kmClimates: temperate, moistTerrains: mountains, field",
    })
    .nth(3)
    .click();
  await expect(
    await page
      .getByRole("dialog", { name: "Cato Neimoidia" })
      .getByText("Population: 10,000,000,000")
  ).toBeVisible();
  await expect(
    await page.getByText("Residents: Nute Gunray, yoda")
  ).toBeVisible();
});
