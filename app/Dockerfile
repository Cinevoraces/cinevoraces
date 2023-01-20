FROM node:19-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /usr/src/app

COPY . ./

# building the app
RUN npm i
RUN npm run build

# Running the app
CMD [ "npm", "start" ]
