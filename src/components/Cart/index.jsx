import './styles.css';
import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../../App';
import Product from "../Product";


const Cart = ({ orderItems }) => {
    const { totalFee } = useContext(AppContext);
    const [stylingVariables] = useState({
        BLUE: "#172162",
        LIGHT_GREY: "#6e7484",
        BLACK: "#000000",
    });

    return (
        <div className="cart-container">
            <div className="cart-items-container">
                {orderItems.map((product) => {
                    return (
                        <Product
                            key={product.id}
                            item={product}
                            stylingVariables={stylingVariables}
                        />
                    )
                })}
            </div>
        </div>

    )
}

export default Cart;