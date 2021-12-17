import React from "react";
import StoreItem from "./StoreItem";
import PropTypes from "prop-types";
import "./styles/StoreList.css";

// Yuanyuan
// Store List
const StoreList = ({ game }) => {
  
  // Shushu Chen: I like that you used a function to render
  // the list of items, which makes the code very clean and
  // easier for debugging and offers room for more components
  // in the future
  const renderStoreGames = () => {
    return game.map((c) => (
      <StoreItem key={`gameID_${c._id}`} game={c}></StoreItem>
    ));
  };

  return (
    <div className="storeList col-md-4 col-sm-6">{renderStoreGames()}</div>
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
