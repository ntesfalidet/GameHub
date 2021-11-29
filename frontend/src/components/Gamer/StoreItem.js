// import './styles/StoreItem.css';

function StoreItem ({ game }) {
    let curUser = JSON.parse(sessionStorage.getItem("currUser"));
    const addHandler = async (event) => {
        event.preventDefault();
    }
  return (
    <div className="card mb-30">
            <div>
                <div class="mainImg"><img src={game.gameImageURL} alt="Game Image"/></div>
            </div>
                <div className="card-body text-center">
                    <h4 className="card-title">{game.gameTitle}</h4>
                    <h5 className="card-text"><small>price: </small>${game.gamePrice}</h5>
                    <h5 className="card-text"><small>published by: </small>{game.publishedBy}</h5>
                    <button onClick={addHandler} className="btn btn-sm btn-warning float-right">Add to Cart</button>
            </div>
        </div> 
  );
}

export default StoreItem;