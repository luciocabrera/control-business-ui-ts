// context
import { createContext, useContextSelector } from 'use-context-selector';
// react
import { useCallback, useState } from 'react';
// types
import type { UserType } from 'types';
import type { ReactNode } from 'react';

type AuthContextType = {
  setUser: (newUser: UserType) => void;
  user: UserType;
};

const useAuthContext = () => {
  const [user, setUser] = useState<UserType>({ email: '', accessToken: '' });

  return {
    user,
    setUser: useCallback((newUser: UserType) => setUser(newUser), []),
  };
};

const AuthContext = createContext<AuthContextType>({
  user: { email: '', accessToken: '' },

  setUser: (newUser: UserType) => newUser,
});

export const AuthContextProvider = ({ children }: { children: ReactNode }) => (
  <AuthContext.Provider value={useAuthContext()}>{children}</AuthContext.Provider>
);

export const useSetUser = () => useContextSelector(AuthContext, (s) => s.setUser);

export const useUser = () => useContextSelector(AuthContext, (s) => s.user);
