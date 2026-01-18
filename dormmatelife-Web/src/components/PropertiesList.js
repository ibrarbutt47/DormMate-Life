// // // import React, { useState } from 'react';
// // // // import axios from 'axios';
// // // import './PropertiesList.css';

// // // function PropertiesList() {
// // //   const [properties] = useState([]);
// // //   const [loading] = useState(true);
// // //   const [error] = useState('');

// // //   // useEffect(() => {
// // //   //   axios
// // //   //     .get('http://localhost:5000/api/properties')
// // //   //     .then((response) => {
// // //   //       setProperties(response.data);
// // //   //       setLoading(false); 
// // //   //     })
// // //   //     .catch((err) => {
// // //   //       setError('Error fetching properties');
// // //   //       setLoading(false);
// // //   //     });
// // //   // }, []);

// // //   if (loading) {
// // //     return <div>Loading properties...</div>;
// // //   }

// // //   if (error) {
// // //     return <div>{error}</div>;
// // //   }

// // //   return (
// // //     <div className="properties-list-container">
// // //       <h2>Available Properties</h2>
// // //       <div className="properties-list">
// // //         {properties.map((property) => (
// // //           <div className="property-card" key={property.id}>
// // //             <img
// // //               src={`http://localhost:5000/uploads/${property.image}`}
// // //               alt={property.propertyName}
// // //               className="property-image"
// // //             />
// // //             <div className="property-details">
// // //               <h3>{property.propertyName}</h3>
// // //               <p>{property.location}</p>
// // //               <p>{property.propertyType}</p>
// // //               <p>{property.description}</p>
// // //               <p>Rent: {property.rent} per month</p>
// // //               <p>Contact: {property.email}</p>
// // //               <p>Phone: {property.phone}</p>
// // //             </div>
// // //           </div>
// // //         ))}
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // export default PropertiesList;





// // import React, { useState } from 'react';
// // import './PropertiesList.css';

// // function PropertiesList() {
// //   const [properties] = useState([
// //     {
// //       id: 1,
// //       image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be',
// //       propertyName: 'Modern Studio Apartment',
// //       location: 'Downtown City',
// //       propertyType: 'Studio',
// //       description: 'A cozy studio apartment with natural light, near shops.',
// //       rent: '$850',
// //       email: 'owner1@example.com',
// //       phone: '123-456-7890',
// //       rating: 4.5,
// //     },
// //     {
// //       id: 2,
// //       image: 'https://images.unsplash.com/photo-1599423300746-b62533397364',
// //       propertyName: 'Shared Room with Balcony',
// //       location: 'Near University',
// //       propertyType: 'Shared Room',
// //       description: 'Spacious shared room with a beautiful view.',
// //       rent: '$600',
// //       email: 'owner2@example.com',
// //       phone: '987-654-3210',
// //       rating: 4.2,
// //     },
// //     {
// //       id: 3,
// //       image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
// //       propertyName: 'Private Room in Apartment',
// //       location: 'Midtown',
// //       propertyType: 'Private Room',
// //       description: 'Private room with attached bath in 2BHK apartment.',
// //       rent: '$700',
// //       email: 'owner3@example.com',
// //       phone: '456-789-0123',
// //       rating: 4.8,
// //     }
// //   ]);

// //   return (
// //     <div className="properties-list-container">
// //       <h2>Available Properties</h2>
// //       <div className="properties-list">
// //         {properties.map((property) => (
// //           <div className="property-card" key={property.id}>
// //             <img
// //               src={property.image}
// //               alt={property.propertyName}
// //               className="property-image"
// //             />
// //             <div className="property-details">
// //               <h3>{property.propertyName}</h3>
// //               <p>{property.location}</p>
// //               <p><strong>Type:</strong> {property.propertyType}</p>
// //               <p>{property.description}</p>
// //               <p><strong>Rent:</strong> {property.rent} /month</p>
// //               <p><strong>Contact:</strong> {property.email}</p>
// //               <p><strong>Phone:</strong> {property.phone}</p>
// //               <p className="rating">⭐ {property.rating}</p>
// //             </div>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }

// // export default PropertiesList;







// // import React, { useState } from 'react';
// // import './PropertiesList.css';

// // function PropertiesList() {
// //   const [search, setSearch] = useState('');
// //   const [startDate, setStartDate] = useState('');
// //   const [endDate, setEndDate] = useState('');
// //   const [persons, setPersons] = useState(1);

