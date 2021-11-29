import './styles/StoreGamesItem.css';

// A component for each store game item that is
// rendered in the StoreGamesList component
// Nathaniel
export function StoreGamesItem({ game }) {
  return (
    <div>
      <div className="storeGamesItemContainer">
        {/*A container for holding the game image, title, and published by */}
        <div className="storeGamesItemSection1">
          <div className="storeGamesItemImage">
            <img src={game.gameImageURL} alt="myGameImage" />
          </div>
          <div className="storeGamesItemTitle">
            {game.gameTitle}
          </div>
          <div className="storeGamesItemPublishedBy">
            {game.publishedBy}
          </div>
        </div>
        <div className="storeGamesItemDescSection">
          {game.gameDesc}
        </div>
        <div className="storeGamesItemPriceSection">
          ${game.gamePrice}
        </div>
      </div>
    </div>
  );
}

export default StoreGamesItem;