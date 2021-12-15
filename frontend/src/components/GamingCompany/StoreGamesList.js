import StoreGamesItem from "./StoreGamesItem.js";
import PropTypes from "prop-types";
import "./styles/StoreGamesList.css";

// StoreGamesList component for the gaming company's store page.
// Takes storeGames array as props from the gaming company's
// store page (GamingCompanyStorePage).
// Nathaniel
const StoreGamesList = ({ storeGames }) => {
  // Function is responsible for rendering each store game from storeGames as a list
  const renderStoreGames = () => {
    return storeGames.map((game) => (
      <StoreGamesItem key={`gameID_${game._id}`} game={game}></StoreGamesItem>
    ));
  };

  return <div className="storeGamesListContainer">{renderStoreGames()}</div>;
};

StoreGamesList.propTypes = {
  storeGames: PropTypes.arrayOf(
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

export default StoreGamesList;
