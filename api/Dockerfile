FROM node:16-alpine3.16
WORKDIR /api
COPY package.json /api
COPY package-lock.json /api
RUN npm i
COPY . /api
CMD ["npm", "run", "start"]