# Docker Development Guide

## Quick Start

To run the entire application in Docker development mode:

```bash
cd docker
docker-compose -f docker-compose.dev.yml up --build
```

To run in detached mode (background):
```bash
docker-compose -f docker-compose.dev.yml up --build -d
```

## Services

The development setup includes 4 services:

1. **PostgreSQL Database** (port 5432)
   - Container: `glasskom_db_dev`
   - Database: `glasskom_dev`
   - User: `postgres`
   - Password: `devpassword`

2. **Redis** (port 6379)
   - Container: `glasskom_redis_dev`

3. **Backend API** (port 3001)
   - Container: `glasskom_api_dev`
   - Hot reload enabled with nodemon
   - Source mounted from `../backend/src`
   - API: http://localhost:3001

4. **Frontend** (port 5173)
   - Container: `glasskom_frontend_dev`
   - Hot reload enabled with Vite
   - Source mounted from `../frontend/src`
   - App: http://localhost:5173

## Useful Commands

### View logs
```bash
# All services
docker-compose -f docker-compose.dev.yml logs -f

# Specific service
docker logs glasskom_frontend_dev -f
docker logs glasskom_api_dev -f
docker logs glasskom_db_dev -f
```

### Stop services
```bash
docker-compose -f docker-compose.dev.yml down
```

### Stop and remove volumes (clean start)
```bash
docker-compose -f docker-compose.dev.yml down -v
```

### Restart a specific service
```bash
docker-compose -f docker-compose.dev.yml restart api
docker-compose -f docker-compose.dev.yml restart frontend
```

### Execute commands in containers
```bash
# Backend shell
docker exec -it glasskom_api_dev sh

# Frontend shell
docker exec -it glasskom_frontend_dev sh

# Database shell
docker exec -it glasskom_db_dev psql -U postgres -d glasskom_dev
```

### Rebuild specific service
```bash
docker-compose -f docker-compose.dev.yml up --build api
docker-compose -f docker-compose.dev.yml up --build frontend
```

## Environment Variables

Development environment files have been created:
- `backend/.env.development`
- `frontend/.env.development`

**Important:** Update the Firebase and Gemini API keys in `frontend/.env.development` with your actual credentials.

## Hot Reload

Both frontend and backend support hot reload:
- **Frontend**: Vite will automatically reload when you edit files in `frontend/src`
- **Backend**: Nodemon will restart the server when you edit files in `backend/src`

## Access Points

- Frontend: http://localhost:5173
- Backend API: http://localhost:3001
- PostgreSQL: localhost:5432
- Redis: localhost:6379

## Troubleshooting

### Containers not starting
```bash
docker-compose -f docker-compose.dev.yml logs
```

### Database connection issues
Ensure the database container is running:
```bash
docker ps | grep glasskom_db_dev
```

### Port conflicts
If ports are already in use, stop the conflicting services or modify the port mappings in `docker-compose.dev.yml`.

### Clean rebuild
```bash
docker-compose -f docker-compose.dev.yml down -v
docker-compose -f docker-compose.dev.yml up --build
```
