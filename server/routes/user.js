const jwt = require("jsonwebtoken");
const { authMiddleware, secret } = require("../middleware/auth");
const { User, Course } = require("../db");
const express = require("express");

const router = express.Router();

router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username });
    if (!user) {
      return res.status(403).json({ msg: "User doesn't exist" });
    }
    res.json({
      username: user.username,
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
      return res.status(411).json({ message: "Invalid credentials" });
    }

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(403).json({ message: "User already exists" });
    }

    await User.create({ username, password });

    const token = jwt.sign({ username, role: "user" }, secret, {
      expiresIn: "1h",
    });

    return res.json({
      message: "User signed up successfully",
      token,
      username,
    });
  } catch (err) {
    console.error("Signup error:", err);
    return res.status(500).json({
      message: "Signup failed",
      error: err.message,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(411).json({ message: "Invalid credentials" });
    }

    const user = await User.findOne({ username, password });

    if (!user) {
      return res.status(403).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign({ username, role: "user" }, secret, {
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

router.get("/courses", authMiddleware, async (req, res) => {
  try {
    const courses = await Course.find({ published: true });
    res.json({ course: courses });
  } catch (err) {
    console.error("Get courses error:", err);
    res.status(500).json({
      message: "Error fetching courses",
      error: err.message,
    });
  }
});

router.post("/courses/:courseId", authMiddleware, async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const username = req.user.username;

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.purchasedCourse.push(course);
    await user.save();

    return res.json({ message: "Course purchased successfully" });
  } catch (err) {
    console.error("Purchase error:", err);
    return res.status(500).json({
      message: "Purchase failed",
      error: err.message,
    });
  }
});

router.get("/purchasedCourses", authMiddleware, async (req, res) => {
  try {
    const username = req.user.username;
    const user = await User.findOne({ username }).populate("purchasedCourse"); // ✅ Fixed - added quotes

    if (!user) {
      return res.status(403).json({ message: "User not found" });
    }

    res.json({ purchasedCourses: user.purchasedCourse || [] });
  } catch (err) {
    console.error("Get purchased courses error:", err);
    res.status(500).json({
      message: "Error fetching purchased courses",
      error: err.message,
    });
  }
});

module.exports = router;
