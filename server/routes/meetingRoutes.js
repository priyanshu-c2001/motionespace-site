const express = require("express");
const { scheduleMeeting } = require("../controllers/meetingController");

const meetingRouter = express.Router();

meetingRouter.post("/schedule", scheduleMeeting);

module.exports = meetingRouter;
