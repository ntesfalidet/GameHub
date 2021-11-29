import './styles/StoreItem.css';

function StoreItem ({ game }) {
    let curUser = JSON.parse(sessionStorage.getItem("currUser"));
    const addHandler = async (game) => {
        const addInputData = {
            user : curUser,
            game : game
        }

        const addResult = await fetch("/api/addToCart", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(addInputData),
          });
          if(!addResult.ok){
            console.log("Response status ", addResult.status);
          } else {
            alert('Game added to your cart!');
          }
    }
  return (
    <div className="card mb-30">
            <div>
                <div className="mainImg"><img src={game.gameImageURL} alt="Game Image"/></div>
            </div>
                <div className="card-body text-center">
                    <h4 className="card-title">{game.gameTitle}</h4>
                    <h5 className="card-text"><small>price: </small>${game.gamePrice}</h5>
                    <h5 className="card-text"><small>published by: </small>{game.publishedBy}</h5>
                    <button onClick={()=> addHandler(game)} className="btn btn-sm btn-warning float-right">Add to Cart</button>
            </div>
        </div> 
  );
}

export default StoreItem;