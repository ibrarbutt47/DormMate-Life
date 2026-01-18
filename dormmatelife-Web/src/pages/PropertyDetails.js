import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './PropertyDetails.css';

function PropertyDetails() {
  const { state } = useLocation();
  const property = state?.property;
  const navigate = useNavigate();

  const [selectedRoommate, setSelectedRoommate] = useState(null);
  const [myPrefs, setMyPrefs] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:5000/api/roommates/me', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.ok ? res.json() : Promise.reject('Failed to fetch preferences'))
      .then(data => setMyPrefs(data))
      .catch(err => setError(err));
  }, []);

  const getImageName = (path) => path?.split('/').pop();

  const comparePrefs = (other) => {
    if (!myPrefs) return { pct: null, status: '—' };
    const keys = [
      'budget', 'cleanliness', 'smoking', 'sleeping_time',
      'gender_preference', 'occupation', 'food', 'personality',
      'talkativeness', 'study_habits', 'guest_policy', 'pets'
    ];
    let matchCount = 0;
    keys.forEach(key => {
      if (String(myPrefs[key]) === String(other[key])) {
        matchCount++;
      }
    });
    const pct = Math.round((matchCount / keys.length) * 100);
    let status = 'Low';
    if (pct >= 90) status = 'Excellent';
    else if (pct >= 75) status = 'Perfect';
    else if (pct >= 60) status = 'Good';
    else if (pct >= 40) status = 'Medium';

    return { pct, status };
  };

  const handleBookNow = () => {
    navigate('/bookingform', { state: { property } });
  };

  if (!property) return <p>No property data found.</p>;

  return (
    <div className="property-details-container">
      {/* Header */}
      <div className="property-header">
        <h2>{property.name}</h2>
        <button className="close-btn" onClick={() => navigate(-1)}>✖</button>
      </div>

      {/* Images */}
      <div className="image-banner">
        {property.images?.map((img, index) => (
          <img
            key={index}
            src={`http://localhost:5000/uploads/${getImageName(img)}`}
            alt={`Property ${index}`}
            className="banner-image"
          />
        ))}
      </div>

      {/* Info */}
      <div className="property-details-grid">
        <div className="property-main-info">
          <p><strong>📍 Address:</strong> {property.location}</p>
          <p><strong>🏠 Type:</strong> {property.room_type}</p>
          <p><strong>🛏️ Beds:</strong> {property.number_of_beds || '1'}</p>
          <p><strong>💰 Rent:</strong> PKR {property.rent}</p>
        </div>
        <div className="property-description-box">
          <h3>📄 Description</h3>
          <p>{property.description}</p>
        </div>
      </div>

      {/* Roommate Preferences Display */}
      {property.room_type === 'shared' && property.roommatePreferences?.length > 0 && (
        <div className="roommate-preference-section">
          <h3>🧑‍🤝‍🧑 Already Booked Users (Roommate Matching)</h3>
          {error && <p className="error">⚠️ {error}</p>}
          <div className="roommate-cards">
            {property.roommatePreferences.map((person, idx) => {
              const { pct, status } = comparePrefs(person);
              return (
                <div key={idx} className="roommate-card" onClick={() => setSelectedRoommate(person)}>
                  <img
                    src={`http://localhost:5000/uploads/${getImageName(person.profile_picture)}`}
                    alt="Profile"
                    className="roommate-thumbnail"
                  />
                  <h4>{person.name}</h4>
                  <p>{person.occupation}</p>
                  <p>🛌 Sleeping: {person.sleeping_time}</p>
                  <p>🚬 Smoking: {person.smoking}</p>
                  {myPrefs && <p><strong>🔍 Match:</strong> {pct}% - {status}</p>}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Roommate Modal */}
      {selectedRoommate && (
        <div className="modal-overlay" onClick={() => setSelectedRoommate(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedRoommate(null)}>✖</button>
            <img
              src={`http://localhost:5000/uploads/${getImageName(selectedRoommate.profile_picture)}`}
              alt="Profile"
              className="modal-profile-img"
            />
            <h3>{selectedRoommate.name}</h3>
            <p><strong>Phone:</strong> {selectedRoommate.phone}</p>
            <p><strong>Cleanliness:</strong> {selectedRoommate.cleanliness}</p>
            <p><strong>Smoking:</strong> {selectedRoommate.smoking}</p>
            <p><strong>Sleeping Time:</strong> {selectedRoommate.sleeping_time}</p>
            <p><strong>Talkativeness:</strong> {selectedRoommate.talkativeness}</p>
            <p><strong>Pets:</strong> {selectedRoommate.pets}</p>
            {myPrefs && (
              <p><strong>🔍 Match Score:</strong> {comparePrefs(selectedRoommate).pct}% – {comparePrefs(selectedRoommate).status}</p>
            )}
          </div>
        </div>
      )}

      {/* Booking */}
      <div className="book-now-container">
        <button className="book-now-btn" onClick={handleBookNow}>Book Now</button>
      </div>
    </div>
  );
}

export default PropertyDetails;
