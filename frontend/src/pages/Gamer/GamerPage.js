import React from "react";
import { Link } from "react-router-dom";
import NavigationComponent from "../../components/Gamer/GamerNavBar";

function Gamer() {
  const currUser = JSON.parse(sessionStorage.getItem('currUser'));
  return (
    <div>
      <NavigationComponent />
        <div className="container">
          <h1>Welcome, {currUser.role} {currUser.userName}!</h1>
        </div>
    </div>
  );
}

export default Gamer;