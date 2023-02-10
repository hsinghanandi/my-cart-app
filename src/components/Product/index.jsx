import './styles.css'
import React, { useContext } from 'react'
import { AppContext } from '../../App'

const Product = ({ item, stylingVariables }) => {
    const swatchColorStyles = {
        display: "inline-block",
        borderRadius: "50%",
        backgroundColor: item.swatchColor,
        height: "2rem",
        width: "2rem",
    };

    return (
        <div className={`cart-item cart-item-${item.id}`}>
            <div className='cart-item-img'>
                <img
                    src={item.image}
                    alt={item.title}
                    width={300}
                    decoding="async"
                    fetchpriority="high"
                />
            </div>
            <div className='cart-item-description'>
                <div
                    className='cart-item-title'>
                    <h2 style={{ color: stylingVariables.BLUE }}>{item.title}</h2>
                    <h4 style={{ color: stylingVariables.LIGHT_GREY }}>${item.price}</h4>
                </div>
                <div className="cart-item-swatch">
                    <span style={swatchColorStyles} />
                    <span style={{ color: stylingVariables.LIGHT_GREY, padding: "2px", alignSelf: "center" }}>
                        {item.swatchTitle}
                    </span>
                </div>
                <div className="cart-item-delivery">
                    <b>Estimated Delivery Date: </b>

                </div>

            </div>
        </div>
    )
}

export default Product