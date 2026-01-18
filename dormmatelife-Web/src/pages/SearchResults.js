// src/pages/SearchResults.js
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { Link } from 'react-router-dom';
import './SearchResults.css'; // Importing the CSS for styles

const containerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 28.6139,  // New Delhi, for now
  lng: 77.2090,
};

export const dummyProperties = [
  {
    id: 1,
    name: 'Sunshine PG',
    address: 'Connaught Place, New Delhi',
    lat: 28.6315,
    lng: 77.2167,
    rent: 'PKR 8,000/month',
    rentPKR: 'PKR 18,000',
    description: 'A comfortable and cozy place for students with all basic amenities.',
    ratings: 4.5,
    images: [
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be',
      'https://images.unsplash.com/photo-1599423300746-b62533397364',
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be',
    ],
    comments: [
      { user: 'Alice', text: 'Great place, very comfortable!' },
      { user: 'Bob', text: 'Good location, loved it.' },
    ],
  },
  {
    id: 2,
    name: 'Comfort Stay Hostel',
    address: 'Karol Bagh, New Delhi',
    lat: 28.6517,
    lng: 77.1900,
    rent: 'PKR 7,500/month',
    rentPKR: 'PKR 16,500',
    description: 'A peaceful stay with proximity to markets and transportation.',
    ratings: 4.0,
    images: [
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be',
      'https://images.unsplash.com/photo-1599423300746-b62533397364',
    ],
    comments: [
      { user: 'Charlie', text: 'Nice experience, would recommend!' },
      { user: 'David', text: 'Clean and affordable, value for money.' },
    ],
  },
];

const SearchResults = () => {
  const [selectedMarker, setSelectedMarker] = useState(null);

  return (
    <>
      <Navbar />
      <div className="search-results">
        <h2>Search Results for "New Delhi"</h2>

        {/* Property Listings */}
        <div className="property-list">
          {dummyProperties.map((property) => (
            <div key={property.id} className="property-card">
              <div className="property-image-container">
                <img
                  src={property.images[0]}
                  alt={property.name}
                  className="property-profile-image"
                />
              </div>
              <div className="property-info">
                <h3>{property.name}</h3>
                <p>{property.description}</p>
                <p><strong>Rent:</strong> {property.rentPKR}</p>
                <p><strong>Rating:</strong> {property.ratings} ⭐</p>
              </div>
              <Link to={`/property/${property.id}`} className="view-details">View Details</Link>
            </div>
          ))}
        </div>

        {/* Google Map */}
        <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={12}
          >
            {dummyProperties.map((property) => (
              <Marker
                key={property.id}
                position={{ lat: property.lat, lng: property.lng }}
                onClick={() => setSelectedMarker(property)}
              />
            ))}

            {selectedMarker && (
              <InfoWindow
                position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
                onCloseClick={() => setSelectedMarker(null)}
              >
                <div>
                  <h4>{selectedMarker.name}</h4>
                  <p>{selectedMarker.address}</p>
                  <p><strong>{selectedMarker.rentPKR}</strong></p>
                  <p>{selectedMarker.description}</p>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </LoadScript>
      </div>
    </>
  );
};

export default SearchResults;
