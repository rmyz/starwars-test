import { useEffect, useState } from "react";
import { TProps } from "../pages";
import { storage } from "../utils/storage";

export const storeKey = "starwarsState";

export default function useLocalStorageStore(initialState: TProps) {
  const storageState = storage.local.get(storeKey) as TProps;

  const [state, setState] = useState<TProps>(
    storageState ? storageState : initialState
  );

  useEffect(() => {
    if (!storageState) {
      storage.local.set(storeKey, state);
    }
  }, []);

  const decoratedSetState = (newState: TProps) => {
    setState(newState);
    storage.local.set(storeKey, newState);
  };

  const resetState = () => {
    storage.local.remove(storeKey);
  };

  return [state, decoratedSetState, resetState] as const;
}
