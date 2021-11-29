import React from "react";
import MyCartItem from "./MyCartItem";

function MyCartList({ cart, cartItemInfo }) {

    const cartList = () => {
        return cart.map((c) => (
          <MyCartItem cartItemInfo={cartItemInfo} game={c}></MyCartItem>
        ));
      }
    
      return (
        <div className="col-md-4 col-sm-6">{cartList()}</div>
      );
} 
export default MyCartList;