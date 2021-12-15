import PropTypes from "prop-types";
import "./styles/MyGamesItem.css";

// MyGamesItem component for each game from
// the MyGamesList component.
// Takes game object and loadMyGamesData function as props
// from MyGamesList component.
// Nathaniel
const MyGamesItem = ({ game, loadMyGamesData }) => {
  // Current user data (gaming company)
  let currUserData = sessionStorage.getItem("currUser");
  currUserData = JSON.parse(currUserData);

  // Function for handling deleting a gaming company's game.
  // Deleting a gaming company's game will also remove the game
  // from the game store.
  const handleDeleteMyGame = async (event) => {
    event.preventDefault();

    // Input data holds data for game to delete
    // and current gaming company user.
    // gamingCompanyUser is used for querying purposes when deleting
    // a game from gaming company's my games and gameInputData is used for
    // adding a game to gaming company's my games and game store.
    const inputData = {
      gamingCompanyUser: {
        _id: currUserData._id,
        userName: currUserData.userName,
        role: currUserData.role,
      },
      gameInputData: game,
    };

    // Send input data to /api/deleteMyGame route and
    // return the response (as raw data) from backend after
    // deleting gameInputData from gamestore collection
    // and from the current gaming company's my games
    const delGameResRawData = await fetch("/api/deleteMyGame", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputData),
    });

    // If response is not returned successfully
    if (!delGameResRawData.ok) {
      console.log("Response status ", delGameResRawData.status);
    }

    // If response is returned successfully
    else {
      let delGameResData = await delGameResRawData.json();
      console.log(delGameResData.message);
    }

    // load my games and re-render list of my games after deleting
    // a game
    loadMyGamesData();
  };

  return (
    <div>
      <div className="myGamesItemContainer">
        {/*A container for holding the game image, title, and published by */}
        <div className="myGamesItemSection1">
          <div className="myGamesItemImage">
            <img src={game.gameImageURL} alt="myGameImage" />
          </div>
          <div className="myGamesItemTitle">{game.gameTitle}</div>
          <div className="myGamesItemPublishedBy">{game.publishedBy}</div>
        </div>
        <div className="myGamesItemDescSection">{game.gameDesc}</div>
        <div className="myGameItemPriceSection">${game.gamePrice}</div>
        <div className="deleteMyGameButtonSection">
          <button onClick={handleDeleteMyGame} className="btn btn-danger">
            X
          </button>
        </div>
      </div>
    </div>
  );
};

MyGamesItem.propTypes = {
  game: PropTypes.shape({
    gameTitle: PropTypes.string,
    gameImageURL: PropTypes.string,
    gameDesc: PropTypes.string,
    gamePrice: PropTypes.string,
    publishedBy: PropTypes.string,
    _id: PropTypes.string,
  }),
  loadMyGamesData: PropTypes.func,
};

export default MyGamesItem;
