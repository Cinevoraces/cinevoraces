# :clapper: Cinévoraces - Dev Branch

## :key: Setup environment variables

_Ask a project admin for sensitive informations._

### .env.api:

```
COOKIE_SECRET=
JWT_SECRET=
PASS_REGEXP='^(?=.*[A-Za-z])(?=.*\d)[!#$&%*+=?|\-A-Za-z\d]{8,}$'
```
### .env.db:

```
POSTGRES_PASSWORD=
POSTGRES_USER=
POSTGRES_DB=
POSTGRES_URL=
```

## :satellite: API Documentation
Swagger documentation is accessible on `/dev-docs` endpoint.
- [Data Dictionnary](./doc/API-data_dictionnary.md)
- [Endpoints description](./doc/API-Endpoints.md)
- [MCD/MLD](./doc/API-MCD-MLD.md)