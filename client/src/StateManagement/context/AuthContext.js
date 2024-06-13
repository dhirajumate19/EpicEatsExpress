import React, { createContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [openAuth, setOpenAuth] = useState(false);
  return (
    <AuthContext.Provider value={{ openAuth, setOpenAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
