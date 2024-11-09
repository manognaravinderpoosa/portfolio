const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();  // To load environment variables from a .env file

// Create an Express app
const app = express();

// Use middleware to parse JSON and form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Use CORS middleware (adjust this for production)
app.use(cors({
    origin: 'http://yourfrontenddomain.com'  // Replace with your frontend's domain
}));

// Set up a transport using your email provider (Gmail example)
const transporter = nodemailer.createTransport({
    service: 'gmail', // Gmail service
    auth: {
        user: process.env.EMAIL_USER,   // Use environment variables
        pass: process.env.EMAIL_PASS    // Use environment variables
    }
});

// POST route to handle form submission
app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    // Set up the email data
    const mailOptions = {
        from: email,               // Sender's email
        to: process.env.EMAIL_USER, // Your email address (use environment variable)
        subject: `Message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);  // Log the error
            return res.status(500).send('Error in sending message');
        }
        console.log(info);  // Log the success info
        return res.status(200).send('Message sent successfully');
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

