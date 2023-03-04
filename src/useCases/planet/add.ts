import type { TPlanet } from "../../types";
import { planetCreator } from "../../utils/planet";

export const add = ({
  newPlanet,
  planets,
}: {
  newPlanet: TPlanet;
  planets: Array<TPlanet>;
}) => {
  return planetCreator({ newPlanet, planets });
};
