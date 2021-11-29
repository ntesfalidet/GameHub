import './styles/MyGamesItem.css';

// A component for each my game item that is
// rendered in the MyGamesList component
// Nathaniel
export function MyGamesItem({ game }) {
  return (
    <div>
      <div className="myGamesItemContainer">
        {/*A container for holding the game image, title, and published by */}
        <div className="myGamesItemSection1">
          <div className="myGamesItemImage">
            <img src={game.gameImageURL} alt="myGameImage" />
          </div>
          <div className="myGamesItemTitle">
            {game.gameTitle}
          </div>
          <div className="myGamesItemPublishedBy">
            {game.publishedBy}
          </div>
        </div>
        <div className="myGamesItemDescSection">
          {game.gameDesc}
        </div>
        <div className="myGameItemPriceSection">
          ${game.gamePrice}
        </div>
        <div className="deleteMyGameButtonSection">
          <button type="submit" className="btn btn-danger">X</button>
        </div>
      </div>
    </div>
  );
}

export default MyGamesItem;