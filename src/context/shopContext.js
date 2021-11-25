import React, { useEffect, useReducer } from 'react';
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

const shopReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_ALL_PRODUCTS': {
      return { ...state, products: action.payload };
    }
    case 'FETCH_ONE_PRODUCT': {
      return { ...state, product: action.payload };
    }
    case 'CREATE_CHECKOUT': {
      return { ...state, checkout: action.payload };
    }
    case 'FETCH_CHECKOUT': {
      return { ...state, checkout: action.payload };
    }
    case 'ADD_CHECKOUT_ITEM': {
      return { ...state, checkout: action.payload };
    }
    case 'TOGGLE_CART': {
      return { ...state, isCartOpen: action.payload };
    }
    default:
      return state;
  }
};

export const ShopProvider = ({ children }) => {
  const [state, dispatch] = useReducer(shopReducer, initialState);

  useEffect(() => {
    createCheckout();

    const fetchAllProducts = async () => {
      const products = await client.product.fetchAll();
      dispatch({
        type: 'FETCH_ALL_PRODUCTS',
        payload: products,
      });
    };
    fetchAllProducts();
  }, []);

  const fetchProductWithHandle = async (handle) => {
    const product = await client.product.fetchByHandle(handle);
    dispatch({
      type: 'FETCH_ONE_PRODUCT',
      payload: product,
    });
  };

  const createCheckout = async () => {
    const checkout = await client.checkout.create();
    localStorage.setItem('checkout-id', checkout.id);
    dispatch({
      type: 'CREATE_CHECKOUT',
      payload: checkout,
    });
  };

  const fetchCheckout = (checkoutId) => {
    client.checkout
      .fetch(checkoutId)
      .then((checkout) => {
        dispatch({
          type: 'FETCH_CHECKOUT',
          payload: checkout,
        });
      })
      .catch((error) => console.log(error));
  };

  const addItemToCheckout = async (variantId, quantity) => {
    const lineItemsToAdd = [
      { variantId: variantId, quantity: parseInt(quantity, 10) },
    ];
    const checkout = await client.checkout.addLineItems(
      state.checkout.id,
      lineItemsToAdd
    );
    dispatch({
      type: 'ADD_CHECKOUT_ITEM',
      payload: checkout,
    });
    toggleCart(true);
  };

  const toggleCart = (bool) => {
    dispatch({
      type: 'TOGGLE_CART',
      payload: bool,
    });
  };

  return (
    <ShopContext.Provider
      value={{
        state,
        fetchProductWithHandle,
        fetchCheckout,
        addItemToCheckout,
        toggleCart,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContext;
