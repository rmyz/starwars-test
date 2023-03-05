import { edit } from "../edit";
import planets from "../../../utils/tests/fixtures/planets.json";

describe("edit", () => {
  test("should return an array with the planet given replaced with new values", () => {
    const values = {
      residents: "testResident",
      climates: "windy",
      terrains: "snow",
      population: "7,800",
      diameter: "300",
    };

    expect(
      edit({
        id: "123",
        values,
        planets,
      })
    ).toEqual([{ ...planets[0], ...values }, planets[1], planets[2]]);
  });
});
