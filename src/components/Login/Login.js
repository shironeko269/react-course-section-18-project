import React, { useContext, useEffect, useRef } from "react";
import classes from "./Login.module.css";
import { AuthContext } from "../../store/auth/auth-context";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email Required'),
  password: Yup.string().min(6,"Password must longer than 6 character!").required('Password Required')
});

const Login = () => {
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


  // const loginHandler = values  => {
  //   // e.preventDefault();
  //   console.log(values);
  //     authCtx.onLogin(emailInput.current.value)
  //     navigate("/")
  // }

  return (
    <>
      <header className={classes.header}>
        <h1>ReactMeals</h1>
      </header>
      <div className={classes.body}>
      <Formik
       initialValues={{
         email: '',
         password: '',
       }}
       validationSchema={SignupSchema}
       onSubmit={(values) => {
        console.log(values);
        authCtx.onLogin(values.email)
        navigate("/")
       }}
     >
      {({ errors, touched }) => (
        <Form className={classes.form}>
          <div className={classes.group}>
            <label htmlFor="email">Email</label>
            <Field name="email" type="email" />
          </div>
          {errors.email && touched.email ? <div className={classes.error}>{errors.email}</div> : null}
          <div className={classes.group}>
            <label htmlFor="password">Password</label>
            <Field name="password" type="password" />
          </div>
          {errors.password && touched.password ? <div className={classes.error}>{errors.password}</div> : null}
          <button className={classes.button} type="submit">
            Login
          </button>
          <div id="signInDiv"></div>
        </Form>
         )}
        </Formik>
      </div>
    </>
  );
};

export default Login;
