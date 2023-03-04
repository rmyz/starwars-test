export const SORT_TYPES = {
  Name: "Name",
  Diameter: "Diameter",
  Climates: "Climates",
  Terrains: "Terrains",
  Population: "Population",
} as const;

export const SORTER_CRITERIA = {
  Name: "string",
  Diameter: "numeric",
  Climates: "string",
  Terrains: "string",
  Population: "numeric",
} as const;

export type TSort = keyof typeof SORT_TYPES;

export const SORTER_CONFIG = [
  SORT_TYPES.Name,
  SORT_TYPES.Diameter,
  SORT_TYPES.Climates,
  SORT_TYPES.Terrains,
  SORT_TYPES.Population,
];
