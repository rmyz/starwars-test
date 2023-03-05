export const SEARCH_TYPES = {
  Id: "Id",
  Name: "Name",
  Climates: "Climates",
  Terrains: "Terrains",
} as const;

export type TSearch = keyof typeof SEARCH_TYPES;

export const SORTER_CONFIG = [
  SEARCH_TYPES.Name,
  SEARCH_TYPES.Climates,
  SEARCH_TYPES.Terrains,
];
