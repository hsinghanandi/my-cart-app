import './styles.css'
import React, { useContext } from 'react'
import { AppContext } from '../../App'

const Product = ({ item, stylingVariables, estimatedDelivery, type }) => {
    const { removeLineItem, addLineItem } = useContext(AppContext);

    const swatchColorStyles = {
        display: "inline-block",
        borderRadius: "50%",
        backgroundColor: item.swatchColor,
        height: "2rem",
        width: "2rem",
    };

    const buttonStyles = {
        border: "none",
        font: "inherit",
        cursor: "pointer",
        padding: "0",
        textDecoration: "underline",
        outline: "none",
    }

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
                    <span style={{ color: stylingVariables.BLUE }} placeholder='hello'>
                        {estimatedDelivery.length <= 0
                            ? "Enter Postal Code"
                            : estimatedDelivery
                                ?.filter((product) => product.ids.includes(item.id))
                                .map((product) => product.estimatedDeliveryDate)}
                    </span>
                </div>
                {type === 'add' ?
                    <button
                        type="button"
                        style={buttonStyles}
                        onClick={() => addLineItem(item)}>
                        Add Item
                    </button>
                    : <button
                        type="button"
                        style={buttonStyles}
                        onClick={() => removeLineItem(item.id)}>
                        Remove
                    </button>
                }
            </div>
        </div>
    )
}

export default Product