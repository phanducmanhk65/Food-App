import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const MapContainer = () => {
  const apiKey = 'AIzaSyDNI_ZWPqvdS6r6gPVO50I4TlYkfkZdXh8';
  
  const defaultCenter = { lat: 21.0239591, lng: 105.7901580 };

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap mapContainerStyle={{ width: '100%', height: '100%' }} center={defaultCenter} zoom={13}>
        <Marker position={defaultCenter} />
      </GoogleMap>
    </LoadScript>
  );
};

export default MapContainer;
