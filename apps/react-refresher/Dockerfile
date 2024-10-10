# react-refresher/Dockerfile

FROM node:20.17.0-alpine as base

# Set the working directory to /app
WORKDIR /app

# Copy only the configuration files for the workspace
COPY package*.json ./ 
COPY tsconfig.base.json ./ 

# Copy only the necessary folders
COPY ./libs/shared-ui ./libs/shared-ui
COPY ./apps/react-refresher ./apps/react-refresher

# Expose port 3000
EXPOSE 3000

# Second build stage (development)
FROM base as dev

# Set the working directory to /app/libs/shared-ui
WORKDIR /app/libs/shared-ui

# Install dependencies for shared-ui
RUN npm install

# Set the working directory to /app/apps/react-refresher
WORKDIR /app/apps/react-refresher

# Install dependencies for react-refresher
RUN npm install

# Copy the remaining source files into the container
COPY ./apps/react-refresher .