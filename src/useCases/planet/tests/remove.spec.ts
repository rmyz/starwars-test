import { remove } from "../remove";
import planets from "../../../utils/tests/fixtures/planets.json";

describe("remove", () => {
  test("should return an array without the given planets", () => {
    expect(remove({ id: "345", planets })).toEqual([planets[0], planets[2]]);
  });
});
