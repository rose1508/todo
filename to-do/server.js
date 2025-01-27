/**
 * Initializes the Express application, connects to MongoDB, and starts the server.
 *
 * @module server
 * @requires express
 * @requires mongoose
 * @requires dotenv
 * @requires cors
 * @requires ./routes/taskRoutes
 *
 * @constant {object} app - The Express application instance.
 * @constant {number} PORT - The port number for the server to listen on.
 *
 * @function
 * @description This function sets up the Express application, configures middleware,
 * defines routes, connects to MongoDB, and starts the server.
 *
 * @param {void}
 * @returns {void}
 *
 * @throws {Error} If there's an error connecting to MongoDB
 */
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const taskRoutes = require("./routes/taskRoutes");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", taskRoutes);

// Connect to MongoDB and start the server
const PORT = process.env.PORT || 3365;
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });
