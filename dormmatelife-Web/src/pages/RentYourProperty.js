import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './RentYourProperty.css';
import Navbar from '../components/Navbar';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import debounce from 'lodash.debounce';
import ListPropertyHome from '../components/ListPropertyHome';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});
const reverseGeocode = async (lat, lon, setLocation) => {
  try {
    const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
    const data = await res.json();
    setLocation(data.display_name || `${lat}, ${lon}`);
  } catch {
    setLocation(`${lat}, ${lon}`);
  }
};
function LocationSelector({ setCoordinates, setLocation }) {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setCoordinates([lat, lng]);
      reverseGeocode(lat, lng, setLocation);
    },
  });
  return null;
}
function MapCenterUpdater({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) map.setView(center, 15);
  }, [center, map]);
  return null;
}
function LocateControl({ setCoordinates, setLocation }) {
  const map = useMap();
  return (
    <div
      className="map-locate-button"
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          async ({ coords }) => {
            const coordsArr = [coords.latitude, coords.longitude];
            setCoordinates(coordsArr);
            map.setView(coordsArr, 15);
            await reverseGeocode(coords.latitude, coords.longitude, setLocation);
          },
          () => alert('Unable to fetch your location.')
        );
      }}
      title="Locate Me"
    >📍</div>
  );
}

