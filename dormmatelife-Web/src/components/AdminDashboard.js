// import React, { useEffect, useState } from 'react';
// import './AdminDashboard.css';

// const AdminDashboard = () => {
//   const [users, setUsers] = useState([]);
//   const [properties, setProperties] = useState([]);
//   const [activeTab, setActiveTab] = useState('users');

//   const token = localStorage.getItem('token');

//   const fetchUsers = async () => {
//     const res = await fetch('http://localhost:5000/api/admin/users', {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     const data = await res.json();
//     setUsers(data);
//   };

//   const fetchProperties = async () => {
//     const res = await fetch('http://localhost:5000/api/admin/properties', {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     const data = await res.json();
//     setProperties(data);
//   };

//   const deleteUser = async (id) => {
//     await fetch(`http://localhost:5000/api/admin/users/${id}`, {
//       method: 'DELETE',
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     fetchUsers();
//   };

//   const deleteProperty = async (id) => {
//     await fetch(`http://localhost:5000/api/admin/properties/${id}`, {
//       method: 'DELETE',
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     fetchProperties();
//   };

//   useEffect(() => {
//     fetchUsers();
//     fetchProperties();
//   }, []);

//   return (
//     <div className="p-5">
//       <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
//       <div className="flex gap-4 mb-6">
//         <button onClick={() => setActiveTab('users')} className="bg-blue-600 text-white px-4 py-2 rounded">
//           Users
//         </button>
//         <button onClick={() => setActiveTab('properties')} className="bg-green-600 text-white px-4 py-2 rounded">
//           Properties
//         </button>
//       </div>

//       {activeTab === 'users' && (
//         <div>
//           <h3 className="text-xl mb-2">All Users</h3>
//           <table className="w-full border">
//             <thead>
//               <tr className="bg-gray-200">
//                 <th>ID</th><th>Name</th><th>Email</th><th>Phone</th><th>Role</th><th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {users.map(user => (
//                 <tr key={user.id} className="border-t">
//                   <td>{user.id}</td><td>{user.name}</td><td>{user.email}</td><td>{user.phone}</td><td>{user.role}</td>
//                   <td>
//                     <button onClick={() => deleteUser(user.id)} className="text-red-600">Delete</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {activeTab === 'properties' && (
//         <div>
//           <h3 className="text-xl mb-2">All Properties</h3>
//           <table className="w-full border">
//             <thead>
//               <tr className="bg-gray-200">
//                 <th>ID</th><th>Title</th><th>Location</th><th>Rent</th><th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {properties.map(property => (
//                 <tr key={property.id} className="border-t">
//                   <td>{property.id}</td>
//                   <td>{property.name}</td>
//                   <td>{property.location}</td>
//                   <td>{property.rent}</td>
//                   <td>
//                     <button onClick={() => deleteProperty(property.id)} className="text-red-600">Delete</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminDashboard;










// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './AdminDashboard.css';

// const AdminDashboard = () => {
//   const [users, setUsers] = useState([]);
//   const [properties, setProperties] = useState([]);
//   const [activeTab, setActiveTab] = useState('users');
//   const navigate = useNavigate();
//   const token = localStorage.getItem('token');

