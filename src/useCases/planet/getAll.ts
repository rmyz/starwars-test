import { gql } from "graphql-request";
import { swapiClient } from "../../clients/swapi";
import { TPlanet } from "../../types";

type TGetAllResponse = {
  allPlanets: {
    totalCount: number;
    planets: Array<TPlanet>;
  };
};

export const getAll = async () => {
  const query = gql`
    query allPlanets {
      allPlanets {
        totalCount
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

    return allPlanets;
  } catch (error) {
    console.error("There has been an error: ", error);

    return { planets: [], totalCount: 0 };
  }
};
