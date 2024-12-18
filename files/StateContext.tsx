import React, { createContext, useContext, useState } from "react";
import { useAsyncStorage } from "./useAsyncStorage";

type StateContextType = {
  savedCoffees: Record<string, string>[];
  setSavedCoffees: React.Dispatch<React.SetStateAction<Record<string, string>[]>>;
  savedEquipment: Record<string, string>[];
  setSavedEquipment: React.Dispatch<React.SetStateAction<Record<string, string>[]>>;
  brewNotes: Record<string, any>[];
  setBrewNotes: React.Dispatch<React.SetStateAction<Record<string, any>[]>>;
};

const StateContext = createContext<StateContextType | undefined>(undefined);

export const StateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [savedCoffees, setSavedCoffees] = useAsyncStorage<Record<string, string>[]>("coffees", []);
  const [savedEquipment, setSavedEquipment] = useAsyncStorage<Record<string, string>[]>("equipment", []);
  const [brewNotes, setBrewNotes] = useAsyncStorage<Record<string, any>[]>("brewNotes", []);

  return (
    <StateContext.Provider value={{ savedCoffees, setSavedCoffees, savedEquipment, setSavedEquipment, brewNotes, setBrewNotes }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error("useStateContext must be used within a StateProvider");
  }
  return context;
};
