import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Product from './pages/Product';
import ProductList from './pages/ProductList';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='products' element={<ProductList />} />
        <Route path='products/:handle' element={<Product />} />
        <Route path='collections/:handle' element={<ProductList />} />
        <Route path='not-found' element={<NotFound />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Layout>
  );
}
