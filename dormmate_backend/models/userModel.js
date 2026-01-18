// import db from '../config/db.js';

// export const findUserByEmail = (email, callback) => {
//   const query = 'SELECT * FROM users WHERE email = ?';
//   db.query(query, [email], callback);
// };
// export const checkRoommatePreferences = (userId, callback) => {
//   const query = 'SELECT * FROM roommates WHERE user_id = ?';
//   db.query(query, [userId], (err, results) => {
//     if (err) return callback(err);
//     const preferencesSaved = results.length > 0;
//     callback(null, preferencesSaved);
//   });
// };

// export const createUser = (name, email, hashedPassword, phone, image, callback) => {
//   const query = 'INSERT INTO users (name, email, password, phone, profile_picture ) VALUES (?, ?, ?, ?, ?)';
//   db.query(query, [name, email, hashedPassword, phone, image], callback);
// };











import db from '../config/db.js';

export const findUserByEmail = (email, callback) => {
  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], callback);
};

export const checkRoommatePreferences = (userId, callback) => {
  const query = 'SELECT * FROM roommates WHERE user_id = ?';
  db.query(query, [userId], (err, results) => {
    if (err) return callback(err);
    const preferencesSaved = results.length > 0;
    callback(null, preferencesSaved);
  });
};

// Now takes 'role' as an argument
export const createUser = (name, email, hashedPassword, phone, image, role, callback) => {
  const query = `
    INSERT INTO users (name, email, password, phone, profile_picture, role)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  db.query(query, [name, email, hashedPassword, phone, image, role], callback);
};
