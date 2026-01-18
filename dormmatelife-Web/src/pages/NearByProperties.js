import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './NearByProperties.css';
import Navbar from '../components/Navbar';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import debounce from 'lodash.debounce';
import { useNavigate } from 'react-router-dom';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Utility: Haversine formula
function getDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

const NearbyProperties = () => {
  const [properties, setProperties] = useState([]);
  const [nearby, setNearby] = useState([]);
  const [coords, setCoords] = useState(null);
  const [addressInput, setAddressInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/properties')
      .then(res => setProperties(res.data))
      .catch(err => console.error(err));
  }, []);

  const fetchSuggestions = debounce(query => {
    if (query.trim()) {
      fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5`)
        .then(res => res.json())
        .then(setSuggestions)
        .catch(console.error);
    } else {
      setSuggestions([]);
    }
  }, 400);

  const handleInput = e => {
    setAddressInput(e.target.value);
    setCoords(null);
    fetchSuggestions(e.target.value);
  };

  const handleSelectSuggestion = suggestion => {
    setAddressInput(suggestion.display_name);
    setCoords([parseFloat(suggestion.lat), parseFloat(suggestion.lon)]);
    setSuggestions([]);
  };

  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setCoords([lat, lng]);
        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)
          .then(res => res.json())
          .then(data => setAddressInput(data.display_name || ''))
          .catch(console.error);
      }
    });
    return null;
  };

  const handleSearch = () => {
    if (!coords) return alert('Please select a location.');
    const [uLat, uLon] = coords;

    const close = properties.map(p => {
      if (!p.latitude || !p.longitude) return null;
      const dist = getDistanceKm(uLat, uLon, parseFloat(p.latitude), parseFloat(p.longitude));
      return { ...p, distance: dist };
    }).filter(p => p && p.distance <= 15)
      .sort((a, b) => a.distance - b.distance);

    setNearby(close);
  };

  return (
    <>
      <Navbar />
      <div className="nearby-page">
        <h1>Find Nearby Properties</h1>

        <div className="search-panel">
          <input
            type="text"
            placeholder="Enter location..."
            value={addressInput}
            onChange={handleInput}
          />
          <button onClick={handleSearch}>Search</button>
          {suggestions.length > 0 && (
            <ul className="suggestions">
              {suggestions.map((s, idx) => (
                <li key={idx} onClick={() => handleSelectSuggestion(s)}>
                  {s.display_name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="map-wrapper">
          <MapContainer center={coords || [31.5, 74]} zoom={coords ? 13 : 6} style={{ height: '300px', width: '100%' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <MapClickHandler />
            {coords && <Marker position={coords} />}
          </MapContainer>
        </div>

        <h2>Nearby Properties (within 15 KM)</h2>
        {nearby.length === 0 ? (
          <p>No properties found near this location.</p>
        ) : (
          <div className="props-grid">
            {nearby.map((p, idx) => (
              <div key={idx} className="prop-card">
                <img
                  src={`http://localhost:5000/uploads/${p.images?.[0] || 'default.jpg'}`}
                  alt={p.name}
                  className="room-image"
                />
                <h3>{p.name}</h3>
                <p><strong>Type:</strong> {p.property_type}</p>
                <p><strong>Rent:</strong> {p.rent} PKR ({p.rent_type})</p>
                <p><strong>Available:</strong> {new Date(p.available_from).toLocaleDateString()} → {new Date(p.available_to).toLocaleDateString()}</p>
                <p><strong>Contact:</strong> {p.phone} | {p.email}</p>
                <p><strong>Location:</strong> {p.location}</p>
                <p><strong>Rating:</strong> {p.ratings?.average || 0} ⭐ ({p.ratings?.total_reviews || 0} reviews)</p>
                <p><strong>Distance:</strong> {p.distance.toFixed(2)} KM</p>
                <button
                  className="details-btn"
                  onClick={() => navigate('/property_details', { state: { property: p } })}
                >
                  View Details
                </button>

              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default NearbyProperties;
