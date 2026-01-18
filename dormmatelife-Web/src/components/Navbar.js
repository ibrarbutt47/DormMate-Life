// import React, { useEffect, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import './Navbar.css';
// import { FiMenu, FiX } from 'react-icons/fi';

// function Navbar() {
//   const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuthenticated') === 'true');
//   const [userName, setUserName] = useState(localStorage.getItem('userName') || '');
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   const navigate = useNavigate();

//   useEffect(() => {
//     const handleStorageChange = () => {
//       setIsAuthenticated(localStorage.getItem('isAuthenticated') === 'true');
//       setUserName(localStorage.getItem('userName') || '');
//     };
//     window.addEventListener('storage', handleStorageChange);
//     return () => window.removeEventListener('storage', handleStorageChange);
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem('isAuthenticated');
//     localStorage.removeItem('token');
//     localStorage.removeItem('userName');
//     setIsAuthenticated(false);
//     setUserName('');
//     setIsMobileMenuOpen(false);
//     navigate('/login');
//   };

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   return (
//     <nav className="navbar">
//       <div className="navbar-left">
//         <Link to="/" className="navbar-logo">DormMate Life</Link>
//       </div>

//       <div className="navbar-menu-icon" onClick={toggleMobileMenu}>
//         {isMobileMenuOpen ? <FiX /> : <FiMenu />}
//       </div>

//       <ul className={`navbar-center ${isMobileMenuOpen ? 'active' : ''}`}>
//         <li><Link to="/" onClick={toggleMobileMenu}>Home</Link></li>
//         <li><Link to="/properties" onClick={toggleMobileMenu}>Find Property</Link></li>
//         <li><Link to="/rent" onClick={toggleMobileMenu}>Rent Property</Link></li>
//         <li><Link to="/my-properties" onClick={toggleMobileMenu}>My Property</Link></li>
//         <li><Link to="/my-bookings" onClick={toggleMobileMenu}>My Bookings</Link></li>
//         {isAuthenticated && (
//           <>
//             {/* <li><Link to="/roommate/preferences" onClick={toggleMobileMenu}>Preferences</Link></li> */}
//             <li><Link to="/roommate/matches" onClick={toggleMobileMenu}>Matches</Link></li>
//           </>
//         )}
//         <li><Link to="/about" onClick={toggleMobileMenu}>About Us</Link></li>
//       </ul>

//       <div className="navbar-right">
//         {isAuthenticated ? (
//           <button onClick={handleLogout} className="logout-button">Logout</button>
//         ) : (
//           <Link to="/login" className="login-button">Login</Link>
//         )}
//       </div>
//     </nav>
//   );
// }

// export default Navbar;













// import React, { useEffect, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import './Navbar.css';

// function Navbar() {
//   const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuthenticated') === 'true');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const handleStorageChange = () => {
//       setIsAuthenticated(localStorage.getItem('isAuthenticated') === 'true');
//     };
//     window.addEventListener('storage', handleStorageChange);
//     return () => window.removeEventListener('storage', handleStorageChange);
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem('isAuthenticated');
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     localStorage.removeItem('userName');
//     setIsAuthenticated(false);
//     window.dispatchEvent(new Event('storage'));
//     navigate('/login');
//   };

//   const handleProtectedRoute = (action) => {
//     const isAuth = localStorage.getItem('isAuthenticated') === 'true';

//     if (!isAuth) {
//       localStorage.setItem('postLoginRedirect', action);
//       navigate('/login');
//       return;
//     }

//     const user = JSON.parse(localStorage.getItem('user') || '{}');

//     if (action === 'list') {
//       navigate('/rent');
//     } else if (action === 'find') {
//       if (user.preferencesSaved) {
//         navigate('/properties');
//       } else {
//         navigate('/roommate/preferences');
//       }
//     }
//   };

//   return (
//     <nav className="navbar">
//       <div className="navbar-left">
//         <Link to="/" className="navbar-logo">DormMate Life</Link>
//       </div>

//       <div className="navbar-right">
//         <span className="nav-link" onClick={() => handleProtectedRoute('find')}>Find Property</span>
//         <span className="nav-link" onClick={() => handleProtectedRoute('list')}>List Property</span>
//         {isAuthenticated ? (
//           <button onClick={handleLogout} className="logout-button">Logout</button>
//         ) : (
//           <Link to="/login" className="login-button">Login</Link>
//         )}
//       </div>
//     </nav>
//   );
// }

// export default Navbar;
















// import React, { useEffect, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import './Navbar.css';

// function Navbar() {
//   const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuthenticated') === 'true');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const handleStorageChange = () => {
//       setIsAuthenticated(localStorage.getItem('isAuthenticated') === 'true');
//     };
//     window.addEventListener('storage', handleStorageChange);
//     return () => window.removeEventListener('storage', handleStorageChange);
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem('isAuthenticated');
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     localStorage.removeItem('userName');
//     setIsAuthenticated(false);
//     window.dispatchEvent(new Event('storage'));
//     navigate('/login');
//   };

//   const handleProtectedRoute = (action) => {
//     const isAuth = localStorage.getItem('isAuthenticated') === 'true';

//     if (!isAuth) {
//       localStorage.setItem('postLoginRedirect', action);
//       navigate('/login');
//       return;
//     }

//     const user = JSON.parse(localStorage.getItem('user') || '{}');
//     const hasPreferences = user.preferencesSaved === true;

//     if (action === 'list') {
//       navigate('/rent');
//     } else if (action === 'find') {
//       if (hasPreferences) {
//         navigate('/properties');
//       } else {
//         navigate('/roommate/preferences');
//       }
//     }
//   };

//   return (
//     <nav className="navbar">
//       <div className="navbar-left">
//         <Link to="/" className="navbar-logo">DormMate Life</Link>
//       </div>

//       <div className="navbar-right">
//         <span className="nav-link" onClick={() => handleProtectedRoute('find')}>Find Property</span>
//         <span className="nav-link" onClick={() => handleProtectedRoute('list')}>List Property</span>
//         {isAuthenticated ? (
//           <button onClick={handleLogout} className="logout-button">Logout</button>
//         ) : (
//           <Link to="/login" className="login-button">Login</Link>
//         )}
//       </div>
//     </nav>
//   );
// }

// export default Navbar;










import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuthenticated') === 'true');
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(localStorage.getItem('isAuthenticated') === 'true');
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userName');
    setIsAuthenticated(false);

    window.dispatchEvent(new Event('storage')); // Notify other components
    navigate('/login');
  };

  const handleProtectedRoute = (action) => {
    const isAuth = localStorage.getItem('isAuthenticated') === 'true';

    if (!isAuth) {
      localStorage.setItem('postLoginRedirect', action);
      navigate('/login');
      return;
    }

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const hasPreferences = user.preferencesSaved === true;

    if (action === 'list') {
      navigate('/list-property-home');
    } else if (action === 'find') {
      if (hasPreferences) {
        navigate('/properties');
      } else {
        navigate('/roommate/preferences');
      }
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">DormMate Life</Link>
      </div>

      <div className="navbar-right">
        <span className="nav-link" onClick={() => handleProtectedRoute('find')}>Find Hostel</span>
        <span className="nav-link" onClick={() => handleProtectedRoute('list')}>List Hostel</span>

        {isAuthenticated ? (
          <button onClick={handleLogout} className="logout-button">Logout</button>
        ) : (
          <Link to="/login" className="login-button">Login</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
