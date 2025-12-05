/**
 * Test script to verify OTP email sending functionality
 * Usage: node test-email-otp.js <email-address>
 */

require('dotenv').config();
const { sendOTPEmail } = require('./src/utils/emailService');
const crypto = require('crypto');

async function testOTPEmail() {
  // Get email from command line argument or use a default test email
  const testEmail = process.argv[2] || process.env.EMAIL_USER;
  
  if (!testEmail) {
    console.error('❌ Error: Please provide an email address');
    console.log('Usage: node test-email-otp.js <email-address>');
    process.exit(1);
  }

  console.log('🧪 Testing OTP Email Sending...\n');
  console.log(`📧 Target Email: ${testEmail}`);
  
  // Generate a test OTP
  const testOTP = crypto.randomInt(100000, 999999).toString();
  const testRegNo = 'TEST123';
  
  console.log(`🔐 Generated OTP: ${testOTP}`);
  console.log(`📝 Registration Number: ${testRegNo}\n`);

  try {
    console.log('📤 Sending OTP email...');
    const result = await sendOTPEmail(testEmail, testOTP, testRegNo);
    
    console.log('\n✅ SUCCESS! OTP email sent successfully!');
    console.log(`📬 Message ID: ${result.messageId}`);
    console.log(`\n📧 Check your inbox at: ${testEmail}`);
    console.log(`🔐 The OTP in the email should be: ${testOTP}`);
    console.log('\n✨ Nodemailer is working correctly!');
    
    process.exit(0);
  } catch (error) {
    console.error('\n❌ FAILED to send OTP email!');
    console.error(`Error: ${error.message}`);
    
    if (error.code === 'EAUTH') {
      console.error('\n💡 Hint: Gmail authentication failed.');
      console.error('   Make sure:');
      console.error('   1. EMAIL_USER in .env matches your Gmail address');
      console.error('   2. EMAIL_APP_PASSWORD is a valid Gmail App Password (not regular password)');
      console.error('   3. 2-Step Verification is enabled on your Google account');
      console.error('   4. App Password was generated correctly (16 characters)');
    } else if (error.code === 'ECONNECTION') {
      console.error('\n💡 Hint: Cannot connect to email server.');
      console.error('   Check EMAIL_HOST and EMAIL_PORT in .env');
    }
    
    process.exit(1);
  }
}

testOTPEmail();



