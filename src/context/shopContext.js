import React, { useEffect, useState } from 'react';
import Client from 'shopify-buy';

const ShopContext = React.createContext();

const client = Client.buildClient({
  domain: process.env.REACT_APP_SHOPIFY_DOMAIN,
  storefrontAccessToken: process.env.REACT_APP_SHOPIFY_API,
});

const initialState = {
  product: {},
  products: [],
  checkout: {},
  isCartOpen: false,
};

export const ShopProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const fetchAllProducts = async () => {
    const products = await client.product.fetchAll();
    console.log('products', products);
    setState({ products: products });
  };

  const toggleCart = (bool) => {
    setState({ isCartOpen: bool });
  };

  return (
    <ShopContext.Provider value={{ state, fetchAllProducts, toggleCart }}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContext;
