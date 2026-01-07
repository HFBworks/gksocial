# GlassKom Social

<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

A modern social networking platform built with React, Node.js, and PostgreSQL.

## 📁 Project Structure

```
hfbworks/
├── frontend/           # React + Vite frontend application
│   ├── src/
│   │   ├── components/ # React components
│   │   ├── services/   # API and service layers
│   │   ├── hooks/      # Custom React hooks
│   │   ├── utils/      # Utility functions
│   │   ├── types/      # TypeScript type definitions
│   │   └── styles/     # CSS and Tailwind styles
│   ├── public/         # Static assets
│   └── Dockerfile      # Production Docker build
│
├── backend/            # Node.js + Express API server
│   ├── src/
│   │   ├── config/     # Database and app configuration
│   │   ├── controllers/# Route controllers
│   │   ├── middleware/ # Express middleware
│   │   ├── models/     # Database models
│   │   ├── routes/     # API route definitions
│   │   └── utils/      # Utility functions
│   └── Dockerfile      # Production Docker build
│
├── docker/             # Docker orchestration
│   ├── docker-compose.yml      # Production compose
│   ├── docker-compose.dev.yml  # Development compose
│   └── init.sql               # Database initialization
│
├── nginx/              # Nginx configurations
│   ├── glasskom.conf          # Production config
│   └── hostinger-vps.conf     # Hostinger VPS config
│
├── assets/             # Shared assets
│   ├── images/         # Image assets
│   └── icons/          # Icon assets
│
├── apps/               # Additional applications/microservices
└── logs/               # Application logs
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Docker & Docker Compose
- PostgreSQL 15+ (or use Docker)

### Development Setup

1. **Clone and install dependencies:**
   ```bash
   # Frontend
   cd frontend && npm install

   # Backend
   cd backend && npm install
   ```

2. **Configure environment:**
   ```bash
   # Copy example env files
   cp frontend/.env.example frontend/.env
   cp backend/.env.example backend/.env
   
   # Edit with your values (especially API_KEY for Gemini)
   ```

3. **Start development servers:**
   ```bash
   # Using Docker (recommended)
   cd docker && docker-compose -f docker-compose.dev.yml up

   # Or manually
   # Terminal 1: Backend
   cd backend && npm run dev

   # Terminal 2: Frontend
   cd frontend && npm run dev
   ```

4. **Access the application:**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001

### Production Deployment

1. **Configure production environment:**
   ```bash
   cp docker/.env.example docker/.env
   # Edit docker/.env with production values
   ```

2. **Build and deploy:**
   ```bash
   cd docker
   docker-compose up -d --build
   ```

3. **Configure Nginx:**
   ```bash
   # Copy nginx config
   sudo cp nginx/glasskom.conf /etc/nginx/sites-available/
   sudo ln -s /etc/nginx/sites-available/glasskom.conf /etc/nginx/sites-enabled/
   
   # Update server_name in the config
   sudo nano /etc/nginx/sites-available/glasskom.conf
   
   # Test and reload
   sudo nginx -t && sudo systemctl reload nginx
   ```

## 🔧 Configuration

### Environment Variables

**Frontend (.env):**
| Variable | Description |
|----------|-------------|
| `API_KEY` | Google Gemini API key |
| `VITE_API_URL` | Backend API URL |

**Backend (.env):**
| Variable | Description |
|----------|-------------|
| `NODE_ENV` | Environment (development/production) |
| `PORT` | Server port (default: 3001) |
| `DB_*` | PostgreSQL connection details |
| `JWT_SECRET` | JWT signing secret |
| `CLIENT_URL` | Frontend URL for CORS |

## 📦 Features

- **Authentication**: Firebase Auth with PostgreSQL sync
- **Real-time**: Socket.IO for live updates
- **AI Assistant**: Gemini-powered chat assistant
- **PWA**: Installable progressive web app
- **Communities**: Create and join communities
- **Messaging**: Direct and group messaging
- **Media**: Image uploads with optimization

## 🛠 Tech Stack

**Frontend:**
- React 18 + TypeScript
- Vite (build tool)
- TailwindCSS
- Socket.IO Client
- Firebase Auth

**Backend:**
- Node.js + Express
- PostgreSQL
- Socket.IO
- JWT Authentication

**Infrastructure:**
- Docker & Docker Compose
- Nginx (reverse proxy)
- Redis (optional caching)

## 📝 Scripts

**Frontend:**
```bash
npm run dev      # Start development server
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

**Backend:**
```bash
npm run dev      # Start with nodemon
npm run start    # Production start
npm run lint     # Run ESLint
```

## 🔒 Security

- Helmet.js for HTTP headers
- Rate limiting on API endpoints
- CORS configuration
- Input validation
- SQL injection prevention
- XSS protection

## 📄 License

MIT License - see LICENSE file for details.
