// context
import { createContext, useContextSelector } from 'use-context-selector';
// react
import { useCallback, useState } from 'react';
// types
import type { CountryType } from 'types';
import type { ReactNode } from 'react';

type GlobalContextType = {
  setCountries: (newCountries: CountryType[]) => void;
  countries?: CountryType[];
};

const useGlobalContext = () => {
  const [countries, setCountries] = useState<CountryType[] | undefined>();

  return {
    countries,
    setCountries: useCallback((newCountries: CountryType[]) => setCountries(newCountries), []),
  };
};

const GlobalContext = createContext<GlobalContextType>({
  countries: undefined,

  setCountries: (newCountries: CountryType[]) => newCountries,
});

export const GlobalContextProvider = ({ children }: { children: ReactNode }) => (
  <GlobalContext.Provider value={useGlobalContext()}>{children}</GlobalContext.Provider>
);

export const useSetCountries = () => useContextSelector(GlobalContext, (s) => s.setCountries);

export const useCountries = () => useContextSelector(GlobalContext, (s) => s.countries);
