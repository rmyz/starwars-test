import { sort } from "../sort";
import planets from "../../../utils/tests/fixtures/planets.json";

describe("sort", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should return an array with the planets ordered numerically", () => {
    expect(sort({ sorter: "Diameter", planets })).toEqual([
      planets[1],
      planets[2],
      planets[0],
    ]);
  });

  test("should return an array with the planets ordered alphabetically", () => {
    expect(sort({ sorter: "Name", planets })).toEqual([
      planets[1],
      planets[0],
      planets[2],
    ]);
  });
});
