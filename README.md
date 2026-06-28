# QDK Tool

A modern, containerized QDK application built with Go, React, and PostgreSQL.

## ✅ Current Status
- **Application Status**: ✅ **FULLY OPERATIONAL**
- **Frontend**: ✅ Running on http://localhost:3000
- **Backend API**: ✅ Running on http://localhost:8080
- **Database**: ✅ PostgreSQL running on port 5432
- **Docker Containers**: ✅ All services containerized and running
- **API Endpoints**: ✅ Updated to use `/api/v1/` prefix
- **Last Updated**: June 9, 2025

## 🚀 Overview
The QDK Tool is a full-stack web application designed to streamline the QDK process for teams. It features a modern React frontend with Tailwind CSS, a robust Go backend with Gin framework, and PostgreSQL database, all containerized with Docker for easy deployment.

## 🛠 Tech Stack
- **Backend**: Go 1.19+ with Gin framework
- **Frontend**: React 18+ with Tailwind CSS and React Router v6
- **Database**: PostgreSQL 17
- **Authentication**: JWT-based authentication
- **Containerization**: Docker & Docker Compose
- **Web Server**: Nginx (for production frontend serving)

## 📁 Project Structure
```
QDK-Tool/
├── .env                           # Environment variables
├── .env.example                   # Environment variables template
├── docker-compose.yml             # Multi-container orchestration
├── README.md                      # Project documentation
├── tailwind.config.js            # Global Tailwind configuration
├── backend/                       # Go backend service
│   ├── Dockerfile                 # Backend container config
│   ├── main.go                    # Application entryncies
│   ├── go.sum                     # Go module checksums
│   ├── config/                    # Configuration files
│   │   └── database.go           # Database connection config
│   ├── controllers/               # Business logic controllers
│   │   └── qdkController.go
│   ├── handlers/                  # HTTP request handlers
│   │   ├── auth.go               # Authentication handlers
│   │   ├── dashboard.go          # Dashboard handlers
│   │   └── qdk.go                # QDK handlers
│   ├── middleware/                # HTTP middleware
│   │   ├── auth.go               # Authentication middleware
│   │   └── cors.go               # CORS middleware
│   ├── models/                    # Data models
│   │   ├── qdk.go                # QDK model
│   │   └── user.go               # User model
│   └── routes/                    # API route definitions
│       └── routes.go
├── frontend/                      # React frontend service
│   ├── Dockerfile                 # Frontend container config
│   ├── nginx.conf                 # Nginx configuration
│   ├── package.json               # Node.js dependencies
│   ├── tailwind.config.js        # Tailwind CSS config
│   ├── public/                    # Static assets
│   │   └── index.html
│   └── src/                       # React source code
│       ├── App.jsx                # Main app component
│       ├── index.js               # React entry point
│       ├── index.css              # Global styles
│       ├── components/            # Reusable components
│       │   ├── Dashboard.jsx
│       │   ├── QDKForm.jsx
│       │   └── Login.jsx
│       └── pages/                 # Page components
│           ├── DashboardPage.jsx
│           ├── Home.jsx
│           └── LoginPage.jsx
└── src/                          # Additional TypeScript components
    ├── App.tsx
    ├── components/
    │   ├── Auth/
    │   ├── Dashboard/
    │   └── Layout/
    └── services/
        └── api.ts
```

## 🐳 Quick Start with Docker (Recommended)

### Prerequisites
- Docker 20.10+
- Docker Compose v2.0+

### 1. Clone and Setup
```bash
git clone <repository-url>
cd Evo
cp .env.example .env
```

### 2. Start All Services
```bash
# Start all services in detached mode
docker compose up -d --build

# Or start with logs visible
docker compose up --build

# If containers stop unexpectedly, remove orphans and restart
docker compose up -d --remove-orphans
```

### 3. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080
- **Database**: localhost:5432

### 4. Health Check
```bash
# Test backend health
curl http://localhost:8080/health
# Should return: {"status":"ok"}

# Test frontend
curl -I http://localhost:3000
# Should return: HTTP/1.1 200 OK

# Check all running containers
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
```