export default function RentYourProperty() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '', location: '', rent: '', rent_type: 'monthly', room_type: '',
    email: '', phone: '', description: '', available_from: '', available_to: '',
    account_number: '', account_type: '', number_of_beds: 1,
  });

  const [images, setImages] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [coordinates, setCoordinates] = useState(null);
  const [mapCenter, setMapCenter] = useState([24.8607, 67.0011]);
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  useEffect(() => {
    if (showMap && !coordinates) {
      navigator.geolocation.getCurrentPosition(
        async ({ coords }) => {
          const coordsArr = [coords.latitude, coords.longitude];
          setCoordinates(coordsArr);
          setMapCenter(coordsArr);
          await reverseGeocode(coords.latitude, coords.longitude, loc =>
            setFormData(prev => ({ ...prev, location: loc }))
          );
        },
        () => alert('Could not fetch your location.')
      );
    }
  }, [showMap, coordinates]);

  const fetchLocationSuggestions = debounce(async (query) => {
    if (!query) return setLocationSuggestions([]);
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}&countrycodes=pk&addressdetails=1&limit=5`);
      const data = await res.json();
      setLocationSuggestions(data);
    } catch {}
  }, 400);

  const handleChange = e => {
    const { name, value } = e.target;

    if (name === 'email') setEmailError(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Invalid email.');
    if (name === 'phone') {
      const digitsOnly = value.replace(/\D/g, '');
      if (digitsOnly.length > 10) return;
      setFormData(prev => ({ ...prev, phone: digitsOnly }));
      setPhoneError(digitsOnly.length === 10 ? '' : 'Must be 10 digits.');
      return;
    }
    if (name === 'location') {
      setFormData(prev => ({ ...prev, location: value }));
      setShowSuggestions(true);
      fetchLocationSuggestions(value);
      return;
    }
    if (name === 'room_type') {
      setFormData(prev => ({
        ...prev,
        room_type: value,
        number_of_beds: value === 'Private' ? 1 : prev.number_of_beds || 1,
      }));
      return;
    }
    if (name === 'number_of_beds') {
      const beds = parseInt(value, 10);
      setFormData(prev => ({ ...prev, number_of_beds: isNaN(beds) ? 1 : beds }));
      return;
    }

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    if (emailError || phoneError) return setError('Fix errors first.');
    if (formData.phone.length !== 10) return setPhoneError('Must be 10 digits.');
    if (!formData.room_type) return setError('Select Room Type.');
    if (images.length === 0) return setError('Upload at least one image.');

    setLoading(true);
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Login first.');
      setLoading(false);
      return navigate('/login');
    }

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'room_type') {
          data.append('room_type', value.toLowerCase());
        } else if (key === 'number_of_beds') {
          if (formData.room_type.toLowerCase() !== 'private') {
            data.append('number_of_beds', parseInt(value || 1, 10));
          }
        } else {
          data.append(key, value);
        }
      });
      if (coordinates) {
        data.append('latitude', coordinates[0]);
        data.append('longitude', coordinates[1]);
      }
      images.forEach(file => data.append('images', file));

      const res = await axios.post('http://localhost:5000/api/properties/list', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      alert(res.data.message || 'Property listed!');
      navigate('/my-properties');
    } catch (err) {
      setError(err.response?.data?.message || 'Submission error!');
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Navbar />
      <ListPropertyHome />
      <div className="rent-form-container">
        <form className="rent-form" onSubmit={handleSubmit} encType="multipart/form-data">
          <h2>Rent Your Property</h2>
          {error && <div className="error">{error}</div>}
          {loading && <div className="loading">Submitting...</div>}

          <div className="location-autocomplete-container">
            <input type="text" name="location" placeholder="Location Address" value={formData.location} onChange={handleChange} autoComplete="off" required />
            {showSuggestions && locationSuggestions.length > 0 && (
              <ul className="suggestions-dropdown">
                {locationSuggestions.map((s, i) => (
                  <li key={i} onClick={() => {
                    setFormData(prev => ({ ...prev, location: s.display_name }));
                    setCoordinates([parseFloat(s.lat), parseFloat(s.lon)]);
                    setMapCenter([parseFloat(s.lat), parseFloat(s.lon)]);
                    setShowSuggestions(false);
                    setLocationSuggestions([]);
                  }}>{s.display_name}</li>
                ))}
              </ul>
            )}
          </div>

          <div className="map-buttons">
            <button type="button" onClick={() => setShowMap(!showMap)}>{showMap ? 'Hide Map' : 'Choose from Map'}</button>
            {formData.location && <button type="button" onClick={() => {
              setFormData(prev => ({ ...prev, location: '' }));
              setCoordinates(null);
            }}>Remove Location</button>}
          </div>

          {showMap && (
            <div className="map-container" style={{ height: 400 }}>
              <MapContainer center={mapCenter} zoom={13} style={{ height: '100%', width: '100%' }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <MapCenterUpdater center={mapCenter} />
                <LocationSelector setCoordinates={setCoordinates} setLocation={value => setFormData(prev => ({ ...prev, location: value }))} />
                <LocateControl setCoordinates={setCoordinates} setLocation={value => setFormData(prev => ({ ...prev, location: value }))} />
                {coordinates && <Marker position={coordinates} />}
              </MapContainer>
            </div>
          )}

          <input type="text" name="name" placeholder="Property Name" value={formData.name} onChange={handleChange} required />
          <select name="rent_type" value={formData.rent_type} onChange={handleChange} required>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>

          <select name="room_type" value={formData.room_type} onChange={handleChange} required>
            <option value="">Select Room Type</option>
            <option value="Private">Private</option>
            <option value="Shared">Shared</option>
          </select>

          {formData.room_type === 'Shared' && (
            <input type="number" name="number_of_beds" placeholder="Number of Beds" min="1" value={formData.number_of_beds} onChange={handleChange} required />
          )}

          <input type="date" name="available_from" value={formData.available_from} onChange={handleChange} required />
          <input type="date" name="available_to" value={formData.available_to} onChange={handleChange} required />

          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          {emailError && <div className="error">{emailError}</div>}

          <div className="phone-input-container">
            <span>+92</span>
            <input type="tel" name="phone" placeholder="xxxxxxxxxx" value={formData.phone} onChange={handleChange} maxLength={10} pattern="\d*" required />
          </div>
          {phoneError && <div className="error">{phoneError}</div>}

          <input type="number" name="rent" placeholder="Rent Amount" value={formData.rent} onChange={handleChange} min="0" required />
          <input type="text" name="account_number" placeholder="Account Number" value={formData.account_number} onChange={handleChange} required />

          <select name="account_type" value={formData.account_type} onChange={handleChange} required>
            <option value="">Select Payment Method</option>
            <option value="JazzCash">JazzCash</option>
            <option value="Easypaisa">Easypaisa</option>
            <option value="UBL">UBL</option>
            <option value="HBL">HBL</option>
            <option value="Meezan Bank">Meezan Bank</option>
          </select>

          <textarea name="description" placeholder="Property Description" value={formData.description} onChange={handleChange} required rows={5} />

          <label htmlFor="images">Upload Images</label>
          <input id="images" type="file" accept="image/*" multiple onChange={e => setImages(Array.from(e.target.files))} required />

          <button type="submit" disabled={loading}>{loading ? 'Submitting...' : 'List Property'}</button>
        </form>
      </div>
    </>
  );
}