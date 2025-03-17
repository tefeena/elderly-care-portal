const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Fetch all users (for admin panel)
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a user by ID
router.delete("/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Edit user details
router.put("/:id", async (req, res) => {
  try {
    const { name, role } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, { name, role }, { new: true });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
