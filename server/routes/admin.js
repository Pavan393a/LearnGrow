const jwt = require("jsonwebtoken");
const express = require("express");
const { authMiddleware, secret } = require("../middleware/auth");
const { Course, Admin } = require("../db");
const router = express.Router();

// Admin routes
router.get("/me", authMiddleware, async (req, res) => {
  // ✅ Added authMiddleware back
  try {
    const admin = await Admin.findOne({ username: req.user.username });
    if (!admin) {
      return res.status(403).json({ msg: "Admin doesn't exist" });
    }
    res.json({
      username: admin.username,
    });
  } catch (err) {
    console.error("/me error:", err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

router.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      // ✅ Fixed - check username and password
      return res.status(411).json({ message: "Invalid credentials" });
    }

    const adminUser = await Admin.findOne({ username });

    if (adminUser) {
      return res.status(403).json({ message: "Email already taken" });
    }

    const dbAdmin = await Admin.create({
      username,
      password,
    });

    const token = jwt.sign({ username, role: "admin" }, secret, {
      expiresIn: "1h",
    });

    return res.json({
      message: "Admin created successfully",
      token,
      username,
    });
  } catch (err) {
    console.error("Signup error:", err);
    return res.status(500).json({
      message: "Error creating admin",
      error: err.message,
    });
  }
});

router.post("/login", async (req, res) => {
  // ✅ Removed authMiddleware
  try {
    const { username, password } = req.body; // ✅ Destructure properly

    if (!username || !password) {
      return res.status(411).json({ message: "Invalid credentials" });
    }

    const adminuser = await Admin.findOne({ username, password });

    if (!adminuser) {
      return res.status(403).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ username, role: "admin" }, secret, {
      expiresIn: "1h",
    });

    return res.json({
      message: "Logged in successfully",
      token,
      username,
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({
      message: "Login failed",
      error: err.message,
    });
  }
});

router.post("/courses", authMiddleware, async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.json({ msg: "Course created successfully" });
  } catch (err) {
    console.error("Create course error:", err);
    res
      .status(500)
      .json({ message: "Error creating course", error: err.message });
  }
});

router.put("/courses/:courseId", authMiddleware, async (req, res) => {
  try {
    const courses = req.body;
    const courseId = req.params.courseId;
    const course = await Course.findByIdAndUpdate(courseId, courses, {
      new: true,
    });

    if (course) {
      res.json({ msg: "Course updated successfully", course });
    } else {
      res.status(404).json({ message: "Course not found" });
    }
  } catch (err) {
    console.error("Update course error:", err);
    res
      .status(500)
      .json({ message: "Error updating course", error: err.message });
  }
});

router.get("/courses", authMiddleware, async (req, res) => {
  try {
    const courses = await Course.find({});
    res.json({ courses });
  } catch (err) {
    console.error("Get courses error:", err);
    res
      .status(500)
      .json({ message: "Error fetching courses", error: err.message });
  }
});

module.exports = router;
