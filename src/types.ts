export type TPlanetRaw = {
  id: string;
  name: string;
  diameter: string;
  population: string;
  climates: Array<string>;
  terrains: Array<string>;
  residentConnection?: { residents: Array<TResident> };
};

export type TPlanet = {
  id: string;
  name: string;
  diameter: string;
  population: string;
  climates: string;
  terrains: string;
  residents: string;
  img: string;
};

export type TResident = {
  name: string;
};
