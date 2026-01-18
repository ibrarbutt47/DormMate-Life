import propertyModel from '../models/propertyModel.js';
import propertyImageModel from '../models/propertyImageModel.js';
import { getPropertyRatings, getAverageRating } from '../models/ratingModel.js';
import { calculateMatchScore, getMatchStatus } from '../utils/matchScoring.js';

const getPropertyImages = async (propertyId) => {
  const images = await propertyImageModel.getImagesByPropertyId(propertyId);
  return images.map(row => row.image_url);
};

const enrichProperty = async (property, currentUserId = null) => {
  const images = await getPropertyImages(property.id);

  const reviews = await getPropertyRatings(property.id);
  const { average_rating, total_reviews } = await getAverageRating(property.id);

  property.images = images;
  property.ratings = {
    average: parseFloat(average_rating) || 0,
    total_reviews: total_reviews || 0,
    reviews: reviews || []
  };

  // Room Type Handling
  if (property.room_type === 'shared') {
    const bookedBeds = await propertyModel.getBookedBeds(property.id);
    property.bookedBeds = bookedBeds;
    property.status = bookedBeds >= property.number_of_beds ? 'Booked' : 'Available';

    const roommatePreferences = await propertyModel.getAllRoommatePreferencesForProperty(property.id);

    if (currentUserId) {
      const [prefs] = await propertyModel.getRoommatePreferencesByUserId(currentUserId);
      if (prefs) {
        property.roommatePreferences = roommatePreferences.map(otherUser => {
          const matchScore = calculateMatchScore(prefs, otherUser);
          const matchStatus = getMatchStatus(matchScore); // ✅ Status from score
          return {
            ...otherUser,
            matchScore,
            matchStatus // ✅ Add status
          };
        });
      } else {
        property.roommatePreferences = roommatePreferences;
      }
    } else {
      property.roommatePreferences = roommatePreferences;
    }
  } else if (property.room_type === 'private') {
    const isBooked = await propertyModel.isPrivateRoomBooked(property.id);
    property.status = isBooked ? 'Booked' : 'Available';
  } else {
    property.status = 'Available';
  }

  return property;
};

// =================== Controller Functions ===================

const getAllProperties = async (req, res) => {
  try {
    const currentUserId = req.user?.id || null;
    const properties = await propertyModel.getAllProperties();
    const enriched = await Promise.all(properties.map(p => enrichProperty(p, currentUserId)));
    res.status(200).json(enriched);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching properties', error: error.message });
  }
};

const getFilteredProperties = async (req, res) => {
  const { keyword, startDate, endDate, roomType } = req.query;
  try {
    const filters = { keyword, startDate, endDate, roomType };
    const currentUserId = req.user?.id || null;
    const properties = await propertyModel.getFilteredProperties(filters);
    const enriched = await Promise.all(properties.map(p => enrichProperty(p, currentUserId)));
    res.status(200).json(enriched);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching filtered properties', error: error.message });
  }
};

const getNearbyProperties = async (req, res) => {
  const { latitude, longitude, radius = 5 } = req.query;
  if (!latitude || !longitude) {
    return res.status(400).json({ message: 'Latitude and longitude are required' });
  }

  try {
    const currentUserId = req.user?.id || null;
    const properties = await propertyModel.findPropertiesNearby(latitude, longitude, radius);
    const enriched = await Promise.all(properties.map(p => enrichProperty(p, currentUserId)));
    res.status(200).json(enriched);
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching nearby properties', error: error.message });
  }
};

const getPropertiesByOwner = async (req, res) => {
  const owner_id = req.user.id;
  try {
    const properties = await propertyModel.getPropertiesByOwnerId(owner_id);
    const enriched = await Promise.all(properties.map(p => enrichProperty(p)));
    res.status(200).json(enriched);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching owner properties', error: error.message });
  }
};

const createProperty = async (req, res) => {
  const {
    name, location, description, rent, rent_type,
    available_from, available_to,
    latitude, longitude,
    account_number, account_type,
    email, phone, room_type, number_of_beds
  } = req.body;

  const owner_id = req.user.id;
  const images = req.files || [];

  try {
    const result = await propertyModel.createProperty(
      owner_id, name, description, location,
      rent, rent_type, available_from, available_to,
      latitude || null, longitude || null,
      account_number, account_type, email, phone,
      room_type, room_type === 'shared' ? number_of_beds : null
    );

    for (let file of images) {
      await propertyImageModel.addPropertyImage(result.insertId, file.filename);
    }

    res.status(201).json({ message: 'Property listed successfully!' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to list property.', error: err.message });
  }
};

export default {
  createProperty,
  getPropertiesByOwner,
  getAllProperties,
  getFilteredProperties,
  getNearbyProperties
};
