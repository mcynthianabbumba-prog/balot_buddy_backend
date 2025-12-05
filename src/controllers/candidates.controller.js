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
