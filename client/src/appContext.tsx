import { FC, PropsWithChildren, createContext, useState } from "react";

export type AppContextType = {
  maxRows: number;
  setMaxRows: (rows: number) => void;
};

export const AppContext = createContext<AppContextType | null>(null);

export const AppContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [maxRows, setMaxRows] = useState<number>(3);

  return (
    <AppContext.Provider value={{ maxRows, setMaxRows }}>
      {children}
    </AppContext.Provider>
  );
};
