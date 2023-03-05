import {
  planetCreator,
  planetFilter,
  planetFinder,
  planetFormatter,
  planetReplacer,
} from "../planet";

import planets from "./fixtures/planets.json";
import planetsRaw from "./fixtures/planetsRaw.json";

describe("planetCreator", () => {
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

    expect(planetCreator({ newPlanet, planets })).toEqual([
      newPlanet,
      ...planets,
    ]);
  });
});

describe("planetFilter", () => {
  test("should return an array without the given planets", () => {
    expect(planetFilter({ id: "345", planets })).toEqual([
      planets[0],
      planets[2],
    ]);
  });
});

describe("planetFinder", () => {
  test("should return an array with the planets found", () => {
    expect(
      planetFinder({ value: "cold", criteria: "Climates", planets })
    ).toEqual([planets[1], planets[2]]);
  });
});

describe("planetFormatter", () => {
  const RANDOM_NUMBER = 5;

  beforeEach(() => {
    jest.spyOn(global.Math, "round").mockReturnValue(RANDOM_NUMBER);
  });

  afterAll(() => {
    jest.spyOn(global.Math, "round").mockRestore();
  });
  test("should return an array with the planets formatted", () => {
    expect(planetFormatter({ planets: planetsRaw })).toEqual(planets);
  });
});

describe("planetReplacer", () => {
  test("should return an array with the planet given replaced with new values", () => {
    const values = {
      residents: "testResident",
      climates: "windy",
      terrains: "snow",
      population: "7,800",
      diameter: "300",
    };

    expect(
      planetReplacer({
        id: "123",
        values,
        planets,
      })
    ).toEqual([{ ...planets[0], ...values }, planets[1], planets[2]]);
  });
});