### 5. Comprehensive Application Test
```bash
# Run complete health check
cd qdk-tool
echo "=== APPLICATION HEALTH CHECK ==="
echo "Backend Health:"
curl -s http://localhost:8080/health
echo -e "\n\nFrontend Status:"
curl -s -o /dev/null -w "HTTP Status: %{http_code}\nResponse Time: %{time_total}s\n" http://localhost:3000
echo -e "\nContainer Status:"
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}" | grep qdk-tool
```

## 🔧 Development Setup (Local)

### Backend Development
```bash
cd backend
go mod tidy
go run main.go
```

### Frontend Development
```bash
cd frontend
npm install
npm start
```

### Database Setup
```bash
# Using Docker for PostgreSQL
docker run --name qdk-postgres \
  -e POSTGRES_USER=qdkuser \
  -e POSTGRES_PASSWORD=qdkpassword \
  -e POSTGRES_DB=qdk_tool_db \
  -p 5432:5432 -d postgres:17
```

## 🌐 API Endpoints

### Health Check
- `GET /health` - Service health status

### Authentication
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/register` - User registration

### QDK
- `POST /api/v1/qdk` - Create QDK entry
- `GET /api/v1/qdk/user/:userId` - Get user QDK entries

## 🏗 Architecture Features

### Backend (Go)
- **Gin Framework**: High-performance HTTP web framework
- **JWT Authentication**: Secure token-based authentication
- **PostgreSQL Integration**: Robust database operations
- **CORS Enabled**: Cross-origin resource sharing configured
- **Health Checks**: Built-in health monitoring endpoints
- **Multi-stage Docker Build**: Optimized container images

### Frontend (React)
- **React 18**: Latest React with concurrent features
- **React Router v6**: Modern client-side routing
- **Tailwind CSS**: Utility-first CSS framework
- **Responsive Design**: Mobile-first responsive layouts
- **Component Architecture**: Modular, reusable components
- **Nginx Serving**: Production-ready static file serving

### Database (PostgreSQL)
- **PostgreSQL 17**: Latest stable PostgreSQL version
- **Persistent Volumes**: Data persistence across container restarts
- **Environment Configuration**: Flexible database configuration

## 🔍 Container Management

### Useful Commands
```bash
# View running containers
docker compose ps

# View logs
docker compose logs -f

# Stop all services
docker compose down

# Stop and remove volumes (WARNING: deletes data)
docker compose down --volumes

# Rebuild specific service
docker compose build backend
docker compose up -d backend

# Scale services
docker compose up -d --scale backend=2
```

### Monitoring
```bash
# Real-time logs
docker compose logs -f

# Container resource usage
docker stats

# Service health
docker compose ps
```

## 🔐 Environment Variables

Create a `.env` file based on `.env.example`:

```env
# Example Environment Variables (do NOT use these values in production)

# Database Configuration
POSTGRES_USER=your_db_user
POSTGRES_PASSWORD=your_db_password
POSTGRES_DB=your_db_name

# Backend Configuration
DATABASE_URL=postgres://your_db_user:your_db_password@db:5432/your_db_name?sslmode=disable
```
> **Note:**  
> The above values are examples only. **Never commit real credentials or secrets to version control.**  
> For production, use strong, unique passwords and manage secrets securely (e.g., Docker secrets, environment variables, or a secrets manager).

## 🚀 Production Deployment

### Docker Compose Production
```bash
# Use production environment
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

### Environment Considerations
- Set strong passwords in production
- Use secrets management for sensitive data
- Configure proper SSL/TLS certificates
- Set up monitoring and logging
- Configure backup strategies for PostgreSQL

## 🛠 Troubleshooting

### Common Issues

**Containers won't start:**
```bash
docker compose down --volumes
docker compose up --build --remove-orphans
```

**Docker Compose output is empty:**
```bash
# Use docker ps instead of docker compose ps if having issues
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

# Check for orphaned containers
docker compose up -d --remove-orphans
```

