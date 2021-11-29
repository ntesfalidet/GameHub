import { useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import './styles/LoginPage.css';

// Login page 
// Nathaniel 
function LoginPage() {
  // Used for navigating to Gamer page or Gaming company page
  let navigate = useNavigate();

  // References to inputs from login form
  const userNameRef = useRef();
  const passwordRef = useRef();
  const roleRef = useRef();

  // Function for handling user login
  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    // User input data from login form
    const userInputData = {
      userName: userNameRef.current.value,
      password: passwordRef.current.value,
      role: roleRef.current.value,
    }

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
        console.log("User does not exist (either incorrect username, password, and/or role credentials)");
      }

      // If there is an existing user 
      else {
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
          console.log("Navigate to Gamer page");
        }

        // If user role is gaming company
        if (usersData[0].role === "Gaming company") {
          // Navigate to Gaming company page
          navigate("/gamingCompany");
        }
      }
    }
  } 

  return (
    <div>
      <h1 className="welcomeTitle">Welcome to GameHub</h1>
      <h2 className="welcomeSubTitle">Bringing gamers and gaming companies together</h2>
      <div className="loginFormContainer">
        <form id="loginForm" onSubmit={handleLoginSubmit}>
          <div className="loginTitle">Login</div>
          <div className="userNameSection">
            <label className="form-label">Username</label>
            <input className="form-control" type="text" ref={userNameRef} 
            placeholder="Enter your username here" required />
          </div>
          <div className="passwordSection">
            <label className="form-label">Password</label>
            <input className="form-control" type="password" ref={passwordRef}
            placeholder="Enter your password here" required />
          </div>
          <div className="roleSection">
            <label htmlFor="roleSelectId">Select a role</label>
            <select defaultValue={"Gamer"} className="form-select" type="form-control" ref={roleRef}
              id="roleSelectId"
            >
              <option>Gamer</option>
              <option>Gaming company</option>  
            </select>
          </div>
          <div className="loginSection">
            <button type="submit" className="btn btn-primary">Sign in</button>
          </div>
        </form>
        <div className="RegisterSection">
            <Link to="/regi"><button type="submit" className="btn btn-primary">Register</button></Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;