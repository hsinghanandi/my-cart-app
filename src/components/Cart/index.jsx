import './styles.css';
import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../../App';
import Product from "../Product";
import { fetchDeliveryDates } from "../../api";

const Cart = ({ orderItems, products }) => {
    const { totalFee } = useContext(AppContext);
    const [deliveryDates, setDeliveryDates] = useState([]);
    const [estimatedDelivery, setEstimatedDelivery] = useState([]);
    const [stylingVariables] = useState({
        BLUE: "#172162",
        LIGHT_GREY: "#6e7484",
        BLACK: "#000000",
    });

    useEffect(() => getDeliveryDates, []);

    const getDeliveryDates = async () => {
        try {
            const { data } = await fetchDeliveryDates();
            setDeliveryDates(data);
        } catch (err) {
            console.log('Error while fetching delivery dates', err);
        }
    };

    const calculateEstimatedDelivery = (postalCode) => {
        const results = deliveryDates.filter((item) => item.postal === postalCode);
        setEstimatedDelivery(results);
    };

    return (
        <div className="cart-container">

            {orderItems.length > 0 && <h1 className="cart-header" style={{ color: stylingVariables.BLUE }}>
                Your Cart
            </h1>}
            <div className="cart-items-container">
                {orderItems?.map((product) => {
                    return (
                        <Product
                            key={product.id}
                            item={product}
                            stylingVariables={stylingVariables}
                            estimatedDelivery={estimatedDelivery}
                        />
                    )
                })}
            </div>

            {orderItems?.length > 0 && (
                <div className="cart-item-summary">
                    <div className='cart-summary'>
                        <h3 >Subtotal: </h3>
                        <h4>${totalFee.subtotal > 0 ? totalFee.subtotal.toFixed(4) : 0}</h4>
                    </div>
                    <div className='cart-summary'>
                        <h3>Taxes(estimated): </h3>
                        <h4>${totalFee.tax > 0 ? totalFee.tax.toFixed(4) : 0}</h4>
                    </div>
                    <div className='cart-summary'>
                        <h3>Shipping: </h3>
                        <h4>${totalFee.shipping > 0 ? totalFee.shipping : 0}</h4>
                    </div>
                    <div className='cart-summary'>
                        <h3 style={{ color: stylingVariables.BLUE }}>Total:</h3>
                        <h4> ${totalFee.total > 0 ? totalFee.total.toFixed(4) : 0}</h4>
                    </div>
                    <input
                        type="text"
                        placeholder="Postal Code"
                        style={{ width: "fit-content", padding: "10px" }}
                        pattern="/^([A-Z][0-9][A-Z])\s*([0-9][A-Z][0-9])$/{6}"
                        autoCapitalize="on"
                        maxLength={6}
                        onChange={(e) => {
                            calculateEstimatedDelivery(e.target.value.charAt(0).toUpperCase());
                        }}
                    />
                </div>
            )}

            {products?.length > 0 && (
                <div className="cart-items-container">
                    {products.length > 0 && <h1 className="cart-header" style={{ color: stylingVariables.BLUE }}>Add Items to Cart</h1>}
                    {products?.map((product) => {
                        return (
                            <Product
                                key={product.id}
                                item={product}
                                stylingVariables={stylingVariables}
                                estimatedDelivery={estimatedDelivery}
                                type={'add'}
                            />
                        )
                    })}
                </div>
            )}

        </div>
    )
}

export default Cart;