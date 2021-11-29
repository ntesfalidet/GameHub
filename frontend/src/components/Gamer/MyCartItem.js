import React from 'react';
import './styles/MyCartItem.css';

// This is a component for each game item in gamer's cart
// It will be used to render each product
// Yuanyuan
function MyCartItem({ game, cartItemInfo }) {
    let curUser = JSON.parse(sessionStorage.getItem("currUser"));
    console.log("sad", cartItemInfo);
    const deleteButtonHandler = async (event) => {
        const userInfo = {
            gamer: {
                _id: curUser._id,
                userName: curUser.userName,
                role: curUser.role,
            },
            gameInfo: game
        }
        const deleteHandler = await fetch("/api/deleteCartItem", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userInfo),
        });
        if (!deleteHandler.ok) {
            console.log("Response status ", deleteHandler.status);
        } else {
            let deleteItem = await deleteHandler.json();
        }
        cartItemInfo();
    }
    return (
        <div className="card mb-30">
            <div>
                <div class="mainImg"><img src={game.gameImageURL} alt="Game Image" /></div>
            </div>
            <div className="card-body text-center">
                <h4 className="card-title">{game.gameTitle}</h4>
                <h5 className="card-text"><small>price: </small>${game.gamePrice}</h5>
                <h5 className="card-text"><small>published by: </small>{game.publishedBy}</h5>
                <button onClick={() => deleteButtonHandler()} className="btn btn-sm btn-warning float-right">Delete this item</button>
            </div>
        </div>
    );
}

export default MyCartItem;