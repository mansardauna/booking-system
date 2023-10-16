import { Location } from 'iconsax-react';
import React, { useState, useEffect } from 'react';

const CurrentLocation: React.FC = () => {
  const [locationName, setLocationName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchLocationName(latitude, longitude);
        },
        (err) => {
          setError(err.message);
        }
      );
    } else {
      setError('Geolocation is not supported by your browser.');
    }
  }, []);

  const fetchLocationName = (latitude: number, longitude: number) => {
    const apiKey = 'YOUR_GOOGLE_MAPS_API_KEY';
    const geocodingApiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

    fetch(geocodingApiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.results && data.results[0]) {
          setLocationName(data.results[0].formatted_address);
        }
      })
      .catch((err) => {
        setError('Error fetching location data');
      });
  };

  return (
    <div className='flex justify-center gap-2 items-center text-sm'>
      <Location size={17}/>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <p>
        {locationName || 'Loading...'}
        </p>
      )}
    </div>
  );
};

export default CurrentLocation;
