import React from "react";
import { useState, useEffect } from "react";
import NavigationComponent from "../../components/Gamer/GamerNavBar";
import StoreList from "../../components/Gamer/StoreList";
import './styles/GamerStorePage.css'

// Yuanyuan
// Gamer Store Page
function GamerStorePage() {
    let [storeItem, setStoreItem] = useState([]);
    console.log("gaga", storeItem);
    const getStoreItems = async () => {
        const storeItemsInfo = await fetch("/api/getAllStoreGames");
        if (!storeItemsInfo.ok) {
            console.log("Response status ", storeItemsInfo.status);
        } else {
            let storeResData = await storeItemsInfo.json();
            let storeGamesData = storeResData.storeGames;
            setStoreItem(storeGamesData);
        }
    }
    useEffect(() => {
        getStoreItems();
    }, []);
    return (
        <div id="StoreItems">
            <NavigationComponent />
            <StoreList game={storeItem}></StoreList>
            <div className="footer">
                <div className="center">Copyright 2021</div>
                <div className="center">Designed by Nathaniel & Yuanyuan</div>
            </div>
        </div>
    );
}

export default GamerStorePage;