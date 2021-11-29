import React from "react";
import StoreItem from "./StoreItem";

function StoreList ({ game }) {
    const renderStoreGames = () => {
    return game.map((c) => (
        <StoreItem game={c}></StoreItem>
        ));
    }
  
    return (
      <div className="storeGamesListContainer">
        {renderStoreGames()}
      </div>
    );
}
  
export default StoreList;