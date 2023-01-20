FROM postgres:15.1

WORKDIR /data

COPY . .
COPY migration_v2.sql /docker-entrypoint-initdb.d/