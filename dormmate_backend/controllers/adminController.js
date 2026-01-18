// import db from '../config/db.js';

// // Get all users
// export const getAllUsers = (req, res) => {
//   const query = 'SELECT id, name, email, phone, role FROM users';
//   db.query(query, (err, results) => {
//     if (err) return res.status(500).json({ error: 'Failed to fetch users' });
//     res.status(200).json(results);
//   });
// };

// // Get all properties
// export const getAllProperties = (req, res) => {
//   const query = 'SELECT * FROM properties';
//   db.query(query, (err, results) => {
//     if (err) return res.status(500).json({ error: 'Failed to fetch properties' });
//     res.status(200).json(results);
//   });
// };

// // Delete a user
// export const deleteUser = (req, res) => {
//   const userId = req.params.id;
//   const query = 'DELETE FROM users WHERE id = ?';
//   db.query(query, [userId], (err, result) => {
//     if (err) return res.status(500).json({ error: 'Failed to delete user' });
//     res.status(200).json({ message: 'User deleted successfully' });
//   });
// };

// // Delete a property
// export const deleteProperty = (req, res) => {
//   const propertyId = req.params.id;
//   const query = 'DELETE FROM properties WHERE id = ?';
//   db.query(query, [propertyId], (err, result) => {
//     if (err) return res.status(500).json({ error: 'Failed to delete property' });
//     res.status(200).json({ message: 'Property deleted successfully' });
//   });
// };












import verifyToken from '../middleware/authMiddleware.js'; // ✅ Import token middleware
import isAdmin from '../middleware/isAdminMiddleware.js';  // ✅ If you’re using admin check

import propertyModel from '../models/propertyModel.js';
import db from '../config/db.js';


export const getAllReviews = (req, res) => {
  const query = `
    SELECT 
      pr.id,
      pr.rating,
      pr.review,
      pr.created_at,
      u.name AS user_name,
      p.name AS property_name
    FROM property_ratings pr
    JOIN users u ON pr.user_id = u.id
    JOIN properties p ON pr.property_id = p.id
    ORDER BY pr.created_at DESC
  `;

  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch reviews', details: err.message });
    res.status(200).json(results);
  });
};
export const approveProperty = async (req, res) => {
  const id = req.params.id;
  try {
    await propertyModel.approveProperty(id);
    res.status(200).json({ message: 'Property approved successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to approve property', details: err.message });
  }
};

export const rejectProperty = async (req, res) => {
  const id = req.params.id;
  try {
    await propertyModel.rejectProperty(id);
    res.status(200).json({ message: 'Property rejected successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to reject property', details: err.message });
  }
};

export const getAllUsers = (req, res) => {
const query = "SELECT id, name, email, phone, role FROM users WHERE role != 'admin'";

  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch users' });
    res.status(200).json(results);
  });
};
export const getAllProperties = (req, res) => {
  const query = 'SELECT * FROM properties';
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch properties' });
    res.status(200).json(results);
  });
};
export const deleteUser = (req, res) => {
  const userId = req.params.id;
  if (!userId || isNaN(userId)) return res.status(400).json({ error: 'Invalid user ID' });

  const query = 'DELETE FROM users WHERE id = ?';
  db.query(query, [userId], (err) => {
    if (err) return res.status(500).json({ error: 'Failed to delete user', details: err.message });
    res.status(200).json({ message: 'User deleted successfully' });
  });
};

// Delete a property
export const deleteProperty = (req, res) => {
  const propertyId = req.params.id;
  if (!propertyId || isNaN(propertyId)) return res.status(400).json({ error: 'Invalid property ID' });

  const query = 'DELETE FROM properties WHERE id = ?';
  db.query(query, [propertyId], (err) => {
    if (err) return res.status(500).json({ error: 'Failed to delete property', details: err.message });
    res.status(200).json({ message: 'Property deleted successfully' });
  });
};
