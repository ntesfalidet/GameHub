import React from "react";
import { useState, useEffect } from "react";
import NavigationComponent from "../../components/Gamer/GamerNavBar";
import StoreList from "../../components/Gamer/StoreList";

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
        getStoreItems();}, []);
    return (
        <div>
            <NavigationComponent />
            <StoreList game={storeItem}></StoreList>
        </div>
  );
}

export default GamerStorePage;