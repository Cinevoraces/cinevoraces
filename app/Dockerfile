FROM node:16-alpine3.16

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm i

COPY . .

# RUN npm run build
# CMD ["npm", "run", "start"]
CMD ["npm", "run", "dev"]