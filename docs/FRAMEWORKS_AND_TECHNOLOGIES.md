# Frameworks and Technologies Documentation

Complete documentation of all frameworks, libraries, and technologies used in the BALLOT BUDDY project.

---

## 📚 Table of Contents

1. [Frontend Technologies](#frontend-technologies)
2. [Backend Technologies](#backend-technologies)
3. [Database Technologies](#database-technologies)
4. [Development Tools](#development-tools)
5. [Deployment Technologies](#deployment-technologies)
6. [Third-Party Services](#third-party-services)

---

## 🎨 Frontend Technologies

### Core Framework

#### **React 19.2.0**
- **Purpose**: UI library for building user interfaces
- **Why Used**: Industry standard, component-based architecture, excellent ecosystem
- **Usage**: All UI components, pages, and layouts
- **Key Features Used**:
  - Functional components with hooks
  - React Router for navigation
  - Context API (implicit via React Router)
- **Documentation**: https://react.dev/

#### **TypeScript 5.9.3**
- **Purpose**: Type-safe JavaScript
- **Why Used**: Catch errors at compile time, better IDE support, improved code quality
- **Usage**: All frontend codebase
- **Key Features Used**:
  - Type annotations
  - Interfaces and types
  - Strict mode enabled
- **Documentation**: https://www.typescriptlang.org/

### Build Tools

#### **Vite 7.2.4**
- **Purpose**: Next-generation frontend build tool
- **Why Used**: Lightning-fast HMR, optimized builds, modern ESM
- **Usage**: Development server and production builds
- **Key Features Used**:
  - Hot Module Replacement (HMR)
  - Fast builds
  - Environment variable handling
- **Documentation**: https://vitejs.dev/

### Routing

#### **React Router DOM 6.30.2**
- **Purpose**: Client-side routing
- **Why Used**: Declarative routing, nested routes, protected routes
- **Usage**: Navigation between pages, protected route guards
- **Key Features Used**:
  - BrowserRouter
  - Routes and Route
  - useNavigate, useLocation hooks
  - Navigate component
- **Documentation**: https://reactrouter.com/

### Styling

#### **Tailwind CSS 3.4.18**
- **Purpose**: Utility-first CSS framework
- **Why Used**: Rapid UI development, consistent design system, responsive design
- **Usage**: All styling throughout the application
- **Key Features Used**:
  - Utility classes
  - Custom color palette (pink/white theme)
  - Responsive breakpoints
  - Custom animations
- **Documentation**: https://tailwindcss.com/

#### **Tailwind CSS Animate 1.0.7**
- **Purpose**: Additional animation utilities
- **Usage**: Custom animations (fade-in, bounce, etc.)
- **Documentation**: https://github.com/jamiebuilds/tailwindcss-animate

### UI Component Libraries

#### **Shadcn/ui (via Radix UI)**
- **Purpose**: Accessible, customizable UI components
- **Why Used**: High-quality, accessible components built on Radix UI primitives
- **Components Used**:
  - Button
  - Card
  - Input
  - Label
  - Dialog (via Radix)
  - Dropdown Menu (via Radix)
- **Documentation**: https://ui.shadcn.com/

#### **Radix UI Primitives**
- **@radix-ui/react-dialog**: Modal dialogs
- **@radix-ui/react-dropdown-menu**: Dropdown menus
- **@radix-ui/react-label**: Accessible labels
- **@radix-ui/react-slot**: Composition utilities
- **Why Used**: Accessible, unstyled, composable UI primitives
- **Documentation**: https://www.radix-ui.com/

### Form Management

#### **React Hook Form 7.66.1**
- **Purpose**: Performant form library
- **Why Used**: Minimal re-renders, easy validation, good performance
- **Usage**: All forms (login, registration, nominations, etc.)
- **Key Features Used**:
  - useForm hook
  - Form validation
  - Error handling
- **Documentation**: https://react-hook-form.com/

#### **Zod 3.25.76**
- **Purpose**: TypeScript-first schema validation
- **Why Used**: Type-safe validation, integrates with React Hook Form
- **Usage**: Form schema validation
- **Key Features Used**:
  - Schema definitions
  - Type inference
  - Custom error messages
- **Documentation**: https://zod.dev/

#### **@hookform/resolvers 5.2.2**
- **Purpose**: Connect React Hook Form with validation libraries
- **Usage**: Zod resolver for form validation
- **Documentation**: https://github.com/react-hook-form/resolvers

### Data Visualization

#### **Recharts 3.5.0**
- **Purpose**: Charting library for React
- **Why Used**: Easy to use, customizable, responsive
- **Usage**: Reports dashboard (line charts, pie charts, bar charts)
- **Key Features Used**:
  - LineChart
  - PieChart
  - BarChart
  - ResponsiveContainer
  - Custom tooltips and labels
- **Documentation**: https://recharts.org/

### HTTP Client

#### **Axios 1.13.2**
- **Purpose**: Promise-based HTTP client
- **Why Used**: Better error handling, interceptors, request/response transformation
- **Usage**: All API calls
- **Key Features Used**:
  - Request interceptors (add auth tokens)
  - Response interceptors (handle errors)
  - Base URL configuration
  - Timeout handling
- **Documentation**: https://axios-http.com/

### Notifications

#### **Sonner 1.5.0**
- **Purpose**: Toast notification library
- **Why Used**: Beautiful, modern, accessible toast notifications
- **Usage**: Success, error, and info messages throughout the app
- **Key Features Used**:
  - toast.success()
  - toast.error()
  - toast.info()
  - Rich colors
- **Documentation**: https://sonner.emilkowal.ski/

### Utilities

#### **clsx 2.1.1**
- **Purpose**: Conditional className utility
- **Usage**: Conditional CSS classes
- **Documentation**: https://github.com/lukeed/clsx

#### **tailwind-merge 3.4.0**
- **Purpose**: Merge Tailwind classes intelligently
- **Usage**: Utility function for combining Tailwind classes
- **Documentation**: https://github.com/dcastil/tailwind-merge

#### **class-variance-authority 0.7.1**
- **Purpose**: Build component variants with Tailwind
- **Usage**: Component variant management
- **Documentation**: https://cva.style/

### Icons

#### **Lucide React 0.554.0**
- **Purpose**: Icon library
- **Usage**: Various icons throughout the application
- **Documentation**: https://lucide.dev/

---

## ⚙️ Backend Technologies

### Runtime & Framework

#### **Node.js (Latest)**
- **Purpose**: JavaScript runtime
- **Why Used**: Fast, scalable, large ecosystem
- **Documentation**: https://nodejs.org/

#### **Express.js 5.1.0**
- **Purpose**: Web application framework
- **Why Used**: Minimal, flexible, robust routing
- **Usage**: REST API server
- **Key Features Used**:
  - Routing
  - Middleware
  - Static file serving
  - Error handling
- **Documentation**: https://expressjs.com/

### Database

#### **Prisma 6.19.0**
- **Purpose**: Next-generation ORM
- **Why Used**: Type-safe database access, migrations, excellent DX
- **Usage**: All database operations
- **Key Features Used**:
  - Prisma Client
  - Migrations
  - Schema definition
  - Type generation
- **Documentation**: https://www.prisma.io/

#### **MySQL (v8.0+)**
- **Purpose**: Relational database
- **Why Used**: Reliable, widely used, ACID compliant
- **Usage**: Store all application data
- **Documentation**: https://dev.mysql.com/doc/

#### **MySQL2 3.15.3**
- **Purpose**: MySQL client for Node.js
- **Usage**: Connection pooling, raw queries (via Prisma)
- **Documentation**: https://github.com/sidorares/node-mysql2

### Authentication & Security

#### **JSON Web Token (JWT) 9.0.2**
- **Purpose**: Token-based authentication
- **Why Used**: Stateless, scalable, secure
- **Usage**: User authentication, API authorization
- **Key Features Used**:
  - Token generation
  - Token verification
  - Expiration handling
- **Documentation**: https://jwt.io/

#### **Bcrypt 3.0.3**
- **Purpose**: Password hashing
- **Why Used**: Industry standard, secure, slow by design
- **Usage**: Hash passwords before storing
- **Documentation**: https://github.com/kelektiv/node.bcrypt.js

#### **Express Rate Limit 8.2.1**
- **Purpose**: Rate limiting middleware
- **Why Used**: Prevent abuse, protect APIs
- **Usage**: OTP request limiting, login attempt limiting
- **Documentation**: https://github.com/express-rate-limit/express-rate-limit

### File Handling

#### **Multer 2.0.2**
- **Purpose**: File upload middleware
- **Why Used**: Handle multipart/form-data
- **Usage**: Upload candidate photos and manifestos
- **Key Features Used**:
  - File validation
  - Storage configuration
  - File size limits
- **Documentation**: https://github.com/expressjs/multer

### Email Services

#### **Nodemailer 7.0.10**
- **Purpose**: Email sending library
- **Why Used**: Simple, reliable, supports multiple transports
- **Usage**: Send password reset OTPs via email
- **Key Features Used**:
  - SMTP transport
  - HTML emails
  - Attachment support
- **Documentation**: https://nodemailer.com/

### SMS Services

- **Purpose**: Send OTP via SMS
- **Implementation**: Custom SMS service utility
- **Usage**: Voter OTP verification
- **Configuration**: Via environment variables

### PDF Generation

#### **PDFKit 0.17.2**
- **Purpose**: PDF document generation
- **Why Used**: Create PDF reports
- **Usage**: Generate election reports as PDF
- **Documentation**: https://pdfkit.org/

### Chart Generation

#### **Canvas 3.2.0**
- **Purpose**: Canvas API for Node.js
- **Usage**: Server-side chart generation
- **Documentation**: https://github.com/Automattic/node-canvas

#### **Chart.js 4.5.1**
- **Purpose**: Charting library
- **Usage**: Generate charts for PDF reports
- **Documentation**: https://www.chartjs.org/

#### **chartjs-node-canvas 5.0.0**
- **Purpose**: Render Chart.js on server
- **Usage**: Generate chart images for PDFs
- **Documentation**: https://github.com/SeanSobey/ChartjsNodeCanvas

### Data Processing

#### **CSV Parser 3.2.0**
- **Purpose**: Parse CSV files
- **Why Used**: Import voter data from CSV
- **Usage**: Voter import functionality
- **Documentation**: https://github.com/mafintosh/csv-parser

### Validation

#### **Zod 4.1.13**
- **Purpose**: Schema validation (backend)
- **Usage**: Request validation
- **Documentation**: https://zod.dev/

### Utilities

#### **Dotenv 17.2.3**
- **Purpose**: Load environment variables
- **Usage**: Configuration management
- **Documentation**: https://github.com/motdotla/dotenv

#### **CORS 2.8.5**
- **Purpose**: Cross-Origin Resource Sharing
- **Usage**: Allow frontend to access API
- **Documentation**: https://github.com/expressjs/cors

---

## 🛠️ Development Tools

### Code Quality

#### **ESLint 9.39.1**
- **Purpose**: JavaScript/TypeScript linter
- **Usage**: Code quality and consistency
- **Plugins**:
  - eslint-plugin-react-hooks
  - eslint-plugin-react-refresh
- **Documentation**: https://eslint.org/

#### **TypeScript ESLint 8.46.4**
- **Purpose**: TypeScript-specific linting rules
- **Usage**: TypeScript code quality
- **Documentation**: https://typescript-eslint.io/

### Development Server

#### **Nodemon 3.1.11**
- **Purpose**: Auto-restart Node.js server
- **Usage**: Backend development
- **Documentation**: https://nodemon.io/

### Database Tools

#### **Prisma Studio**
- **Purpose**: Database GUI
- **Usage**: Visual database management
- **Run**: `npm run prisma:studio`
- **Documentation**: https://www.prisma.io/studio

---

## 🌐 Deployment Technologies

### Frontend Deployment

#### **Express 5.1.0** (Production Server)
- **Purpose**: Serve built frontend files
- **Usage**: Production static file serving
- **File**: `frontend/server.cjs`

#### **Compression 1.7.4**
- **Purpose**: Response compression
- **Usage**: Compress static assets
- **Documentation**: https://github.com/expressjs/compression

### Build Optimization

#### **Terser 5.36.0**
- **Purpose**: JavaScript minification
- **Usage**: Production build optimization
- **Documentation**: https://terser.org/

---

## 🔗 Third-Party Services

### Email Service

- **Service**: SMTP (Gmail, custom SMTP)
- **Purpose**: Send password reset OTPs
- **Configuration**: Via environment variables

### SMS Service

- **Service**: SMS API (configurable)
- **Purpose**: Send OTP to voters
- **Configuration**: Via environment variables
- **Examples**: Twilio, AWS SNS, custom provider

---

## 📦 Package Management

### npm
- **Purpose**: Node.js package manager
- **Usage**: Install and manage dependencies
- **Files**: `package.json`, `package-lock.json`

---

## 🔄 Version Control

### Git
- **Purpose**: Version control system
- **Usage**: Track code changes, collaboration
- **Files**: `.gitignore` (configured for Node.js projects)

---

## 🎯 Architecture Patterns

### Frontend Architecture

- **Component-Based**: React functional components
- **Feature-Based Structure**: Components organized by feature
- **Custom Hooks**: Reusable logic (via React hooks)
- **Protected Routes**: Role-based route guards
- **Service Layer**: API abstraction layer

### Backend Architecture

- **MVC Pattern**: Controllers, Models (Prisma), Views (JSON responses)
- **RESTful API**: Standard HTTP methods and status codes
- **Middleware Chain**: Authentication, error handling, logging
- **Service Layer**: Business logic separation
- **Repository Pattern**: Database access via Prisma

---

## 📊 Technology Stack Summary

### Frontend Stack
```
React + TypeScript + Vite
├── Routing: React Router
├── Styling: Tailwind CSS
├── Forms: React Hook Form + Zod
├── Charts: Recharts
├── HTTP: Axios
├── UI: Shadcn/ui (Radix UI)
└── Notifications: Sonner
```

### Backend Stack
```
Node.js + Express
├── Database: Prisma ORM + MySQL
├── Auth: JWT + Bcrypt
├── Validation: Zod
├── File Upload: Multer
├── Email: Nodemailer
├── PDF: PDFKit
└── Charts: Chart.js + Canvas
```

---

## 🔐 Security Technologies

- **JWT**: Secure token-based authentication
- **Bcrypt**: Password hashing
- **CORS**: Cross-origin security
- **Rate Limiting**: API abuse prevention
- **Input Validation**: Zod schemas
- **SQL Injection Protection**: Prisma parameterized queries
- **XSS Protection**: React's built-in escaping

---

## 📈 Performance Optimizations

### Frontend
- **Code Splitting**: Vite automatic code splitting
- **Lazy Loading**: Route-based lazy loading
- **Image Optimization**: Proper image handling
- **Caching**: Browser caching for static assets

### Backend
- **Connection Pooling**: Prisma connection pooling
- **Indexing**: Database indexes on foreign keys
- **Query Optimization**: Prisma query optimization
- **Caching**: Response caching where appropriate

---

## 🔄 State Management

- **Local State**: React useState hooks
- **URL State**: React Router location state
- **Global State**: React Router context (implicit)
- **Form State**: React Hook Form state management
- **Storage**: localStorage for tokens and user data

---

## 📱 Responsive Design

- **Breakpoints**: Tailwind responsive utilities
- **Mobile-First**: Mobile-first approach
- **Flexible Layouts**: Flexbox and Grid
- **Touch-Friendly**: Large touch targets

---

## 🌍 Internationalization (Future)

- Currently supports English only
- Structure allows for easy i18n addition
- Text centralized in components

---

## 🔧 Configuration Files

### Frontend
- `vite.config.ts`: Vite configuration
- `tsconfig.json`: TypeScript configuration
- `tailwind.config.js`: Tailwind CSS configuration
- `postcss.config.js`: PostCSS configuration
- `eslint.config.js`: ESLint configuration

### Backend
- `prisma/schema.prisma`: Database schema
- `.env`: Environment variables (not in git)

---

## 📚 Learning Resources

- **React**: https://react.dev/learn
- **TypeScript**: https://www.typescriptlang.org/docs/
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Prisma**: https://www.prisma.io/docs
- **Express**: https://expressjs.com/en/guide/routing.html

---

**Last Updated**: November 2025

**Version**: 1.0.0

