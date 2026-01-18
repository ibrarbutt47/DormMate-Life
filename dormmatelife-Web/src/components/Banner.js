// import React from 'react';
// import './Banner.css';
// import { Link } from "react-router-dom";
// function Banner() {
//   return (
//     <div className="banner">
//       <div className="banner-text">
//         <h1>Find Your Perfect Room or Roommate</h1>
//         <p>Welcome to DormMate Life - your trusted platform to discover rentals and roommates with ease.</p>
//       </div>
//     </div>
//   );
// }

// export default Banner;







import React from 'react';
import './Banner.css';
import { useNavigate } from 'react-router-dom';

function Banner() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/properties');
  };

  return (
    <div className="banner">
      <div className="banner-text">
        <h1>Find Your Perfect Room or Roommate</h1>
        <p>Welcome to DormMate Life  your trusted platform to discover rentals and roommates with ease.</p>
        <button className="get-started-btn" onClick={handleGetStarted}>
          Get Started
        </button>
      </div>
    </div>
  );
}

export default Banner;
