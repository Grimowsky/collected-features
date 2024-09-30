# app/test-ui/Dockerfile

FROM node:20.17.0-alpine as base

# Ustalamy katalog roboczy na /app
WORKDIR /app

# Kopiujemy pliki konfiguracyjne i foldery
COPY package*.json ./
COPY tsconfig.base.json ./
COPY ./libs ./libs
COPY ./apps ./apps

EXPOSE 3000

# Drugi etap budowy (dev)
FROM base as dev

# Ustalamy katalog roboczy na /app/apps/test-ui
WORKDIR /app/apps/test-ui

# Instalujemy zależności dla test-ui
RUN npm install

