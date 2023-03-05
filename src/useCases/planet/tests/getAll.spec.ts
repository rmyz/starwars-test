import { getAll } from "../getAll";
import planetsRaw from "../../../utils/tests/fixtures/planetsRaw.json";
import planets from "../../../utils/tests/fixtures/planets.json";
import * as graphQLClient from "graphql-request";

describe("getAll", () => {
  beforeEach(() => {
    jest
      .spyOn(graphQLClient, "request")
      .mockResolvedValue({ allPlanets: { planets: planetsRaw } });

    jest.spyOn(global.Math, "round").mockReturnValue(5);
  });

  afterAll(() => {
    jest.spyOn(global.Math, "round").mockRestore();
    jest.spyOn(graphQLClient, "request").mockRestore();
  });

  test("should get planets and return them formatted and sorted by name", async () => {
    const result = await getAll();
    expect(result).toEqual({ planets: [planets[1], planets[0], planets[2]] });
  });
});
