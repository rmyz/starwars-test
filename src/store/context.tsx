import { createContext } from "react";
import { createAppStore, TAppStore, TStore, TStoreProps } from "./store";
import { useRef } from "react";

export const AppStoreContext = createContext<TAppStore | null>(null);

type AppProviderProps = React.PropsWithChildren<TStoreProps>;

export function AppProvider({ children, ...props }: AppProviderProps) {
  const storeRef = useRef<TAppStore>();

  if (!storeRef.current) {
    storeRef.current = createAppStore(props);
  }

  return (
    <AppStoreContext.Provider value={storeRef.current}>
      {children}
    </AppStoreContext.Provider>
  );
}
