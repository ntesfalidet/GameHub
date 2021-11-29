import React from "react";
import { Link } from "react-router-dom";
import NavigationComponent from "../../components/Gamer/GamerNavBar";
import './styles/GamerPage.css';

function Gamer() {
  const currUser = JSON.parse(sessionStorage.getItem('currUser'));
  return (
    <div id="GamerPage">
      <NavigationComponent />
        <div className="container center">
          <h1>Welcome, {currUser.role} {currUser.userName}!</h1>
        </div>
        <div className="footer">
            <div className="center">Copyright 2021</div>
            <div className="center">Designed by Nathaniel & Yuanyuan</div>
        </div>
    </div>
  );
}

export default Gamer;