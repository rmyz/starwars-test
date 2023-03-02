import { gql } from "graphql-request";
import { swapiClient } from "../../clients/swapi";
import { TPlanet } from "../../types";

export type TGetByIdResponse = {
  planet: TPlanet;
};

export const getById = async ({ id }: Pick<TPlanet, "id">) => {
  const query = gql`
    query Planet($planetId: ID) {
      planet(id: $planetId) {
        id
        name
        climates
        diameter
        population
        terrains
        residentConnection {
          residents {
            name
          }
        }
      }
    }
  `;

  const variables = { planetId: id };

  try {
    const { planet } = await swapiClient<TGetByIdResponse>({
      query,
      variables,
    });

    return planet;
  } catch (error) {
    console.error("There has been an error: ", error);

    return null;
  }
};
