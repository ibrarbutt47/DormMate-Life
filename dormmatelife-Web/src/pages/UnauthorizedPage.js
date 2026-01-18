// // // // import React from 'react';

// // // // const UnauthorizedPage = () => {
// // // //   return (
// // // //     <div style={{ textAlign: 'center', marginTop: '100px' }}>
// // // //       <h1>🚫 Access Denied</h1>
// // // //       <p>You do not have permission to view this page.</p>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default UnauthorizedPage;














// // // import React, { useEffect, useState } from 'react';
// // // import { useNavigate } from 'react-router-dom';

// // // const UnauthorizedPage = () => {
// // //   const navigate = useNavigate();
// // //   const [role, setRole] = useState(null);

// // //   useEffect(() => {
// // //     const storedUser = localStorage.getItem('user');
// // //     if (storedUser) {
// // //       const parsedUser = JSON.parse(storedUser);
// // //       setRole(parsedUser.role);
// // //     }
// // //   }, []);

// // //   const handleExploreAsSeeker = () => {
// // //     navigate('/properties');
// // //   };

// // //   return (
// // //     <div style={{ textAlign: 'center', marginTop: '100px' }}>
// // //       <h1>🚫 Access Denied</h1>
// // //       <p>You do not have permission to view this page.</p>

// // //       {role === 'owner' && (
// // //         <div style={{ marginTop: '30px' }}>
// // //           <p>You are logged in as an <strong>Owner</strong>.</p>
// // //           <button
// // //             onClick={handleExploreAsSeeker}
// // //             style={{
// // //               padding: '10px 20px',
// // //               fontSize: '16px',
// // //               backgroundColor: '#007bff',
// // //               color: '#fff',
// // //               border: 'none',
// // //               borderRadius: '5px',
// // //               cursor: 'pointer',
// // //               marginTop: '10px'
// // //             }}
// // //           >
// // //             Use Features for Seekers
// // //           </button>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default UnauthorizedPage;











// // import React, { useEffect, useState } from 'react';
// // import { useNavigate } from 'react-router-dom';

// // const UnauthorizedPage = () => {
// //   const navigate = useNavigate();
// //   const [role, setRole] = useState(null);
// //   const [loading, setLoading] = useState(true); // added loading state

// //   useEffect(() => {
// //     const storedUser = localStorage.getItem('user');
// //     if (storedUser) {
// //       try {
// //         const parsedUser = JSON.parse(storedUser);
// //         setRole(parsedUser.role);
// //       } catch (err) {
// //         console.error('Error parsing user from localStorage:', err);
// //         setRole(null);
// //       }
// //     }
// //     setLoading(false);
// //   }, []);

// //   const handleExploreAsSeeker = () => {
// //     navigate('/properties');
// //   };

// //   if (loading) {
// //     return <div style={{ textAlign: 'center', marginTop: '100px' }}>Checking access...</div>;
// //   }

// //   return (
// //     <div style={{ textAlign: 'center', marginTop: '100px' }}>
// //       <h1>🚫 Access Denied</h1>
// //       <p>You do not have permission to view this page.</p>

// //       {role === 'owner' && (
// //         <div style={{ marginTop: '30px' }}>
// //           <p>You are logged in as an <strong>Owner</strong>.</p>
// //           <button
// //             onClick={handleExploreAsSeeker}
// //             style={{
// //               padding: '10px 20px',
// //               fontSize: '16px',
// //               backgroundColor: '#007bff',
// //               color: '#fff',
// //               border: 'none',
// //               borderRadius: '5px',
// //               cursor: 'pointer',
// //               marginTop: '10px'
// //             }}
// //           >
// //             Use Features for Seekers
// //           </button>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default UnauthorizedPage;










// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const UnauthorizedPage = () => {
//   const navigate = useNavigate();
//   const [role, setRole] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const storedUser = localStorage.getItem('user');
//     if (storedUser) {
//       try {
//         const parsedUser = JSON.parse(storedUser);
//         setRole(parsedUser.role);
//       } catch (err) {
//         console.error('Error parsing user:', err);
//       }
//     }
//     setLoading(false);
//   }, []);

//   const handleExploreAsSeeker = () => {
//     // Option 1: if you allow owners to access seeker pages
//     navigate('/properties');

//     // Option 2: force logout and re-login (if roles are strictly separate)
//     // localStorage.clear();
//     // navigate('/login');
//   };

//   const handleGoToLogin = () => {
//     localStorage.clear(); // logout current user
//     navigate('/login');
//   };

//   if (loading) {
//     return <div style={{ textAlign: 'center', marginTop: '100px' }}>Checking access...</div>;
//   }

//   return (
//     <div style={{ textAlign: 'center', marginTop: '100px' }}>
//       <h1>🚫 Access Denied</h1>
//       <p>You do not have permission to view this page.</p>

//       {role === 'owner' && (
//         <div style={{ marginTop: '30px' }}>
//           <p>You are logged in as an <strong>Owner</strong>.</p>
//           <button
//             onClick={handleExploreAsSeeker}
//             style={{
//               padding: '10px 20px',
//               fontSize: '16px',
//               backgroundColor: '#28a745',
//               color: '#fff',
//               border: 'none',
//               borderRadius: '5px',
//               cursor: 'pointer',
//               marginTop: '10px'
//             }}
//           >
//             Explore Seeker Features
//           </button>

//           <br />

//           <button
//             onClick={handleGoToLogin}
//             style={{
//               padding: '10px 20px',
//               fontSize: '16px',
//               backgroundColor: '#dc3545',
//               color: '#fff',
//               border: 'none',
//               borderRadius: '5px',
//               cursor: 'pointer',
//               marginTop: '15px'
//             }}
//           >
//             Logout & Login as Seeker
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UnauthorizedPage;







import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UnauthorizedPage = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setRole(parsedUser.role);
      } catch (err) {
        console.error('Error parsing user:', err);
      }
    }
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  if (loading) {
    return <div style={{ textAlign: 'center', marginTop: '100px' }}>Loading...</div>;
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>🚫 Access Denied</h1>
      <p>You do not have permission to view this page.</p>

      {role === 'owner' && (
        <>
          <p>You are logged in as an <strong>Owner</strong>. This page is for Seekers only, so you need Different account to use this feature!</p>
          <button
            onClick={() => navigate('/signup')}
            style={buttonStyle}
          >
            Create Account as Seeker Dashboard
          </button>
        </>
      )}

      {role === 'seeker' && (
        <>
          <p>You are logged in as a <strong>Seeker</strong>. This page is for Owners only, so you need Different account to use this feature!</p>
          <button
            onClick={() => navigate('/properties')}
            style={buttonStyle}
          >
            Go to Seeker Dashboard
          </button>
          <br />
          <button
            onClick={handleLogout}
            style={{ ...buttonStyle, backgroundColor: '#dc3545', marginTop: '15px' }}
          >
            Logout & SignUp as Owner
          </button>
        </>
      )}
    </div>
  );
};

const buttonStyle = {
  padding: '10px 20px',
  fontSize: '16px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  marginTop: '10px'
};

export default UnauthorizedPage;
