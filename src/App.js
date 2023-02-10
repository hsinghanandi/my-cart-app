import React, { useState, useEffect } from "react";
import Cart from "./components/Cart";
import { fetchItems } from "./api";

export const AppContext = React.createContext();

const App = () => {

  const [orderItems, setOrderItems] = useState([]);
  const [totalFee, setTotalFee] = useState({});

  useEffect(() => {
    getItems();
  }, []);

  const removeLineItem = (lineItemId) => {

  }

  const addLineItem = (lineItem) => {

  }

  const calculateFees = () => {

  }

  const getItems = async () => {
    try {
      const { data } = await fetchItems();
      console.log('data', data);
      setOrderItems(data);
    } catch (err) {
      console.log('Error while fetching products', err);
    }
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
        <Cart orderItems={orderItems} />
      </AppContext.Provider>
    </div>
  );
}

export default App;
