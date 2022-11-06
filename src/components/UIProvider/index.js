import { createContext } from "react";

export const UIContext = createContext({});

export const UIProvider = ({ value, children }) => (
  <UIContext.Provider value={value}>{children}</UIContext.Provider>
);
