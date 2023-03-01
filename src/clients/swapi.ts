import { request } from "graphql-request";

export const URL = "https://swapi-graphql.netlify.app/.netlify/functions/index";

export async function swapiClient<ResponseType>({
  query,
  variables,
}: {
  query: string;
  variables?: { [key: string]: string };
}) {
  return request<ResponseType>(URL, query, variables);
}
