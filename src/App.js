import React, { useState, useEffect } from "react";
import Cart from "./components/Cart";
import { fetchItems } from "./api";

export const AppContext = React.createContext();

const App = () => {
  const [products, setProducts] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [totalFee, setTotalFee] = useState({});

  useEffect(() => {
    getItems();
  }, []);

  useEffect(() => calculateFees(orderItems), [orderItems]);

  const getItems = async () => {
    try {
      const { data } = await fetchItems();
      setOrderItems(data);
    } catch (err) {
      console.log('Error while fetching products', err);
    }
  }
  const calculateFees = (orderItems) => {
    let total;
    if (orderItems?.length <= 0) {
      return setTotalFee({
        ...totalFee,
        subtotal: 0,
        tax: 0,
        total: 0,
        shipping: 0,
      });
    }

    const subtotal = orderItems?.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );
    const tax = subtotal * 0.13;
    const SHIPPING_RATE = 15;
    total = subtotal + tax + SHIPPING_RATE;

    return setTotalFee({
      ...totalFee,
      subtotal,
      tax,
      total,
      shipping: SHIPPING_RATE,
    });
  }

  const removeLineItem = (lineItemId) => {
    const newLineItems = orderItems?.filter(
      (item) => item.id !== parseInt(lineItemId),
    );

    products.push(orderItems?.find(
      (item) => item.id === parseInt(lineItemId)
    ))

    setProducts([...products])
    setOrderItems(newLineItems);
  }

  const addLineItem = (lineItemId) => {
    const availableProducts = products?.filter(
      (item) => item.id !== lineItemId.id)


    setProducts(availableProducts);
    setOrderItems([...orderItems, lineItemId]);
  }

  return (
    <div className="App">
      <AppContext.Provider
        value={{
          removeLineItem,
          addLineItem,
          calculateFees,
          totalFee
        }}>
        <Cart orderItems={orderItems} products={products} />
      </AppContext.Provider>
    </div>
  );
}

export default App;