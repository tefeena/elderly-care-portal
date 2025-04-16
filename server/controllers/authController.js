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
    try {
      const { email, password } = req.body;
  
      console.log("🟡 Login attempt:", { email });
  
      // ✅ Check for missing fields
      if (!email || !password) {
        console.warn("⚠️ Missing email or password");
        return res.status(400).json({ message: 'Email and password are required' });
      }
  
      const user = await User.findOne({ email });
  
      // ✅ If no user found
      if (!user) {
        console.warn("⚠️ User not found:", email);
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        console.warn("⚠️ Password mismatch for:", email);
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
  
      console.log("✅ Login successful:", email);
  
      res.json({
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        }
      });
  
    } catch (err) {
      console.error("❌ Login error:", err);
      res.status(500).json({ message: "Internal server error. Please try again later." });
    }
  };
  
