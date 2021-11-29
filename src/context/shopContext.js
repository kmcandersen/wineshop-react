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
  collections: [],
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
    case 'UPDATE_CHECKOUT': {
      return { ...state, checkout: action.payload };
    }
    // case 'CREATE_CHECKOUT': {
    //   return { ...state, checkout: action.payload };
    // }
    // case 'FETCH_CHECKOUT': {
    //   return { ...state, checkout: action.payload };
    // }
    // case 'ADD_CHECKOUT_ITEM': {
    //   return { ...state, checkout: action.payload };
    // }
    // case 'REMOVE_CHECKOUT_ITEM': {
    //   return { ...state, checkout: action.payload };
    // }
    case 'FETCH_ALL_COLLECTIONS': {
      return { ...state, collections: action.payload };
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
    if (localStorage.checkout_id) {
      fetchCheckout(localStorage.checkout_id);
    } else {
      createCheckout();
    }

    const fetchAllProducts = async () => {
      const products = await client.product.fetchAll();
      dispatch({
        type: 'FETCH_ALL_PRODUCTS',
        payload: products,
      });
    };
    fetchAllProducts();

    const fetchCollections = async () => {
      const collections = await client.collection.fetchAllWithProducts();
      dispatch({
        type: 'FETCH_ALL_COLLECTIONS',
        payload: collections,
      });
    };
    // collections[n].handle, collections[n].title, collections[0].products
    fetchCollections();
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
    localStorage.setItem('checkout_id', checkout.id);
    dispatch({
      type: 'UPDATE_CHECKOUT',
      payload: checkout,
    });
  };

  const fetchCheckout = async (checkoutId) => {
    const checkout = await client.checkout.fetch(checkoutId);
    dispatch({
      type: 'UPDATE_CHECKOUT',
      payload: checkout,
    });
  };

  const addItemToCheckout = async (variantId, quantity) => {
    const lineItemToAdd = [
      { variantId: variantId, quantity: parseInt(quantity, 10) },
    ];
    const checkout = await client.checkout.addLineItems(
      state.checkout.id,
      lineItemToAdd
    );
    dispatch({
      type: 'UPDATE_CHECKOUT',
      payload: checkout,
    });
    toggleCart(true);
  };

  const updateCheckoutItem = async (variantId, quantity) => {
    const lineItemsToUpdate = [
      { id: variantId, quantity: parseInt(quantity, 10) },
    ];
    const checkout = await client.checkout.updateLineItems(
      state.checkout.id,
      lineItemsToUpdate
    );
    dispatch({
      type: 'UPDATE_CHECKOUT',
      payload: checkout,
    });
  };

  const removeLineItem = async (lineItemIdToRemove) => {
    const checkout = await client.checkout.removeLineItems(
      state.checkout.id,
      lineItemIdToRemove
    );
    dispatch({
      type: 'UPDATE_CHECKOUT',
      payload: checkout,
    });
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
        updateCheckoutItem,
        removeLineItem,
        toggleCart,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContext;
