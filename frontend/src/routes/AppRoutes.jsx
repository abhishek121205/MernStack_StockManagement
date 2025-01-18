import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Settings from "../components/dashboard/settings/Settings";
import ViewProducts from '../components/dashboard/Products/ViewProducts';
import ViewOrders from '../components/dashboard/Orders/viewOrders';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="viewProducts" element={<ViewProducts />} />
      <Route path="settings" element={<Settings />} />
      <Route path="viewOrders" element={< ViewOrders />} />
    </Routes>
  );
};

export default AppRoutes;