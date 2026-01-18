// export const calculateMatchScore = (currentUser, otherUser) => {
//   let score = 0;

//   const addScoreIfEqual = (a, b, value = 1) => a === b ? value : 0;

//   score += addScoreIfEqual(otherUser.role, currentUser.role, 2);
//   score += addScoreIfEqual(otherUser.cleanliness, currentUser.cleanliness);
//   score += addScoreIfEqual(otherUser.smoking, currentUser.smoking);
//   score += addScoreIfEqual(otherUser.sleeping_time, currentUser.sleeping_time);
//   score += (Math.abs(otherUser.budget - currentUser.budget) <= 2000) ? 2 : 0;
//   score += addScoreIfEqual(otherUser.gender_preference, currentUser.gender_preference);
//   score += addScoreIfEqual(otherUser.occupation, currentUser.occupation);
//   score += addScoreIfEqual(otherUser.food, currentUser.food);
//   score += addScoreIfEqual(otherUser.personality, currentUser.personality);
//   score += addScoreIfEqual(otherUser.talkativeness, currentUser.talkativeness);
//   score += addScoreIfEqual(otherUser.study_habits, currentUser.study_habits);
//   score += addScoreIfEqual(otherUser.guest_policy, currentUser.guest_policy);
//   score += addScoreIfEqual(otherUser.pets, currentUser.pets);

//   if (
//     currentUser.age_min && currentUser.age_max &&
//     otherUser.age_min && otherUser.age_max &&
//     otherUser.age_min <= currentUser.age_max &&
//     otherUser.age_max >= currentUser.age_min
//   ) {
//     score += 2;
//   }

//   return score;
// };












// export const calculateMatchScore = (currentUser, otherUser) => {
//   let score = 0;

//   const addScoreIfEqual = (a, b, value = 1) => a === b ? value : 0;

//   score += addScoreIfEqual(otherUser.role, currentUser.role, 2);
//   score += addScoreIfEqual(otherUser.cleanliness, currentUser.cleanliness);
//   score += addScoreIfEqual(otherUser.smoking, currentUser.smoking);
//   score += addScoreIfEqual(otherUser.sleeping_time, currentUser.sleeping_time);

//   // ✅ Add fallback for undefined
//   const userBudget = currentUser.budget ?? 0;
//   const otherBudget = otherUser.budget ?? 0;
//   score += (Math.abs(userBudget - otherBudget) <= 2000) ? 2 : 0;

//   score += addScoreIfEqual(otherUser.gender_preference, currentUser.gender_preference);
//   score += addScoreIfEqual(otherUser.occupation, currentUser.occupation);
//   score += addScoreIfEqual(otherUser.food, currentUser.food);
//   score += addScoreIfEqual(otherUser.personality, currentUser.personality);
//   score += addScoreIfEqual(otherUser.talkativeness, currentUser.talkativeness);
//   score += addScoreIfEqual(otherUser.study_habits, currentUser.study_habits);
//   score += addScoreIfEqual(otherUser.guest_policy, currentUser.guest_policy);
//   score += addScoreIfEqual(otherUser.pets, currentUser.pets);

//   if (
//     currentUser.age_min && currentUser.age_max &&
//     otherUser.age_min && otherUser.age_max &&
//     otherUser.age_min <= currentUser.age_max &&
//     otherUser.age_max >= currentUser.age_min
//   ) {
//     score += 2;
//   }

//   return score;
// };





// export const calculateMatchScore = (userPrefs1, userPrefs2) => {
//   let score = 0;