//   useEffect(() => {
//     if (!token) {
//       navigate('/login');
//     } else {
//       fetchUsers();
//       fetchProperties();
//     }
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       const res = await fetch('http://localhost:5000/api/admin/users', {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const data = await res.json();
//       setUsers(data);
//     } catch (err) {
//       console.error('Failed to fetch users:', err);
//     }
//   };

//   const fetchProperties = async () => {
//     try {
//       const res = await fetch('http://localhost:5000/api/admin/properties', {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const data = await res.json();

//       // Ensure it's an array and parse images JSON string if needed
//       if (Array.isArray(data)) {
//         const formatted = data.map((property) => ({
//           ...property,
//           images:
//             typeof property.images === 'string'
//               ? JSON.parse(property.images || '[]')
//               : property.images || [],
//         }));
//         setProperties(formatted);
//       } else {
//         console.error('Expected array from backend, got:', data);
//         setProperties([]);
//       }
//     } catch (err) {
//       console.error('Failed to fetch properties:', err);
//       setProperties([]);
//     }
//   };

//   const deleteUser = async (id) => {
//     await fetch(`http://localhost:5000/api/admin/users/${id}`, {
//       method: 'DELETE',
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     fetchUsers();
//   };

//   const deleteProperty = async (id) => {
//     await fetch(`http://localhost:5000/api/admin/properties/${id}`, {
//       method: 'DELETE',
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     fetchProperties();
//   };

//   const approveProperty = async (id) => {
//     await fetch(`http://localhost:5000/api/admin/properties/${id}/approve`, {
//       method: 'PUT',
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     fetchProperties();
//   };

//   const rejectProperty = async (id) => {
//     await fetch(`http://localhost:5000/api/admin/properties/${id}/reject`, {
//       method: 'PUT',
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     fetchProperties();
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     navigate('/login');
//   };

//   return (
//     <div className="admin-dashboard-container">
//       <div className="admin-header">
//         <h2>Admin Dashboard</h2>
//         <button className="logout-btn" onClick={handleLogout}>Logout</button>
//       </div>

//       <div className="tab-buttons">
//         <button onClick={() => setActiveTab('users')} className="tab-btn">Users</button>
//         <button onClick={() => setActiveTab('properties')} className="tab-btn">Properties</button>
//       </div>

//       {activeTab === 'users' && (
//         <div>
//           <h3>All Users</h3>
//           <table className="admin-table">
//             <thead>
//               <tr>
//                 <th>ID</th><th>Name</th><th>Email</th><th>Phone</th><th>Role</th><th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {users.map(user => (
//                 <tr key={user.id}>
//                   <td>{user.id}</td>
//                   <td>{user.name}</td>
//                   <td>{user.email}</td>
//                   <td>{user.phone}</td>
//                   <td>{user.role}</td>
//                   <td>
//                     <button className="delete-btn" onClick={() => deleteUser(user.id)}>Delete</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {activeTab === 'properties' && (
//         <div>
//           <h3>All Properties</h3>
//           {Array.isArray(properties) && properties.map(property => (
//             <div key={property.id} className="property-card">
//               <div className="property-details">
//                 <h4>{property.name}</h4>
//                 <p><strong>Location:</strong> {property.location}</p>
//                 <p><strong>Rent:</strong> Rs. {property.rent}</p>
//                 <p><strong>Type:</strong> {property.room_type}</p>
//                 {property.room_type === 'shared' && (
//                   <p><strong>No. of Beds:</strong> {property.number_of_beds}</p>
//                 )}
//                 <p><strong>Status:</strong> {property.approval_status}</p>
//                 <p><strong>Description:</strong> {property.description}</p>

//                 {property.images && property.images.length > 0 && (
//                   <div className="property-images">
//                     {property.images.map((img, index) => (
//                       <img
//                         key={index}
//                         src={`http://localhost:5000/uploads/${img}`} // update this based on your backend image serving path
//                         alt={`Property ${property.id}`}
//                         className="property-image-thumbnail"
//                       />
//                     ))}
//                   </div>
//                 )}

//                 <div className="action-buttons">
//                   <button
//                     className="approve-btn"
//                     onClick={() => approveProperty(property.id)}
//                     disabled={property.approval_status === 'approved'}
//                   >
//                     Approve
//                   </button>
//                   <button
//                     className="reject-btn"
//                     onClick={() => rejectProperty(property.id)}
//                     disabled={property.approval_status === 'rejected'}
//                   >
//                     Reject
//                   </button>
//                   <button
//                     className="delete-btn"
//                     onClick={() => deleteProperty(property.id)}
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminDashboard;



















import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [properties, setProperties] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [activeTab, setActiveTab] = useState('users');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      fetchUsers();
      fetchProperties();
    }
  }, []);

//   const fetchUsers = async () => {
//     try {
//       const res = await fetch('http://localhost:5000/api/admin/users', {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const data = await res.json();
//       setUsers(data);
//     } catch (err) {
//       console.error('Failed to fetch users:', err);
//     }
//   };




