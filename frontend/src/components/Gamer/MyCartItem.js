import React from 'react';
import './styles/MyCartItem.css';

// This is a component for each game item in users cart
// It will be used to render each product on the cart
// Yuanyuan
export function MyCartItem({ game }) {
    return (
        <div className="card" style={{ marginBottom: "10px"}}>
          <div className="card-body">
            <h4 className="card-title">{game.gameTitle}</h4>
            <h5 className="card-text"><small>price: </small>${game.gamePrice}</h5>
            <h5 className="card-text"><small>published by: </small>${game.publishedBy}</h5>
            <button className="btn btn-sm btn-warning float-right" 
                onClick={() => remove(game)}>Remove from cart</button>
          </div>
        </div>
    );
}

export default MyCartItem;