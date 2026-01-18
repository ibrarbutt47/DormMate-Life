import { addPropertyRating, getPropertyRatings } from '../models/ratingModel.js';

// Add or update rating & review for a property
export const addRating = async (req, res) => {
  const userId = req.user.id;
  const { propertyId, rating, review } = req.body;

  if (!propertyId || !rating) {
    return res.status(400).json({ message: 'propertyId and rating are required' });
  }

  if (rating < 1 || rating > 5) {
    return res.status(400).json({ message: 'Rating must be between 1 and 5' });
  }

  try {
    await addPropertyRating(userId, propertyId, rating, review || '');
    res.status(201).json({ message: 'Rating added/updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to add rating', error: err.message });
  }
};

// Optional: Get all ratings for a property
export const getRatings = async (req, res) => {
  const { propertyId } = req.params;

  if (!propertyId) {
    return res.status(400).json({ message: 'propertyId is required' });
  }

  try {
    const ratings = await getPropertyRatings(propertyId);
    res.status(200).json(ratings);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get ratings', error: err.message });
  }
};