// //   const [properties] = useState([
// //     {
// //       id: 1,
// //       image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be',
// //       propertyName: 'Modern Studio Apartment',
// //       location: 'Downtown City',
// //       propertyType: 'Studio',
// //       description: 'A cozy studio apartment with natural light, near shops.',
// //       rent: '$850',
// //       email: 'owner1@example.com',
// //       phone: '123-456-7890',
// //       rating: 4.5,
// //     },
// //     {
// //       id: 2,
// //       image: 'https://images.unsplash.com/photo-1599423300746-b62533397364',
// //       propertyName: 'Shared Room with Balcony',
// //       location: 'Near University',
// //       propertyType: 'Shared Room',
// //       description: 'Spacious shared room with a beautiful view.',
// //       rent: '$600',
// //       email: 'owner2@example.com',
// //       phone: '987-654-3210',
// //       rating: 4.2,
// //     },
// //     {
// //       id: 3,
// //       image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
// //       propertyName: 'Private Room in Apartment',
// //       location: 'Midtown',
// //       propertyType: 'Private Room',
// //       description: 'Private room with attached bath in 2BHK apartment.',
// //       rent: '$700',
// //       email: 'owner3@example.com',
// //       phone: '456-789-0123',
// //       rating: 4.8,
// //     }
// //   ]);

// //   return (
// //     <div className="properties-list-container">
// //       <div className="property-filter-bar">
// //         <input
// //           type="text"
// //           placeholder="Search location..."
// //           value={search}
// //           onChange={(e) => setSearch(e.target.value)}
// //         />
// //         <input
// //           type="date"
// //           value={startDate}
// //           onChange={(e) => setStartDate(e.target.value)}
// //         />
// //         <input
// //           type="date"
// //           value={endDate}
// //           onChange={(e) => setEndDate(e.target.value)}
// //         />
// //         <input
// //           type="number"
// //           min="1"
// //           value={persons}
// //           onChange={(e) => setPersons(e.target.value)}
// //           placeholder="Persons"
// //         />
// //         <button>Search</button>
// //       </div>

// //       <h2>Available Properties</h2>
// //       <div className="properties-list">
// //         {properties.map((property) => (
// //           <div className="property-card" key={property.id}>
// //             <img
// //               src={property.image}
// //               alt={property.propertyName}
// //               className="property-image"
// //             />
// //             <div className="property-details">
// //               <h3>{property.propertyName}</h3>
// //               <p>{property.location}</p>
// //               <p><strong>Type:</strong> {property.propertyType}</p>
// //               <p>{property.description}</p>
// //               <p><strong>Rent:</strong> {property.rent} /month</p>
// //               <p><strong>Contact:</strong> {property.email}</p>
// //               <p><strong>Phone:</strong> {property.phone}</p>
// //               <p className="rating">⭐ {property.rating}</p>
// //             </div>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }

// // export default PropertiesList;











// // import React, { useState } from 'react';
// // import './PropertiesList.css';

// // function PropertiesList() {
// //   const [search, setSearch] = useState('');
// //   const [startDate, setStartDate] = useState('');
// //   const [endDate, setEndDate] = useState('');
// //   const [persons, setPersons] = useState(1);

// //   const [properties] = useState([
// //     {
// //       id: 1,
// //       image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be',
// //       propertyName: 'Modern Studio Apartment',
// //       location: 'Downtown City',
// //       propertyType: 'Studio',
// //       description: 'A cozy studio apartment with natural light, near shops.',
// //       rent: '$850',
// //       email: 'owner1@example.com',
// //       phone: '123-456-7890',
// //       rating: 4.5,
// //     },
// //     {
// //       id: 2,
// //       image: 'https://images.unsplash.com/photo-1599423300746-b62533397364',
// //       propertyName: 'Shared Room with Balcony',
// //       location: 'Near University',
// //       propertyType: 'Shared Room',
// //       description: 'Spacious shared room with a beautiful view.',
// //       rent: '$600',
// //       email: 'owner2@example.com',
// //       phone: '987-654-3210',
// //       rating: 4.2,
// //     },
// //     {
// //       id: 3,
// //       image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
// //       propertyName: 'Private Room in Apartment',
// //       location: 'Midtown',
// //       propertyType: 'Private Room',
// //       description: 'Private room with attached bath in 2BHK apartment.',
// //       rent: '$700',
// //       email: 'owner3@example.com',
// //       phone: '456-789-0123',
// //       rating: 4.8,
// //     }
// //   ]);

