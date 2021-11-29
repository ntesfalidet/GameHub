import { useState, useEffect } from "react";
import { StoreGamesItem } from "./StoreGamesItem.js";
import './styles/StoreGamesList.css';

// Store games list component for gaming company
// Nathaniel
export function StoreGamesList() {

  // storeGames state holds the array of games from the store
  // setStoreGames will set the state of storeGames 
  let [storeGames, setStoreGames] = useState([]);

  // Function for loading store games data 
  const loadStoreGamesData = async () => {
    console.log("Getting store games ...");

    // Fetch all store games from /api/getAllStoreGames route 
    // and return the response (as raw data).
    // The response we get are all the store games.
    const storeGamesResRawData = await fetch("/api/getAllStoreGames");

    // If response is not returned successfully
    if (!storeGamesResRawData.ok) {
      console.log("Response status ", storeGamesResRawData.status);
    }

    // If response is returned successfully
    else {
      let storeGamesResData = await storeGamesResRawData.json();

      // An array of store games 
      let storeGamesData = storeGamesResData.storeGames;
      // setMyGames will trigger a re-render of the StoreGamesList
      // component
      setStoreGames(storeGamesData);
    }
  };

  // useEffect for loading store games data and re-rendering StoreGamesList
  // component once.
  // This prevents the StoreGamesList component from loading store games data
  // and re-rendering in a loop.
  useEffect(() => {
    console.log("The effect (loading store games)");
    loadStoreGamesData();
  }, []);

  console.log("render store games list", storeGames);

  return (
    <div>
      <div className="storeGamesListContainer">
        {storeGames.map((game) => <StoreGamesItem key={`gameID_${game._id}`} game={game}></StoreGamesItem>)}
      </div>
    </div>
  );
}

export default StoreGamesList;