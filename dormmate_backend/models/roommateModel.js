// Existing import and query helper
import db from '../config/db.js';

const query = (sql, params) => {
  return new Promise((resolve, reject) => {
    db.query(sql, params, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

export const createOrUpdatePreference = async (data) => {
  const sql = `
    INSERT INTO roommates (
      user_id, property_id, role, cleanliness, smoking, sleeping_time, budget,
      gender_preference, occupation, food, personality, talkativeness,
      study_habits, guest_policy, pets, age_min, age_max
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
      property_id = VALUES(property_id),
      role = VALUES(role),
      cleanliness = VALUES(cleanliness),
      smoking = VALUES(smoking),
      sleeping_time = VALUES(sleeping_time),
      budget = VALUES(budget),
      gender_preference = VALUES(gender_preference),
      occupation = VALUES(occupation),
      food = VALUES(food),
      personality = VALUES(personality),
      talkativeness = VALUES(talkativeness),
      study_habits = VALUES(study_habits),
      guest_policy = VALUES(guest_policy),
      pets = VALUES(pets),
      age_min = VALUES(age_min),
      age_max = VALUES(age_max)
  `;

  const params = [
    data.user_id, data.property_id, data.role, data.cleanliness, data.smoking,
    data.sleeping_time, data.budget, data.gender_preference, data.occupation,
    data.food, data.personality, data.talkativeness, data.study_habits,
    data.guest_policy, data.pets, data.age_min, data.age_max
  ];

  return query(sql, params);
};

export const getUserPreference = async (userId) => {
  const rows = await query('SELECT * FROM roommates WHERE user_id = ?', [userId]);
  return rows.length ? rows[0] : null;
};
export const getAllOthersPreferences = async (userId) => {
  return query(
    `SELECT r.*, u.name, u.email, u.phone, u.profile_picture 
     FROM roommates r 
     JOIN users u ON r.user_id = u.id 
     WHERE r.user_id != ?`,
    [userId]
  );
};

export const getAllPreferences = async () => {
  return query(
    `SELECT r.*, u.name, u.email, u.profile_picture 
     FROM roommates r 
     JOIN users u ON r.user_id = u.id`
  );
};
export const getRoommatePreferencesByUserId = async (userId) => {
  return query(
    `SELECT r.*, u.name, u.email, u.phone, u.profile_picture 
     FROM roommates r 
     JOIN users u ON r.user_id = u.id 
     WHERE r.user_id = ?`,
    [userId]
  );
};