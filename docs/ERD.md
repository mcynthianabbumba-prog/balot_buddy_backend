# Entity Relationship Diagram (ERD)

## Database Schema Overview

This document provides a detailed Entity Relationship Diagram for the BALLOT BUDDY voting system.

---

## Complete ERD Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           BALLOT BUDDY DATABASE ERD                          │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                                  USER                                        │
├─────────────────────────────────────────────────────────────────────────────┤
│ PK  id                 String (UUID)                                         │
│ UQ  email              String                                                │
│     password           String (bcrypt)                                       │
│     name               String                                                │
│     role               Enum (ADMIN | OFFICER | CANDIDATE)                   │
│     regNo              String? (nullable)                                    │
│     program            String? (nullable)                                    │
│     staffId            String? (nullable)                                    │
│     status             String (ACTIVE/INACTIVE)                              │
│     emailVerified      Boolean                                               │
│ FK  createdBy          String? → User.id                                     │
│     createdAt          DateTime                                              │
│     updatedAt          DateTime                                              │
└─────────────────────────────────────────────────────────────────────────────┘
         │                    │                    │
         │                    │                    │
         │                    │                    │
    ┌────▼────┐         ┌────▼────┐         ┌────▼────────────┐
    │CREATES  │         │SUBMITS  │         │HAS              │
    │OFFICERS │         │CANDIDATE│         │PASSWORD RESETS  │
    └─────────┘         └─────────┘         └─────────────────┘


┌─────────────────────────────────────────────────────────────────────────────┐
│                               POSITION                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│ PK  id                 String (UUID)                                         │
│     name               String                                                │
│     seats              Integer (default: 1)                                  │
│     nominationOpens    DateTime                                              │
│     nominationCloses   DateTime                                              │
│     votingOpens        DateTime                                              │
│     votingCloses       DateTime                                              │
│     createdAt          DateTime                                              │
│     updatedAt          DateTime                                              │
└─────────────────────────────────────────────────────────────────────────────┘
         │                    │
         │                    │
    ┌────▼────┐         ┌────▼────┐
    │HAS      │         │RECEIVES │
    │CANDIDATES│        │VOTES    │
    └─────────┘         └─────────┘


┌─────────────────────────────────────────────────────────────────────────────┐
│                              CANDIDATE                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│ PK  id                 String (UUID)                                         │
│ FK  positionId         String → Position.id                                  │
│ FK  userId             String → User.id                                      │
│     name               String                                                │
│     program            String                                                │
│     manifestoUrl       String? (nullable)                                    │
│     photoUrl           String? (nullable)                                    │
│     status             Enum (SUBMITTED | APPROVED | REJECTED)               │
│     reason             String? (nullable)                                    │
│     createdAt          DateTime                                              │
│     updatedAt          DateTime                                              │
│ UQ  (positionId, userId) - Unique constraint                                │
└─────────────────────────────────────────────────────────────────────────────┘
         │
         │
    ┌────▼────┐
    │RECEIVES │
    │VOTES    │
    └─────────┘


┌─────────────────────────────────────────────────────────────────────────────┐
│                          ELIGIBLE VOTER                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│ PK  id                 String (UUID)                                         │
│ UQ  regNo              String                                                │
│     name               String                                                │
│     email              String? (nullable)                                    │
│     phone              String? (nullable)                                    │
│     program            String? (nullable)                                    │
│     status             String (ELIGIBLE)                                     │
│     createdAt          DateTime                                              │
│     updatedAt          DateTime                                              │
└─────────────────────────────────────────────────────────────────────────────┘
         │                    │
         │                    │
    ┌────▼────┐         ┌────▼────┐
    │HAS      │         │RECEIVES │
    │VERIFICATIONS│     │BALLOTS  │
    └─────────┘         └─────────┘


┌─────────────────────────────────────────────────────────────────────────────┐
│                            VERIFICATION                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│ PK  id                 String (UUID)                                         │
│ FK  voterId            String → EligibleVoter.id                             │
│     method             String (email/sms)                                    │
│     otpHash            String                                                │
│     issuedAt           DateTime                                              │
│     expiresAt          DateTime                                              │
│     verifiedAt         DateTime? (nullable)                                  │
│     ballotToken        String? (nullable)                                    │
│     consumedAt         DateTime? (nullable)                                  │
└─────────────────────────────────────────────────────────────────────────────┘


