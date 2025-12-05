const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const { prisma } = require('../config/prisma');
const { logAudit } = require('../utils/auditLogger');
const { sendPasswordResetOTP } = require('../utils/emailService');

/**
 * Request password reset OTP
 * 
 * Flow:
 * 1. Candidate enters email
 * 2. System finds user (must be CANDIDATE role)
 * 3. Generates OTP
 * 4. Sends OTP via email
 * 5. Stores hashed OTP in database
 * 6. Returns success
 */
exports.requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    });

    // Don't reveal if email exists (security best practice)
    if (!user) {
      // Still return success to prevent email enumeration
      return res.json({
        message: 'If an account with that email exists, a password reset code has been sent.',
      });
    }

    // Only allow password reset for CANDIDATE role
    if (user.role !== 'CANDIDATE') {
      return res.json({
        message: 'If an account with that email exists, a password reset code has been sent.',
      });
    }

    // Check if user is active
    if (user.status !== 'ACTIVE') {
      return res.status(400).json({ error: 'Account is inactive. Please contact administrator.' });
    }

    // Check for recent password reset request (rate limiting)
    const recentReset = await prisma.passwordReset.findFirst({
      where: {
        userId: user.id,
        issuedAt: {
          gte: new Date(Date.now() - 2 * 60 * 1000), // Last 2 minutes
        },
        consumedAt: null, // Not yet consumed
      },
      orderBy: {
        issuedAt: 'desc',
      },
    });

    if (recentReset) {
      return res.status(429).json({
        error: 'Please wait before requesting another password reset code',
        retryAfter: 120, // seconds
      });
    }

    // Generate 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();
    const otpHash = await bcrypt.hash(otp, 10);

    // Set expiration (5 minutes)
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    // Store OTP in database
    const passwordReset = await prisma.passwordReset.create({
      data: {
        userId: user.id,
        otpHash,
        expiresAt,
      },
    });

    // Send OTP via email
    try {
      await sendPasswordResetOTP(user.email, otp, user.name);
    } catch (emailError) {
      console.error('Failed to send password reset OTP email:', emailError);
      // Delete the password reset record if email fails
      await prisma.passwordReset.delete({
        where: { id: passwordReset.id }
      });
      
      // Don't fail the request, but log it
      await logAudit({
        actorType: 'system',
        action: 'PASSWORD_RESET_EMAIL_FAILED',
        entity: 'password_reset',
        entityId: passwordReset.id,
        payload: { userId: user.id, error: emailError.message },
      });
      
      return res.status(500).json({
        error: 'Failed to send password reset email. Please try again later.',
      });
    }

    // Log audit
    await logAudit({
      actorType: 'candidate',
      actorId: user.id,
      action: 'PASSWORD_RESET_REQUESTED',
      entity: 'password_reset',
      entityId: passwordReset.id,
      payload: {
        email: user.email,
        method: 'email',
      },
    });

    res.json({
      message: 'If an account with that email exists, a password reset code has been sent.',
      expiresIn: 300, // 5 minutes in seconds
    });
  } catch (error) {
    console.error('Request password reset error:', error);
    res.status(500).json({ error: 'Failed to request password reset' });
  }
};










