import React, { createContext } from "react";
import { useMMKVObject } from "react-native-mmkv";
import { USER_DATA } from "../common";
import { storage } from "../lib/mmkv";

interface UserContextProps {
  user?: User;
  updateUser: (user: User | undefined) => void;
}

const UserContext = createContext<UserContextProps>({
  user: undefined,
  updateUser: () => {},
});

export const UserProvider = ({ children }: React.PropsWithChildren) => {
  const [user, setUser] = useMMKVObject<User | undefined>(USER_DATA, storage);

  return (
    <UserContext.Provider
      value={{
        user: user,
        updateUser: setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
