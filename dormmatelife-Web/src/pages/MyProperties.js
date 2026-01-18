import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MyProperties.css';
import Navbar from '../components/Navbar';
import ListPropertyHome from '../components/ListPropertyHome'
const MyProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const getImageName = (imagePath) => {
    return imagePath?.split('/').pop();
  };

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      setError('Please login to view your properties.');
      navigate('/login');
      return;
    }

    const fetchProperties = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/properties/my-properties', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message || 'Failed to load properties');
        }

        const data = await response.json();
        setProperties(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [navigate]);

  if (loading) return <div className="centered-message">Loading your properties...</div>;
  if (error) return <div className="centered-message error">{error}</div>;
  if (properties.length === 0) return <div className="centered-message">You haven't listed any properties yet.</div>;

  return (
    <>
      <Navbar />
      <ListPropertyHome/>
      <div className="my-properties-container">
        <h2 className="page-title">My Listed Properties</h2>
        <div className="action-bar">
          <button className="orders-button" onClick={() => navigate('/my-orders')}>
            View Booking Orders
          </button>
        </div>
        <div className="properties-grid">
          {properties.map((property) => (
            <div key={property.id} className="property-card">
              {property.images && property.images.length > 0 && (
                <img
                  src={`http://localhost:5000/uploads/${getImageName(property.images[0])}`}
                  alt={property.name}
                  className="property-image"
                />
              )}
              <div className="property-details">
                <h3 className="property-name">{property.name}</h3>
                <p className="property-location">{property.location}</p>
                <p className="property-description">{property.description}</p>
                <p className="property-rent">Rs. {property.rent}</p>
                <div className="card-btn">
                  <button
                    className="details-btn"
                    onClick={() => navigate('/property_details', { state: { property } })}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MyProperties;
