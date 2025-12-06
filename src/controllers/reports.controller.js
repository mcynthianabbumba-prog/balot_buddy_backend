const { prisma } = require('../config/prisma');
const PDFDocument = require('pdfkit');
const { loadCandidatePhoto } = require('../utils/pdfHelpers');
const path = require('path');

// Get audit log
exports.getAuditLog = async (req, res) => {
  try {
    const { page = 1, limit = 50, action, actorType } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const where = {};
    if (action) {
      where.action = { contains: action, mode: 'insensitive' };
    }
    if (actorType) {
      where.actorType = actorType;
    }

    const [logs, total] = await Promise.all([
      prisma.auditLog.findMany({
        where,
        skip,
        take: parseInt(limit),
        orderBy: {
          createdAt: 'desc',
        },
      }),
      prisma.auditLog.count({ where }),
    ]);

    res.json({
      logs,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    console.error('Get audit log error:', error);
    res.status(500).json({ error: 'Failed to fetch audit log' });
  }
};