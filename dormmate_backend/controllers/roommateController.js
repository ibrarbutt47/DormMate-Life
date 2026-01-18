// import roommateModel from '../models/roommateModel.js';

export const getMyPreferences = async (req, res) => {
  try {
    const userId = req.user.id;
    const preferences = await roommateModel.getRoommatePreferencesByUserId(userId);

    if (!preferences || preferences.length === 0) {
      return res.status(404).json({ message: 'Preferences not found' });
    }

    res.status(200).json(preferences[0]); // Return the preference object
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error while fetching preferences' });
  }
};

import * as roommateModel from '../models/roommateModel.js';

export const checkUserPreferences = async (req, res) => {
  const userId = req.user.id;
  try {
    const pref = await roommateModel.getUserPreference(userId);
    if (pref) {
      res.status(200).json({ hasPreferences: true });
    } else {
      res.status(200).json({ hasPreferences: false });
    }
  } catch (err) {
    console.error("Error checking preferences:", err);
    res.status(500).json({ message: "Server error checking preferences." });
  }
};

// 🚀 NEW FUNCTION that was missing
export const submitPreferences = async (req, res) => {
  const userId = req.user.id; // make sure your auth middleware sets req.user
  const data = {
    user_id: userId,
    property_id: req.body.property_id || null, // Optional
    role: req.body.role,
    cleanliness: req.body.cleanliness,
    smoking: req.body.smoking,
    sleeping_time: req.body.sleeping_time,
    budget: req.body.budget,
    gender_preference: req.body.gender_preference,
    occupation: req.body.occupation,
    food: req.body.food,
    personality: req.body.personality,
    talkativeness: req.body.talkativeness,
    study_habits: req.body.study_habits,
    guest_policy: req.body.guest_policy,
    pets: req.body.pets,
    age_min: req.body.age_min,
    age_max: req.body.age_max
  };

  try {
    await roommateModel.createOrUpdatePreference(data);
    res.status(200).json({ message: 'Preferences submitted successfully.' });
  } catch (err) {
    console.error('❌ Error submitting preferences:', err);
    res.status(500).json({ message: 'Server error submitting preferences.' });
  }
};

export const getPotentialMatches = async (req, res) => {
  const userId = req.user.id;

  try {
    const currentUser = await roommateModel.getUserPreference(userId);
    if (!currentUser) return res.status(404).json({ message: 'Submit your preferences first.' });

    const others = await roommateModel.getAllOthersPreferences(userId);
    const scored = others.map((person) => {
  const score = calculateMatchScore(currentUser, person);
  return {
    user_id: person.user_id,
    name: person.name,
    email: person.email,
    phone: person.phone, // 🆕 ADD THIS LINE
    profile_picture: person.profile_picture,
    matchScore: score,
    role: person.role,
    cleanliness: person.cleanliness,
    smoking: person.smoking,
    sleeping_time: person.sleeping_time,
    budget: person.budget,
    gender_preference: person.gender_preference,
    occupation: person.occupation,
    food: person.food,
    personality: person.personality,
    talkativeness: person.talkativeness,
    study_habits: person.study_habits,
    guest_policy: person.guest_policy,
    pets: person.pets,
    age_min: person.age_min,
    age_max: person.age_max,
  };
});

    const sorted = scored.sort((a, b) => b.matchScore - a.matchScore);
    res.status(200).json(sorted);
  } catch (err) {
    console.error("❌ Error fetching matches:", err);
    res.status(500).json({ message: 'Server error matching roommates.' });
  }
};

export const getAllPreferences = async (req, res) => {
  try {
    const preferences = await roommateModel.getAllPreferences();
    const result = preferences.map((pref) => ({
      user_id: pref.user_id,
      name: pref.name,
      email: pref.email,
      profile_picture: pref.profile_picture,
      role: pref.role,
      cleanliness: pref.cleanliness,
      smoking: pref.smoking,
      sleeping_time: pref.sleeping_time,
      budget: pref.budget,
      gender_preference: pref.gender_preference,
      occupation: pref.occupation,
      food: pref.food,
      personality: pref.personality,
      talkativeness: pref.talkativeness,
      study_habits: pref.study_habits,
      guest_policy: pref.guest_policy,
      pets: pref.pets,
      age_min: pref.age_min,
      age_max: pref.age_max
    }));

    res.status(200).json(result);
  } catch (error) {
    console.error('❌ Error getting preferences:', error);
    res.status(500).json({ message: 'Server error fetching preferences.' });
  }
};

// 🧠 You must define or import this utility
function calculateMatchScore(current, other) {
  // simple scoring logic
  let score = 0;

  if (current.cleanliness === other.cleanliness) score += 10;
  if (current.smoking === other.smoking) score += 10;
  if (current.sleeping_time === other.sleeping_time) score += 10;
  if (current.gender_preference === other.gender_preference) score += 5;
  if (current.food === other.food) score += 5;
  if (current.personality === other.personality) score += 5;
  if (current.talkativeness === other.talkativeness) score += 5;
  if (current.study_habits === other.study_habits) score += 5;
  if (current.guest_policy === other.guest_policy) score += 5;
  if (current.pets === other.pets) score += 5;

  return score;
}

