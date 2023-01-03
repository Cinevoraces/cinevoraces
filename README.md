# :clapper: Cinévoraces - Dev Branch

## :key: Setup environment variables

_Ask a project admin for sensitive informations._

### .env.api:

```
CLOUDINARY_URL=
COOKIE_SECRET=
JWT_SECRET=
PASS_REGEXP='^(?=.*[A-Za-z])(?=.*\d)[!#$&%*+=?|\-A-Za-z\d]{8,}$'
PORT=
STORAGE_TEMP = '/storage/temp'
STORAGE_POSTER = '/storage/poster'
STORAGE_AVATAR = '/storage/avatar'
```
### .env.db:

```
POSTGRES_PASSWORD=
POSTGRES_USER=
POSTGRES_DB=
POSTGRES_URL=
PGADMIN_DEFAULT_EMAIL=
PGADMIN_DEFAULT_PASSWORD=
```

### .env.app:
```
NEXT_PUBLIC_PASS_REGEXP=
NEXT_PUBLIC_TMDB_KEY=
NEXT_PUBLIC_API_BASE_URL_CSR=
NEXT_PUBLIC_API_BASE_URL_SSR=

```

## :satellite: API Documentation
Swagger documentation is accessible on `/dev-docs` endpoint.
- [Data Dictionnary](./doc/API-data_dictionnary.md)
- [Endpoints description](./doc/API-Endpoints.md)
- [MCD/MLD](./doc/API-MCD-MLD.md)