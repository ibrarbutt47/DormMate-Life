import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomeScreen.css';
import Navbar from './Navbar';

function HomeScreen() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [roomType, setRoomType] = useState('All');
  const navigate = useNavigate();

  const fetchRooms = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/properties');
      if (!response.ok) throw new Error('Failed to fetch properties');
      const data = await response.json();
      setRooms(data);
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    if (name === 'search') setSearchKeyword(value);
    if (name === 'start-date') setStartDate(value);
    if (name === 'end-date') setEndDate(value);
    if (name === 'room-type') setRoomType(value);
  };

  const handleFindRooms = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      if (searchKeyword) queryParams.append('keyword', searchKeyword.trim());
      if (startDate) queryParams.append('startDate', startDate);
      if (endDate) queryParams.append('endDate', endDate);
      if (roomType && roomType !== 'All') queryParams.append('roomType', roomType);

      const response = await fetch(`http://localhost:5000/api/properties/search?${queryParams.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch filtered properties');
      const data = await response.json();
      setRooms(data);
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResetFilters = () => {
    setSearchKeyword('');
    setStartDate('');
    setEndDate('');
    setRoomType('All');
    fetchRooms();
  };

  const roomTypeOptions = ['All', 'Private', 'Shared'];

  return (
    <>
      <Navbar />
      <div className="filter-bar">
        <div className="filter-item">
          <label htmlFor="search">Search Rooms (Name or Location)</label>
          <input
            id="search"
            type="text"
            name="search"
            placeholder="Search by name or location"
            value={searchKeyword}
            onChange={handleFilterChange}
          />
        </div>
        <div className="filter-item">
          <label htmlFor="start-date">Start Date</label>
          <input
            id="start-date"
            type="date"
            name="start-date"
            value={startDate}
            onChange={handleFilterChange}
          />
        </div>
        <div className="filter-item">
          <label htmlFor="room-type">Room Type</label>
          <select
            id="room-type"
            name="room-type"
            value={roomType}
            onChange={handleFilterChange}
          >
            {roomTypeOptions.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <div className="filter-actions">
          <button className="filter-btn" onClick={handleFindRooms}>Find Rooms</button>
          <button className="reset-btn" onClick={handleResetFilters}>Reset Filters</button>
          <button className="nearby-btn" onClick={() => navigate('/nearbyproperties')}>Find Nearby Properties</button>
           <button
          className="nearby-btn"
          onClick={() => navigate('/my-bookings')}
        >
          Find Your Bookings
        </button>
        </div>

       
      </div>

      <div className="properties-grid">
        {loading && <p>Loading rooms...</p>}
        {error && <p className="error">{error}</p>}
        {!loading && rooms.length === 0 && <p>No rooms available.</p>}

        {!loading && rooms.map((room) => {
          const avgRating = room.ratings?.average || 0;
          const totalReviews = room.ratings?.total_reviews || 0;
          const fullStars = Math.floor(avgRating);
          const hasHalfStar = avgRating - fullStars >= 0.5;
          const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

          return (
            <div key={room.id} className="room-card">
              <img
                src={`http://localhost:5000/uploads/${room.images?.[0] || 'default.jpg'}`}
                alt={room.name}
                className="room-image"
              />
              <div className="room-details">
                <h3>{room.name}</h3>
                <p>{room.location}</p>
                <p><strong>Rent:</strong> {room.rent} ({room.rent_type})</p>
                <p><strong>Available From:</strong> {new Date(room.available_from).toLocaleDateString()}</p>
                <p><strong>Type:</strong> {room.room_type}</p>
                <p><strong>Totall beds:</strong> {room.number_of_beds || 1}</p>
                <p><strong>Status:</strong> {room.status}</p>

                <div className="room-rating">
                  {totalReviews > 0 ? (
                    <>
                      <span className="rating-number">{avgRating.toFixed(1)}</span>
                      <span className="stars">
                        {'★'.repeat(fullStars)}
                        {hasHalfStar ? '½' : ''}
                        {'☆'.repeat(emptyStars)}
                      </span>
                    </>
                  ) : (
                    <span className="no-rating">No ratings yet</span>
                  )}
                </div>
                <div className="card-btn">
                  <button
                    className="details-btn"
                    onClick={() => navigate('/property_details', { state: { property: room } })}
                  >
                    View Details
                  </button>
                  <button
                    className="details-btn"
                    onClick={() => navigate('/bookingform', { state: { property: room } })}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default HomeScreen;
