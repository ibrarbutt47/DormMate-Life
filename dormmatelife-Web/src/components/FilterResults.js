// import React, { useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import './FilterResults.css';
// import Navbar from './Navbar';

// function FilterResult() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const filters = location.state;

//   const [rooms, setRooms] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     if (!filters) {
//       setError('No filter data provided.');
//       setLoading(false);
//       return;
//     }

//     console.log('Filters being sent to backend:', filters); // ✅ Debug log

//     const fetchFilteredRooms = async () => {
//       setLoading(true);
//       try {
//         const response = await fetch('http://localhost:5000/api/properties/filter', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(filters),
//         });

//         if (!response.ok) {
//           throw new Error('Failed to fetch filtered rooms');
//         }

//         const data = await response.json();
//         console.log('Received rooms:', data); // ✅ Debug log
//         setRooms(data);
//         setError('');
//       } catch (err) {
//         setError(err.message);
//         setRooms([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchFilteredRooms();
//   }, [filters]);

//   if (loading) return <p className="loading">Loading filtered rooms...</p>;
//   if (error) return <p className="error">{error}</p>;
//   if (rooms.length === 0) return <p className="no-results">No rooms matched your filters.</p>;

//   return (
//     <>
//       <Navbar />
//       <h2 className="filter-result-title">Filtered Rooms</h2>
//       <div className="properties-grid">
//         {rooms.map((room) => (
//           <div key={room.id} className="room-card">
//             <img
//               src={`http://localhost:5000/uploads/${room.images?.[0] || 'default.jpg'}`}
//               alt={room.name}
//               className="room-image"
//             />
//             <div className="room-details">
//               <h3>{room.name}</h3>
//               <p>{room.location}</p>
//               <p><strong>Rent:</strong> {room.rent} ({room.rent_type})</p>
//               <p><strong>Available From:</strong> {room.available_from}</p>
//               <p><strong>Type:</strong> {room.property_type}</p>
//               <div className="card-btn">
//                 <button
//                   className="details-btn"
//                   onClick={() => navigate('/property_details', { state: { property: room } })}
//                 >
//                   View Details
//                 </button>
//                 <button
//                   className="details-btn"
//                   onClick={() => navigate('/bookproperty', { state: { property: room } })}
//                 >
//                   Book Now
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// }

// export default FilterResult;


















// import React, { useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import './FilterResults.css';
// import Navbar from './Navbar';

// function FilterResult() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const filters = location.state;

//   const [rooms, setRooms] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     if (!filters) {
//       setError('No filter data provided.');
//       setLoading(false);
//       return;
//     }

//     const fetchFilteredRooms = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/api/properties/filter', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(filters),
//         });

//         if (!response.ok) throw new Error('Failed to fetch filtered rooms');
//         const data = await response.json();
//         setRooms(data);
//         setError('');
//       } catch (err) {
//         setError(err.message);
//         setRooms([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchFilteredRooms();
//   }, [filters]);

//   if (loading) return <p className="loading">Loading filtered rooms...</p>;
//   if (error) return <p className="error">{error}</p>;
//   if (rooms.length === 0) return <p className="no-results">No rooms matched your filters.</p>;

//   return (
//     <>
//       <Navbar />
//       <h2 className="filter-result-title">Filtered Rooms</h2>
//       <div className="properties-grid">
//         {rooms.map((room) => (
//           <div key={room.id} className="room-card">
//             <img
//               src={`http://localhost:5000/uploads/${room.images?.[0] || 'default.jpg'}`}
//               alt={room.name}
//               className="room-image"
//             />
//             <div className="room-details">
//               <h3>{room.name}</h3>
//               <p>{room.location}</p>
//               <p><strong>Rent:</strong> {room.rent} ({room.rent_type})</p>
//               <p><strong>Available From:</strong> {room.available_from}</p>
//               <p><strong>Type:</strong> {room.property_type}</p>
//               <div className="card-btn">
//                 <button
//                   className="details-btn"
//                   onClick={() => navigate('/property_details', { state: { property: room } })}
//                 >
//                   View Details
//                 </button>
//                 <button
//                   className="details-btn"
//                   onClick={() => navigate('/bookproperty', { state: { property: room } })}
//                 >
//                   Book Now
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// }

// export default FilterResult;












// import React, { useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import './FilterResults.css';
// import Navbar from './Navbar';

// function FilterResult() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const filters = location.state;

//   const [rooms, setRooms] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     if (!filters) {
//       setError('No filter data provided.');
//       setLoading(false);
//       navigate('/');
//       return;
//     }

//     console.log('Sending filters:', filters);

//     const fetchFilteredRooms = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/api/properties/filter', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(filters),
//         });

//         if (!response.ok) throw new Error('Failed to fetch filtered rooms');
//         const data = await response.json();
//         console.log('Received filtered data:', data);
//         setRooms(data);
//         setError('');
//       } catch (err) {
//         setError(err.message);
//         setRooms([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchFilteredRooms();
//   }, [filters, navigate]);

//   if (loading) return <p className="loading">Loading filtered rooms...</p>;
//   if (error) return <p className="error">{error}</p>;
//   if (rooms.length === 0) return <p className="no-results">No rooms matched your filters.</p>;

//   return (
//     <>
//       <Navbar />
//       <h2 className="filter-result-title">Filtered Rooms</h2>
//       <div className="properties-grid">
//         {rooms.map((room) => (
//           <div key={room.id} className="room-card">
//             <img
//               src={`http://localhost:5000/uploads/${room.images?.[0] || 'default.jpg'}`}
//               alt={room.property_name}
//               className="room-image"
//             />
//             <div className="room-details">
//               <h3>{room.property_name}</h3>
//               <p>{room.location}</p>
//               <p><strong>Rent:</strong> {room.rent} ({room.rent_type})</p>
//               <p><strong>Available From:</strong> {room.available_from}</p>
//               <p><strong>Type:</strong> {room.property_type}</p>
//               <div className="card-btn">
//                 <button
//                   className="details-btn"
//                   onClick={() => navigate('/property_details', { state: { property: room } })}
//                 >
//                   View Details
//                 </button>
//                 <button
//                   className="details-btn"
//                   onClick={() => navigate('/bookproperty', { state: { property: room } })}
//                 >
//                   Book Now
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// }

// export default FilterResult;

















import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './FilterResults.css';
import Navbar from './Navbar';

function FilterResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const filters = location.state;

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!filters) {
      setError('No filter data provided.');
      setLoading(false);
      navigate('/');
      return;
    }

    const fetchFilteredRooms = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/properties/filter', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(filters),
        });

        if (!response.ok) throw new Error('Failed to fetch filtered rooms');
        const data = await response.json();
        setRooms(data);
        setError('');
      } catch (err) {
        setError(err.message);
        setRooms([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFilteredRooms();
  }, [filters, navigate]);

  if (loading) return <p className="loading">Loading filtered rooms...</p>;
  if (error) return <p className="error">{error}</p>;
  if (rooms.length === 0) return <p className="no-results">No rooms matched your filters.</p>;

  return (
    <>
      <Navbar />
      <h2 className="filter-result-title">Filtered Rooms</h2>
      <div className="properties-grid">
        {rooms.map((room) => (
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
              <p><strong>Available From:</strong> {room.available_from}</p>
              <p><strong>Type:</strong> {room.property_type}</p>
              <div className="card-btn">
                <button
                  className="details-btn"
                  onClick={() => navigate('/property_details', { state: { property: room } })}
                >
                  View Details
                </button>
                <button
                  className="details-btn"
                  onClick={() => navigate('/bookproperty', { state: { property: room } })}
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default FilterResult;
