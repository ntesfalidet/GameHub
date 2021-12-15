import React from "react";
import PropTypes from "prop-types";
import "./styles/MyCartItem.css";

// This is a component for each game item in gamer's cart
// It will be used to render each product
// Yuanyuan
const MyCartItem = ({ game, getCartItems }) => {
    let curUser = JSON.parse(sessionStorage.getItem("currUser"));
    const deleteButtonHandler = async (event) => {
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
            alert("You have removed the item successfully!");
        }
        getCartItems();
    };
    return (
        <div className="gamerCartItemContainer">
            <div className="gamerCartItemSection1">
                <div className="cartMainImg">
                    <img src={game.gameImageURL} alt="cartGameImg" />
                </div>
                <div className="gamerCartItemTitle">{game.gameTitle}</div>
                <div className="gamerCartItemPublishedBy">{game.publishedBy}</div>
            </div>
            <div className="gamerCartItemPrice">{game.gamePrice}</div>
            <div className="gamerCartItemDescription">{game.gameDesc}</div>
            <button onClick={() => deleteButtonHandler()} className="btn btn-sm btn-warning float-right">
                Delete this item
            </button>
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
