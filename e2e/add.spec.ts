import { test, expect } from "@playwright/test";

test("add new planet", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  await page.getByRole("button", { name: "Add new planet" }).click();
  await page.getByLabel("Name").click();
  await page.getByLabel("Name").fill("testName");
  await page.getByLabel("Diameter").click();
  await page.getByLabel("Diameter").fill("250");
  await page.getByLabel("Climates").click();
  await page.getByLabel("Climates").fill("cold");
  await page.getByLabel("Terrains").click();
  await page.getByLabel("Terrains").fill("mountain");
  await page.getByLabel("Population").click();
  await page.getByLabel("Population").fill("2500");
  await page.getByLabel("Residents").click();
  await page.getByLabel("Residents").fill("yoda");
  await page.getByRole("button", { name: "Save" }).click();

  await expect(await page.getByText("testName")).toBeVisible();
});
