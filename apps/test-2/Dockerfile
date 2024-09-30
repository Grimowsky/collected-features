# app/test-2/Dockerfile

FROM node:20.17.0-alpine as base

# Set the working directory to /app
WORKDIR /app

# Copy only the configuration files for the workspace
COPY package*.json ./
COPY tsconfig.base.json ./

# Copy only the necessary folders
COPY ./libs/shared-ui ./libs/shared-ui
COPY ./apps/test-2 ./apps/test-2

# Expose port 3000
EXPOSE 3000

# Second build stage (development)
FROM base as dev

# Set the working directory to /app/apps/test-2
WORKDIR /app/apps/test-2

# Install dependencies for test-2 and shared-ui
RUN npm install

# Copy the remaining source files into the container
COPY ./apps/test-2 .

