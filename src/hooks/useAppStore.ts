import { useContext } from "react";
import { useStore } from "zustand";
import { AppStoreContext } from "../store/context";
import type { TStore } from "../store/store";

export default function useAppStore(): TStore {
  const store = useContext(AppStoreContext);

  if (!store) throw new Error("Missing BearContext.Provider in the tree");

  return useStore(store, (s) => s);
}
