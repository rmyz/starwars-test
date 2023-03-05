import { SORTER_CRITERIA, TSort } from "../../components/Sorter/config";
import type { TPlanet } from "../../types";

const sortString = ({
  planets,
  sorter,
}: {
  planets: Array<TPlanet>;
  sorter: Lowercase<TSort>;
}) => {
  return planets.sort((a, b) => {
    if (a[sorter] < b[sorter]) {
      return -1;
    }
    if (a[sorter] > b[sorter]) {
      return 1;
    }
    return 0;
  });
};

const sortNumeric = ({
  planets,
  sorter,
}: {
  planets: Array<TPlanet>;
  sorter: Lowercase<TSort>;
}) => {
  return planets.sort((a, b) => {
    const numberFormatted = (value: string) =>
      Number(value.replaceAll(",", ""));

    if (numberFormatted(a[sorter]) < numberFormatted(b[sorter])) {
      return -1;
    }
    if (numberFormatted(a[sorter]) > numberFormatted(b[sorter])) {
      return 1;
    }
    return 0;
  });
};

const sortFuncByCriteria = {
  string: sortString,
  numeric: sortNumeric,
};

export const sort = ({
  sorter,
  planets,
}: {
  sorter: TSort;
  planets: Array<TPlanet>;
}) => {
  const sorterCriteria = SORTER_CRITERIA[sorter];

  const sortFunc = sortFuncByCriteria[sorterCriteria];
  const sorterFormatted = sorter.toLowerCase() as Lowercase<TSort>;
  const copyPlanets = structuredClone(planets);

  return sortFunc({ planets: copyPlanets, sorter: sorterFormatted });
};
