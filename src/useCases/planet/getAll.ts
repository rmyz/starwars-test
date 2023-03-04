import { gql } from "graphql-request";
import { swapiClient } from "../../clients/swapi";
import { SORT_TYPES } from "../../components/Sorter/config";
import type { TPlanetRaw } from "../../types";
import { planetFormatter } from "../../utils/planet";
import { sort } from "./sort";

type TGetAllResponse = {
  allPlanets: {
    planets: Array<TPlanetRaw>;
  };
};

export const getAll = async () => {
  const query = gql`
    query allPlanets {
      allPlanets {
        planets {
          id
          name
          climates
          diameter
          population
          terrains
        }
      }
    }
  `;

  try {
    const { allPlanets } = await swapiClient<TGetAllResponse>({ query });
    const planetsFormatted = planetFormatter({ planets: allPlanets.planets });
    const planetsSorted = sort({
      sorter: SORT_TYPES.Name,
      planets: planetsFormatted,
    });

    return { planets: planetsSorted };
  } catch (error) {
    console.error("There has been an error: ", error);

    return { planets: [] };
  }
};
