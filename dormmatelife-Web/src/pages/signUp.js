import React, { useState } from 'react';
import './signUp.css';
import Navbar from "../components/Navbar";
import { Link, useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'seeker', // default role
  });

  const [image, setImage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, phone, password, confirmPassword, role } = formData;

    if (!name || !email || !phone || !password || !confirmPassword || !image || !role) {
      alert('Please fill in all fields and upload a profile picture.');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      const formPayload = new FormData();
      formPayload.append('name', name);
      formPayload.append('email', email);
      formPayload.append('phone', phone);
      formPayload.append('password', password);
      formPayload.append('profile_picture', image);
      formPayload.append('role', role); // ✅ NEW: Add role

      const res = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        body: formPayload,
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('token', data.token);
        alert('Signup successful!');
        navigate('/login');
      } else {
        alert(data.message || 'Signup failed.');
      }
    } catch (error) {
      alert('Something went wrong.');
      console.error('Signup error:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="signup-container">
        <form className="signup-form" onSubmit={handleSubmit} encType="multipart/form-data">
          <h2>Join DormMate Life</h2>
          <p className="subtitle">Create your account and start exploring rentals</p>

          <label>Full Name</label>
          <input type="text" name="name" placeholder="John Doe" value={formData.name} onChange={handleChange} required />

          <label>Email</label>
          <input type="email" name="email" placeholder="example@email.com" value={formData.email} onChange={handleChange} required />

          <label>Phone Number</label>
          <input type="text" name="phone" placeholder="03xx-xxxxxxx" value={formData.phone} onChange={handleChange} required />

          <label>Password</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Create password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </span>
          </div>

          <label>Confirm Password</label>
          <div className="password-wrapper">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Repeat password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <span className="toggle-password" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
            </span>
          </div>

          <label>Account Type</label>
          <select name="role" value={formData.role} onChange={handleChange} required>
            <option value="seeker">Property Seeker</option>
            <option value="owner">Property Owner</option>
          </select>

          <label className="image-label">Upload Profile Picture</label>
          <input type="file" name="profile_picture" accept="image/*" onChange={handleImageChange} required />

          <div className="signup-footer">
            <p>Already have an account? <Link to="/login">Login</Link></p>
          </div>

          <button type="submit">Sign Up</button>
        </form>
      </div>
    </>
  );
}

export default Signup;
