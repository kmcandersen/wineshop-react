import React, { useContext, useEffect } from 'react';
import ShopContext from './../context/shopContext';

export default function Products() {
  const { state, fetchAllProducts } = useContext(ShopContext);

  useEffect(() => {
    fetchAllProducts();
  }, []);

  if (!state.products) return <div>Loading...</div>;

  return <div>PRODUCTS</div>;
}
