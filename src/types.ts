export type TPlanet = {
  id: string;
  name: string;
  diameter: string;
  population: string;
  climate: Array<string>;
  terrain: Array<string>;
  residentsConnection?: Array<{ residents: TResident }>;
};

export type TResident = {
  name: string;
};
