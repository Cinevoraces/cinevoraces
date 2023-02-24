FROM node:19-slim AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /usr/src/app

COPY . ./

# building the app
RUN npm i
RUN npm i sharp
RUN npm run build

# Running the app
CMD [ "npm", "start" ]
