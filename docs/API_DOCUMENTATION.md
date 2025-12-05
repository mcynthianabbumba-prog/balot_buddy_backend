# API Documentation

Complete API reference for BALLOT BUDDY backend services.

## Base URL

```
Development: http://localhost:5000/api
Production: <your-production-url>/api
```

## Authentication

Most endpoints require JWT authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

---

## Authentication Endpoints

### POST `/api/auth/login`

Login user and receive JWT token.

**Request:**
```json
{
  "email": "admin@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "email": "admin@example.com",
    "name": "Admin User",
    "role": "ADMIN",
    "status": "ACTIVE"
  }
}
```

**Errors:**
- `400`: Invalid credentials
- `401`: Unauthorized

---

### POST `/api/auth/register`

Register a new candidate account.

**Request:**
```json
{
  "email": "candidate@example.com",
  "password": "password123",
  "name": "John Doe",
  "regNo": "M24B13/054",
  "program": "Computer Science"
}
```

**Response (201):**
```json
{
  "message": "Registration successful",
  "user": {
    "id": "uuid",
    "email": "candidate@example.com",
    "name": "John Doe",
    "role": "CANDIDATE"
  }
}
```

---

### GET `/api/auth/me`

Get current authenticated user information.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "id": "uuid",
  "email": "admin@example.com",
  "name": "Admin User",
  "role": "ADMIN",
  "status": "ACTIVE"
}
```

---

### POST `/api/auth/change-password`

Change user password (authenticated).

**Headers:**
```
Authorization: Bearer <token>
```

**Request:**
```json
{
  "currentPassword": "oldpassword",
  "newPassword": "newpassword123"
}
```

---

### POST `/api/auth/forgot-password`

Request password reset OTP.

**Request:**
```json
{
  "email": "user@example.com"
}
```

**Response (200):**
```json
{
  "message": "OTP sent to your email"
}
```

---

### POST `/api/auth/reset-password`

Reset password using OTP.

**Request:**
```json
{
  "email": "user@example.com",
  "otp": "123456",
  "newPassword": "newpassword123"
}
```

---

## User Management Endpoints

**All require ADMIN role**

### GET `/api/users`

Get all users (paginated).

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 50)
- `role` (optional): Filter by role (ADMIN/OFFICER/CANDIDATE)

**Response (200):**
```json
{
  "users": [
    {
      "id": "uuid",
      "email": "user@example.com",
      "name": "User Name",
      "role": "OFFICER",
      "status": "ACTIVE"
    }
  ],
  "pagination": {
    "total": 100,
    "page": 1,
    "limit": 50,
    "totalPages": 2
  }
}
```

---

### POST `/api/users/officers`

Create a new returning officer.

**Request:**
```json
{
  "email": "officer@example.com",
  "password": "password123",
  "name": "Officer Name",
  "staffId": "STAFF001"
}
```

**Response (201):**
```json
{
  "message": "Officer created successfully",
  "user": {
    "id": "uuid",
    "email": "officer@example.com",
    "name": "Officer Name",
    "role": "OFFICER"
  }
}
```

---

### GET `/api/users/:id`

Get user details by ID.

**Response (200):**
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "name": "User Name",
  "role": "OFFICER",
  "status": "ACTIVE",
  "createdAt": "2024-01-01T00:00:00Z"
}
```

---

### PATCH `/api/users/:id/status`

Update user status (activate/deactivate).

**Request:**
```json
{
  "status": "INACTIVE"
}
```

---

### DELETE `/api/users/:id`

Delete user account.

**Response (200):**
```json
{
  "message": "User deleted successfully"
}
```

---

## Position Management Endpoints

**Requires ADMIN role**

### GET `/api/positions`

Get all positions.

**Response (200):**
```json
[
  {
    "id": "uuid",
    "name": "President",
    "seats": 1,
    "nominationOpens": "2024-01-01T00:00:00Z",
    "nominationCloses": "2024-01-15T23:59:59Z",
    "votingOpens": "2024-01-20T00:00:00Z",
    "votingCloses": "2024-01-25T23:59:59Z"
  }
]
```

---

### POST `/api/positions`

Create new election position.

**Request:**
```json
{
  "name": "President",
  "seats": 1,
  "nominationOpens": "2024-01-01T00:00:00Z",
  "nominationCloses": "2024-01-15T23:59:59Z",
  "votingOpens": "2024-01-20T00:00:00Z",
  "votingCloses": "2024-01-25T23:59:59Z"
}
```

**Response (201):**
```json
{
  "id": "uuid",
  "name": "President",
  "seats": 1,
  "nominationOpens": "2024-01-01T00:00:00Z",
  "nominationCloses": "2024-01-15T23:59:59Z",
  "votingOpens": "2024-01-20T00:00:00Z",
  "votingCloses": "2024-01-25T23:59:59Z"
}
```

