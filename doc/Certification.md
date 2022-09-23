# First certificate and renewal

## Documentation
[Tuto Mindser Blog](https://mindsers.blog/post/https-using-nginx-certbot-docker/) --> Most important ref<br>
[Documentation certbot](https://certbot.eff.org/instructions?ws=nginx&os=osx)<br>
[Repos GitHub distribution Nginx avec certbot](https://github.com/JonasAlfredsson/docker-nginx-certbot)

## Self-signed certificate :
```
openssl genrsa -out ./cinevoraces-key.pem 2048`
openssl req -new -sha256 -key ./cinevoraces-key.pem -out ./cinevoraces-csr.pem`
openssl x509 -days 7300 -req -in ./cinevoraces-csr.pem -signkey ./cinevoraces-key.pem -out ./cinevoraces-cert.pem`
```

## Cinévoraces configuration Cinévoraces (from mindser tutorial)
### Permissions management with Linux
Step by step, folder creations will occur.
Some of the newly created folders main lack permissions for writings for docker.
At each step, make sure that you grant it all required permissions with
```zsh
sudo chown usergroup folder -R
```
### First Docker Compose configuration

```docker-compose.yml
version: "3"

services:
  app:
    env_file: 
      - .env.app
    build:
      context: ./app
      dockerfile: Dockerfile
    restart: always

  api:
    env_file:
      - .env
    depends_on:
      - postgres
    build:
      context: ./api
      dockerfile: Dockerfile
    restart: always

  postgres:
    build:
      context: ./data
      dockerfile: Dockerfile
    environment:
      POSTGRES_PASSWORD: ${DB_PW}
      POSTGRES_USER: ${DB_USER}
      POSTGRES_DB: ${DB_NAME}
    restart: always
    volumes:
      - database:/var/lib/postgresql/data
      - ./data:/data

  nginx:
    depends_on:
      - app
      - api
    build:
      context: ./nginx
      dockerfile: Dockerfile
    restart: unless-stopped
    ports: 
      - 80:80
      - 443:443
    volumes:
      - ./nginx/conf/:/etc/nginx/conf.d/
      - ./certbot/www:/var/www/certbot/

  certbot:
    image: certbot/certbot:latest
    volumes:
      - ./certbot/www/:/var/www/certbot/

volumes:
  database:
    driver: local
```
### Nginx configuration to establish the first certificate
```default.conf
upstream app {
    server app:3000;
}

upstream api {
    server api:3005;
}

server {
    listen 80 default_server;
    listen [::]:80;

    server_name cinevoraces.fr www.cinevoraces.fr;
    server_tokens off;

    location /.well-known/acme-challenge/ {
        root /var/www/certbot/;
    }

    location / {
        return 301 https://cinevoraces.fr$request_uri;
    }
}
```
All request on 80 port, /.well-known/acme-challenge/ excepted are redirected to the 443 port (not configured yet).
### Configuration Verification
```zsh
docker-compose run --rm  certbot certonly --webroot --webroot-path /var/www/certbot/ --dry-run -d cinevoraces.fr
```
### Updated Docker-compose configuration for nginx & adding certbot container
  nginx:
    depends_on:
      - app
      - api
    build:
      context: ./nginx
      dockerfile: Dockerfile
    restart: unless-stopped
    ports: 
      - 80:80
      - 443:443
    volumes:
      - ./nginx/conf/:/etc/nginx/conf.d/:ro
      - ./certbot/www:/var/www/certbot/:ro
      - ./certbot/conf/:/etc/nginx/ssl/:ro

  certbot:
    image: certbot/certbot:latest
    volumes:
      - ./certbot/www/:/var/www/certbot/:rw
      - ./certbot/conf/:/etc/letsencrypt/:rw
### First certificate :
```zsh
docker-compose run --rm  certbot certonly --webroot --webroot-path /var/www/certbot/ -d cinevoraces.fr
```
### Completed nginx configuration
```default.conf
upstream app {
    server app:3000;
}

upstream api {
    server api:3005;
}

server {
    listen 80 default_server;
    listen [::]:80;

    server_name cinevoraces.fr www.cinevoraces.fr;
    server_tokens off;

    location /.well-known/acme-challenge/ {
        root /var/www/certbot/;
    }

    location / {
        return 301 https://cinevoraces.fr$request_uri;
    }
}
server {
    listen 443 default_server ssl http2;
    listen [::]:443 ssl http2;

    ssl on;

    server_name cinevoraces.fr  www.cinevoraces.fr;

    ssl_certificate /etc/nginx/ssl/live/cinevoraces.fr/fullchain.pem;
    ssl_certificate_key /etc/nginx/ssl/live/cinevoraces.fr/privkey.pem;

    location / {
        proxy_pass http://app;
    }

    location /sockjs-node {
        proxy_pass http://app;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
    }

    location /api {
        rewrite /api/(.*) /$1 break;
        proxy_pass http://api/v1;
    }
}
```
## Renouveler le certificat :
```
docker-compose run --rm certbot renew
```
À utiliser avec un crontab pour automatiser le renouvellement.
