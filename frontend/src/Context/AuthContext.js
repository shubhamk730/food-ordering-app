import React, { useContext, useState } from "react";

const authContext = React.createContext({});

const AuthContextProvider = (props) => {
  const [token, setToken] = useState(null);

  const Login = (authToken, username, email) => {
    setToken(authToken);
    const userInfo = JSON.stringify({
      email: email,
      token: authToken,
      username: username,
    });
    localStorage.setItem("userInfo", userInfo);
  };

  const Logout = () => {
    localStorage.removeItem("userInfo");
    localStorage.setItem("userCart", []);
    setToken(null);
  };

  const isLoggedin = () => {
    if (localStorage.getItem("userInfo") == null) return false;
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    return userInfo.token ? true : false;
  };

  const getToken = () => {
    if (localStorage.getItem("userInfo") == null) return false;
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    return userInfo.token;
  };

  return (
    <authContext.Provider
      value={{ Login, Logout, token, isLoggedin, getToken }}
    >
      {props.children}
    </authContext.Provider>
  );
};

export const AuthContext = () => {
  return useContext(authContext);
};

export default AuthContextProvider;
