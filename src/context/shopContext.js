import React, { useEffect, useReducer } from 'react';
import client from '../config/initClient.js';

const ShopContext = React.createContext();

const initialState = {
  products: [],
  product: {},
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
      // Build a custom products query using the unoptimized version of the SDK
      const productsQuery = client.graphQLClient.query((root) => {
        root.addConnection('products', { args: { first: 20 } }, (product) => {
          product.add('availableForSale');
          product.add('description');
          product.add('handle');
          product.add('id');
          product.add('productType');
          product.add('tags');
          product.add('title');
          product.add('totalInventory');
          product.add('vendor');
          product.addConnection(
            'collections',
            { args: { first: 5 } },
            (order) => {
              order.add('handle');
            }
          );
          product.addConnection('images', { args: { first: 2 } }, (order) => {
            order.add('src');
          });
          product.addConnection('variants', { args: { first: 1 } }, (order) => {
            order.add('price');
          });
        });
      });

      const response = await client.graphQLClient.send(productsQuery);
      const { products } = response.model;
      dispatch({
        type: 'FETCH_ALL_PRODUCTS',
        payload: products,
      });
    };
    fetchAllProducts();
  }, []);

  const fetchProductWithTitle = async (title) => {
    const productQuery = client.graphQLClient.query((root) => {
      root.addConnection(
        'products',
        {
          args: {
            first: 1,
            query: `title:${title}`,
          },
        },
        (product) => {
          product.add('id');
          product.add('availableForSale');
          product.add('description');
          product.add('handle');
          product.add('productType');
          product.add('tags');
          product.add('title');
          product.add('totalInventory');
          product.add('vendor');
          product.addConnection(
            'collections',
            { args: { first: 5 } },
            (order) => {
              order.add('handle');
            }
          );
          product.addConnection('images', { args: { first: 2 } }, (order) => {
            order.add('src');
          });
          product.addConnection('variants', { args: { first: 1 } }, (order) => {
            order.add('price');
          });
        }
      );
    });

    const response = await client.graphQLClient.send(productQuery);
    const product = response.model.products[0];
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
        fetchCheckout,
        fetchProductWithTitle,
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
