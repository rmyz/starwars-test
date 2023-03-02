import type { TProps } from "../pages";
import type { TPlanet, TPlanetRaw } from "../types";
import { formatNumber } from "./numberFormatter";

export const planetFinder = ({
  id,
  planets,
}: {
  id: TPlanet["id"];
  planets: TProps["planets"];
}) => {
  return planets.find((planet) => planet.id === id);
};

export const planetFilter = ({
  id,
  planets,
}: {
  id: TPlanet["id"];
  planets: TProps["planets"];
}) => {
  return planets.filter((planet) => planet.id !== id);
};

export const planetFormatter = ({
  planets,
}: {
  planets: Array<TPlanetRaw>;
}) => {
  const planetsFormatted = planets.map(
    ({
      id,
      name,
      climates,
      terrains,
      diameter,
      residentConnection,
      population,
    }) => {
      const climatesFormatted = climates.join(", ");
      const terrainsFormatted = terrains.join(", ");
      const diameterFormatted = formatNumber({ value: diameter });
      const populationFormatted = formatNumber({ value: population });

      const residents =
        residentConnection?.residents
          .map((resident) => resident.name)
          .join(", ") ?? "";

      return {
        id,
        name,
        climates: climatesFormatted,
        terrains: terrainsFormatted,
        residents,
        diameter: diameterFormatted,
        population: populationFormatted,
      };
    }
  );

  return planetsFormatted;
};