const express = require("express");
const app = express();
const { MongoClient } = require("./config/database");
const corsMiddleware = require("./middleware/cors");
const jsonParserMiddleware = require("./middleware/jsonParser");
const cookieParserMiddleware = require("./middleware/cookieParser");
const usersRoutes = require("./routes/users");
const categoryRoutes = require("./routes/category")
require("dotenv").config();

const port = process.env.PORT || 5000;

// Middlewares
app.use(corsMiddleware);
app.use(jsonParserMiddleware);
app.use(cookieParserMiddleware);

// Routes
app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/categorys", categoryRoutes);

// Start server
app.get("/",async (req,res) => { 
    console.log("server is running");
    res.send("Server is running well")
 })
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

// Connect to MongoDB
(async () => {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await MongoClient.connect();
    console.log("Connected to MongoDB successfully!");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
})();
