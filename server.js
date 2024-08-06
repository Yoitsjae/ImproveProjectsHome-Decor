const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com',
        pass: 'your-email-password'
    }
});

app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;

    // Save user information to a file (or database)
    const userInfo = `Name: ${name}, Email: ${email}, Message: ${message}\n`;
    fs.appendFile(path.join(__dirname, 'user-info.txt'), userInfo, (err) => {
        if (err) {
            console.error('Error saving user information:', err);
            return res.status(500).json({ message: 'Server error' });
        }

        // Send an email
        const mailOptions = {
            from: 'your-email@gmail.com',
            to: 'company-email@example.com',
            subject: 'New Contact Form Submission',
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                return res.status(500).json({ message: 'Email sending failed' });
            }
            res.status(200).json({ message: 'Contact form submitted successfully' });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
