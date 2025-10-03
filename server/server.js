//  TODO: Can you create backend with standard folder structure like: week-4/hard ???
const dotenv = require("dotenv");

dotenv.config();
const express = require("express");
const app = express();

app.use(express.json());
const cors = require("cors");
const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");
app.use(
  cors({
    origin: "http://localhost:5173", // Your frontend URL
    credentials: true,
  })
);
app.use("/admin", adminRouter);
app.use("/user", userRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Server is listening on port " + `${port}`);
});
