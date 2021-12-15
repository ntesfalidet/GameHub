import "./styles/StoreItem.css";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";

// Yuanyuan
// Store item
const StoreItem = ({ game }) => {
  let curUser = JSON.parse(sessionStorage.getItem("currUser"));
  const addHandler = async (game) => {
    // Update id for game item
    game._id = game._id + "_" + uuidv4();

    const addInputData = {
      user: curUser,
      game: game,
    };

    const addResult = await fetch("/api/addToCart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addInputData),
    });
    if (!addResult.ok) {
      console.log("Response status ", addResult.status);
    } else {
      alert("Game added to your cart!");
    }
  };
  return (
    <div className="gamerStoreItemsContainer">
      <div className="gamerStoreItemSection1">
        <div className="mainImg">
          <img src={game.gameImageURL} alt="Game Image" />
        </div>
        <div className="gamerStoreItemTitle">{game.gameTitle}</div>
        <div className="gamerStoreItemPublishedBy">{game.publishedBy}</div>
      </div>
      <div className="gamerStoreItemPrice">{game.gamePrice}</div>
      <div className="gamerStoreItemDescription">{game.gameDesc}</div>
      <button onClick={() => addHandler(game)} className="btn btn-warning">
        Add to Cart
      </button>
    </div>

  );
};

StoreItem.propTypes = {
  game: PropTypes.shape({
    _id: PropTypes.string,
    gameTitle: PropTypes.string,
    gameImageURL: PropTypes.string,
    gameDesc: PropTypes.string,
    gamePrice: PropTypes.string,
    publishedBy: PropTypes.string,
  }),
};

export default StoreItem;
