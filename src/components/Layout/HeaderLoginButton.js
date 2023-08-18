import React, { useContext } from "react";
import classes from "./HeaderLoginButton.module.css";
import { Form, Link, useRouteLoaderData } from "react-router-dom";
import { AuthContext } from "../../store/auth/auth-context";

const HeaderLoginButton = () => {
  const authCtx = useContext(AuthContext);
  const token = useRouteLoaderData("root");

  return (
    <>
      {!authCtx.isLoggin && (
        <Link to="/auth?mode=login" className={classes.button}>
          Login
        </Link>
      )}
      {authCtx.isLoggin && (
        <Form action="/logout" method="post">
          <button onClick={authCtx.onLogout} className={classes.button}>
            Logout
          </button>
        </Form>
      )}
    </>
  );
  // authCtx.isLoggin ? (
  //   <button onClick={authCtx.onLogout} className={classes.button}>Log out</button>
  // ) : (
  //   <Link to="login" className={classes.button}>
  //     Login
  //   </Link>
  // );
};

export default HeaderLoginButton;
