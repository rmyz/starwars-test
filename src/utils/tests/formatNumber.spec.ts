import { formatNumber } from "../formatNumber";

describe("formatNumber", () => {
  test("should return the number formatted properly", () => {
    expect(formatNumber({ value: "5000" })).toBe(`5,000`);
  });
});
