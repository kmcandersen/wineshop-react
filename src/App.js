import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Product from './pages/Product';
import Products from './pages/Products';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='products' element={<Products />} />
        <Route path='products/123' element={<Product />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Layout>
  );
}
