import React, { useState, useRef } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";

const MapContainer = () => {
  const apiKey = "AIzaSyDNI_ZWPqvdS6r6gPVO50I4TlYkfkZdXh8";
  const [destination, setDestination] = useState(null);
  const [directions, setDirections] = useState(null);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const mapRef = useRef(null);

  const defaultCenter = { lat: 21.0239591, lng: 105.790158 };

  const handleMapClick = (event) => {
    setSelectedPosition({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
  };

  const handleGetDirections = () => {
    if (selectedPosition) {
      setDestination(selectedPosition);
    }
  };

  const handleDirectionsResult = (result) => {
    if (result.status === "OK") {
      setDirections(result);
    } else {
      console.error("Error fetching directions:", result);
    }
  };

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        ref={mapRef}
        mapContainerStyle={{ width: "100%", height: "100%" }}
        center={defaultCenter}
        zoom={13}
        onClick={handleMapClick}
      >
        {selectedPosition && <Marker position={selectedPosition} label="B" />}
        <Marker position={defaultCenter} label="A" />

        {destination && (
          <DirectionsService
            options={{
              origin: defaultCenter,
              destination: destination,
              travelMode: "DRIVING",
            }}
            callback={handleDirectionsResult}
          />
        )}

        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>

      <button onClick={handleGetDirections}>Chỉ đường</button>
    </LoadScript>
  );
};

export default MapContainer;
