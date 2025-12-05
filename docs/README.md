# BALLOT BUDDY - Secure Digital Voting Platform

<div align="center">

![BALLOT BUDDY Logo](frontend/public/ballot.svg)

**A modern, secure, and transparent digital voting system designed for democratic elections**

[![React](https://img.shields.io/badge/React-19.2.0-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-brightgreen.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue.svg)](https://www.typescriptlang.org/)
[![MySQL](https://img.shields.io/badge/MySQL-Prisma-orange.svg)](https://www.mysql.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.18-38bdf8.svg)](https://tailwindcss.com/)

</div>

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack & Frameworks](#tech-stack--frameworks)
3. [Features](#features)
4. [Entity Relationship Diagram (ERD)](#entity-relationship-diagram-erd)
5. [Project Structure](#project-structure)
6. [Setup Instructions](#setup-instructions)
7. [Environment Variables](#environment-variables)
8. [API Documentation](#api-documentation)
9. [Frontend Components](#frontend-components)
10. [Authentication & Authorization](#authentication--authorization)
11. [Deployment](#deployment)
12. [Contributing](#contributing)

---

## 🎯 Project Overview

**BALLOT BUDDY** is a comprehensive digital voting platform that enables secure, transparent, and efficient elections. The system supports three main user roles: **Administrators**, **Returning Officers**, and **Candidates**, along with a seamless voting experience for eligible voters.

### Key Highlights

- ✅ **Secure Authentication**: JWT-based authentication with role-based access control
- ✅ **OTP Verification**: SMS-based OTP verification for voter identity
- ✅ **Secret Ballot System**: Anonymous voting with ballot tokens
- ✅ **Real-time Analytics**: Comprehensive reporting and visualization
- ✅ **Audit Trail**: Complete activity logging for transparency
- ✅ **Modern UI/UX**: Beautiful white and pink themed interface
- ✅ **Responsive Design**: Works seamlessly on all devices

---

## 🛠️ Tech Stack & Frameworks

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 19.2.0 | UI framework |
| **TypeScript** | 5.9.3 | Type safety |
| **Vite** | 7.2.4 | Build tool & dev server |
| **React Router DOM** | 6.30.2 | Client-side routing |
| **Tailwind CSS** | 3.4.18 | Utility-first CSS framework |
| **Shadcn/ui** | Latest | UI component library |
| **Recharts** | 3.5.0 | Data visualization |
| **React Hook Form** | 7.66.1 | Form management |
| **Zod** | 3.25.76 | Schema validation |
| **Axios** | 1.13.2 | HTTP client |
| **Sonner** | 1.5.0 | Toast notifications |
| **Radix UI** | Latest | Accessible UI primitives |

### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | Latest | Runtime environment |
| **Express.js** | 5.1.0 | Web framework |
| **Prisma ORM** | 6.19.0 | Database toolkit |
| **MySQL** | Latest | Relational database |
| **JWT** | 9.0.2 | Authentication tokens |
| **Bcrypt** | 3.0.3 | Password hashing |
| **Multer** | 2.0.2 | File upload handling |
| **Nodemailer** | 7.0.10 | Email service |
| **PDFKit** | 0.17.2 | PDF generation |
| **Canvas** | 3.2.0 | Image/chart generation |
| **Express Rate Limit** | 8.2.1 | Rate limiting |
| **CSV Parser** | 3.2.0 | CSV file processing |

### Development Tools

- **ESLint**: Code linting
- **Prettier**: Code formatting
- **Nodemon**: Auto-restart development server
- **Prisma Studio**: Database GUI

---

## ✨ Features

### 🔐 Authentication & Security

- **Role-based Access Control (RBAC)**
  - Admin: Full system access
  - Officer: Nomination management
  - Candidate: Nomination submission
  - Voter: Voting access

- **Password Security**
  - Bcrypt hashing
  - Password reset via OTP
  - Account deactivation support

- **OTP Verification**
  - SMS-based OTP for voter verification
  - 5-minute expiration
  - Rate limiting protection

### 📊 Admin Features

- **Dashboard**
  - Real-time statistics
  - Quick actions
  - Officer management

- **Position Management**
  - Create election positions
  - Set nomination periods
  - Configure voting windows
  - Delete positions

- **Voter Management**
  - CSV import of eligible voters
  - Voter database viewing
  - Voter status tracking

- **Officer Management**
  - Create returning officers
  - View officer details
  - Activate/deactivate accounts

- **Reports & Analytics**
  - Turnout statistics
  - Election results
  - Export capabilities
  - Visual charts and graphs

- **Audit Log**
  - Complete activity history
  - System event tracking
  - Immutable log entries

### 👨‍💼 Officer Features

- **Nomination Review**
  - View pending nominations
  - Approve/reject candidates
  - Reason-based rejection

### 🎯 Candidate Features

- **Nomination Submission**
  - Submit nominations for positions
  - Upload photos and manifestos
  - Track approval status

- **Campaign Tracking**
  - View nomination status
  - Track approval/rejection
  - Submit multiple positions

### 🗳️ Voter Features

- **Voter Verification**
  - Registration number input
  - OTP verification via SMS
  - Secure ballot token generation

- **Voting Interface**
  - Step-by-step voting wizard
  - Candidate photo display
  - Position-by-position voting
  - Real-time progress tracking

---

## 📊 Entity Relationship Diagram (ERD)

```
┌─────────────────────────────────────────────────────────────────┐
│                         DATABASE SCHEMA                          │
└─────────────────────────────────────────────────────────────────┘

┌──────────────┐
│     User     │
├──────────────┤
│ id (PK)      │
│ email (UQ)   │
│ password     │
│ name         │
│ role         │◄─────┐
│ regNo        │      │
│ program      │      │
│ staffId      │      │
│ status       │      │
│ createdBy(FK)├──┐   │
└──────────────┘  │   │
       │          │   │
       │          │   │
       │    ┌─────┘   │
       │    │         │
       ▼    ▼         │
┌──────────────┐      │
│  Candidate   │      │
├──────────────┤      │
│ id (PK)      │      │
│ positionId(FK)├─────┤
│ userId (FK)  ├──────┘
│ name         │
│ program      │
│ manifestoUrl │
│ photoUrl     │
│ status       │
│ reason       │
└──────────────┘
       │
       │
       ▼
┌──────────────┐
│    Position  │
├──────────────┤
│ id (PK)      │
│ name         │
│ seats        │
│ nominationOpens│
│ nominationCloses│
│ votingOpens  │
│ votingCloses │
└──────────────┘
       │
       │
       ▼
┌──────────────┐
│     Vote     │
├──────────────┤
│ id (PK)      │
│ ballotId (FK)├─────┐
│ positionId(FK)├───┤
│ candidateId(FK)├──┘
│ castAt       │
└──────────────┘
       ▲
       │
       │
┌──────────────┐
│    Ballot    │
├──────────────┤
│ id (PK)      │
│ voterId (FK) ├─────┐
│ token (UQ)   │     │
│ status       │     │
│ issuedAt     │     │
│ consumedAt   │     │
└──────────────┘     │
       ▲             │
       │             │
┌──────────────┐     │
│EligibleVoter │     │
├──────────────┤     │
│ id (PK)      │     │
│ regNo (UQ)   │     │
│ name         │     │
│ email        │     │
│ phone        │     │
│ program      │     │
└──────────────┘     │
       │             │
       │             │
       ▼             │
┌──────────────┐     │
│ Verification │     │
├──────────────┤     │
│ id (PK)      │     │
│ voterId (FK) │     │
│ method       │     │
│ otpHash      │     │
│ issuedAt     │     │
│ expiresAt    │     │
│ verifiedAt   │     │
│ ballotToken  │     │
└──────────────┘     │
                     │
┌──────────────┐     │
│PasswordReset │     │
├──────────────┤     │
│ id (PK)      │     │
│ userId (FK)  │     │
│ otpHash      │     │
│ issuedAt     │     │
│ expiresAt    │     │
│ verifiedAt   │     │
│ resetAt      │     │
└──────────────┘     │
                     │
┌──────────────┐     │
│  AuditLog    │     │
├──────────────┤     │
│ id (PK)      │     │
│ actorType    │     │
│ actorId      │     │
│ action       │     │
│ entity       │     │
│ entityId     │     │
│ payload      │     │
│ createdAt    │     │
└──────────────┘     │
```

### Entity Descriptions

#### **User**
- Represents admin, officer, and candidate accounts
- **Relations**: Creates officers, submits candidates, has password resets
- **Enums**: ADMIN, OFFICER, CANDIDATE

#### **Position**
- Election positions (e.g., "President", "Secretary")
- Contains time windows for nominations and voting
- **Relations**: Has multiple candidates, receives votes

#### **Candidate**
- Nomination submissions by candidates
- Linked to User and Position
- **Status**: SUBMITTED, APPROVED, REJECTED
- **Relations**: Receives votes, belongs to position and user

#### **EligibleVoter**
- Voters imported via CSV
- **Relations**: Has verifications, receives ballots

#### **Verification**
- OTP verification records
- Links to EligibleVoter
- Generates ballot tokens upon verification

#### **Ballot**
- Issued to verified voters
- Contains unique token for secret voting
- **Status**: ACTIVE, CONSUMED
- **Relations**: Has multiple votes

#### **Vote**
- Individual vote cast (secret ballot)
- Links ballot, position, and candidate
- No voter PII stored (anonymity preserved)
- One vote per position per ballot

#### **PasswordReset**
- Password reset OTP records
- Links to User account

#### **AuditLog**
- Immutable system activity log
- Records all administrative actions
- Append-only for transparency

---

## 📁 Project Structure

```
ballot-buddy/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma          # Database schema
│   │   ├── migrations/            # Database migrations
│   │   └── seed.js                # Database seeding
│   ├── src/
│   │   ├── config/
│   │   │   └── prisma.js          # Database configuration
│   │   ├── controllers/           # Request handlers
│   │   │   ├── auth.controller.js
│   │   │   ├── users.controller.js
│   │   │   ├── positions.controller.js
│   │   │   ├── candidates.controller.js
│   │   │   ├── voters.controller.js
│   │   │   ├── verification.controller.js
│   │   │   ├── votes.controller.js
│   │   │   ├── reports.controller.js
│   │   │   └── password-reset.controller.js
│   │   ├── middleware/
│   │   │   └── auth.middleware.js # Authentication middleware
│   │   ├── routes/                # API routes
│   │   │   ├── auth.routes.js
│   │   │   ├── users.routes.js
│   │   │   ├── positions.routes.js
│   │   │   ├── candidates.routes.js
│   │   │   ├── voters.routes.js
│   │   │   ├── verification.routes.js
│   │   │   ├── votes.routes.js
│   │   │   └── reports.routes.js
│   │   ├── utils/                 # Utility functions
│   │   │   ├── emailService.js
│   │   │   ├── smsService.js
│   │   │   ├── auditLogger.js
│   │   │   └── pdfHelpers.js
│   │   └── server.js              # Express server setup
│   ├── uploads/                   # Uploaded files (photos, PDFs)
│   └── package.json
│
├── frontend/
│   ├── public/
│   │   └── ballot.svg             # Favicon
│   ├── src/
│   │   ├── components/
│   │   │   ├── audit/             # Audit log components
│   │   │   ├── auth/              # Authentication components
│   │   │   ├── candidates/        # Candidate management
│   │   │   ├── layout/            # Layout components
│   │   │   ├── positions/         # Position management
│   │   │   ├── reports/           # Reports & analytics
│   │   │   ├── ui/                # Reusable UI components
│   │   │   ├── users/             # User management
│   │   │   └── voters/            # Voter management
│   │   ├── pages/                 # Page components
│   │   │   ├── HomePage.tsx
│   │   │   ├── AdminDashboard.tsx
│   │   │   ├── OfficerDashboard.tsx
│   │   │   ├── CandidateDashboard.tsx
│   │   │   ├── VerificationPage.tsx
│   │   │   ├── VotingPage.tsx
│   │   │   └── ReportsPage.tsx
│   │   ├── services/
│   │   │   └── api.ts             # API service layer
│   │   ├── lib/                   # Utility libraries
│   │   ├── config/                # Configuration files
│   │   ├── App.tsx                # Main app component
│   │   └── main.tsx               # Entry point
│   ├── index.html
│   └── package.json
│
└── README.md                      # This file
```

---

## 🚀 Setup Instructions

### Prerequisites

- **Node.js** (v18 or higher)
- **MySQL** (v8.0 or higher)
- **npm** or **yarn**
- **Git**

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the `backend` directory:
   ```env
   DATABASE_URL="mysql://username:password@localhost:3306/evoting_db"
   JWT_SECRET="your-super-secret-jwt-key-here"
   PORT=5000
   NODE_ENV=development
   FRONTEND_URL="http://localhost:3000"
   
   # Email Configuration (for password reset)
   EMAIL_HOST="smtp.gmail.com"
   EMAIL_PORT=587
   EMAIL_USER="your-email@gmail.com"
   EMAIL_PASS="your-app-password"
   
   # SMS Configuration (for OTP)
   SMS_API_KEY="your-sms-api-key"
   SMS_API_SECRET="your-sms-api-secret"
   SMS_FROM="your-sms-number"
   ```

4. **Set up database**
   ```bash
   # Generate Prisma client
   npm run prisma:generate
   
   # Run migrations
   npm run prisma:migrate
   
   # (Optional) Seed database
   npm run prisma:seed
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

   Server will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables** (Optional)
   Create a `.env` file in the `frontend` directory:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

   Application will run on `http://localhost:3000`

### Production Build

**Backend:**
```bash
cd backend
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
npm run serve
```

---

## 🔧 Environment Variables

### Backend Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | MySQL connection string | `mysql://user:pass@localhost:3306/db` |
| `JWT_SECRET` | Secret key for JWT tokens | `your-secret-key` |
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment mode | `development` or `production` |
| `FRONTEND_URL` | Frontend application URL | `http://localhost:3000` |
| `EMAIL_HOST` | SMTP server host | `smtp.gmail.com` |
| `EMAIL_PORT` | SMTP server port | `587` |
| `EMAIL_USER` | SMTP username | `your-email@gmail.com` |
| `EMAIL_PASS` | SMTP password/app password | `your-password` |
| `SMS_API_KEY` | SMS service API key | `your-api-key` |
| `SMS_API_SECRET` | SMS service API secret | `your-api-secret` |
| `SMS_FROM` | SMS sender number | `+1234567890` |

### Frontend Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `http://localhost:5000/api` |

---

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication

Most endpoints require JWT authentication. Include token in headers:
```
Authorization: Bearer <token>
```

### API Endpoints

#### Authentication (`/api/auth`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/login` | User login | No |
| POST | `/auth/register` | Candidate registration | No |
| GET | `/auth/me` | Get current user | Yes |
| POST | `/auth/change-password` | Change password | Yes |
| POST | `/auth/forgot-password` | Request password reset | No |
| POST | `/auth/reset-password` | Reset password with OTP | No |

#### Users (`/api/users`)

| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| GET | `/users` | Get all users | Yes | ADMIN |
| POST | `/users/officers` | Create officer | Yes | ADMIN |
| GET | `/users/:id` | Get user details | Yes | ADMIN |
| PATCH | `/users/:id/status` | Update user status | Yes | ADMIN |
| DELETE | `/users/:id` | Delete user | Yes | ADMIN |

#### Positions (`/api/positions`)

| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| GET | `/positions` | Get all positions | Yes | ADMIN, OFFICER |
| POST | `/positions` | Create position | Yes | ADMIN |
| GET | `/positions/:id` | Get position details | Yes | All |
| PATCH | `/positions/:id` | Update position | Yes | ADMIN |
| DELETE | `/positions/:id` | Delete position | Yes | ADMIN |

#### Candidates (`/api/candidates`)

| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| GET | `/candidates` | Get all candidates | Yes | ADMIN, OFFICER |
| GET | `/candidates/my-nominations` | Get my nominations | Yes | CANDIDATE |
| POST | `/candidates` | Submit nomination | Yes | CANDIDATE |
| POST | `/candidates/:id/approve` | Approve nomination | Yes | OFFICER |
| POST | `/candidates/:id/reject` | Reject nomination | Yes | OFFICER |
| DELETE | `/candidates/:id` | Delete nomination | Yes | ADMIN |

#### Voters (`/api/voters`)

| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| GET | `/voters` | Get all voters | Yes | ADMIN |
| POST | `/voters/import` | Import voters (CSV) | Yes | ADMIN |
| GET | `/voters/:id` | Get voter details | Yes | ADMIN |

#### Verification (`/api/verify`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/verify/request-otp` | Request OTP | No |
| POST | `/verify/confirm` | Confirm OTP | No |

#### Voting (`/api/vote`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/vote/positions` | Get positions for voting | Yes (Ballot Token) |
| POST | `/vote` | Cast vote | Yes (Ballot Token) |

#### Reports (`/api/reports`)

| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| GET | `/reports/turnout` | Get turnout statistics | Yes | ADMIN |
| GET | `/reports/results` | Get election results | Yes | ADMIN |
| GET | `/reports/audit` | Get audit log | Yes | ADMIN |
| GET | `/reports/export/:type` | Export report (CSV/PDF) | Yes | ADMIN |

---

## 🎨 Frontend Components

### Layout Components

#### `DashboardLayout`
- Wraps all dashboard pages
- Provides sidebar and top bar
- Handles navigation actions
- **Props**: `role`, `title`, `subtitle`, `children`, `onNavAction`

#### `Sidebar`
- Role-based navigation menu
- Collapsible design
- Active route highlighting
- Modal trigger support

#### `TopBar`
- Dashboard header
- User info display
- Logout functionality

### Page Components

#### `HomePage`
- Landing page with role selection
- Vertical card layout
- "How It Works" section

#### `AdminDashboard`
- Overview statistics
- Quick actions grid
- Officer management
- Modal triggers

#### `OfficerDashboard`
- Pending nominations
- Approve/reject functionality
- Status tracking

#### `CandidateDashboard`
- Nomination submissions
- Status tracking
- Nomination form

#### `VerificationPage`
- Registration number input
- OTP verification
- Two-step process

#### `VotingPage`
- Step-by-step voting wizard
- Candidate selection
- Progress tracking
- Photo display

#### `ReportsPage`
- Election results visualization
- Line charts with candidate data
- Position selection
- Export capabilities

### Modal Components

- `CreateOfficerModal`: Create returning officers
- `CreatePositionModal`: Create election positions
- `PositionsListModal`: Manage positions
- `CandidatesListModal`: View all candidates
- `ImportVotersModal`: CSV import interface
- `VotersListModal`: Voter database viewer
- `NominationForm`: Candidate nomination form
- `ExportReportsModal`: Report export options
- `AuditLogModal`: System activity log

### UI Components (Shadcn/ui)

- `Button`: Styled button component
- `Card`: Card container
- `Input`: Form input field
- `Label`: Form label
- `Logo`: Application logo

---

## 🔐 Authentication & Authorization

### Authentication Flow

1. **Login**
   - User provides email and password
   - Server validates credentials
   - JWT token generated and returned
   - Token stored in localStorage

2. **Protected Routes**
   - `ProtectedRoute` component checks token
   - Validates user role
   - Redirects to login if unauthorized

3. **Token Refresh**
   - Token validated on each API request
   - Auto-redirect on expiration
   - Account deactivation handling

### Role Permissions

| Feature | Admin | Officer | Candidate | Voter |
|---------|-------|---------|-----------|-------|
| Create Positions | ✅ | ❌ | ❌ | ❌ |
| Create Officers | ✅ | ❌ | ❌ | ❌ |
| Import Voters | ✅ | ❌ | ❌ | ❌ |
| Approve Nominations | ❌ | ✅ | ❌ | ❌ |
| Submit Nominations | ❌ | ❌ | ✅ | ❌ |
| View Reports | ✅ | ❌ | ❌ | ❌ |
| View Audit Log | ✅ | ❌ | ❌ | ❌ |
| Vote | ❌ | ❌ | ❌ | ✅ |

---

## 🗄️ Database Schema Details

### Tables

#### `users`
- Stores admin, officer, and candidate accounts
- Self-referencing for created officers tracking

#### `positions`
- Election positions with time windows
- Supports multiple seats per position

#### `candidates`
- Nomination records
- Links users to positions
- Stores photos and manifestos

#### `eligible_voters`
- Voter registry from CSV import
- Contains registration numbers and contact info

#### `verifications`
- OTP verification records
- Links to voters and generates ballot tokens

#### `ballots`
- Issued to verified voters
- Contains unique tokens for anonymity

#### `votes`
- Secret ballot records
- No voter PII stored
- One vote per position per ballot

#### `password_resets`
- Password reset OTP records

#### `audit_logs`
- Immutable activity log
- Records all system actions

---

## 🎨 Design System

### Color Palette (White & Pink Theme)

- **Primary**: `#EC4899` (Pink-500)
- **Secondary**: `#F472B6` (Pink-400)
- **Background**: `#FFFFFF` (White)
- **Text**: `#1F2937` (Gray-900)
- **Border**: `#FBCFE8` (Pink-200)

### Typography

- **Font Family**: Inter (Google Fonts)
- **Headings**: Bold, tracking-tight
- **Body**: Regular weight

### Components Styling

- **Cards**: White background, pink borders, rounded corners
- **Buttons**: Pink gradient, hover effects
- **Inputs**: White background, pink focus rings
- **Icons**: Pink/rose colored

---

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Breakpoints**: 
  - sm: 640px
  - md: 768px
  - lg: 1024px
  - xl: 1280px

---

## 🚢 Deployment

### Backend Deployment

1. Set environment variables on hosting platform
2. Run database migrations
3. Start Node.js process
4. Configure reverse proxy (nginx)

### Frontend Deployment

1. Build production bundle: `npm run build`
2. Serve `dist` folder via web server
3. Configure API URL in environment variables

---

## 🧪 Testing

### Manual Testing Checklist

- [ ] User authentication flows
- [ ] Role-based access control
- [ ] OTP verification process
- [ ] Voting workflow
- [ ] Nomination submission
- [ ] CSV import functionality
- [ ] Report generation
- [ ] File uploads (photos, PDFs)

---

## 📝 API Request/Response Examples

### Login Request
```json
POST /api/auth/login
{
  "email": "admin@example.com",
  "password": "password123"
}
```

### Login Response
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "email": "admin@example.com",
    "name": "Admin User",
    "role": "ADMIN"
  }
}
```

### Create Position Request
```json
POST /api/positions
{
  "name": "President",
  "seats": 1,
  "nominationOpens": "2024-01-01T00:00:00Z",
  "nominationCloses": "2024-01-15T23:59:59Z",
  "votingOpens": "2024-01-20T00:00:00Z",
  "votingCloses": "2024-01-25T23:59:59Z"
}
```

---

## 🔍 Key Features Explained

### Secret Ballot System

1. Voter verifies identity with OTP
2. System issues unique ballot token
3. Voter casts votes using token
4. Votes stored without voter PII
5. Ballot token consumed after voting

### Nomination Workflow

1. Candidate registers account
2. Candidate submits nomination during open period
3. Officer reviews nomination
4. Officer approves or rejects with reason
5. Approved candidates appear in voting interface

### Audit Trail

- All administrative actions logged
- Immutable audit log entries
- Tracks: actor, action, entity, timestamp
- Append-only for transparency

---

## 🐛 Troubleshooting

### Common Issues

**Database Connection Error**
- Verify MySQL service is running
- Check DATABASE_URL format
- Verify credentials

**CORS Errors**
- Check FRONTEND_URL in backend .env
- Verify CORS middleware configuration

**File Upload Issues**
- Check uploads directory permissions
- Verify multer configuration

---

## 📄 License

This project is proprietary software developed for educational purposes.

---

## 👥 Contributors

- Development Team

---

## 📞 Support

For issues or questions, please contact the development team.

---

**Last Updated**: November 2025

**Version**: 1.0.0

