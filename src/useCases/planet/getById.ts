import { gql } from "graphql-request";
import { swapiClient } from "../../clients/swapi";
import type { TPlanet, TPlanetRaw } from "../../types";
import { planetFormatter } from "../../utils/planet";

export type TGetByIdResponse = {
  planet: TPlanetRaw;
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
    const [planetFormatted] = planetFormatter({ planets: [planet] });

    return planetFormatted;
  } catch (error) {
    console.error("There has been an error: ", error);

    return null;
  }
};
