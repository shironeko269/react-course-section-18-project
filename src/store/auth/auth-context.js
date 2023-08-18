import React, { useState } from "react";

export const AuthContext = React.createContext({
  user: "",
  isLoggin: false,
  onLogin: () => {},
  onLogout: () => {},
});

const AuthenProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState();
  const [user , setUser] = useState();

  const loginHandler = (userlogin) => {
    setIsLogin((prev) => !prev);
    setUser(userlogin);
  };

  const logoutHandler = () => {
    setIsLogin((prev) => !prev);
    setUser("");
  };

  const auth = {
    isLoggin: isLogin,
    onLogin: loginHandler,
    onLogout: logoutHandler,
    user: user
  };

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export default AuthenProvider;
