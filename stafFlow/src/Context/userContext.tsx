import React, {
  createContext,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";

interface User {
  id: string;
  username: string;
  email: string;
  role: "admin" | "user";
  status: boolean;
}

interface userContextType {
  user:User|undefined,
  setuser: Dispatch<SetStateAction<User|undefined>>;
}

export const userContext = createContext<userContextType | null>(null);

export const ContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setuser] = useState<User|undefined>(undefined);

  return (
    <userContext.Provider value={{ user:user, setuser }}>
      {children}
    </userContext.Provider>
  );
};

