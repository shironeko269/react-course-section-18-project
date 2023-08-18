import React, { useContext, useEffect, useRef } from "react";
import classes from "./Login.module.css";
import { AuthContext } from "../../store/auth/auth-context";
import { Navigate, redirect, useActionData, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

const Login = () => {
  const emailInput = useRef();
  const passwordInput = useRef();
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate()
  // const data = useActionData();

  function handleCallbackRespone(respone) {
    console.log("Encoded JWT ID token: " + respone.credential);
    var userObject = jwtDecode(respone.credential);
    console.log(userObject);
    authCtx.onLogin(userObject.name)
      navigate("/")
    document.getElementById("signInDiv").hidden = true;
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "333398512456-k212etq17ie55060gm4do95cghks1l09.apps.googleusercontent.com",
      callback: handleCallbackRespone,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
      width: 300,
    });
    google.accounts.id.prompt();
  }, []);


  const loginHandler = e => {
    e.preventDefault();
    if (emailInput.current.value.trim() !== "" && passwordInput.current.value.trim() !== "") {
      authCtx.onLogin(emailInput.current.value)
      navigate("/")
    }
  }

  return (
    <>
      <header className={classes.header}>
        <h1>ReactMeals</h1>
      </header>
      <div className={classes.body}>
        <form onSubmit={loginHandler} className={classes.form}>
          <div className={classes.group}>
            <label htmlFor="email">Email</label>
            <input ref={emailInput} id="email" type="text"></input>
          </div>
          <div className={classes.group}>
            <label htmlFor="Password">Password</label>
            <input ref={passwordInput} id="Password" type="password"></input>
          </div>
          {/* {data && data.errors && (
            <ul>
              {Object.values(data.errors).map((err) => (
                <li className={classes.error} key={err}>{err}</li>
              ))}
            </ul>
          )}
          {data && data.message && <p className={classes.error} >{data.message}</p>} */}
          <button className={classes.button} type="submit">
            Login
          </button>
          <div id="signInDiv"></div>
        </form>
      </div>
    </>
  );
};

export default Login;
