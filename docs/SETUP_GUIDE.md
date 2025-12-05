# Setup Guide

Complete step-by-step guide to set up and run the BALLOT BUDDY voting system.

---

## 📋 Prerequisites

Before starting, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher)
  - Download from: https://nodejs.org/
  - Verify: `node --version`

- **MySQL** (v8.0 or higher)
  - Download from: https://dev.mysql.com/downloads/
  - Verify: `mysql --version`

- **npm** (comes with Node.js)
  - Verify: `npm --version`

- **Git** (optional, for version control)
  - Download from: https://git-scm.com/

---

## 🗄️ Database Setup

### Step 1: Create MySQL Database

1. **Start MySQL Service**
   
   **Windows:**
   ```powershell
   # Open Services
   services.msc
   # Find MySQL and Start it
   
   # OR via Command Prompt (as Admin)
   net start MySQL
   ```

   **Linux/Mac:**
   ```bash
   sudo systemctl start mysql
   # OR
   brew services start mysql
   ```

2. **Access MySQL**
   ```bash
   mysql -u root -p
   ```

3. **Create Database**
   ```sql
   CREATE DATABASE evoting_db;
   USE evoting_db;
   ```

4. **Create User (Optional but Recommended)**
   ```sql
   CREATE USER 'evoting_user'@'localhost' IDENTIFIED BY 'your_secure_password';
   GRANT ALL PRIVILEGES ON evoting_db.* TO 'evoting_user'@'localhost';
   FLUSH PRIVILEGES;
   EXIT;
   ```

---

## 🔧 Backend Setup

### Step 1: Navigate to Backend Directory

```bash
cd backend
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages listed in `package.json`.

### Step 3: Configure Environment Variables

Create a `.env` file in the `backend` directory:

```env
# Database Configuration
DATABASE_URL="mysql://evoting_user:your_secure_password@localhost:3306/evoting_db"

# JWT Configuration
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"

# Server Configuration
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
SMS_FROM="+1234567890"
```

**Important Notes:**
- Replace `your_secure_password` with your MySQL password
- Replace `your-super-secret-jwt-key-change-this-in-production` with a strong random string
- For Gmail, use an [App Password](https://support.google.com/accounts/answer/185833) instead of your regular password
- Configure SMS service credentials (e.g., Twilio, AWS SNS)

### Step 4: Generate Prisma Client

```bash
npm run prisma:generate
```

This creates the Prisma Client based on your schema.

### Step 5: Run Database Migrations

```bash
npm run prisma:migrate
```

This creates all database tables based on the Prisma schema.

### Step 6: Seed Database (Optional)

```bash
npm run prisma:seed
```

This creates initial admin user and sample data.

**Default Admin Credentials (from seed):**
- Email: `admin@example.com`
- Password: `admin123` (change immediately after first login)

### Step 7: Start Development Server

```bash
npm run dev
```

The server should start on `http://localhost:5000`

**Verify:** Open `http://localhost:5000/api/health` in browser - should return `{"status":"OK"}`

---

## 🎨 Frontend Setup

### Step 1: Navigate to Frontend Directory

```bash
cd frontend
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Configure Environment Variables (Optional)

Create a `.env` file in the `frontend` directory:

```env
VITE_API_URL=http://localhost:5000/api
```

If not set, it defaults to `http://localhost:5000/api`

### Step 4: Start Development Server

```bash
npm run dev
```

The application should start on `http://localhost:3000`

---

## ✅ Verification Steps

### Backend Verification

1. **Check Server Status**
   ```bash
   curl http://localhost:5000/api/health
   ```
   Should return: `{"status":"OK","message":"E-Voting System API is running"}`

2. **Check Database Connection**
   - Server logs should show: `✅ Database connected successfully!`

3. **Test Login Endpoint**
   ```bash
   curl -X POST http://localhost:5000/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"admin@example.com","password":"admin123"}'
   ```

### Frontend Verification

1. Open browser: `http://localhost:3000`
2. Should see the home page with role selection cards
3. Try navigating to login pages

---

## 🐛 Troubleshooting

### Backend Issues

#### Database Connection Error

**Symptoms:** Server fails to start, shows database connection error

**Solutions:**
1. Verify MySQL service is running
2. Check DATABASE_URL format in `.env`
3. Verify database exists: `SHOW DATABASES;`
4. Check user permissions: `SHOW GRANTS FOR 'evoting_user'@'localhost';`
5. Test connection manually:
   ```bash
   mysql -u evoting_user -p evoting_db
   ```

#### Port Already in Use

**Symptoms:** Error: `Port 5000 is already in use`

**Solutions:**
1. Find process using port:
   ```bash
   # Windows
   netstat -ano | findstr :5000
   
   # Linux/Mac
   lsof -i :5000
   ```
2. Kill process or change PORT in `.env`

#### Prisma Client Not Generated

**Symptoms:** Import errors for `@prisma/client`

**Solutions:**
```bash
npm run prisma:generate
```

### Frontend Issues

#### API Connection Error

**Symptoms:** Network errors, CORS errors

**Solutions:**
1. Verify backend is running on port 5000
2. Check `VITE_API_URL` in frontend `.env`
3. Verify CORS configuration in backend `server.js`
4. Check browser console for specific error messages

#### Build Errors

**Symptoms:** TypeScript errors, build fails

**Solutions:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Check TypeScript errors
npm run build
```

---

## 📦 Production Build

### Backend Production

1. **Set Environment Variables**
   - Use production database
   - Use strong JWT_SECRET
   - Set NODE_ENV=production

2. **Run Migrations**
   ```bash
   npm run prisma:migrate
   ```

3. **Start Server**
   ```bash
   npm start
   ```

### Frontend Production

1. **Build**
   ```bash
   npm run build
   ```

2. **Serve**
   ```bash
   npm run serve
   ```

   OR serve the `dist` folder using:
   - Nginx
   - Apache
   - Vercel
   - Netlify
   - Any static file server

---

## 🔐 Security Checklist

Before deploying to production:

- [ ] Change default admin password
- [ ] Use strong JWT_SECRET (32+ characters)
- [ ] Enable HTTPS
- [ ] Set secure database passwords
- [ ] Configure CORS properly
- [ ] Set up rate limiting
- [ ] Enable SQL injection protection (Prisma handles this)
- [ ] Secure file upload directory
- [ ] Set up proper error logging
- [ ] Configure firewall rules
- [ ] Regular database backups

---

## 📚 Additional Resources

### Database Management

**Prisma Studio** (Database GUI):
```bash
cd backend
npm run prisma:studio
```
Opens at: `http://localhost:5555`

### Useful Commands

**Backend:**
```bash
npm run dev          # Start development server
npm start            # Start production server
npm run prisma:generate  # Generate Prisma client
npm run prisma:migrate   # Run migrations
npm run prisma:studio    # Open database GUI
```

**Frontend:**
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Lint code
```

---

## 🎯 Quick Start Summary

```bash
# 1. Setup Database
mysql -u root -p
CREATE DATABASE evoting_db;
EXIT;

# 2. Setup Backend
cd backend
npm install
# Create .env file with DATABASE_URL and other variables
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed  # Optional
npm run dev

# 3. Setup Frontend (in new terminal)
cd frontend
npm install
# Create .env file (optional)
npm run dev

# 4. Access Application
# Open: http://localhost:3000
# Login: admin@example.com / admin123
```

---

## 📞 Support

If you encounter issues during setup:

1. Check the error messages carefully
2. Review the troubleshooting section
3. Verify all prerequisites are installed
4. Check environment variables are set correctly
5. Ensure database service is running

---

**Happy Voting! 🗳️**

