import type { TSearch } from "../../components/Search/config";
import type { TPlanet } from "../../types";
import { planetFinder } from "../../utils/planet";

export const search = ({
  value,
  criteria,
  planets,
}: {
  value: string;
  criteria: TSearch;
  planets: Array<TPlanet>;
}) => {
  return planetFinder({ value, criteria, planets });
};
