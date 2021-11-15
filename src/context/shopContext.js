import React, { useState } from 'react';

const ShopContext = React.createContext();

const initialState = {
  product: {},
  products: [],
  checkout: {},
  isCartOpen: false,
};

export const ShopProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

  const toggleCart = (bool) => {
    setState({ isCartOpen: bool });
  };

  return (
    <ShopContext.Provider value={{ state, toggleCart }}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContext;
