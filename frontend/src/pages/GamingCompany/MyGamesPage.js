import { useRef } from "react";
import { MyGamesList } from "../../components/GamingCompany/MyGamesList.js";
import "./styles/MyGamesPage.css";

// Gaming company personal page
// Nathaniel
function MyGamesPage() {
  // Current user data (gaming company)
  let currUserData = sessionStorage.getItem("currUser");
  currUserData = JSON.parse(currUserData);

  // References to input from publish game form 
  const gameTitleRef = useRef();
  const gameImageURLRef = useRef();
  const gameDescRef = useRef();
  const gamePriceRef = useRef();

  // Function for handling user login
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
      }
    }

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
  }

  return (
    <div>
      <div className="publishGameFormContainer">
        <form id="publishGameForm" onSubmit={handlePublishGameSubmit}>
          <div className="publishGameFormTitle">Publish your game</div>
          <div className="publishGameFormSection1">
            <div className="gameTitle">
              <label className="form-label">Game Title</label>
              <input className="form-control" type="text" ref={gameTitleRef}
              placeholder="Enter game title here" required />
            </div>
            <div className="gameImage">
              <label className="form-label">Game Image</label>
              <input className="form-control" type="text" ref={gameImageURLRef} 
              placeholder="Enter game image URL here" required />
            </div>
          </div>
          <div className="publishGameFormSection2">
            <div className="gameDescription">
              <label className="form-label">Game Description</label>
              <textarea className="form-control" cols="25" rows="2" ref={gameDescRef} 
                placeholder="Enter game description here" required
              ></textarea>
            </div>
            <div className="gamePrice">
              <label className="form-label">Game Price</label>
              <input className="form-control" type="text" ref={gamePriceRef} 
              placeholder="Enter game price here" required />
            </div>
          </div>
          <div className="publishGameSection">
            <button type="submit" className="btn btn-success">Publish game</button>
          </div>
        </form>
      </div>
      <h2 className="myGamesTitle">My Games</h2>
      <MyGamesList></MyGamesList>
    </div>
  );
}

export default MyGamesPage;