**API endpoint 404 errors:**
```bash
# Ensure you're using the correct API paths:
# ✅ Correct: /api/v1/qdk
# ❌ Wrong: /api/qdk

# Frontend components have been updated to use v1 API paths
```

**Port conflicts:**
```bash
# Check what's using the ports
sudo netstat -tulpn | grep :3000
sudo netstat -tulpn | grep :8080
sudo netstat -tulpn | grep :5432
```

**Database connection issues:**
```bash
# Check database container logs
docker compose logs db

# Test database connection
docker compose exec db psql -U qdkuser -d qdk_tool_db
```

**Frontend build issues:**
```bash
# Rebuild frontend container
docker compose build frontend --no-cache
docker compose up -d frontend
```

**Application Updates Not Reflecting:**
```bash
# Rebuild and restart specific service
docker compose build <service-name> --no-cache
docker compose up -d <service-name>

# For frontend changes, rebuild with updated React components
docker compose build frontend --no-cache && docker compose up -d frontend
```

## 📈 Performance Optimizations

- Multi-stage Docker builds for smaller images
- Nginx serving for optimized static asset delivery
- Go binary compilation for fast startup times
- PostgreSQL connection pooling
- Tailwind CSS purging for smaller bundle sizes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🧪 Testing the Application

### Automated Health Check Script
Create a quick test script to verify all components:

```bash
#!/bin/bash
# save as test-app.sh and run with: bash test-app.sh

echo "=== QDK TOOL HEALTH CHECK ==="
echo "Date: $(date)"
echo ""

# Test Backend Health
echo "🔧 Backend Health Check:"
BACKEND_STATUS=$(curl -s http://localhost:8080/health)
if [[ $BACKEND_STATUS == *"ok"* ]]; then
    echo "✅ Backend: HEALTHY"
else
    echo "❌ Backend: UNHEALTHY"
fi

# Test Frontend
echo ""
echo "🌐 Frontend Health Check:"
FRONTEND_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000)
if [[ $FRONTEND_STATUS == "200" ]]; then
    echo "✅ Frontend: HEALTHY"
else
    echo "❌ Frontend: UNHEALTHY (Status: $FRONTEND_STATUS)"
fi

# Test Database Connection
echo ""
echo "🗄️ Database Health Check:"
DB_STATUS=$(docker compose exec -T db pg_isready -U qdkuser 2>/dev/null)
if [[ $DB_STATUS == *"accepting connections"* ]]; then
    echo "✅ Database: HEALTHY"
else
    echo "❌ Database: UNHEALTHY"
fi

# Container Status
echo ""
echo "🐳 Container Status:"
docker ps --format "table {{.Names}}\t{{.Status}}" | grep qdk-tool

# API Endpoints Test
echo ""
echo "🔗 API Endpoints Test:"
echo "Health: $(curl -s http://localhost:8080/health)"
echo "CORS Headers: $(curl -s -I http://localhost:8080/health | grep -i access-control | wc -l) headers configured"

echo ""
echo "=== TEST COMPLETE ==="
```

### Manual Testing Steps

#### 1. Backend API Testing
```bash
# Health check
curl http://localhost:8080/health

# Test CORS headers
curl -I http://localhost:8080/health

# Test API endpoints (may return errors if DB not fully initialized)
curl http://localhost:8080/api/v1/qdk/user/1
```

#### 2. Frontend Testing
```bash
# Access main page
curl -I http://localhost:3000

# Check if React app loads (should return HTML with React root)
curl -s http://localhost:3000 | grep -o '<div id="root">'
```

#### 3. Database Testing
```bash
# Check database connection
docker compose exec db pg_isready -U qdkuser

# Connect to database (interactive)
docker compose exec db psql -U qdkuser -d qdk_tool_db

# List databases
docker compose exec db psql -U qdkuser -c "\l"
```

#### 4. Integration Testing
- Open http://localhost:3000 in browser
- Navigate through different pages (Home, Dashboard, etc.)
- Check browser console for any JavaScript errors
- Verify API calls in browser Network tab