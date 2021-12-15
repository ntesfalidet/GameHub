import React from "react";
import { useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./styles/RegisterPage.css";

// Registeration Page
// Yuanyuan
const RegisterPage = () => {
  let navigate = useNavigate();

  const userNameRef = useRef();
  const passwordRef = useRef();
  const roleRef = useRef();

  const registerHandler = async (event) => {
    event.preventDefault();
    let userInputData = {
      userName: userNameRef.current.value,
      password: passwordRef.current.value,
      role: roleRef.current.value,
    };

    const newUser = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInputData),
    });

    if (!newUser.ok) {
      console.log("Response status ", newUser.status);
    } else {
      let newUserData = await newUser.json();
      if (newUserData.users.length) {
        console.log("This user already exists");
      } else {
        navigate("/");
      }
    }
  };

  return (
    <div id="registerContainer">
      <div className="row">
        <h1 className="title">Welcome to GameHub</h1>
        <h2 className="title2">Start your Game Journey</h2>
        <div className="col-sm-4 box border registerBox">
          <form id="registerForm" onSubmit={registerHandler}>
            <div className="registerTitle">Register</div>
            <div className="userName">
              <label className="label-of-form">Username</label>
              <input
                className="form-control"
                type="text"
                ref={userNameRef}
                placeholder="Username"
                required
              ></input>
            </div>
            <div className="password">
              <label className="label-of-form">Password</label>
              <input
                className="form-control"
                type="password"
                ref={passwordRef}
                placeholder="Password"
                required
              ></input>
            </div>
            <div className="selectRole">
              <label htmlFor="roleSelectId1" className="selectRole">
                Select a role
              </label>
              <select className="form-select" ref={roleRef} id="roleSelectId1">
                <option>Gamer</option>
                <option>Gaming company</option>
              </select>
            </div>
            <hr />
            <div className="d-grid gap-2 mx-auto center signUpContainer">
              <button type="submit" className="btn btn-primary signUpButton">
                Sign up
              </button>
            </div>
          </form>
          <hr className="registerHR" />
        </div>
        <div className="center loginContainer">
          <Link to="/">
            <button className="btn btn-primary login">
              Login if you have an account
            </button>
          </Link>
        </div>
      </div>
      <div className="footer">
        <div className="center footerSection1">Copyright 2021</div>
        <div className="center footerSection2">
          Designed by Nathaniel & Yuanyuan
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
