FROM node:18-slim

# For a x86 platform the following command can be executed, otherwise, run it directly inside the api container
RUN apt update
RUN apt install -y openssl

WORKDIR /api

COPY package.json .
COPY package-lock.json .

# Updating npm for this docker image
RUN npm install -g npm@8.19.3

RUN npm i

COPY . .

CMD ["npm", "run", "dev"]