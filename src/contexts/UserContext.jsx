import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState("jessjelly");

  return (
    <UserContext.Provider value={{ username }}>{children}</UserContext.Provider>
  );
};