┌─────────────────────────────────────────────────────────────────────────────┐
│                               BALLOT                                         │
├─────────────────────────────────────────────────────────────────────────────┤
│ PK  id                 String (UUID)                                         │
│ FK  voterId            String → EligibleVoter.id                             │
│ UQ  token              String                                                │
│     status             String (ACTIVE | CONSUMED)                            │
│     issuedAt           DateTime                                              │
│     consumedAt         DateTime? (nullable)                                  │
└─────────────────────────────────────────────────────────────────────────────┘
         │
         │
    ┌────▼────┐
    │HAS      │
    │VOTES    │
    └─────────┘


┌─────────────────────────────────────────────────────────────────────────────┐
│                                VOTE                                          │
├─────────────────────────────────────────────────────────────────────────────┤
│ PK  id                 String (UUID)                                         │
│ FK  ballotId           String → Ballot.id                                    │
│ FK  positionId         String → Position.id                                  │
│ FK  candidateId        String → Candidate.id                                 │
│     castAt             DateTime                                              │
│ UQ  (ballotId, positionId) - One vote per position per ballot               │
└─────────────────────────────────────────────────────────────────────────────┘


┌─────────────────────────────────────────────────────────────────────────────┐
│                          PASSWORD RESET                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│ PK  id                 String (UUID)                                         │
│ FK  userId             String → User.id                                      │
│     otpHash            String                                                │
│     issuedAt           DateTime                                              │
│     expiresAt          DateTime                                              │
│     verifiedAt         DateTime? (nullable)                                  │
│     resetAt            DateTime? (nullable)                                  │
│     consumedAt         DateTime? (nullable)                                  │
└─────────────────────────────────────────────────────────────────────────────┘


┌─────────────────────────────────────────────────────────────────────────────┐
│                             AUDIT LOG                                        │
├─────────────────────────────────────────────────────────────────────────────┤
│ PK  id                 String (UUID)                                         │
│     actorType          String (admin/officer/candidate/voter/system)        │
│     actorId            String? (nullable)                                    │
│     action             String                                                │
│     entity             String? (nullable)                                    │
│     entityId           String? (nullable)                                    │
│     payload            JSON? (nullable)                                      │
│     createdAt          DateTime (immutable)                                  │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Relationship Details

### User Relationships

1. **User → User (Self-Referencing)**
   - `createdBy` → `User.id`
   - Purpose: Track which admin created which officer
   - Type: One-to-Many (One admin creates many officers)

2. **User → Candidate**
   - `User.id` → `Candidate.userId`
   - Purpose: Link candidates to their user accounts
   - Type: One-to-Many (One user can have multiple nominations)

3. **User → PasswordReset**
   - `User.id` → `PasswordReset.userId`
   - Purpose: Track password reset requests
   - Type: One-to-Many

### Position Relationships

1. **Position → Candidate**
   - `Position.id` → `Candidate.positionId`
   - Purpose: Link candidates to positions
   - Type: One-to-Many (One position has many candidates)
   - Constraint: Unique `(positionId, userId)` - one candidate per position

2. **Position → Vote**
   - `Position.id` → `Vote.positionId`
   - Purpose: Link votes to positions
   - Type: One-to-Many

### Candidate Relationships

1. **Candidate → Vote**
   - `Candidate.id` → `Vote.candidateId`
   - Purpose: Track votes received
   - Type: One-to-Many

### EligibleVoter Relationships

1. **EligibleVoter → Verification**
   - `EligibleVoter.id` → `Verification.voterId`
   - Purpose: Track OTP verifications
   - Type: One-to-Many

2. **EligibleVoter → Ballot**
   - `EligibleVoter.id` → `Ballot.voterId`
   - Purpose: Issue ballots to verified voters
   - Type: One-to-Many

### Ballot Relationships

1. **Ballot → Vote**
   - `Ballot.id` → `Vote.ballotId`
   - Purpose: Link votes to ballots (secret ballot)
   - Type: One-to-Many
   - Constraint: Unique `(ballotId, positionId)` - one vote per position

