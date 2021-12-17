import React from "react";
import PropTypes from "prop-types";
import "./styles/MyCartItem.css";

// This is a component for each game item in gamer's cart
// It will be used to render each product
// Yuanyuan
const MyCartItem = ({ game, getCartItems }) => {
    let curUser = JSON.parse(sessionStorage.getItem("currUser"));
    const deleteButtonHandler = async (event) => {
        // Shushu Chen: how about naming userInfo as cartInfo
        // since it contains both user info and game info objects?
        const userInfo = {
            gamer: {
                _id: curUser._id,
                userName: curUser.userName,
                role: curUser.role,
            },
            gameInfo: game,
        };
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
            
            // Shushu Chen: I like that you used an alert to let
            // user know that the deletion is successful
            alert("You have removed the item successfully!");
        }
        getCartItems();
    };
    return (
        <div className="card mb-30">
            <div>
                <div className="mainImg">
                    <img src={game.gameImageURL} alt="cartGameImg" />
                </div>
            </div>
            <div className="card-body text-center">
                <h4 className="card-title">{game.gameTitle}</h4>
                <h5 className="card-text">
                    <small>price: </small>${game.gamePrice}
                </h5>
                <h5 className="card-text">
                    <small>published by: </small>
                    {game.publishedBy}
                </h5>
                <button
                    onClick={() => deleteButtonHandler()}
                    className="btn btn-sm btn-warning float-right"
                >
                    Delete this item
                </button>
            </div>
        </div>
    );
};

MyCartItem.propTypes = {
    game: PropTypes.shape({
        _id: PropTypes.string,
        gameTitle: PropTypes.string,
        gameImageURL: PropTypes.string,
        gameDesc: PropTypes.string,
        gamePrice: PropTypes.string,
        publishedBy: PropTypes.string,
    }),
    getCartItems: PropTypes.func,
};

export default MyCartItem;
