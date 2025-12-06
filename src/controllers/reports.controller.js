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
// Get turnout report with detailed breakdown
exports.getTurnout = async (req, res) => {
  try {
    const totalVoters = await prisma.eligibleVoter.count({
      where: { status: 'ELIGIBLE' },
    });

    const verifiedVoters = await prisma.verification.count({
      where: { verifiedAt: { not: null } },
    });

    const votesCast = await prisma.ballot.count({
      where: { status: 'CONSUMED' },
    });

    const ballotsIssued = await prisma.ballot.count();

    const turnout = totalVoters > 0 ? (votesCast / totalVoters) * 100 : 0;
    const verificationRate =
      totalVoters > 0 ? (verifiedVoters / totalVoters) * 100 : 0;
    const ballotUsageRate =
      ballotsIssued > 0 ? (votesCast / ballotsIssued) * 100 : 0;
    const nonVoters = totalVoters - votesCast;
    const nonVoterPercentage =
      totalVoters > 0 ? (nonVoters / totalVoters) * 100 : 0;

    res.json({
      totalVoters,
      verifiedVoters,
      votesCast,
      ballotsIssued,
      nonVoters,
      turnout: parseFloat(turnout.toFixed(2)),
      verificationRate: parseFloat(verificationRate.toFixed(2)),
      ballotUsageRate: parseFloat(ballotUsageRate.toFixed(2)),
      nonVoterPercentage: parseFloat(nonVoterPercentage.toFixed(2)),
      breakdown: {
        voted: votesCast,
        notVoted: nonVoters,
        verified: verifiedVoters,
        notVerified: totalVoters - verifiedVoters,
      },
    });
  } catch (error) {
    console.error('Get turnout error:', error);
    res.status(500).json({ error: 'Failed to fetch turnout report' });
  }
};
