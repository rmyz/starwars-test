import { search } from "../search";
import planets from "../../../utils/tests/fixtures/planets.json";

describe("search", () => {
  test("should return an array with the planets found", () => {
    expect(
      search({ value: "mountain", criteria: "Terrains", planets })
    ).toEqual([planets[0], planets[2]]);
  });
});
