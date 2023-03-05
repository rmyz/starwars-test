import { add } from "../add";
import planets from "../../../utils/tests/fixtures/planets.json";

describe("add", () => {
  test("should return an array with new planet created", () => {
    const newPlanet = {
      id: "675",
      img: "test",
      name: "Test",
      residents: "testResident",
      climates: "windy",
      terrains: "snow",
      population: "7,800",
      diameter: "300",
    };

    expect(add({ newPlanet, planets })).toEqual([newPlanet, ...planets]);
  });
});
