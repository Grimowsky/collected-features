FROM node:20.17.0-alpine as base

WORKDIR app/
COPY package*.json ./
COPY tsconfig.json ./

EXPOSE 8080
#ws port
EXPOSE 4000
FROM base as dev
ENV NODE_ENV=development

RUN npm install
COPY . .

# RUN ls -la
