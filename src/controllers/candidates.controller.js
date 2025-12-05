const { prisma } = require('../config/prisma');
const { logAudit } = require('../utils/auditLogger');
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../../uploads');
    try {
      await fs.mkdir(uploadDir, { recursive: true });
      cb(null, uploadDir);
    } catch (error) {
      cb(error, uploadDir);
    }
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});



const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB max
  },
  fileFilter: (req, file, cb) => {
    if (file.fieldname === 'manifesto') {
      // Only PDF for manifesto
      if (file.mimetype === 'application/pdf') {
        cb(null, true);
      } else {
        cb(new Error('Manifesto must be a PDF file'));
      }
    } else if (file.fieldname === 'photo') {
      // Images for photo
      if (file.mimetype.startsWith('image/')) {
        cb(null, true);
      } else {
        cb(new Error('Photo must be an image file'));
      }
    } else {
      cb(null, true);
    }
  },
});

// Middleware for file uploads
exports.uploadFiles = upload.fields([
  { name: 'manifesto', maxCount: 1 },
  { name: 'photo', maxCount: 1 },
]);

// Submit nomination (Candidate)
exports.submitNomination = async (req, res) => {
  try {
    const { positionId } = req.body;
    const userId = req.user.id;

    // Validation
    if (!positionId) {
      return res.status(400).json({ error: 'Position is required' });
    }

    // Fetch user's name and program from their account
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        name: true,
        program: true,
      },
    });
    if (!user) {
      return res.status(404).json({ error: 'User account not found' });
    }

    if (!user.name || !user.program) {
      return res.status(400).json({ 
        error: 'Your account is missing name or program information. Please update your profile.' 
      });
    }

    // Check if position exists and nomination window is open
    const position = await prisma.position.findUnique({
      where: { id: positionId },
    });

    if (!position) {
      return res.status(404).json({ error: 'Position not found' });
    }

    const now = new Date();
    if (now < position.nominationOpens || now > position.nominationCloses) {
      return res.status(400).json({ 
        error: 'Nomination window is closed',
        nominationOpens: position.nominationOpens,
        nominationCloses: position.nominationCloses,
      });
    }
    // Check if candidate already submitted for this position
    const existingNomination = await prisma.candidate.findUnique({
      where: {
        positionId_userId: {
          positionId,
          userId,
        },
      },
    });

    if (existingNomination) {
      return res.status(400).json({ error: 'You have already submitted a nomination for this position' });
    }

    // Validate that required files are uploaded
    if (!req.files?.manifesto?.[0]) {
      return res.status(400).json({ error: 'Manifesto PDF is required' });
    }
    if (!req.files?.photo?.[0]) {
      return res.status(400).json({ error: 'Photo is required' });
    }

    // Get file URLs from uploaded files
    const manifestoUrl = `/uploads/${req.files.manifesto[0].filename}`;
    const photoUrl = `/uploads/${req.files.photo[0].filename}`;

    // Create nomination using user's name and program from their account
    const candidate = await prisma.candidate.create({
      data: {
        positionId,
        userId,
        name: user.name,
        program: user.program,
        manifestoUrl,
        photoUrl,
        status: 'SUBMITTED',
      },
      include: {
        position: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

        // Log audit
    await logAudit({
      actorType: 'candidate',
      actorId: userId,
      action: 'SUBMIT_NOMINATION',
      entity: 'candidate',
      entityId: candidate.id,
      payload: { 
        positionId, 
        positionName: position.name, 
        name: user.name, 
        program: user.program 
      },
    });

    res.status(201).json({
      message: 'Nomination submitted successfully',
      candidate,
    });
  } catch (error) {
    console.error('Submit nomination error:', error);
    res.status(500).json({ error: 'Failed to submit nomination' });
  }
};