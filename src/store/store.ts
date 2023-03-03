import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { TStatus } from "../pages";
import type { TPlanet } from "../types";

export type TStore = {
  planets: Array<TPlanet>;
  setPlanets: (planets: Array<TPlanet>) => void;
  planetSelected: TPlanet;
  setPlanetSelected: (planet: TPlanet) => void;
  status: TStatus;
  setStatus: (status: TStatus) => void;
  isOpenPlanetModal: boolean;
  setIsOpenPlanetModal: (value: boolean) => void;
  isOpenDeleteAlert: boolean;
  setIsOpenDeleteAlert: (value: boolean) => void;
};

export const useStore = create<TStore>()(
  persist(
    (set) => ({
      planets: [],
      setPlanets: (planets) => set({ planets }),
      planetSelected: {
        id: "",
        name: "",
        residents: "",
        climates: "",
        terrains: "",
        population: "",
        diameter: "",
      },
      setPlanetSelected: (planet) => set({ planetSelected: planet }),
      status: "idle",
      setStatus: (status) => set({ status }),
      isOpenPlanetModal: false,
      setIsOpenPlanetModal: (isOpenPlanetModal) => set({ isOpenPlanetModal }),
      isOpenDeleteAlert: false,
      setIsOpenDeleteAlert: (isOpenDeleteAlert) => set({ isOpenDeleteAlert }),
    }),
    {
      name: "app-storage",
    }
  )
);
