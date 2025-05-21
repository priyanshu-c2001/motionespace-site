const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const oAuth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

const calendar = google.calendar({ version: "v3", auth: oAuth2Client });

// Function to send email
const sendMail = async (email, name, meetLink, date, timeSlots, service, pack, description, phone) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.EMAIL,
        to: [email, process.env.OWNER_EMAIL],
        subject: "Meeting Scheduled",
        text: `
Hello ${name},

Your Google Meet is scheduled.

📅 Date: ${date}
⏰ Time Slots: ${timeSlots.join(", ")}
📞 Phone (WhatsApp): ${phone}
📝 Description: ${description}
🔖 Service: ${service}
💼 Package: ${pack}

Join here: ${meetLink}

Thanks!
        `
    };

    await transporter.sendMail(mailOptions);
};

// Function to schedule Google Meet
const scheduleMeet = async (email, name, date, timeSlot) => {
    const [startTime, endTime] = timeSlot.split("-");
    const startDateTime = new Date(`${date}T${convertTo24Hour(startTime.trim())}:00+05:30`);
    const endDateTime = new Date(`${date}T${convertTo24Hour(endTime.trim())}:00+05:30`);

    const event = {
        summary: `Meeting with ${name}`,
        description: `Scheduled meeting with ${name}.`,
        start: { dateTime: startDateTime.toISOString(), timeZone: "Asia/Kolkata" },
        end: { dateTime: endDateTime.toISOString(), timeZone: "Asia/Kolkata" },
        attendees: [{ email }],
        conferenceData: { createRequest: { requestId: `${Date.now()}` } }
    };

    const response = await calendar.events.insert({
        calendarId: "primary",
        resource: event,
        conferenceDataVersion: 1
    });

    return response.data.hangoutLink;
};

// Convert 12-hour time (e.g., "6:00pm") to 24-hour format (e.g., "18:00")
const convertTo24Hour = (time) => {
    const [hoursMinutes, period] = time.split(/(am|pm)/i);
    let [hours, minutes] = hoursMinutes.trim().split(":").map(Number);
    if (period.toLowerCase() === "pm" && hours !== 12) hours += 12;
    if (period.toLowerCase() === "am" && hours === 12) hours = 0;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
};

// Controller for scheduling meeting
const scheduleMeeting = async (req, res) => {
    const { name, phone, email, description, date, time, service, pack } = req.body;

    try {
        if (!time.length) {
            return res.status(400).json({ success: false, error: "No time slots selected" });
        }

        // Scheduling based on the first selected time slot
        const meetLink = await scheduleMeet(email, name, date, time[0]);

        await sendMail(email, name, meetLink, date, time, service, pack, description, phone);

        res.json({ success: true, meetLink });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Error scheduling meeting" });
    }
};

module.exports = { scheduleMeeting };
