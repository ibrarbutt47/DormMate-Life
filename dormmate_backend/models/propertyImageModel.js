import db from '../config/db.js';

const addPropertyImage = (property_id, image_url) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO property_images (property_id, image_url) VALUES (?, ?)';
    db.query(query, [property_id, image_url], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const getImagesByPropertyId = (property_id) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT image_url FROM property_images WHERE property_id = ?';
    db.query(query, [property_id], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

export default {
  addPropertyImage,
  getImagesByPropertyId
};
