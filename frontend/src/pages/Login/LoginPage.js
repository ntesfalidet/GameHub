import { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./styles/LoginPage.css";

// Login page
// Nathaniel
const LoginPage = () => {
  // Used for navigating to Gamer page or Gaming company page
  let navigate = useNavigate();

  // References to inputs from login form
  const userNameRef = useRef();
  const passwordRef = useRef();
  const roleRef = useRef();

  // Handles setting the state of login error when users
  // (gamer or gaming company) log in
  let [loginError, setLoginError] = useState("");

  // Function for handling user login
  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    // User input data from login form
    const userInputData = {
      userName: userNameRef.current.value,
      password: passwordRef.current.value,
      role: roleRef.current.value,
    };

    // Send user input data to /api/loginUser route and
    // return the response (as raw data) from backend when finding
    // an existing user upon login (with matching userName, password,
    // and role).
    const userResRawData = await fetch("/api/loginUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInputData),
    });

    // If response is not returned successfully
    if (!userResRawData.ok) {
      console.log("Response status ", userResRawData.status);
    }

    // If response is returned successfully
    else {
      let userResData = await userResRawData.json();
      // Array of found users that match userName, password, and role
      // The array should only contain one user object if an existing
      // user is found from user input data or no user objects if
      // no existing user is found from user input data
      let usersData = userResData.users;

      // If there is no existing user we want to render login error (via useState)
      if (!usersData.length) {
        setLoginError(
          "User does not exist (either incorrect username, password, and/or role credentials)"
        );
      }

      // If there is an existing user
      else {
        setLoginError("");

        // Store specific user attributes (_id, userName, and role) for current
        // logged in user using sessionStorage
        let currUser = {
          _id: usersData[0]._id,
          userName: usersData[0].userName,
          role: usersData[0].role,
        };

        sessionStorage.setItem("currUser", JSON.stringify(currUser));

        // If user role is gamer
        if (usersData[0].role === "Gamer") {
          // Navigate to Gamer page
          //console.log("Navigate to Gamer page");
          navigate("/gamer");
        }

        // If user role is gaming company
        if (usersData[0].role === "Gaming company") {
          // Navigate to Gaming company page
          navigate("/gamingCompany");
        }
      }
    }
  };

  return (
    <div id="loginContainer">
      <div className="row">
        <h1 className="welcomeTitle1">Welcome to GameHub</h1>
        <h2 className="welcomeTitle2">
          Bringing gamers and gaming companies together
        </h2>
        <div className="col-sm-4 box border loginBox">
          <form id="loginForm" onSubmit={handleLoginSubmit}>
            <div className="loginTitle">Login</div>
            <div className="loginError">{loginError}</div>
            <div className="userNameSection">
              <label className="form-label">Username</label>
              <input
                className="form-control"
                type="text"
                ref={userNameRef}
                placeholder="Username"
                required
              />
            </div>
            <div className="passwordSection">
              <label className="form-label">Password</label>
              <input
                className="form-control"
                type="password"
                ref={passwordRef}
                placeholder="Password"
                required
              />
            </div>
            <div className="roleSection">
              <label htmlFor="roleSelectId">Select a role</label>
              <select
                defaultValue={"Gamer"}
                className="form-select"
                type="form-control"
                ref={roleRef}
                id="roleSelectId"
              >
                <option>Gamer</option>
                <option>Gaming company</option>
              </select>
            </div>
            <hr />
            <div className="d-grid gap-2 mx-auto center loginSection">
              <button type="submit" className="btn btn-primary signInButton">
                Sign in
              </button>
            </div>
          </form>
          <hr className="loginHR" />
        </div>
        <div className="center navToRegisterSection">
          <Link to="/register">
            <button className="btn btn-primary register">
              Register if you don't have an account
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

export default LoginPage;
