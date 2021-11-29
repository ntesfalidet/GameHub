import React from "react";
import { useState, useEffect } from "react";
import NavigationComponent from "../../components/Gamer/GamerNavBar";
import MyCartList from "../../components/Gamer/MyCartList";
import "./styles/GamerCartPage.css"

// Yuanyuan
// Gamer Cart Page
function GamerCartPage() {
  let curUser = JSON.parse(sessionStorage.getItem("currUser"));
  let [cartItem, setCartItem] = useState([]);
  const cartItemInfo = async () => {
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
    if (!cartInfo.ok) {
      console.log(cartInfo.status);
    } else {
      let userCart = await cartInfo.json();
      let cartItems = userCart.cart;
      setCartItem(cartItems);
    }
  };
  useEffect(() => { cartItemInfo(); }, []);

  return (
    <div id="gamerCartContainer">
      <NavigationComponent />
      <MyCartList cart={curUser.cart} cartItemInfo={cartItemInfo} />
      <div className="footer">
        <div className="center">Copyright 2021</div>
        <div className="center">Designed by Nathaniel & Yuanyuan</div>
      </div>
    </div>
  );
}

export default GamerCartPage;