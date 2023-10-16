import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MapWithLocationTracker: React.FC = () => {
  const [map, setMap] = useState<L.Map | null>(null);
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  useEffect(() => {
    // Initialize the map
    if (!document.getElementById('map')) {
    const leafletMap = L.map('map').setView([0, 0], 13);


    // Add a Tile Layer (You can choose different map providers)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(leafletMap);

    setMap(leafletMap);

    // Get the user's current location
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });

        // Add a marker for the user's current location
        L.marker([latitude, longitude]).addTo(leafletMap);
      });
    }
  }
  }, []);

  return (
    <div>
      <div id="map" style={{ width: '100%', height: '400px' }}></div>
      {location && (
        <div>
          Your current location: Latitude {location.latitude}, Longitude {location.longitude}
        </div>
      )}
    </div>
  );
};

export default MapWithLocationTracker;
