import React from 'react';
//import MapContainer from './MapContainer';
import OrderList from './OrderList';

const ShipperPage = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      </div>
      <div style={{ flex: 1 }}>
        <OrderList />
      </div>
    </div>
  );
};

export default ShipperPage;