// //   return (
// //     <div className="properties-list-container">
// //       <div className="property-filter-bar">
// //         <div className="form-group">
// //           <label>Location</label>
// //           <input
// //             type="text"
// //             placeholder="Enter city or area"
// //             value={search}
// //             onChange={(e) => setSearch(e.target.value)}
// //           />
// //         </div>
// //         <div className="form-group">
// //           <label>Start Date</label>
// //           <input
// //             type="date"
// //             value={startDate}
// //             onChange={(e) => setStartDate(e.target.value)}
// //           />
// //         </div>
// //         <div className="form-group">
// //           <label>End Date</label>
// //           <input
// //             type="date"
// //             value={endDate}
// //             onChange={(e) => setEndDate(e.target.value)}
// //           />
// //         </div>
// //         <div className="form-group">
// //           <label>No. of Persons</label>
// //           <input
// //             type="number"
// //             min="1"
// //             value={persons}
// //             onChange={(e) => setPersons(e.target.value)}
// //             placeholder="1"
// //           />
// //         </div>
// //         <div className="form-group">
// //           <label>&nbsp;</label> {/* Empty label for alignment */}
// //           <button>Search</button>
// //         </div>
// //       </div>

// //       <h2>Available Properties</h2>
// //       <div className="properties-list">
// //         {properties.map((property) => (
// //           <div className="property-card" key={property.id}>
// //             <img
// //               src={property.image}
// //               alt={property.propertyName}
// //               className="property-image"
// //             />
// //             <div className="property-details">
// //               <h3>{property.propertyName}</h3>
// //               <p>{property.location}</p>
// //               <p><strong>Type:</strong> {property.propertyType}</p>
// //               <p>{property.description}</p>
// //               <p><strong>Rent:</strong> {property.rent} /month</p>
// //               <p><strong>Contact:</strong> {property.email}</p>
// //               <p><strong>Phone:</strong> {property.phone}</p>
// //               <p className="rating">⭐ {property.rating}</p>
// //             </div>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }

// // export default PropertiesList;









// import React, { useState } from 'react';
// import './PropertiesList.css';
// import { Link } from 'react-router-dom';
// import { FaSearch } from 'react-icons/fa'; // ✅ Import the search icon

// function PropertiesList() {
//   const [search, setSearch] = useState('');
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [persons, setPersons] = useState(1);

//   const [properties] = useState([
//     {
//       id: 1,
//       image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be',
//       propertyName: 'Modern Studio Apartment',
//       location: 'Downtown City',
//       propertyType: 'Studio',
//       description: 'A cozy studio apartment with natural light, near shops.',
//       rent: '$850',
//       email: 'owner1@example.com',
//       phone: '123-456-7890',
//       rating: 4.5,
//     },
//     {
//       id: 2,
//       image: 'https://images.unsplash.com/photo-1599423300746-b62533397364',
//       propertyName: 'Shared Room with Balcony',
//       location: 'Near University',
//       propertyType: 'Shared Room',
//       description: 'Spacious shared room with a beautiful view.',
//       rent: '$600',
//       email: 'owner2@example.com',
//       phone: '987-654-3210',
//       rating: 4.2,
//     },
//     {
//       id: 3,
//       image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
//       propertyName: 'Private Room in Apartment',
//       location: 'Midtown',
//       propertyType: 'Private Room',
//       description: 'Private room with attached bath in 2BHK apartment.',
//       rent: '$700',
//       email: 'owner3@example.com',
//       phone: '456-789-0123',
//       rating: 4.8,
//     }
//   ]);

//   return (
//     <div className="properties-list-container">
//       <div className="property-filter-bar">
//         <div className="form-group">
//           <label>Location</label>
//           <input
//             type="text"
//             placeholder="Enter city or area"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//         </div>
//         <div className="form-group">
//           <label>Start Date</label>
//           <input
//             type="date"
//             value={startDate}
//             onChange={(e) => setStartDate(e.target.value)}
//           />
//         </div>
//         <div className="form-group">
//           <label>End Date</label>
//           <input
//             type="date"
//             value={endDate}
//             onChange={(e) => setEndDate(e.target.value)}
//           />
//         </div>
//         <div className="form-group">
//           <label>No. of Persons</label>
//           <input
//             type="number"
//             min="1"
//             value={persons}
//             onChange={(e) => setPersons(e.target.value)}
//             placeholder="1"
//           />
//         </div>
//         <div className="form-group search-icon-btn">
//           <label>&nbsp;</label>
//           <button>
           
//             <Link to="/search"><FaSearch className="icon" /> </Link>

//           </button>
//         </div>
//       </div>

//       <h2>Available Properties</h2>
//       <div className="properties-list">
//         {properties.map((property) => (
//           <div className="property-card" key={property.id}>
//             <img
//               src={property.image}
//               alt={property.propertyName}
//               className="property-image"
//             />
//             <div className="property-details">
//               <h3>{property.propertyName}</h3>
//               <p>{property.location}</p>
//               <p><strong>Type:</strong> {property.propertyType}</p>
//               <p>{property.description}</p>
//               <p><strong>Rent:</strong> {property.rent} /month</p>
//               <p><strong>Contact:</strong> {property.email}</p>
//               <p><strong>Phone:</strong> {property.phone}</p>
//               <p className="rating">⭐ {property.rating}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default PropertiesList;