const fetchUsers = async () => {
  try {
    const res = await fetch('http://localhost:5000/api/admin/users', {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    console.log('Fetched users:', data); // 🟢 Log the response here

    // Add the condition to check if it's an array
    if (Array.isArray(data)) {
      setUsers(data); // If data is an array, store directly
    } else if (data.users && Array.isArray(data.users)) {
      setUsers(data.users); // If data.users is the array
    } else {
      console.error('Unexpected users response format:', data);
      setUsers([]); // Fallback
    }
  } catch (err) {
    console.error('Failed to fetch users:', err);
    setUsers([]); // Avoid crash
  }
};

  const fetchProperties = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/admin/properties', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (Array.isArray(data)) {
        const formatted = data.map((property) => ({
          ...property,
          images:
            typeof property.images === 'string'
              ? JSON.parse(property.images || '[]')
              : property.images || [],
        }));
        setProperties(formatted);
      } else {
        setProperties([]);
      }
    } catch (err) {
      console.error('Failed to fetch properties:', err);
      setProperties([]);
    }
  };

  const fetchReviews = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/admin/reviews', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setReviews(data);
    } catch (err) {
      console.error('Failed to fetch reviews:', err);
    }
  };

  const deleteUser = async (id) => {
    await fetch(`http://localhost:5000/api/admin/users/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchUsers();
  };

  const deleteProperty = async (id) => {
    await fetch(`http://localhost:5000/api/admin/properties/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchProperties();
  };

  const approveProperty = async (id) => {
    await fetch(`http://localhost:5000/api/admin/properties/${id}/approve`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchProperties();
  };

  const rejectProperty = async (id) => {
    await fetch(`http://localhost:5000/api/admin/properties/${id}/reject`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchProperties();
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'reviews') {
      fetchReviews();
    }
  };

  return (
    <div className="admin-dashboard-container">
      <div className="admin-header">
        <h2>Admin Dashboard</h2>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>

      <div className="tab-buttons">
        <button onClick={() => handleTabChange('users')} className="tab-btn">Users</button>
        <button onClick={() => handleTabChange('properties')} className="tab-btn">Properties</button>
        <button onClick={() => handleTabChange('reviews')} className="tab-btn">Reviews</button>
      </div>

      {activeTab === 'users' && (
        <div>
          <h3>All Users</h3>
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th><th>Name</th><th>Email</th><th>Phone</th><th>Role</th><th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.role}</td>
                  <td>
                    <button className="delete-btn" onClick={() => deleteUser(user.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'properties' && (
        <div>
          <h3>All Properties</h3>
          {Array.isArray(properties) && properties.map(property => (
            <div key={property.id} className="property-card">
              <div className="property-details">
                <h4>{property.name}</h4>
                <p><strong>Location:</strong> {property.location}</p>
                <p><strong>Rent:</strong> Rs. {property.rent}</p>
                <p><strong>Type:</strong> {property.room_type}</p>
                {property.room_type === 'shared' && (
                  <p><strong>No. of Beds:</strong> {property.number_of_beds}</p>
                )}
                <p><strong>Status:</strong> {property.approval_status}</p>
                <p><strong>Description:</strong> {property.description}</p>

                {property.images && property.images.length > 0 && (
                  <div className="property-images">
                    {property.images.map((img, index) => (
                      <img
                        key={index}
                        src={`http://localhost:5000/uploads/${img}`}
                        alt={`Property ${property.id}`}
                        className="property-image-thumbnail"
                      />
                    ))}
                  </div>
                )}

                <div className="action-buttons">
                  <button
                    className="approve-btn"
                    onClick={() => approveProperty(property.id)}
                    disabled={property.approval_status === 'approved'}
                  >
                    Approve
                  </button>
                  <button
                    className="reject-btn"
                    onClick={() => rejectProperty(property.id)}
                    disabled={property.approval_status === 'rejected'}
                  >
                    Reject
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => deleteProperty(property.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'reviews' && (
        <div>
          <h3>User Reviews on Properties</h3>
          {reviews.length === 0 ? (
            <p>No reviews found.</p>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Property</th>
                  <th>Rating</th>
                  <th>Review</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {reviews.map((review) => (
                  <tr key={review.id}>
                    <td>{review.user_name}</td>
                    <td>{review.property_name}</td>
                    <td>{review.rating}</td>
                    <td>{review.review}</td>
                    <td>{new Date(review.created_at).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
