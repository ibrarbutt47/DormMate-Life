import db from '../config/db.js';
export const createBooking = (userId, propertyId, startDate, endDate, numPersons, numRooms) => {
  return new Promise((resolve, reject) => {
    const query = `
      INSERT INTO bookings (user_id, property_id, start_date, end_date, num_persons, num_rooms, booking_status)
      VALUES (?, ?, ?, ?, ?, ?, 'pending')
    `;
    db.query(query, [userId, propertyId, startDate, endDate, numPersons, numRooms], (err, result) => {
      if (err) return reject(err);
      resolve(result.insertId);
    });
  });
};

export const createPayment = (bookingId, amount, method) => {
  return new Promise((resolve, reject) => {
    const query = `
      INSERT INTO payments (booking_id, amount, method, payment_status)
      VALUES (?, ?, ?, 'completed')
    `;
    db.query(query, [bookingId, amount, method], (err, result) => {
      if (err) return reject(err);
      resolve(result.insertId);
    });
  });
};

export const getBookingsByOwner = (ownerId) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT b.*, p.name AS property_name, u.name AS user_name
      FROM bookings b
      JOIN properties p ON b.property_id = p.id
      JOIN users u ON b.user_id = u.id
      WHERE p.owner_id = ?
      ORDER BY b.booking_date DESC
    `;
    db.query(query, [ownerId], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

export const confirmBooking = (bookingId) => {
  return new Promise((resolve, reject) => {
    const query = `UPDATE bookings SET booking_status = 'confirmed' WHERE id = ?`;
    db.query(query, [bookingId], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

export const rejectBooking = (bookingId) => {
  return new Promise((resolve, reject) => {
    const query = `UPDATE bookings SET booking_status = 'rejected' WHERE id = ?`;
    db.query(query, [bookingId], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

export const getBookingsByUser = (userId) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT b.*, p.name AS property_name, p.location, p.rent AS property_rent
      FROM bookings b
      JOIN properties p ON b.property_id = p.id
      WHERE b.user_id = ?
      ORDER BY b.booking_date DESC
    `;
    db.query(query, [userId], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};
