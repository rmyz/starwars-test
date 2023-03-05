import { getPlanetImg } from "../getPlanetImg";

describe("getPlanetImg", () => {
  const RANDOM_NUMBER = 5;

  beforeEach(() => {
    jest.spyOn(global.Math, "round").mockReturnValue(RANDOM_NUMBER);
  });

  afterAll(() => {
    jest.spyOn(global.Math, "round").mockRestore();
  });

  test("should return the img src", () => {
    expect(getPlanetImg()).toBe(`/images/planet-${RANDOM_NUMBER}.png`);
  });
});
