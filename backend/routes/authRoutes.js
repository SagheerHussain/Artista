const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
} = require("../controllers/authController");
const { protect, admin } = require("../middleware/authMiddleware");
const User = require("../models/User");

const router = express.Router();

// ✅ Register a new user
router.post("/register", registerUser);
``;

// ✅ Login user
router.post("/login", loginUser);

// ✅ Logout user
router.post("/logout", logoutUser);

// ✅ Get user profile (Protected)
router.get("/profile", protect, getUserProfile);

// ✅ Update user profile (Protected)
router.put("/profile", protect, updateUserProfile);

// ✅ Get all users (Admin only)
router.get("/users", protect, admin, getAllUsers);

module.exports = router;
