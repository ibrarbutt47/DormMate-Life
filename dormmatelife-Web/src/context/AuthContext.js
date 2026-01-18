// // src/context/AuthContext.js
// import React, { createContext, useState, useEffect } from 'react';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [auth, setAuth] = useState({
//     isAuthenticated: false,
//     user: null,
//     token: null,
//   });

//   useEffect(() => {
//     // Check localStorage for existing token and user data
//     const token = localStorage.getItem('token');
//     const user = JSON.parse(localStorage.getItem('user'));

//     if (token && user) {
//       setAuth({
//         isAuthenticated: true,
//         user,
//         token,
//       });
//     }
//   }, []);

//   const login = (userData, token) => {
//     localStorage.setItem('token', token);
//     localStorage.setItem('user', JSON.stringify(userData));
//     setAuth({
//       isAuthenticated: true,
//       user: userData,
//       token,
//     });
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     setAuth({
//       isAuthenticated: false,
//       user: null,
//       token: null,
//     });
//   };

//   return (
//     <AuthContext.Provider value={{ auth, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };









// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    const storedUserName = localStorage.getItem('userName');
    setIsAuthenticated(authStatus);
    setUserName(storedUserName || '');
  }, []);

  const login = (name) => {
    setIsAuthenticated(true);
    setUserName(name);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserName('');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
