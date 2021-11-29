import React from "react";
import MyCartItem from "./MyCartItem";
import './styles/MyCartList.css';

function MyCartList({ cart, cartItemInfo }) {

    const cartList = () => {
        return cart.map((c) => (
          <MyCartItem cartItemInfo={cartItemInfo} game={c}></MyCartItem>
        ));
      }
    
      return (
        <div className="cartItems col-md-4 col-sm-6">{cartList()}</div>
      );
} 
export default MyCartList;