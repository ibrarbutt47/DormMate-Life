
// import db from '../config/db.js';
// export const addPropertyRating = (userId, propertyId, rating, review) => {
//   return new Promise((resolve, reject) => {
//     const query = `
//       INSERT INTO property_ratings (user_id, property_id, rating, review)
//       VALUES (?, ?, ?, ?)
//       ON DUPLICATE KEY UPDATE rating = VALUES(rating), review = VALUES(review), created_at = CURRENT_TIMESTAMP
//     `;
//     db.query(query, [userId, propertyId, rating, review], (err, result) => {
//       if (err) return reject(err);
//       resolve(result);
//     });
//   });
// };

// // Fetch all ratings for a property
// export const getPropertyRatings = (propertyId) => {
//   return new Promise((resolve, reject) => {
//     const query = `
//       SELECT r.rating, r.review, r.created_at, u.name AS user_name
//       FROM property_ratings r
//       JOIN users u ON r.user_id = u.id
//       WHERE r.property_id = ?
//       ORDER BY r.created_at DESC
//     `;
//     db.query(query, [propertyId], (err, results) => {
//       if (err) return reject(err);
//       resolve(results);
//     });
//   });
// };











import db from '../config/db.js';

export const addPropertyRating = (userId, propertyId, rating, review) => {
  return new Promise((resolve, reject) => {
    const query = `
      INSERT INTO property_ratings (user_id, property_id, rating, review)
      VALUES (?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE rating = VALUES(rating), review = VALUES(review), created_at = CURRENT_TIMESTAMP
    `;
    db.query(query, [userId, propertyId, rating, review], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

export const getPropertyRatings = (propertyId) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT r.rating, r.review, r.created_at, u.name AS user_name
      FROM property_ratings r
      JOIN users u ON r.user_id = u.id
      WHERE r.property_id = ?
      ORDER BY r.created_at DESC
    `;
    db.query(query, [propertyId], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

export const getAverageRating = (propertyId) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT AVG(rating) AS average_rating, COUNT(*) AS total_reviews
      FROM property_ratings
      WHERE property_id = ?
    `;
    db.query(query, [propertyId], (err, results) => {
      if (err) return reject(err);
      resolve(results[0]);
    });
  });
};