---

## Entity Attributes

### User Roles

- **ADMIN**: Full system access, can create officers and positions
- **OFFICER**: Can approve/reject candidate nominations
- **CANDIDATE**: Can submit nominations

### Candidate Status

- **SUBMITTED**: Nomination awaiting review
- **APPROVED**: Nomination approved, appears in voting
- **REJECTED**: Nomination rejected with reason

### Ballot Status

- **ACTIVE**: Ballot issued, not yet used
- **CONSUMED**: Ballot used for voting

---

## Database Constraints

### Unique Constraints

1. `users.email` - Unique email per user
2. `eligible_voters.regNo` - Unique registration number
3. `candidates(positionId, userId)` - One nomination per position per user
4. `ballots.token` - Unique ballot token
5. `votes(ballotId, positionId)` - One vote per position per ballot

### Foreign Key Constraints

- All foreign keys have `onDelete: Cascade` for data integrity
- Cascading deletes ensure referential integrity

### Indexes

- Primary keys are automatically indexed
- Unique constraints create indexes
- Foreign keys may benefit from additional indexes for performance

---

## Data Flow Diagrams

### Voting Flow

```
EligibleVoter
    │
    ├─→ Verification (OTP)
    │       │
    │       └─→ Ballot (Token Generated)
    │               │
    │               └─→ Vote (Secret Ballot)
    │                       │
    │                       ├─→ Position
    │                       └─→ Candidate
```

### Nomination Flow

```
User (CANDIDATE)
    │
    └─→ Candidate (Nomination)
            │
            ├─→ Position
            └─→ Status: SUBMITTED → APPROVED/REJECTED
```

---

## Cardinality

| Relationship | Cardinality | Notes |
|--------------|-------------|-------|
| User → User (created) | 1:N | One admin creates many officers |
| User → Candidate | 1:N | One user can submit multiple nominations |
| Position → Candidate | 1:N | One position has many candidates |
| Position → Vote | 1:N | One position receives many votes |
| Candidate → Vote | 1:N | One candidate receives many votes |
| EligibleVoter → Verification | 1:N | One voter can have multiple verification attempts |
| EligibleVoter → Ballot | 1:N | One voter can have multiple ballots (if re-issued) |
| Ballot → Vote | 1:N | One ballot contains votes for multiple positions |

---

## Index Strategy

### Recommended Indexes

```sql
-- User lookups
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_status ON users(status);

-- Candidate queries
CREATE INDEX idx_candidates_position ON candidates(position_id);
CREATE INDEX idx_candidates_user ON candidates(user_id);
CREATE INDEX idx_candidates_status ON candidates(status);

-- Voting queries
CREATE INDEX idx_votes_position ON votes(position_id);
CREATE INDEX idx_votes_candidate ON votes(candidate_id);
CREATE INDEX idx_votes_ballot ON votes(ballot_id);

-- Voter queries
CREATE INDEX idx_eligible_voters_regno ON eligible_voters(reg_no);

-- Audit log queries
CREATE INDEX idx_audit_logs_created ON audit_logs(created_at);
CREATE INDEX idx_audit_logs_actor ON audit_logs(actor_type, actor_id);
```

---

## Data Integrity Rules

1. **Cascade Deletes**: 
   - Deleting a User deletes their Candidates
   - Deleting a Position deletes Candidates and Votes
   - Deleting a Candidate deletes their Votes
   - Deleting an EligibleVoter deletes Verifications and Ballots
   - Deleting a Ballot deletes associated Votes

2. **Unique Constraints**:
   - One email per user
   - One registration number per voter
   - One nomination per position per candidate
   - One vote per position per ballot

3. **Validation**:
   - Email format validation
   - Date range validation (nomination closes before voting opens)
   - OTP expiration (5 minutes)

---

## Performance Considerations

1. **Vote Counting**: Indexed on `positionId` and `candidateId` for fast aggregation
2. **Voter Lookup**: Indexed on `regNo` for OTP requests
3. **Audit Logs**: Indexed on `createdAt` for time-based queries
4. **Candidates**: Indexed on `positionId` and `status` for filtering

---

This ERD provides a complete view of the database structure and relationships in the BALLOT BUDDY voting system.

