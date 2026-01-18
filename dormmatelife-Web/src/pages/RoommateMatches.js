import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RoommateMatches.css';
import Navbar from '../components/Navbar';

const MatchedRoommates = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    try {
      const token = localStorage.getItem('token');

      const response = await fetch('http://localhost:5000/api/roommate/matches', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Failed to fetch matches');

      const data = await response.json();
      setMatches(data);
    } catch (error) {
      console.error('❌ Error fetching matches:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="matched-container">
        <h2 className="matched-title">🎯 Your Matched Roommates</h2>

        {loading ? (
          <p className="loading-text">Loading matches...</p>
        ) : matches.length === 0 ? (
          <p className="no-matches">No matches found. Try updating your preferences.</p>
        ) : (
          <div className="match-cards">
            {matches.map((match, index) => (
              <div
                className="match-card clickable"
                key={index}
                onClick={() => navigate('/roommate-details', { state: { roommate: match } })}
              >
                {match.profile_picture && (
                  <img
                    src={`http://localhost:5000/uploads/${match.profile_picture}`}
                    alt={`${match.name}'s profile`}
                    className="profile-picture"
                  />
                )}
                <div className="match-header">
                  <h3>{match.name || 'No Name'}</h3>
                  <span className="score">Match Score: {match.matchScore}</span>
                </div>
                <p><strong>Email:</strong> {match.email}</p>
                <p><strong>Phone:</strong> {match.phone}</p>
                <p><strong>Role:</strong> {match.role}</p>
                <p><strong>Budget:</strong> Rs {match.budget}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default MatchedRoommates;
