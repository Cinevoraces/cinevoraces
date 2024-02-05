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

_Create a `.env` file a the root of the project._

```
# DATABASE
POSTGRES_PASSWORD=
POSTGRES_USER=
POSTGRES_DB=
POSTGRES_HOST=postgres
POSTGRES_PORT=5432

# API
CLOUDINARY_URL=
BREVO_API_KEY=
PASS_REGEXP='^(?=.*[A-Z])(?=.*[!#$%*+=?|\-])(?=.*\d)[!#$%*+=?|\-A-Za-z\d]{12,}$'
NODE_ENV=development

# API INTEGRATION TESTS
TEST_USER=
TEST_PASS=

# APP
TMDB_KEY=
DISCORD_INVITE_URL=
```
