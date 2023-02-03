import { createContext, useState } from "react";

export const UserContext = createContext(
  {} as {
    userInfo: {
      email: string;
      password: string;
    };
    setUserInfo: React.Dispatch<React.SetStateAction<any>>;
  }
);

export const UserProvider = (props: any) => {
  const { children } = props;
  const [userInfo, setUserInfo] = useState();
  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};
