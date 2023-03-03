import { gql } from "graphql-request";
import { swapiClient } from "../../clients/swapi";
import type { TPlanetRaw } from "../../types";
import { planetFormatter } from "../../utils/planet";

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

    return { planets: planetsFormatted };
  } catch (error) {
    console.error("There has been an error: ", error);

    return { planets: [] };
  }
};
