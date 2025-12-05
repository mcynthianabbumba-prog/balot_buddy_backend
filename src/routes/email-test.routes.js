const express = require('express');
const router = express.Router();
const { testEmailConfig, sendOTPEmail } = require('../utils/emailService');
const crypto = require('crypto');

// Public route to test email configuration
router.get('/test', async (req, res) => {
  try {
    const result = await testEmailConfig();
    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Route to send a test OTP email
router.post('/send-test-otp', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        error: 'Email address is required',
      });
    }

    // Generate a test OTP
    const testOTP = crypto.randomInt(100000, 999999).toString();
    const testRegNo = 'TEST123';

    // Send the OTP email
    const result = await sendOTPEmail(email, testOTP, testRegNo);

    res.json({
      success: true,
      message: 'Test OTP email sent successfully',
      messageId: result.messageId,
      otp: testOTP, // Include OTP in response for testing purposes
      note: 'This is a test email. Check your inbox for the OTP.',
    });
  } catch (error) {
    console.error('Failed to send test OTP email:', error);
    res.status(500).json({
      success: false,
      error: error.message,
      hint: error.code === 'EAUTH' 
        ? 'Check your EMAIL_USER and EMAIL_APP_PASSWORD in .env file. Make sure you\'re using a Gmail App Password.'
        : 'Check your email configuration in .env file',
    });
  }
});

module.exports = router;









