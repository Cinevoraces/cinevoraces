# :clapper: Cinévoraces - Prod Branch

## :pushpin: Table of Contents
  - [Setup environment variables](#setup-environment-variables)

## :key: Setup environment variables
*Ask a project admin for sensitive informations.*

### .env:
```
SESSION_SECRET=

# Configuration locale
HOST=localhost
PORT=3005
DB_NAME=
DB_USER=
DB_PORT=5432
DB_HOST=localhost
DB_PW=
PG_URL=postgresql://<user>:<password>@postgres:5432/<database>?sslmode=disable

# Cloudinary conf
CLOUDINARY_URL=

# configuration tokens
ACCESS_TOKEN_SECRET=
REFRESH_TOKEN_SECRET=
```
### .env.app:
```
# React App
REACT_APP_TMDB_KEY=
REACT_APP_API=/api
REACT_APP_TMDB=https://api.themoviedb.org/3
REACT_APP_CLOUD_URL=https://api.cloudinary.com/v1_1
REACT_APP_CLOUD_NAME=
REACT_APP_CLOUD_PRESET=
REACT_APP_CLOUD_API_KEY=
```