---

### GET `/api/positions/:id`

Get position details.

**Response (200):**
```json
{
  "id": "uuid",
  "name": "President",
  "seats": 1,
  "nominationOpens": "2024-01-01T00:00:00Z",
  "nominationCloses": "2024-01-15T23:59:59Z",
  "votingOpens": "2024-01-20T00:00:00Z",
  "votingCloses": "2024-01-25T23:59:59Z",
  "candidates": [],
  "_count": {
    "candidates": 5,
    "votes": 100
  }
}
```

---

### PATCH `/api/positions/:id`

Update position (currently not implemented - positions are immutable after creation).

---

### DELETE `/api/positions/:id`

Delete position (only if no candidates or votes).

**Response (200):**
```json
{
  "message": "Position deleted successfully"
}
```

**Errors:**
- `400`: Position has candidates or votes

---

## Candidate Management Endpoints

### GET `/api/candidates`

Get all candidates (ADMIN, OFFICER only).

**Response (200):**
```json
[
  {
    "id": "uuid",
    "positionId": "uuid",
    "userId": "uuid",
    "name": "Candidate Name",
    "program": "Computer Science",
    "manifestoUrl": "/uploads/manifesto.pdf",
    "photoUrl": "/uploads/photo.jpg",
    "status": "APPROVED",
    "position": {
      "id": "uuid",
      "name": "President"
    },
    "user": {
      "id": "uuid",
      "email": "candidate@example.com"
    }
  }
]
```

---

### GET `/api/candidates/my-nominations`

Get current user's nominations (CANDIDATE only).

**Response (200):**
```json
[
  {
    "id": "uuid",
    "position": {
      "id": "uuid",
      "name": "President",
      "nominationOpens": "2024-01-01T00:00:00Z",
      "nominationCloses": "2024-01-15T23:59:59Z"
    },
    "name": "My Name",
    "program": "Computer Science",
    "status": "SUBMITTED"
  }
]
```

---

### POST `/api/candidates`

Submit nomination (CANDIDATE only).

**Content-Type:** `multipart/form-data`

**Request:**
```
name: "Candidate Name"
program: "Computer Science"
positionId: "uuid"
photo: <file>
manifesto: <file>
```

**Response (201):**
```json
{
  "message": "Nomination submitted successfully",
  "candidate": {
    "id": "uuid",
    "status": "SUBMITTED"
  }
}
```

---

### POST `/api/candidates/:id/approve`

Approve nomination (OFFICER only).

**Response (200):**
```json
{
  "message": "Nomination approved successfully"
}
```

---

### POST `/api/candidates/:id/reject`

Reject nomination with reason (OFFICER only).

**Request:**
```json
{
  "reason": "Incomplete documentation"
}
```

**Response (200):**
```json
{
  "message": "Nomination rejected successfully"
}
```

---

### DELETE `/api/candidates/:id`

Delete nomination (ADMIN only).

---

## Voter Management Endpoints

**Requires ADMIN role**

### GET `/api/voters`

Get all eligible voters (paginated).

**Query Parameters:**
- `page` (optional): Page number
- `limit` (optional): Items per page
- `search` (optional): Search by name or regNo

**Response (200):**
```json
{
  "voters": [
    {
      "id": "uuid",
      "regNo": "M24B13/054",
      "name": "Voter Name",
      "email": "voter@example.com",
      "phone": "+1234567890",
      "program": "Computer Science",
      "status": "ELIGIBLE"
    }
  ],
  "pagination": {
    "total": 1000,
    "page": 1,
    "limit": 50,
    "totalPages": 20
  }
}
```

---

### POST `/api/voters/import`

Import voters from CSV file.

**Content-Type:** `multipart/form-data`

**Request:**
```
file: <csv-file>
```

**CSV Format:**
```csv
regNo,name,email,phone,program
M24B13/054,John Doe,john@example.com,+1234567890,Computer Science
```

**Response (200):**
```json
{
  "message": "Voters imported successfully",
  "imported": 100,
  "failed": 0
}
```

---

### GET `/api/voters/:id`

Get voter details.

---

## Verification Endpoints

**Public - No authentication required**

### POST `/api/verify/request-otp`

Request OTP for voter verification.

**Request:**
```json
{
  "regNo": "M24B13/054"
}
```

**Response (200):**
```json
{
  "message": "OTP sent via SMS",
  "sentVia": ["SMS"]
}
```

**Errors:**
- `404`: Voter not found
- `429`: Rate limit exceeded

---

### POST `/api/verify/confirm`

Confirm OTP and receive ballot token.

