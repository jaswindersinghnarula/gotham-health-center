import { createContext, useState } from "react";

const GlobalContext = createContext({});

export const GlobalProvider = ({ children }) => {
  const [alertMsg, setAlertMsg] = useState({});

  return (
    <GlobalContext.Provider
      value={{
        alertMsg,
        setAlertMsg,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
