import type { TEditFormValues } from "../components/EditForm/EditForm";
import type { TSearch } from "../components/Search/config";
import type { TProps } from "../pages";
import type { TPlanet, TPlanetRaw } from "../types";
import { getPlanetImg } from "./getPlanetImg";
import { formatNumber } from "./numberFormatter";

export const planetFinder = ({
  value,
  criteria,
  planets,
}: {
  value: string;
  criteria: TSearch;
  planets: TProps["planets"];
}) => {
  const key = criteria.toLowerCase();

  return planets.filter((planet) =>
    planet[key as keyof TPlanet].toLowerCase().includes(value.toLowerCase())
  );
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

export const planetReplacer = ({
  id,
  values,
  planets,
}: {
  id: TPlanet["id"];
  values: TEditFormValues;
  planets: TProps["planets"];
}) => {
  return planets.map((planet) => {
    if (planet.id === id) {
      return {
        ...planet,
        ...values,
      };
    }
    return planet;
  });
};

export const planetCreator = ({
  newPlanet,
  planets,
}: {
  newPlanet: TPlanet;
  planets: TProps["planets"];
}) => {
  return [newPlanet, ...planets];
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
      const img = getPlanetImg();

      return {
        id,
        name,
        climates: climatesFormatted,
        terrains: terrainsFormatted,
        residents,
        diameter: diameterFormatted,
        population: populationFormatted,
        img,
      };
    }
  );

  return planetsFormatted;
};
