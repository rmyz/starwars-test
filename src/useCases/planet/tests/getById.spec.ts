import planetsRaw from "../../../utils/tests/fixtures/planetsRaw.json";
import planets from "../../../utils/tests/fixtures/planets.json";
import * as graphQLClient from "graphql-request";
import { getById } from "../getById";

describe("getById", () => {
  beforeEach(() => {
    jest
      .spyOn(graphQLClient, "request")
      .mockResolvedValue({ planet: planetsRaw[0] });

    jest.spyOn(global.Math, "round").mockReturnValue(5);
  });

  afterAll(() => {
    jest.spyOn(global.Math, "round").mockRestore();
    jest.spyOn(graphQLClient, "request").mockRestore();
  });

  test("should get planet by id and return it formatted", async () => {
    const result = await getById({ id: "123" });
    expect(result).toEqual(planets[0]);
  });
});
