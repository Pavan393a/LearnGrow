const mongoose = require("mongoose");

// Connect to MongoDBconst
const dotenv = require("dotenv");

dotenv.config();
mongoose.connect(process.env.MONGO_URI, {
  dbName: "courses",
});

// Define mongoose schemas
const userSchema = new mongoose.Schema({
  // userSchema here
  username: { type: String },
  password: String,
  purchasedCourse: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
});

const adminSchema = new mongoose.Schema({
  // adminSchema here
  username: { type: String },
  password: String,
});

const courseSchema = new mongoose.Schema({
  // courseSchema
  title: { type: String },
  description: String,
  price: Number,
  imageLink: String,
  published: Boolean,
});

// Define mongoose models
const User = mongoose.model("User", userSchema);
const Admin = mongoose.model("Admin", adminSchema);
const Course = mongoose.model("Course", courseSchema);
module.exports = {
  User,
  Admin,
  Course,
};