**Request:**
```json
{
  "regNo": "M24B13/054",
  "otp": "123456"
}
```

**Response (200):**
```json
{
  "message": "Verification successful",
  "ballotToken": "unique-ballot-token-here"
}
```

**Errors:**
- `400`: Invalid or expired OTP
- `404`: Verification not found

---

## Voting Endpoints

**Requires Ballot Token authentication**

### GET `/api/vote/positions`

Get positions available for voting.

**Headers:**
```
Authorization: Bearer <ballot-token>
```

**Response (200):**
```json
[
  {
    "id": "uuid",
    "name": "President",
    "seats": 1,
    "candidates": [
      {
        "id": "uuid",
        "name": "Candidate Name",
        "program": "Computer Science",
        "photoUrl": "/uploads/photo.jpg"
      }
    ]
  }
]
```

---

### POST `/api/vote`

Cast votes for positions.

**Headers:**
```
Authorization: Bearer <ballot-token>
```

**Request:**
```json
{
  "votes": [
    {
      "positionId": "uuid",
      "candidateId": "uuid"
    },
    {
      "positionId": "uuid",
      "candidateId": "uuid"
    }
  ]
}
```

**Response (200):**
```json
{
  "message": "Votes cast successfully",
  "votesCast": 2
}
```

**Errors:**
- `400`: Invalid vote (position closed, candidate not found, etc.)
- `409`: Duplicate vote for position

---

## Reports Endpoints

**Requires ADMIN role**

### GET `/api/reports/turnout`

Get voter turnout statistics.

**Response (200):**
```json
{
  "totalVoters": 1000,
  "verifiedVoters": 800,
  "votesCast": 750,
  "ballotsIssued": 800,
  "nonVoters": 250,
  "turnout": 75.0,
  "verificationRate": 80.0,
  "ballotUsageRate": 93.75,
  "nonVoterPercentage": 25.0,
  "breakdown": {
    "voted": 750,
    "notVoted": 250,
    "verified": 800,
    "notVerified": 200
  }
}
```

---

### GET `/api/reports/results`

Get election results with candidate performance.

**Response (200):**
```json
{
  "positions": [
    {
      "positionId": "uuid",
      "positionName": "President",
      "seats": 1,
      "totalVotes": 750,
      "candidates": [
        {
          "candidateId": "uuid",
          "name": "Candidate Name",
          "program": "Computer Science",
          "photoUrl": "/uploads/photo.jpg",
          "votes": 400,
          "rank": 1,
          "votePercentage": 53.33,
          "overallPercentage": 40.0,
          "isWinner": true
        }
      ],
      "winner": {
        "candidateId": "uuid",
        "name": "Candidate Name",
        "votes": 400
      }
    }
  ],
  "summary": {
    "totalPositions": 5,
    "totalCandidates": 25,
    "totalVotesCast": 3750
  }
}
```

---

### GET `/api/reports/audit`

Get audit log entries.

**Query Parameters:**
- `page` (optional): Page number
- `limit` (optional): Items per page (default: 50)
- `actorType` (optional): Filter by actor type
- `action` (optional): Filter by action

**Response (200):**
```json
{
  "logs": [
    {
      "id": "uuid",
      "actorType": "admin",
      "actorId": "uuid",
      "action": "CREATE_POSITION",
      "entity": "position",
      "entityId": "uuid",
      "payload": {},
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ],
  "totalPages": 10
}
```

---

### GET `/api/reports/export/:type`

Export reports as CSV or PDF.

**Types:** `turnout-csv`, `results-pdf`, `audit-csv`

**Response:**
- CSV: File download
- PDF: PDF file download

---

## Error Responses

All errors follow this format:

```json
{
  "error": "Error message here",
  "hint": "Additional help text (optional)"
}
```

### Common HTTP Status Codes

- `200`: Success
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `409`: Conflict
- `429`: Too Many Requests (Rate Limited)
- `500`: Internal Server Error

---

## Rate Limiting

- **OTP Requests**: 3 requests per 5 minutes per registration number
- **Login Attempts**: 5 attempts per 15 minutes per IP
- **API Requests**: 100 requests per minute per IP

---

## File Uploads

### Supported Formats

- **Photos**: JPG, PNG, WebP (max 5MB)
- **Manifestos**: PDF (max 10MB)
- **CSV Files**: CSV format (max 5MB)

### Upload Endpoints

- Candidate photos: `/api/candidates` (multipart/form-data)
- Manifestos: `/api/candidates` (multipart/form-data)
- Voter CSV: `/api/voters/import` (multipart/form-data)

---

## WebSocket Events (if implemented)

Currently, the system uses REST API only. WebSocket support may be added in future versions.

---

For more details, see the source code in `backend/src/routes/` and `backend/src/controllers/`.

