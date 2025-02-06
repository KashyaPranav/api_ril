const express = require("express");
const mongoose = require("mongoose");
const trackApiUsage = require("./middleware/trackApiUsage");
const statsRoute = require("./routes/stats");

const app = express();
const PORT = 3002;

require("dotenv").config();

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));
app.use(trackApiUsage);

app.get("/api1", (req, res) => res.json({ message: "API 1 response" }));
app.get("/api2", (req, res) => res.json({ message: "API 2 response" }));

app.use("/", statsRoute);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
