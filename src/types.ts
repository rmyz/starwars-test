export type TPlanet = {
  id: string;
  name: string;
  diameter: string;
  population: string;
  climates: Array<string>;
  terrains: Array<string>;
  residentsConnection?: Array<{ residents: TResident }>;
};

export type TResident = {
  name: string;
};
