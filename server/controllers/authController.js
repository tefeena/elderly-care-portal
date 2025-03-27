const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;
  
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already registered' });
      }
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const user = new User({ name, email, password: hashedPassword, role });
      await user.save();
  
      res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
      console.error("❌ Register Error:", err);
      res.status(500).json({ error: err.message || "Server Error" });
    }
  };
  
  
  exports.loginUser = async (req, res) => {
      const { email, password } = req.body;
  
      try {
          // Find user by email
          const user = await User.findOne({ email });
          if (!user) return res.status(400).json({ message: 'User not found' });
  
          // Compare password with the stored hash
          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
  
          // Create JWT token with user ID and role in the payload
          const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
          // Respond with token and user details, including userId
          res.json({
              token,
              user: {
                  id: user._id, // Ensure user ID is sent as part of the user object
                  name: user.name,
                  email: user.email,
                  role: user.role
              }
          });
      } catch (err) {
          console.error("❌ Login Error:", err);
          res.status(500).json({ error: err.message });
      }
  };
  
