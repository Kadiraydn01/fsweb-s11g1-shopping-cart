import React, { useState } from "react";
import { Route } from "react-router-dom";
import { data } from "./data";

import { CartContext } from "./contexts/CartContext";
import { ProductContext } from "./contexts/ProductContext";

import Navigation from "./components/Navigation";
import Products from "./components/Products";
import ShoppingCart from "./components/ShoppingCart";

function App() {
  const [products, setProducts] = useState(data);
  const [cart, setCart] = useState([]);

  const addItem = (item) => {
    const newCart = [...cart, item];
    setCart(newCart);
    cartLocal(newCart);
  };
  const removeItem = (id) => {
    const newCart = cart.filter((item) => item.id !== id);
    setCart(newCart);
    cartLocal(newCart);
  };

  function cartLocal() {
    localStorage.setItem("cart", JSON.stringify());
  }

  function cartLocalGet(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  function initialStateLocal(key) {
    const initialCart = cartLocalGet(key);

    if (initialCart) {
      return initialCart;
    } else {
      return [];
    }
  }

  return (
    <div className="App">
      <ProductContext.Provider value={{ products, addItem }}>
        <CartContext.Provider value={{ cart, removeItem }}>
          <Navigation cart={cart} />

          <main className="content">
            <Route exact path="/">
              <Products />
            </Route>

            <Route path="/cart">
              <ShoppingCart />
            </Route>
          </main>
        </CartContext.Provider>
      </ProductContext.Provider>
    </div>
  );
}

export default App;
