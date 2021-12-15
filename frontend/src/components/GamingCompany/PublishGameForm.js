import { useRef } from "react";
import PropTypes from "prop-types";
import "./styles/PublishGameForm.css";

// Publish game form component for MyGames page.
// Takes loadMyGamesData function as props from MyGames page.
// Nathaniel
const PublishGameForm = ({ loadMyGamesData }) => {
  // Current user data (gaming company)
  let currUserData = sessionStorage.getItem("currUser");
  currUserData = JSON.parse(currUserData);

  // References to input from publish game form
  let gameTitleRef = useRef();
  let gameImageURLRef = useRef();
  let gameDescRef = useRef();
  let gamePriceRef = useRef();

  // Function for handling publishing a game.
  // When a gaming company publishes a game, the game gets published to
  // the game store and is inserted the gaming company's my games list.
  const handlePublishGameSubmit = async (event) => {
    event.preventDefault();

    // Input data holds data for game to publish (from publish game form)
    // and current gaming company user.
    // gamingCompanyUser is used for querying purposes when adding
    // a game to gaming company's my games and gameInputData is used for
    // adding a game to gaming company's my games and game store.
    const inputData = {
      gamingCompanyUser: {
        _id: currUserData._id,
        userName: currUserData.userName,
        role: currUserData.role,
      },
      gameInputData: {
        gameTitle: gameTitleRef.current.value,
        gameImageURL: gameImageURLRef.current.value,
        gameDesc: gameDescRef.current.value,
        gamePrice: gamePriceRef.current.value,
        publishedBy: currUserData.userName,
      },
    };

    // Reset form fields
    gameTitleRef.current.value = "";
    gameImageURLRef.current.value = "";
    gameDescRef.current.value = "";
    gamePriceRef.current.value = "";

    // Send input data to /api/publishGame route and
    // return the response (as raw data) from backend after
    // adding gameInputData to gamestore collection
    // and to the current gaming company's my games
    const publishGameResRawData = await fetch("/api/publishGame", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputData),
    });

    // If response is not returned successfully
    if (!publishGameResRawData.ok) {
      console.log("Response status ", publishGameResRawData.status);
    }

    // If response is returned successfully
    else {
      let publishGameResData = await publishGameResRawData.json();
      console.log(publishGameResData.message);
    }

    // load my games and re-render list of my games after publishing
    // a game
    loadMyGamesData();
  };

  return (
    <div className="publishGameFormContainer">
      <form id="publishGameForm" onSubmit={handlePublishGameSubmit}>
        <div className="publishGameFormTitle">Publish your game</div>
        <div className="publishGameFormSection1">
          <div className="gameTitle">
            <label className="form-label">Game Title</label>
            <input
              className="form-control"
              type="text"
              ref={gameTitleRef}
              placeholder="Enter game title here"
              required
            />
          </div>
          <div className="gameImage">
            <label className="form-label">Game Image</label>
            <input
              className="form-control"
              type="text"
              ref={gameImageURLRef}
              placeholder="Enter game image URL here"
              required
            />
          </div>
        </div>
        <div className="publishGameFormSection2">
          <div className="gameDescription">
            <label className="form-label">Game Description</label>
            <textarea
              className="form-control"
              cols="25"
              rows="2"
              ref={gameDescRef}
              placeholder="Enter game description here"
              required
            ></textarea>
          </div>
          <div className="gamePrice">
            <label className="form-label">Game Price</label>
            <input
              className="form-control"
              type="text"
              ref={gamePriceRef}
              placeholder="Enter game price here"
              required
            />
          </div>
        </div>
        <div className="publishGameSection">
          <button type="submit" className="btn btn-success">
            Publish game
          </button>
        </div>
      </form>
    </div>
  );
};

PublishGameForm.propTypes = {
  loadMyGamesData: PropTypes.func,
};

export default PublishGameForm;
