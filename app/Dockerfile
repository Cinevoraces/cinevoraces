FROM node:19-slim AS deps
RUN apt update && apt install -y openssl && apt install -y curl
WORKDIR /usr/src/app

COPY . ./

# building the app
RUN npm i
RUN export NEXT_SHARP_PATH=/tmp/node_modules/sharp
RUN npm run build

# Running the app
CMD [ "npm", "start" ]
