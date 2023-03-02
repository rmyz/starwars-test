import type { TProps } from "../pages";
import type { TPlanet } from "../types";

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
