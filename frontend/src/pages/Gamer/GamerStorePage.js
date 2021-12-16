import React from "react";
import { useState, useEffect } from "react";
import NavBarGamer from "../../components/Gamer/NavBarGamer.js";
import StoreList from "../../components/Gamer/StoreList.js";
import "./styles/GamerStorePage.css";

// Yuanyuan
// Gamer Store Page
const GamerStorePage = () => {
    let [storeItem, setStoreItem] = useState([]);
    const getStoreItems = async () => {
        const storeItemsInfo = await fetch("/api/getAllStoreGames");
        if (!storeItemsInfo.ok) {
            console.log("Response status ", storeItemsInfo.status);
        } else {
            let storeResData = await storeItemsInfo.json();
            let storeGamesData = storeResData.storeGames;
            setStoreItem(storeGamesData);
        }
    };
    useEffect(() => {
        getStoreItems();
    }, []);
    return (
        <div id="StoreItems">
            <NavBarGamer />
            <h1 className="gamerStoreListTitle">Gamer Store</h1>
            <div className="gamerStoreListDescription">
                You can browse games and add your favorite games into your cart.
            </div>
            <StoreList game={storeItem}></StoreList>
            <div className="footer storeFooter">
                <div className="center">Copyright 2021</div>
                <div className="center">Designed by Nathaniel & Yuanyuan</div>
            </div>
        </div>
    );
};

export default GamerStorePage;
