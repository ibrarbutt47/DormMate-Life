import db from '../config/db.js';

const getRatingsByPropertyId = async (propertyId) => {
  const [rows] = await db.query('SELECT rating, review FROM property_ratings WHERE property_id = ?', [propertyId]);
  return rows;
};

const getAverageRatingByPropertyId = async (propertyId) => {
  const [rows] = await db.query('SELECT AVG(rating) AS average_rating FROM property_ratings WHERE property_id = ?', [propertyId]);
  return rows[0];
};

export default { getRatingsByPropertyId, getAverageRatingByPropertyId };
