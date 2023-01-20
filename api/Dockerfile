FROM node:19-slim

# Install dependencies 
# (non x86 system should install openssl inside container's shell)
RUN apt update && apt install -y openssl && apt install -y curl

WORKDIR /api
COPY . .

RUN npm i
RUN npm run build
CMD ["npm", "run", "start"]