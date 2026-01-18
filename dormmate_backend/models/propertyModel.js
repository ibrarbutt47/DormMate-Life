import db from '../config/db.js';
const query = (sql, values) => {
  return new Promise((resolve, reject) => {
    db.query(sql, values, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};
const createProperty = (
  owner_id, name, description, location,
  rent, rent_type, available_from, available_to,
  latitude, longitude, account_number, account_type,
  email, phone, room_type, number_of_beds
) => {
  return query(`
    INSERT INTO properties
      (owner_id, name, description, location, rent, rent_type, available_from, available_to,
       latitude, longitude, account_number, account_type, email, phone, room_type, number_of_beds, approval_status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')
  `, [
    owner_id, name, description, location, rent, rent_type, available_from, available_to,
    latitude, longitude, account_number, account_type, email, phone, room_type, number_of_beds || null
  ]);
};

const getAllRoommatePreferencesForProperty = async (propertyId) => {
  const sql = `
    SELECT u.name, u.email, u.phone, u.profile_picture,
           r.cleanliness, r.smoking, r.sleeping_time, r.gender_preference,
           r.occupation, r.food, r.personality, r.talkativeness,
           r.study_habits, r.guest_policy, r.pets,
           r.age_min, r.age_max, r.budget
    FROM bookings b
    JOIN roommates r ON b.user_id = r.user_id
    JOIN users u ON u.id = b.user_id
    WHERE b.property_id = ? AND b.booking_status = 'confirmed' AND r.role = 'need_room'
  `;
  return await query(sql, [propertyId]);
};

const getRoommatePreferencesByUserId = async (userId) => {
  const sql = `
    SELECT cleanliness, smoking, sleeping_time, gender_preference,
           occupation, food, personality, talkativeness,
           study_habits, guest_policy, pets,
           age_min, age_max, budget
    FROM roommates
    WHERE user_id = ? AND role = 'need_room'
    LIMIT 1
  `;
  return await query(sql, [userId]);
};

const getAllProperties = () => {
  return query("SELECT * FROM properties WHERE approval_status = 'approved'");
};

const getPropertyById = (id) => {
  return query("SELECT * FROM properties WHERE id = ?", [id]).then(r => r[0]);
};
const getPropertiesByOwnerId = (ownerId) => {
  return query("SELECT * FROM properties WHERE owner_id = ?", [ownerId]);
};
const getFilteredProperties = (filters) => {
  const { keyword, startDate, endDate, roomType } = filters;
  let sql = "SELECT * FROM properties WHERE approval_status = 'approved'";
  const values = [];
  if (keyword) {
    sql += ' AND (name LIKE ? OR location LIKE ?)';
    values.push(`%${keyword}%`, `%${keyword}%`);
  }
  if (startDate && endDate) {
    sql += ' AND available_from <= ? AND available_to >= ?';
    values.push(startDate, endDate);
  }
  if (roomType) {
    sql += ' AND room_type = ?';
    values.push(roomType);
  }
  return query(sql, values);
};
const findPropertiesNearby = (lat, lng, radius) => {
  const sql = `
    SELECT *,
      (6371 * acos(cos(radians(?)) * cos(radians(latitude)) * 
      cos(radians(longitude) - radians(?)) + sin(radians(?)) * sin(radians(latitude)))) AS distance
    FROM properties
    WHERE approval_status = 'approved'
    HAVING distance <= ?
    ORDER BY distance
  `;
  return query(sql, [lat, lng, lat, radius]);
};

// ✅ Mark a property as approved
const approveProperty = (id) => {
  return query("UPDATE properties SET approval_status = 'approved' WHERE id = ?", [id]);
};

// ✅ Mark a property as rejected
const rejectProperty = (id) => {
  return query("UPDATE properties SET approval_status = 'rejected' WHERE id = ?", [id]);
};

// ✅ Count how many beds are booked for a shared room
const getBookedBeds = (propertyId) => {
  return query(
    "SELECT COUNT(*) AS bookedBeds FROM bookings WHERE property_id = ? AND booking_status = 'confirmed'",
    [propertyId]
  ).then(r => r[0].bookedBeds);
};

// ✅ Check if private room is already booked
const isPrivateRoomBooked = (propertyId) => {
  return query(
    "SELECT COUNT(*) AS count FROM bookings WHERE property_id = ? AND booking_status = 'confirmed'",
    [propertyId]
  ).then(r => r[0].count > 0);
};

export default {
  createProperty,
  getAllProperties,
  getPropertyById,
  getPropertiesByOwnerId,
  getFilteredProperties,
  findPropertiesNearby,
  approveProperty,
  rejectProperty,
  getBookedBeds,
  isPrivateRoomBooked,
  getAllRoommatePreferencesForProperty,
  getRoommatePreferencesByUserId
};
