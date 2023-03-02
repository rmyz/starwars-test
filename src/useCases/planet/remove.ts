import type { TProps } from "../../pages";
import type { TPlanet } from "../../types";
import { planetFilter } from "../../utils/planet";

export const remove = ({
  id,
  planets,
}: {
  id: TPlanet["id"];
  planets: TProps["planets"];
}) => {
  return planetFilter({ id, planets });
};
