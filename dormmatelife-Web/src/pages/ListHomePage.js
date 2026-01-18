import React from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import './ListHomePage.css';
import ListPropertyHome from '../components/ListPropertyHome';
function ListHomePage() {
  return (
    <>
    <Navbar/>
    <ListPropertyHome/>
      <div className="list-property-hero">
        <div className="hero-content">
          <h1>Welcome to Your Hosting Dashboard</h1>
          <p>Manage your properties, track your orders, and start earning by listing your space!</p>
          <Link to="/rent" className="start-listing-btn">Start Listing Now</Link>
        </div>
      </div>
    </>
  );
}

export default ListHomePage;
