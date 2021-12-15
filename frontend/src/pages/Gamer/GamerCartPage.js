import React from "react";
import { useState, useEffect } from "react";
import NavBarGamer from "../../components/Gamer/NavBarGamer.js";
import MyCartList from "../../components/Gamer/MyCartList";
import "./styles/GamerCartPage.css";

// Yuanyuan
// Gamer Cart Page
const GamerCartPage = () => {
  let curUser = JSON.parse(sessionStorage.getItem("currUser"));
  let [cartItems, setCartItems] = useState([]);
  const getCartItems = async () => {
    const userInfo = {
      userName: curUser.userName,
      role: curUser.role,
    };
    const cartInfo = await fetch("/api/getCartItems", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });
    console.log("Cart information:", cartInfo);
    if (!cartInfo.ok) {
      console.log("Error:", cartInfo.status);
    } else {
      let userCartData = await cartInfo.json();
      let userCart = userCartData.cart;
      console.log("Cart items are:", userCart);
      setCartItems(userCart);
    }
  };
  useEffect(() => {
    getCartItems();
  }, []);

  return (
    <div id="gamerCartContainer">
      <NavBarGamer />
      <MyCartList cart={cartItems} getCartItems={getCartItems} />
      <div className="footer gamerCartFooter">
        <div className="center">Copyright 2021</div>
        <div className="center">Designed by Nathaniel & Yuanyuan</div>
      </div>
    </div>
  );
};

export default GamerCartPage;
