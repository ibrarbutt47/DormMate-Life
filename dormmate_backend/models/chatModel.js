// import db from '../config/db.js';

// const query = (sql, params) => {
//   return new Promise((resolve, reject) => {
//     db.query(sql, params, (err, results) => {
//       if (err) return reject(err);
//       resolve(results);
//     });
//   });
// };

// export const saveMessage = async (senderId, receiverId, message) => {
//   const sql = `INSERT INTO messages (sender_id, receiver_id, message) VALUES (?, ?, ?)`;
//   return query(sql, [senderId, receiverId, message]);
// };

// export const getConversation = async (user1, user2) => {
//   const sql = `
//     SELECT * FROM messages
//     WHERE (sender_id = ? AND receiver_id = ?)
//        OR (sender_id = ? AND receiver_id = ?)
//     ORDER BY timestamp ASC
//   `;
//   return query(sql, [user1, user2, user2, user1]);
// };









import db from '../config/db.js';

const query = (sql, params) => {
  return new Promise((resolve, reject) => {
    db.query(sql, params, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

export const saveMessage = async (senderId, receiverId, message) => {
  const sql = `INSERT INTO messages (sender_id, receiver_id, message) VALUES (?, ?, ?)`;
  return query(sql, [senderId, receiverId, message]);
};

export const getConversation = async (user1, user2) => {
  const sql = `
    SELECT * FROM messages
    WHERE (sender_id = ? AND receiver_id = ?)
       OR (sender_id = ? AND receiver_id = ?)
    ORDER BY timestamp ASC
  `;
  return query(sql, [user1, user2, user2, user1]);
};
