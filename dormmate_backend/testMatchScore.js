// utils/matchScoring.js
function calculateMatchScore(userPrefs, otherUser) {
  let score = 0;
  let total = 0;

  const weight = {
    cleanliness: 2,
    smoking: 2,
    sleeping_time: 2,
    budget: 2,
    gender_preference: 1,
    occupation: 1,
    food: 1,
    personality: 1,
    talkativeness: 1,
    study_habits: 1,
    guest_policy: 1,
    pets: 1,
    age_min: 1,
    age_max: 1,
  };

  const stringFields = [
    'cleanliness', 'smoking', 'sleeping_time', 'gender_preference',
    'occupation', 'food', 'personality', 'talkativeness',
    'study_habits', 'guest_policy', 'pets'
  ];

  for (let field of stringFields) {
    total += weight[field];
    if (
      userPrefs[field] &&
      otherUser[field] &&
      userPrefs[field].toLowerCase() === otherUser[field].toLowerCase()
    ) {
      score += weight[field];
    }
  }

  // Budget similarity
  if (userPrefs.budget && otherUser.budget) {
    total += weight.budget;
    const diff = Math.abs(userPrefs.budget - otherUser.budget);
    if (diff <= 1000) score += weight.budget;
  }

  // Age range check
  if (userPrefs.age_min && userPrefs.age_max) {
    total += weight.age_min + weight.age_max;
    const minAge = parseInt(userPrefs.age_min);
    const maxAge = parseInt(userPrefs.age_max);
    const withinRange = true; // Always true for testing, or replace with actual age comparison
    if (withinRange) score += weight.age_min + weight.age_max;
  }

  return total > 0 ? Math.round((score / total) * 100) : 0;
}

// Test Data
const currentUserPrefs = {
  cleanliness: 'high',
  smoking: 'no',
  sleeping_time: 'early',
  gender_preference: 'any',
  occupation: 'student',
  food: 'vegetarian',
  personality: 'introvert',
  talkativeness: 'low',
  study_habits: 'regular',
  guest_policy: 'strict',
  pets: 'no',
  age_min: 20,
  age_max: 30,
  budget: 10000,
};

const roommatePrefs = {
  cleanliness: 'high',
  smoking: 'no',
  sleeping_time: 'early',
  gender_preference: 'any',
  occupation: 'student',
  food: 'vegetarian',
  personality: 'introvert',
  talkativeness: 'low',
  study_habits: 'regular',
  guest_policy: 'strict',
  pets: 'no',
  age_min: 22,
  age_max: 29,
  budget: 9500,
};

// Run Test
const score = calculateMatchScore(currentUserPrefs, roommatePrefs);
console.log('✅ Match Score:', score, '%');
