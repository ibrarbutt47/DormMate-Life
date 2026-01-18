import React from 'react'
import { Link } from 'react-router-dom';
// import './ListPropertyHome.css';
import './ListPropertyHome.css'
function ListPropertyHome() {
  return (
      <div className="mini-navbar-container">
        <div className="mini-navbar">
          <Link to="/rent" className="mini-link">List Property</Link>
          <Link to="/my-properties" className="mini-link">My Listings</Link>
          <Link to="/my-orders" className="mini-link">My Listing Orders</Link>
        </div>
      </div>
  )
}

export default ListPropertyHome
