const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(bodyParser.json());

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: 'hotmail', // Use 'hotmail' for Windows Live/Outlook
  auth: {
    user: 'shanonrichards@windowslive.com', // Your email
    pass: 'YOUR_EMAIL_PASSWORD', // Replace with your email password or app-specific password
  },
});

// Endpoint to handle newsletter subscription
app.post('/api/subscribe', (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: 'Email is required' });
  }

  // Email options
  const mailOptions = {
    from: 'shanonrichards@windowslive.com',
    to: 'shanonrichards@windowslive.com',
    subject: 'New Newsletter Subscription',
    text: `A new user has subscribed to the newsletter:\n\nEmail: ${email}`,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ success: false, message: 'Failed to send email' });
    }
    console.log('Email sent:', info.response);
    res.json({ success: true, message: 'Subscription successful' });
  });
});

// Serve static files (your HTML, CSS, etc.)
app.use(express.static('public')); // Assumes your HTML and assets are in a 'public' folder

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
