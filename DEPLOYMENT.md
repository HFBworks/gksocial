# Deployment Guide

This guide covers deploying GlassKom Social to production environments.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Docker Deployment](#docker-deployment)
3. [VPS Deployment (Hostinger)](#vps-deployment-hostinger)
4. [SSL/TLS Setup](#ssltls-setup)
5. [Database Setup](#database-setup)
6. [Monitoring & Maintenance](#monitoring--maintenance)

## Prerequisites

### Server Requirements

- **OS**: Ubuntu 22.04 LTS (recommended)
- **RAM**: Minimum 2GB, recommended 4GB+
- **Storage**: Minimum 20GB SSD
- **CPU**: 2+ cores recommended

### Software Requirements

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Install Nginx
sudo apt install nginx -y

# Install Certbot for SSL
sudo apt install certbot python3-certbot-nginx -y
```

## Docker Deployment

### 1. Clone and Configure

```bash
# Clone repository
git clone https://github.com/your-repo/hfbworks.git
cd hfbworks

# Configure environment
cp docker/.env.example docker/.env
nano docker/.env
```

### 2. Environment Configuration

Edit `docker/.env` with production values:

```env
# Database
DB_USER=glasskom_user
DB_PASSWORD=<strong_password_here>
DB_NAME=glasskom_prod

# Security
JWT_SECRET=<generate_with: openssl rand -base64 64>

# URLs
CLIENT_URL=https://your-domain.com
VITE_API_URL=https://your-domain.com

# API Keys
API_KEY=<your_gemini_api_key>
```

### 3. Build and Start

```bash
cd docker

# Build images
docker-compose build

# Start services
docker-compose up -d

# Check status
docker-compose ps
docker-compose logs -f
```

### 4. Database Initialization

The database is automatically initialized via `init.sql`. To manually run migrations:

```bash
docker-compose exec db psql -U $DB_USER -d $DB_NAME -f /docker-entrypoint-initdb.d/init.sql
```

## VPS Deployment (Hostinger)

### 1. Initial Server Setup

```bash
# SSH into your VPS
ssh root@your-vps-ip

# Create application user
adduser glasskom
usermod -aG sudo glasskom
usermod -aG docker glasskom

# Switch to app user
su - glasskom
```

### 2. Application Setup

```bash
# Create directory structure
sudo mkdir -p /var/www/glasskom
sudo chown -R glasskom:glasskom /var/www/glasskom

# Clone repository
cd /var/www/glasskom
git clone https://github.com/your-repo/hfbworks.git .

# Configure environment
cp docker/.env.example docker/.env
nano docker/.env
```

### 3. Nginx Configuration

```bash
# Copy Hostinger-specific config
sudo cp nginx/hostinger-vps.conf /etc/nginx/sites-available/glasskom

# Edit with your domain
sudo nano /etc/nginx/sites-available/glasskom

# Enable site
sudo ln -s /etc/nginx/sites-available/glasskom /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default

# Test and reload
sudo nginx -t
sudo systemctl reload nginx
```

### 4. Start Services

```bash
cd /var/www/glasskom/docker
docker-compose up -d
```

## SSL/TLS Setup

### Using Let's Encrypt (Certbot)

```bash
# Obtain certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Auto-renewal is configured automatically
# Test renewal
sudo certbot renew --dry-run
```

### Manual SSL Configuration

If using custom certificates:

```bash
# Create SSL directory
sudo mkdir -p /etc/nginx/ssl

# Copy certificates
sudo cp fullchain.pem /etc/nginx/ssl/
sudo cp privkey.pem /etc/nginx/ssl/

# Set permissions
sudo chmod 600 /etc/nginx/ssl/*.pem
```

Update nginx config to point to your certificates.

## Database Setup

### PostgreSQL Backup

```bash
# Create backup script
cat > /var/www/glasskom/scripts/backup.sh << 'EOF'
#!/bin/bash
BACKUP_DIR="/var/www/glasskom/backups"
DATE=$(date +%Y%m%d_%H%M%S)
docker-compose exec -T db pg_dump -U postgres glasskom > "$BACKUP_DIR/glasskom_$DATE.sql"
# Keep only last 7 days
find $BACKUP_DIR -name "*.sql" -mtime +7 -delete
EOF

chmod +x /var/www/glasskom/scripts/backup.sh

# Add to crontab (daily at 2 AM)
(crontab -l 2>/dev/null; echo "0 2 * * * /var/www/glasskom/scripts/backup.sh") | crontab -
```

### Database Restore

```bash
# Restore from backup
docker-compose exec -T db psql -U postgres glasskom < backup_file.sql
```

## Monitoring & Maintenance

### Health Checks

```bash
# Check all services
docker-compose ps

# Check API health
curl http://localhost:3001/health

# Check logs
docker-compose logs -f api
docker-compose logs -f frontend
```

### Log Management

```bash
# View logs
tail -f /var/www/glasskom/logs/access.log
tail -f /var/www/glasskom/logs/error.log

# Rotate logs (add to /etc/logrotate.d/glasskom)
/var/www/glasskom/logs/*.log {
    daily
    missingok
    rotate 14
    compress
    delaycompress
    notifempty
    create 0640 glasskom glasskom
}
```

### Updates

```bash
# Pull latest changes
cd /var/www/glasskom
git pull origin main

# Rebuild and restart
cd docker
docker-compose down
docker-compose build
docker-compose up -d
```

### Troubleshooting

**Container won't start:**
```bash
docker-compose logs <service_name>
docker-compose down && docker-compose up -d
```

**Database connection issues:**
```bash
docker-compose exec db psql -U postgres -c "SELECT 1"
```

**Nginx errors:**
```bash
sudo nginx -t
sudo tail -f /var/log/nginx/error.log
```

**Clear Docker cache:**
```bash
docker system prune -a
docker volume prune
```

## Security Checklist

- [ ] Change default database passwords
- [ ] Generate strong JWT secret
- [ ] Enable firewall (UFW)
- [ ] Configure fail2ban
- [ ] Set up SSL/TLS
- [ ] Regular backups configured
- [ ] Log rotation enabled
- [ ] Rate limiting configured
- [ ] CORS properly configured
