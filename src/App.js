import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import Dashboard from './components/Dashboard';
import ProductStatistics from './components/ProductStatistics';
import EditProductPage from './components/EditProductPage';
import FinancePage from './components/FinancePage';
import EditClichePage from './components/EditClichePage';
import AddClichePage from './components/AddClichePage';
import ClicheList from './components/ClicheList';

const App = () => (
  <MainLayout>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/product-list" element={<ProductList />} />
      <Route path="/add-product" element={<ProductForm />} />
      <Route path="/edit-product/:id" element={<EditProductPage />} />
      <Route path="/weekly-statistics" element={<ProductStatistics />} />
      <Route path="/add-cliche/:productId" element={<AddClichePage />} />
      <Route path="/edit-cliche/:id" element={<EditClichePage />} />
      <Route path="/cliche-list" element={<ClicheList />} />
      <Route path="/finance" element={<FinancePage />} />
    </Routes>
  </MainLayout>
);

export default App;
