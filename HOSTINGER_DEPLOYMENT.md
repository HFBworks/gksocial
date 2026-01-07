# Hostinger Docker Deployment Guide

## Fixed Issues

✅ **Docker Build Error Fixed**: Changed `npm ci` to `npm install --legacy-peer-deps` in production Dockerfiles
✅ **Version Warning Fixed**: Removed obsolete `version` field from docker-compose files
✅ **Package Lock**: Added backend package-lock.json for consistency

## Deployment Steps on Hostinger

### 1. Connect to Your VPS
```bash
ssh your-username@your-vps-ip
```

### 2. Install Docker (if not already installed)
```bash
sudo apt update
sudo apt install docker.io docker-compose -y
sudo systemctl start docker
sudo systemctl enable docker
```

### 3. Clone Your Repository
```bash
git clone https://github.com/HFBworks/gksocial.git
cd gksocial
```

### 4. Configure Environment Variables
```bash
cd docker
cp .env.example .env
nano .env
```

Edit the `.env` file with your production values:
```env
# Database
DB_PASSWORD=your_secure_password_here
POSTGRES_PASSWORD=your_secure_password_here

# JWT
JWT_SECRET=your_very_long_random_secret_here

# API Keys
API_KEY=your_gemini_api_key_here

# Domain
DOMAIN=yourdomain.com
CLIENT_URL=https://yourdomain.com
```

### 5. Build and Start Services
```bash
# Build the images
sudo docker-compose -f docker-compose.yml build

# Start all services
sudo docker-compose -f docker-compose.yml up -d
```

### 6. Check Service Status
```bash
# View running containers
sudo docker ps

# View logs
sudo docker-compose -f docker-compose.yml logs -f

# Check specific service
sudo docker logs glasskom_frontend
sudo docker logs glasskom_api
sudo docker logs glasskom_db
```

### 7. Configure Domain (Optional)
If using a domain name, update your DNS records:
- **A Record**: Point your domain to your VPS IP
- Wait for DNS propagation (5-30 minutes)

### 8. SSL Certificate (Optional but Recommended)
```bash
# Install certbot
sudo apt install certbot python3-certbot-nginx -y

# Get SSL certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

## Troubleshooting

### Build Fails
```bash
# Check Docker daemon
sudo systemctl status docker

# Clean build
sudo docker-compose -f docker-compose.yml down -v
sudo docker system prune -a
sudo docker-compose -f docker-compose.yml up --build
```

### Database Connection Issues
```bash
# Check database logs
sudo docker logs glasskom_db

# Verify database is healthy
sudo docker exec glasskom_db pg_isready -U postgres
```

### Frontend Not Accessible
```bash
# Check frontend logs
sudo docker logs glasskom_frontend

# Verify nginx is running
sudo docker exec glasskom_frontend nginx -t
```

### API Not Responding
```bash
# Check API logs
sudo docker logs glasskom_api

# Test API endpoint
curl http://localhost:3001/health
```

## Maintenance Commands

### Update to Latest Version
```bash
cd gksocial
git pull origin main
sudo docker-compose -f docker/docker-compose.yml up --build -d
```

### Backup Database
```bash
# Backup
sudo docker exec glasskom_db pg_dump -U postgres glasskom > backup_$(date +%Y%m%d).sql

# Restore
cat backup_20260107.sql | sudo docker exec -i glasskom_db psql -U postgres glasskom
```

### View Logs
```bash
# All services
sudo docker-compose -f docker-compose.yml logs -f

# Specific service with last 100 lines
sudo docker logs --tail 100 -f glasskom_api
```

### Stop Services
```bash
# Stop all
sudo docker-compose -f docker-compose.yml down

# Stop without removing volumes
sudo docker-compose -f docker-compose.yml stop
```

### Restart Services
```bash
# Restart all
sudo docker-compose -f docker-compose.yml restart

# Restart specific service
sudo docker restart glasskom_api
```

## Performance Optimization

### Resource Limits
Add to docker-compose.yml for each service:
```yaml
deploy:
  resources:
    limits:
      cpus: '1'
      memory: 1G
    reservations:
      cpus: '0.5'
      memory: 512M
```

### Docker Cleanup
```bash
# Remove unused images
sudo docker image prune -a

# Remove unused volumes
sudo docker volume prune

# Complete cleanup
sudo docker system prune -a --volumes
```

## Security Checklist

- [ ] Change all default passwords in `.env`
- [ ] Use strong JWT secret (64+ random characters)
- [ ] Enable SSL/TLS certificates
- [ ] Configure firewall (ufw)
- [ ] Keep Docker and system updated
- [ ] Regular database backups
- [ ] Monitor logs for suspicious activity

## Support

If you encounter issues:
1. Check the logs first
2. Review this guide
3. Open an issue on GitHub: https://github.com/HFBworks/gksocial/issues

---

**Last Updated**: January 7, 2026
**Repository**: https://github.com/HFBworks/gksocial
