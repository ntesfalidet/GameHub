import { useState, useEffect } from "react";
import { MyGamesItem } from "./MyGamesItem.js";
import './styles/MyGamesList.css';

// MyGamesList component for gaming company
// Nathaniel
export function MyGamesList() {
  let currUserData = sessionStorage.getItem("currUser");
  currUserData = JSON.parse(currUserData);
  console.log(currUserData);

  // myGames state holds the array of my games for a gaming company
  // setMyGames will set the state of myGames 
  let [myGames, setMyGames] = useState([]);

  // Function for loading my games data for a gaming company user
  const loadMyGamesData = async () => {
    console.log("Getting my games ...");

    // Send gaming company user data to /api/getMyGames route and
    // return the response (as raw data).
    // The response we get is the gaming company's games
    const gamingCompanyUser = {
        userName: currUserData.userName,
        role: currUserData.role,
    };

    const myGamesResRawData = await fetch("/api/getMyGames", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(gamingCompanyUser),
    });

    // If response is not returned successfully
    if (!myGamesResRawData.ok) {
      console.log("Response status ", myGamesResRawData.status);
    }

    // If response is returned successfully
    else {
      let myGamesResData = await myGamesResRawData.json();

      // An array of the current gaming company's games
      let myGamesData = myGamesResData.myGames;
      // setMyGames will trigger a re render of the MyGamesList
      // component
      setMyGames(myGamesData);
    }
  };

  // useEffect for loading my games data and re-rendering MyGamesList
  // component once.
  // This prevents the MyGamesList component from loading store games data
  // and re-rendering in a loop.
  useEffect(() => {
    console.log("The effect (loading my games)");
    loadMyGamesData();
  }, []);

  console.log("render my games list", myGames)

  return (
    <div>
      <div className="myGamesListContainer">
        {myGames.map((game) => <MyGamesItem key={`gameID_${game._id}`} game={game}></MyGamesItem>)}
      </div>
    </div>
  );
}

export default MyGamesList;