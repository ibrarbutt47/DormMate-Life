// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import { checkRoommatePreferences } from '../models/userModel.js';
// import { findUserByEmail, createUser } from '../models/userModel.js';

// export const signup = (req, res) => {
//   const { name, email, password, phone } = req.body;
//   const profileImage = req.file ? req.file.filename : null;

//   if (!name || !email || !password || !phone || !profileImage) {
//     return res.status(400).json({ message: 'All fields including image are required' });
//   }

//   findUserByEmail(email, (err, results) => {
//     if (err) return res.status(500).json({ error: 'Server error' });
//     if (results.length > 0) {
//       return res.status(400).json({ message: 'User already registered' });
//     }

//     const salt = bcrypt.genSaltSync(10);
//     const hashedPassword = bcrypt.hashSync(password, salt);

//     createUser(name, email, hashedPassword, phone, profileImage, (err, result) => {
//       if (err) return res.status(500).json({ error: 'User creation failed' });

//       res.status(201).json({ message: 'User registered successfully' });
//     });
//   });
// };
// export const login = (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ message: 'Email and password are required' });
//   }

//   findUserByEmail(email, (err, results) => {
//     if (err) return res.status(500).json({ error: 'Server error' });
//     if (results.length === 0) return res.status(404).json({ message: 'User not found' });

//     const user = results[0];
//     const isMatch = bcrypt.compareSync(password, user.password);
//     if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

//     const token = jwt.sign(
//       { id: user.id, email: user.email },
//       process.env.JWT_SECRET,
//       { expiresIn: '1d' }
//     );

//     // Check if roommate preferences exist
//     checkRoommatePreferences(user.id, (prefErr, preferencesSaved) => {
//       if (prefErr) return res.status(500).json({ error: 'Failed to check preferences' });

//       res.status(200).json({
//         message: 'Login successful',
//         token,
//         preferencesSaved, // 🔥 Send this flag to frontend
//         user: {
//           id: user.id,
//           name: user.name,
//           email: user.email,
//           phone: user.phone,
//           image: user.profile_picture
//         }
//       });
//     });
//   });
// };














import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { checkRoommatePreferences } from '../models/userModel.js';
import { findUserByEmail, createUser } from '../models/userModel.js';

// export const signup = (req, res) => {
//   const { name, email, password, phone } = req.body;
//   const profileImage = req.file ? req.file.filename : null;

//   if (!name || !email || !password || !phone || !profileImage) {
//     return res.status(400).json({ message: 'All fields including image are required' });
//   }

//   findUserByEmail(email, (err, results) => {
//     if (err) return res.status(500).json({ error: 'Server error' });
//     if (results.length > 0) {
//       return res.status(400).json({ message: 'User already registered' });
//     }

//     const salt = bcrypt.genSaltSync(10);
//     const hashedPassword = bcrypt.hashSync(password, salt);

//     // default role as 'seeker'
//     createUser(name, email, hashedPassword, phone, profileImage, 'seeker', (err, result) => {
//       if (err) return res.status(500).json({ error: 'User creation failed' });

//       res.status(201).json({ message: 'User registered successfully' });
//     });
//   });
// };
export const signup = (req, res) => {
  const { name, email, password, phone, role } = req.body;
  const profileImage = req.file ? req.file.filename : null;

  if (!name || !email || !password || !phone || !profileImage || !role) {
    return res.status(400).json({ message: 'All fields including role and image are required' });
  }

  const allowedRoles = ['seeker', 'owner', 'admin'];
  if (!allowedRoles.includes(role)) {
    return res.status(400).json({ message: 'Invalid role specified' });
  }

  findUserByEmail(email, (err, results) => {
    if (err) return res.status(500).json({ error: 'Server error' });
    if (results.length > 0) {
      return res.status(400).json({ message: 'User already registered' });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    createUser(name, email, hashedPassword, phone, profileImage, role, (err, result) => {
      if (err) return res.status(500).json({ error: 'User creation failed' });

      res.status(201).json({ message: `User registered successfully as ${role}` });
    });
  });
};

export const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  findUserByEmail(email, (err, results) => {
    if (err) return res.status(500).json({ error: 'Server error' });
    if (results.length === 0) return res.status(404).json({ message: 'User not found' });

    const user = results[0];
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    checkRoommatePreferences(user.id, (prefErr, preferencesSaved) => {
      if (prefErr) return res.status(500).json({ error: 'Failed to check preferences' });

      res.status(200).json({
        message: 'Login successful',
        token,
        preferencesSaved,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          image: user.profile_picture,
          role: user.role // Include role here
        }
      });
    });
  });
};
