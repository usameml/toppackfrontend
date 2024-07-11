import React from 'react';
import WarehouseMap from './WarehouseMap';

const Dashboard = () => {
  return (
    <div style={{ textAlign: 'right' }}>
      <h1>نظام إدارة المخازن</h1>
      <WarehouseMap />
    </div>
  );
};

export default Dashboard;
