// import React, { useState } from "react";
// import "./RoommatePreferencesForm.css";
// // import Navbar from "../components/Navbar";
// import { useNavigate } from 'react-router-dom';

// const RoommatePreferencesForm = () => {
//   const [formData, setFormData] = useState({
//     role: "need_room",
//     cleanliness: "average",
//     smoking: "non_smoker",
//     sleeping_time: "early",
//     budget: "",
//     property_id: "",
//     gender_preference: "any",
//     occupation: "student",
//     food: "any",
//     personality: "introvert",
//     talkativeness: "moderate",
//     study_habits: "regular",
//     guest_policy: "occasional",
//     pets: "no",
//     age_min: "",
//     age_max: ""
//   });

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const token = localStorage.getItem("token");

//       if (!token) {
//         alert("You are not logged in. Please login first.");
//         navigate("/login");
//         return;
//       }

//       const response = await fetch("http://localhost:5000/api/roommate/preferences", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`
//         },
//         body: JSON.stringify(formData)
//       });

//       const data = await response.json();

//       if (response.ok) {
//         alert("Preferences saved successfully!");
//         navigate("/properties");
//       } else {
//         alert(data.message || "Something went wrong");
//       }
//     } catch (error) {
//       console.error("Submission error:", error);
//       alert("Error submitting preferences. Please try again later.");
//     }
//   };

//   return (
//     <>
//       {/* <Navbar /> */}
//       <div className="form-container">
//         <h2 className="form-title">Roommate Preferences</h2>
//         <form onSubmit={handleSubmit} className="form">
//           <div className="form-group">
//             <label>Your Role</label>
//             <select name="role" value={formData.role} onChange={handleChange}>
//               <option value="has_room">I have a room</option>
//               <option value="need_room">I need a room</option>
//             </select>
//           </div>

//           {formData.role === "has_room" && (
//             <div className="form-group">
//               <label>Your Property ID</label>
//               <input
//                 type="number"
//                 name="property_id"
//                 value={formData.property_id}
//                 onChange={handleChange}
//                 placeholder="Enter your Property ID"
//                 required
//               />
//             </div>
//           )}

//           <div className="form-group">
//             <label>Cleanliness</label>
//             <select name="cleanliness" value={formData.cleanliness} onChange={handleChange}>
//               <option value="very_clean">Very Clean</option>
//               <option value="average">Average</option>
//               <option value="messy">Messy</option>
//             </select>
//           </div>

//           <div className="form-group">
//             <label>Smoking Preference</label>
//             <select name="smoking" value={formData.smoking} onChange={handleChange}>
//               <option value="non_smoker">Non-smoker</option>
//               <option value="smoker">Smoker</option>
//             </select>
//           </div>

//           <div className="form-group">
//             <label>Sleeping Habit</label>
//             <select name="sleeping_time" value={formData.sleeping_time} onChange={handleChange}>
//               <option value="early">Sleeps Early</option>
//               <option value="late">Sleeps Late</option>
//             </select>
//           </div>

//           <div className="form-group">
//             <label>Monthly Budget (PKR)</label>
//             <input
//               type="number"
//               name="budget"
//               value={formData.budget}
//               onChange={handleChange}
//               placeholder="Enter your budget"
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label>Gender Preference</label>
//             <select name="gender_preference" value={formData.gender_preference} onChange={handleChange}>
//               <option value="any">Any</option>
//               <option value="male">Male</option>
//               <option value="female">Female</option>
//             </select>
//           </div>

//           <div className="form-group">
//             <label>Occupation</label>
//             <select name="occupation" value={formData.occupation} onChange={handleChange}>
//               <option value="student">Student</option>
//               <option value="professional">Working Professional</option>
//               <option value="freelancer">Freelancer</option>
//             </select>
//           </div>

//           <div className="form-group">
//             <label>Food Preference</label>
//             <select name="food" value={formData.food} onChange={handleChange}>
//               <option value="any">Any</option>
//               <option value="vegetarian">Vegetarian</option>
//               <option value="non_vegetarian">Non-Vegetarian</option>
//             </select>
//           </div>

//           <div className="form-group">
//             <label>Personality</label>
//             <select name="personality" value={formData.personality} onChange={handleChange}>
//               <option value="introvert">Introvert</option>
//               <option value="extrovert">Extrovert</option>
//             </select>
//           </div>

//           <div className="form-group">
//             <label>Talkativeness</label>
//             <select name="talkativeness" value={formData.talkativeness} onChange={handleChange}>
//               <option value="quiet">Quiet</option>
//               <option value="moderate">Moderate</option>
//               <option value="talkative">Talkative</option>
//             </select>
//           </div>

//           <div className="form-group">
//             <label>Study Habits</label>
//             <select name="study_habits" value={formData.study_habits} onChange={handleChange}>
//               <option value="regular">Regular</option>
//               <option value="irregular">Irregular</option>
//               <option value="rarely">Rarely Studies</option>
//             </select>
//           </div>

//           <div className="form-group">
//             <label>Guest Policy</label>
//             <select name="guest_policy" value={formData.guest_policy} onChange={handleChange}>
//               <option value="never">Not allowed</option>
//               <option value="occasional">Occasional</option>
//               <option value="frequent">Frequent guests</option>
//             </select>
//           </div>

//           <div className="form-group">
//             <label>Okay with Pets?</label>
//             <select name="pets" value={formData.pets} onChange={handleChange}>
//               <option value="yes">Yes</option>
//               <option value="no">No</option>
//             </select>
//           </div>

