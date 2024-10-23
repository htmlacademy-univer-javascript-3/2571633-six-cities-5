import { createContext, useMemo, useState,FC } from 'react';
import { UserData, UserDataContext } from '../interfaces';
import { WithChildren } from '../../../shared/interfaces';

const defaultUserDataValue = {
  logged: false,
};

const defaultContextValue: UserDataContext = {
  user: defaultUserDataValue,
  logout: () => {},
  login: () => false,
};

export const UserContext = createContext<UserDataContext>(defaultContextValue);

export const UserContextProvider:FC<WithChildren> = ({ children }) => {
  const [userData, setUserData] = useState<UserData>(defaultUserDataValue);

  const logout = () => setUserData(defaultUserDataValue);
  const login: UserDataContext['login'] = (email, password) => {
    if (password === '123456') {
      setUserData({
        logged: true,
        email,
      });
      return true;
    }

    return false;
  };

  const contextValue = useMemo(
    () => ({
      user: userData,
      logout,
      login,
    }),
    [userData],
  );

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
