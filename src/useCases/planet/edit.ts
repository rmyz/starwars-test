import type { TEditFormValues } from "../../components/EditForm/EditForm";
import type { TPlanet } from "../../types";
import { planetReplacer } from "../../utils/planet";

export const edit = ({
  id,
  values,
  planets,
}: {
  id: TPlanet["id"];
  values: TEditFormValues;
  planets: Array<TPlanet>;
}) => {
  return planetReplacer({ id, values, planets });
};