//   if (userPrefs1.cleanliness === userPrefs2.cleanliness) score += 10;
//   if (userPrefs1.smoking === userPrefs2.smoking) score += 10;
//   if (userPrefs1.sleeping_time === userPrefs2.sleeping_time) score += 10;
//   if (userPrefs1.occupation === userPrefs2.occupation) score += 10;
//   if (userPrefs1.food === userPrefs2.food) score += 5;
//   if (userPrefs1.personality === userPrefs2.personality) score += 5;
//   if (userPrefs1.talkativeness === userPrefs2.talkativeness) score += 5;
//   if (userPrefs1.study_habits === userPrefs2.study_habits) score += 5;
//   if (userPrefs1.guest_policy === userPrefs2.guest_policy) score += 5;
//   if (userPrefs1.pets === userPrefs2.pets) score += 5;

//   const budgetDifference = Math.abs(userPrefs1.budget - userPrefs2.budget);
//   if (budgetDifference <= 1000) score += 5;

//   return score; // ✅ Must return a number
// };










// export function calculateMatchScore(userPrefs, otherUser) {
//   let score = 0;
//   let total = 0;

//   const weight = {
//     cleanliness: 2,
//     smoking: 2,
//     sleeping_time: 2,
//     budget: 2,
//     gender_preference: 1,
//     occupation: 1,
//     food: 1,
//     personality: 1,
//     talkativeness: 1,
//     study_habits: 1,
//     guest_policy: 1,
//     pets: 1,
//     age_min: 1,
//     age_max: 1,
//   };

//   const stringFields = [
//     'cleanliness', 'smoking', 'sleeping_time', 'gender_preference',
//     'occupation', 'food', 'personality', 'talkativeness',
//     'study_habits', 'guest_policy', 'pets'
//   ];

//   for (let field of stringFields) {
//     total += weight[field];
//     if (
//       userPrefs[field] &&
//       otherUser[field] &&
//       userPrefs[field].toLowerCase() === otherUser[field].toLowerCase()
//     ) {
//       score += weight[field];
//     }
//   }

//   // Budget similarity scoring
//   if (userPrefs.budget && otherUser.budget) {
//     total += weight.budget;
//     const budgetDiff = Math.abs(parseFloat(userPrefs.budget) - parseFloat(otherUser.budget));
//     if (budgetDiff <= 1000) score += weight.budget;
//   }

//   // Age compatibility check
//   if (userPrefs.age_min && userPrefs.age_max) {
//     total += weight.age_min + weight.age_max;
//     const minAge = parseInt(userPrefs.age_min);
//     const maxAge = parseInt(userPrefs.age_max);

//     // You can improve this with actual user age if available
//     const withinRange = true; // Assuming always in range
//     if (withinRange) score += weight.age_min + weight.age_max;
//   }

//   const finalScore = total > 0 ? Math.round((score / total) * 100) : 0;
//   return finalScore;
// }













export const calculateMatchScore = (prefs1, prefs2) => {
  let total = 0;
  let matched = 0;

  const keys = [
    'cleanliness', 'smoking', 'sleeping_time', 'gender_preference',
    'occupation', 'food', 'personality', 'talkativeness',
    'study_habits', 'guest_policy', 'pets'
  ];

  keys.forEach(key => {
    if (prefs1[key] && prefs2[key]) {
      total++;
      if (prefs1[key] === prefs2[key]) {
        matched++;
      }
    }
  });

  // Budget match (within ±2000 range)
  if (prefs1.budget && prefs2.budget) {
    total++;
    const diff = Math.abs(prefs1.budget - prefs2.budget);
    if (diff <= 2000) matched++;
  }

  // Age range check
  if (prefs1.age_min && prefs1.age_max && prefs2.age_min && prefs2.age_max) {
    total++;
    const overlap = !(prefs1.age_max < prefs2.age_min || prefs1.age_min > prefs2.age_max);
    if (overlap) matched++;
  }

  return total > 0 ? Math.round((matched / total) * 100) : 0;
};

// ✅ NEW: Convert score to status
export const getMatchStatus = (score) => {
  if (score >= 80) return 'Excellent';
  if (score >= 60) return 'High';
  if (score >= 40) return 'Medium';
  return 'Low';
};
