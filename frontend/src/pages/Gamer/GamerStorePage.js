import React from "react";
import { useState, useEffect } from "react";
import NavigationComponent from "../../components/Gamer/GamerNavBar";
import StoreList from "../../components/Gamer/StoreList";

function GamerStorePage() {
    let [StoreItem, setStoreItem] = useState([]);
    const getStoreItems = async () => {
        const storeItemsInfo = await fetch("/api/getAllStoreGame");
        if (!storeItemsInfo.ok) {
            console.log("Response status ", storeItemsInfo.status);
        } else {
            let storeItemsInfo = await storeGamesResRawData.json();
            let storeGamesData = storeItemsInfo.storeGames;
            setStoreGames(storeGamesData);
        }
    }
    useEffect(() => {
        loadStoreGamesData();}, []);
    return (
        <div>
            <NavigationComponent />
            <StoreList game={game}></StoreList>
        <h1>sss</h1>
        </div>
  );
}

export default GamerStorePage;