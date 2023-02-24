FROM node:19-slim AS deps
RUN apt update && apt install -y openssl && apt install -y curl
WORKDIR /usr/src/app

COPY . ./

# building the app
RUN npm i
RUN npm i sharp
RUN npm run build

# Running the app
CMD [ "npm", "start" ]
