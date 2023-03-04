import type { TPlanet } from "../../types";
import { planetFinder } from "../../utils/planet";

export const search = ({
  id,
  planets,
}: {
  id: TPlanet["id"];
  planets: Array<TPlanet>;
}) => {
  return planetFinder({ id, planets });
};
