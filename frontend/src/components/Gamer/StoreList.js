import React from "react";
import StoreItem from "./StoreItem";
import PropTypes from "prop-types";
import "./styles/StoreList.css";

// Yuanyuan
// Store List
const StoreList = ({ game }) => {
  const renderStoreGames = () => {
    return game.map((c) => (
      <StoreItem key={`gameID_${c._id}`} game={c}></StoreItem>
    ));
  };

  return (
    <div className="gamerStoreList">
      <h1 className="gamerStoreListTitle">Gamer Store</h1>
      <div className="gamerStoreListDescription">
        You can browse games and add your favorite games into your cart.
      </div>
      <div className="storeList">{renderStoreGames()}</div>
    </div>
    
  );
};

StoreList.propTypes = {
  game: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      gameTitle: PropTypes.string,
      gameImageURL: PropTypes.string,
      gameDesc: PropTypes.string,
      gamePrice: PropTypes.string,
      publishedBy: PropTypes.string,
    })
  ),
};

export default StoreList;
