import { useCallback, useState } from 'react';
import { UserType } from 'types';

type AuthType = {
  setUser: (newUser: UserType) => void;
  user: UserType;
};

export const useAuth = (): AuthType => {
  const [user, setUser] = useState<UserType>({ email: '', accessToken: '' });

  return {
    user,
    setUser: useCallback((newUser: UserType) => setUser(newUser), []),
  };
};
