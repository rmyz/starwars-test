import { createStore } from "zustand";
import { SEARCH_TYPES, TSearch } from "../components/Search/config";
import { SORT_TYPES, TSort } from "../components/Sorter/config";
import type { TStatus } from "../pages";
import type { TPlanet } from "../types";
import { getPlanetImg } from "../utils/getPlanetImg";

export type TStoreProps = {
  planets: Array<TPlanet>;
  planetSelected: TPlanet;
  status: TStatus;
  isOpenPlanetModal: boolean;
  isOpenDeleteAlert: boolean;
  currentPage: number;
  sorter: TSort;
  search: string | null;
  searchCriteria: TSearch;
  backupPlanets: Array<TPlanet>;
};

export type TStore = TStoreProps & {
  setPlanets: (planets: Array<TPlanet>) => void;
  setPlanetSelected: (planet: TPlanet) => void;
  setStatus: (status: TStatus) => void;
  setIsOpenPlanetModal: (value: boolean) => void;
  setIsOpenDeleteAlert: (value: boolean) => void;
  setCurrentPage: (value: number) => void;
  setSorter: (sort: TSort) => void;
  setSearch: (search: string) => void;
  setSearchCriteria: (value: TSearch) => void;
  setBackupPlanets: (planets: Array<TPlanet>) => void;
};

export type TAppStore = ReturnType<typeof createAppStore>;

export const createAppStore = (initProps?: Partial<TStoreProps>) => {
  const DEFAULT_PROPS: TStoreProps = {
    planets: [],
    planetSelected: {
      id: "",
      img: getPlanetImg(),
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
    search: null,
    searchCriteria: SEARCH_TYPES.Name,
    backupPlanets: [],
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
    setSearch: (search) => set({ search }),
    setSearchCriteria: (searchCriteria) => set({ searchCriteria }),
    setBackupPlanets: (backupPlanets) => set({ backupPlanets }),
  }));
};
