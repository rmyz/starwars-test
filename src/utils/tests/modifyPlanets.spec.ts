import type { TPlanet } from "../../types";
import { modifyPlanets } from "../modifyPlanets";
import mockedPlanets from "./fixtures/planets.json";

describe("modifyPlanets", () => {
  test("should return backupPlanets and setBackupPlanets", () => {
    const callback = jest.fn();
    const setPlanets = jest.fn();
    const setBackupPlanets = jest.fn();

    const planets: Array<TPlanet> = mockedPlanets;
    const backupPlanets: Array<TPlanet> = mockedPlanets;

    modifyPlanets({
      planets,
      backupPlanets,
      setPlanets,
      setBackupPlanets,
      callback,
    });

    expect(callback).toBeCalledWith(backupPlanets, setBackupPlanets);
  });

  test("should return planets and setPlanets", () => {
    const callback = jest.fn();
    const setPlanets = jest.fn();
    const setBackupPlanets = jest.fn();

    const planets: Array<TPlanet> = mockedPlanets;
    const backupPlanets: Array<TPlanet> = [];

    modifyPlanets({
      planets,
      backupPlanets,
      setPlanets,
      setBackupPlanets,
      callback,
    });

    expect(callback).toBeCalledWith(planets, setPlanets);
  });
});
