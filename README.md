<picture>
    <source media="(prefers-color-scheme: dark)" srcset="./doc/img/logo_cinevoraces-dark.svg">
    <source media="(prefers-color-scheme: light)" srcset="./doc/img/logo_cinevoraces-light.svg">
    <img src="./doc/img/logo_cinevoraces-dark.svg" alt="Cinévoraces logo">
</picture>

[![license](https://img.shields.io/badge/Cinévoraces-2.0.0-orange.svg)](https://github.com/cinevoraces)
<!-- [![license](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE) -->

### :file_folder: Requirements
- Docker
- NodeJS >= 18.x.x

### :clapper: Env
*Create a `.env` file a the root of the project.*
```
# DATABASE
POSTGRES_PASSWORD=
POSTGRES_USER=
POSTGRES_DB=
POSTGRES_URL='postgres://xxx:xxx@postgres:5432/xxx'
POSTGRES_HOST=
POSTGRES_PORT=5432

# API
CLOUDINARY_URL=
PASS_REGEXP='^(?=.*[A-Z])(?=.*[!#$%*+=?|\-])(?=.*\d)[!#$%*+=?|\-A-Za-z\d]{12,}$'
JWT_SECRET=secret
COOKIE_SECRET=secret
API_PORT=3005
ROOT_PATH='/api'

# APP
TMDB_KEY=
API_BASE_URL_CSR=/api
API_BASE_URL_SSR=http://cinevoraces_api:3005
DISCORD_INVITE_URL=
```