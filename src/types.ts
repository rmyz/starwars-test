export type TPlanet = {
  id: string;
  name: string;
  diameter: string;
  population: string;
  climates: Array<string>;
  terrains: Array<string>;
  residentConnection?: { residents: Array<TResident> };
};

export type TResident = {
  name: string;
};
