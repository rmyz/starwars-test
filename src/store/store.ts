import { createStore } from "zustand";
import { SORT_TYPES, TSort } from "../components/Sorter/config";
import type { TStatus } from "../pages";
import type { TPlanet } from "../types";
import { sort } from "../useCases/planet/sort";

export type TStoreProps = {
  planets: Array<TPlanet>;
  planetSelected: TPlanet;
  status: TStatus;
  isOpenPlanetModal: boolean;
  isOpenDeleteAlert: boolean;
  currentPage: number;
  sorter: TSort;
};

export type TStore = TStoreProps & {
  setPlanets: (planets: Array<TPlanet>) => void;
  setPlanetSelected: (planet: TPlanet) => void;
  setStatus: (status: TStatus) => void;
  setIsOpenPlanetModal: (value: boolean) => void;
  setIsOpenDeleteAlert: (value: boolean) => void;
  setCurrentPage: (value: number) => void;
  setSorter: (sort: TSort) => void;
};

export type TAppStore = ReturnType<typeof createAppStore>;

export const createAppStore = (initProps?: Partial<TStoreProps>) => {
  const DEFAULT_PROPS: TStoreProps = {
    planets: [],
    planetSelected: {
      id: "",
      name: "",
      residents: "",
      climates: "",
      terrains: "",
      population: "",
      diameter: "",
    },
    status: "idle",
    isOpenPlanetModal: false,
    isOpenDeleteAlert: false,
    currentPage: 0,
    sorter: SORT_TYPES.Name,
  };

  return createStore<TStore>((set, get) => ({
    ...DEFAULT_PROPS,
    ...initProps,
    setPlanets: (planets) => set({ planets }),
    setPlanetSelected: (planet) => set({ planetSelected: planet }),
    setStatus: (status) => set({ status }),
    setIsOpenPlanetModal: (isOpenPlanetModal) => set({ isOpenPlanetModal }),
    setIsOpenDeleteAlert: (isOpenDeleteAlert) => set({ isOpenDeleteAlert }),
    setCurrentPage: (currentPage) => set({ currentPage }),
    setSorter: (sorter) => set({ sorter }),
  }));
};