//           <div className="form-group age-range">
//             <label>Preferred Age Range</label>
//             <div className="age-inputs">
//               <input
//                 type="number"
//                 name="age_min"
//                 value={formData.age_min}
//                 onChange={handleChange}
//                 placeholder="Min"
//                 min="15"
//               />
//               <input
//                 type="number"
//                 name="age_max"
//                 value={formData.age_max}
//                 onChange={handleChange}
//                 placeholder="Max"
//                 min="15"
//               />
//             </div>
//           </div>

//           <button type="submit" className="submit-btn">Save Preferences</button>
//         </form>
//       </div>
//     </>
//   );
// };

// export default RoommatePreferencesForm;














import React, { useState } from "react";
import "./RoommatePreferencesForm.css";
import { useNavigate } from 'react-router-dom';

const RoommatePreferencesForm = () => {
  const [formData, setFormData] = useState({
    role: "need_room",
    cleanliness: "average",
    smoking: "non_smoker",
    sleeping_time: "early",
    budget: "",
    property_id: "",
    gender_preference: "any",
    occupation: "student",
    food: "any",
    personality: "introvert",
    talkativeness: "moderate",
    study_habits: "regular",
    guest_policy: "occasional",
    pets: "no",
    age_min: "",
    age_max: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("You are not logged in. Please login first.");
        navigate("/login");
        return;
      }

      const response = await fetch("http://localhost:5000/api/roommates/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        alert("Preferences saved successfully!");
        navigate("/properties");
      } else {
        alert(data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Error submitting preferences. Please try again later.");
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Roommate Preferences</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Your Role</label>
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="has_room">I have a room</option>
            <option value="need_room">I need a room</option>
          </select>
        </div>

        {formData.role === "has_room" && (
          <div className="form-group">
            <label>Your Property ID</label>
            <input
              type="number"
              name="property_id"
              value={formData.property_id}
              onChange={handleChange}
              placeholder="Enter your Property ID"
              required
            />
          </div>
        )}

        <div className="form-group">
          <label>Cleanliness</label>
          <select name="cleanliness" value={formData.cleanliness} onChange={handleChange}>
            <option value="very_clean">Very Clean</option>
            <option value="average">Average</option>
            <option value="messy">Messy</option>
          </select>
        </div>

        <div className="form-group">
          <label>Smoking Preference</label>
          <select name="smoking" value={formData.smoking} onChange={handleChange}>
            <option value="non_smoker">Non-smoker</option>
            <option value="smoker">Smoker</option>
          </select>
        </div>

        <div className="form-group">
          <label>Sleeping Habit</label>
          <select name="sleeping_time" value={formData.sleeping_time} onChange={handleChange}>
            <option value="early">Sleeps Early</option>
            <option value="late">Sleeps Late</option>
          </select>
        </div>

        <div className="form-group">
          <label>Monthly Budget (PKR)</label>
          <input
            type="number"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            placeholder="Enter your budget"
            required
          />
        </div>

        <div className="form-group">
          <label>Gender Preference</label>
          <select name="gender_preference" value={formData.gender_preference} onChange={handleChange}>
            <option value="any">Any</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div className="form-group">
          <label>Occupation</label>
          <select name="occupation" value={formData.occupation} onChange={handleChange}>
            <option value="student">Student</option>
            <option value="professional">Working Professional</option>
            <option value="freelancer">Freelancer</option>
          </select>
        </div>

        <div className="form-group">
          <label>Food Preference</label>
          <select name="food" value={formData.food} onChange={handleChange}>
            <option value="any">Any</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="non_vegetarian">Non-Vegetarian</option>
          </select>
        </div>

        <div className="form-group">
          <label>Personality</label>
          <select name="personality" value={formData.personality} onChange={handleChange}>
            <option value="introvert">Introvert</option>
            <option value="extrovert">Extrovert</option>
          </select>
        </div>

        <div className="form-group">
          <label>Talkativeness</label>
          <select name="talkativeness" value={formData.talkativeness} onChange={handleChange}>
            <option value="quiet">Quiet</option>
            <option value="moderate">Moderate</option>
            <option value="talkative">Talkative</option>
          </select>
        </div>

        <div className="form-group">
          <label>Study Habits</label>
          <select name="study_habits" value={formData.study_habits} onChange={handleChange}>
            <option value="regular">Regular</option>
            <option value="irregular">Irregular</option>
            <option value="rarely">Rarely Studies</option>
          </select>
        </div>

        <div className="form-group">
          <label>Guest Policy</label>
          <select name="guest_policy" value={formData.guest_policy} onChange={handleChange}>
            <option value="never">Not allowed</option>
            <option value="occasional">Occasional</option>
            <option value="frequent">Frequent guests</option>
          </select>
        </div>

        <div className="form-group">
          <label>Okay with Pets?</label>
          <select name="pets" value={formData.pets} onChange={handleChange}>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        <div className="form-group age-range">
          <label>Preferred Age Range</label>
          <div className="age-inputs">
            <input
              type="number"
              name="age_min"
              value={formData.age_min}
              onChange={handleChange}
              placeholder="Min"
              min="15"
              required
            />
            <input
              type="number"
              name="age_max"
              value={formData.age_max}
              onChange={handleChange}
              placeholder="Max"
              min="15"
              required
            />
          </div>
        </div>

        <button type="submit" className="submit-btn">Save Preferences</button>
      </form>
    </div>
  );
};

export default RoommatePreferencesForm;
