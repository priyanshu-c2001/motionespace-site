require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const meetingRouter = require("./routes/meetingRoutes");

const app = express();
const PORT = process.env.PORT || 8000;
const FRONTEND_URL = process.env.CLIENT_URL || "http://localhost:1234";

// Middleware
app.use(cors({
    origin: FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.use("/api/meeting", meetingRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
