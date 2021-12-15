import MyGamesItem from "./MyGamesItem.js";
import PropTypes from "prop-types";
import "./styles/MyGamesList.css";

// MyGamesList component for MyGames page.
// Takes myGames array and loadMyGamesData function as props
// from MyGames page.
// Nathaniel
const MyGamesList = ({ myGames, loadMyGamesData }) => {
  // Function is responsible for rendering each game from myGames as a list
  const renderMyGames = () => {
    return myGames.map((game) => (
      <MyGamesItem
        key={`gameID_${game._id}`}
        game={game}
        loadMyGamesData={loadMyGamesData}
      ></MyGamesItem>
    ));
  };

  return <div className="myGamesListContainer">{renderMyGames()}</div>;
};

MyGamesList.propTypes = {
  myGames: PropTypes.arrayOf(
    PropTypes.shape({
      gameTitle: PropTypes.string,
      gameImageURL: PropTypes.string,
      gameDesc: PropTypes.string,
      gamePrice: PropTypes.string,
      publishedBy: PropTypes.string,
      _id: PropTypes.string,
    })
  ),
  loadMyGamesData: PropTypes.func,
};

export default MyGamesList;
