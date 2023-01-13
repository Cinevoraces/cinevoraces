FROM postgres:14.5

WORKDIR /data

RUN apt update -y && \
    apt install sqitch -y

COPY . .
COPY V*.sql /docker-entrypoint-initdb.d/