import type { TPlanet } from "../../types";
import { planetFilter } from "../../utils/planet";

export const remove = ({
  id,
  planets,
}: {
  id: TPlanet["id"];
  planets: Array<TPlanet>;
}) => {
  return planetFilter({ id, planets });
};
