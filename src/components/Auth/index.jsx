import React, { useState } from "react";
import axios from "axios";
import "./Auth.css";
import { Redirect } from "react-router-dom";
import Cookies from "universal-cookie";

const Auth = ({isAuthenticated, authHandler}) => {
  // states
  const [loginFormShow, setLoginFormShow] = useState(true);

  const cookies = new Cookies();

  const loginHandler = async (event) => {
    event.preventDefault();
    const loginData = {
      username: event.target[0].value,
      password: event.target[1].value,
    };
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/login/",
        loginData
      );
      cookies.set("token", response.data.token);
      authHandler();
    } catch (error) {
      return alert(error.response.data.message);
    }
  };

  const signupHandler = async (event) => {
    event.preventDefault();
    const signupData = {
      username: event.target[0].value,
      email: event.target[1].value,
      password: event.target[2].value,
    };
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/signup/",
        signupData
      );
      cookies.set("token", response.data.token);
      authHandler(); //run after catch()
    } catch (error) {
      return alert(error.response.data.message);
    }
  };


    if (isAuthenticated) {
      return <Redirect to="/todoList" />;
    }
  return (
    <div className="auth">
      <h1 className="title">Log In or Sign Up</h1>
      <div className="auth-container">
        <div className="toggle">
          <h2
            className={loginFormShow ? "active" : ""}
            onClick={() => setLoginFormShow(true) }
          >
            LogIn
          </h2>
          <h2
            className={!loginFormShow ? "active" : ""}
            onClick={() => setLoginFormShow(false) }
          >
            SignUp
          </h2>
        </div>
        {loginFormShow ? (
          <form onSubmit={loginHandler} className="auth-form">
            <input
              className="username-input"
              placeholder="username"
              type="text"
            />
            <input
              className="password-input"
              placeholder="password"
              type="password"
            />
            <button className="submit-btn">Log in</button>
          </form>
        ) : (
          <form onSubmit={signupHandler} className="auth-form">
            <input
              className="username-input"
              placeholder="username"
              type="text"
            />
            <input className="email-input" placeholder="email" type="email" />
            <input
              className="password-input"
              placeholder="password"
              type="password"
            />
            <button className="submit-btn">Register</button>
          </form>
        )}
      </div>
    </div>
  );

}

export default Auth;
