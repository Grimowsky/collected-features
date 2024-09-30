// clone-template.js
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import inquirer from 'inquirer';

// Function to prompt user for project type and name
async function promptUser() {
    const answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'projectType',
            message: 'What type of application do you want to create?',
            choices: ['backend', 'frontend'],
        },
        {
            type: 'input',
            name: 'projectName',
            message: 'What is the name of your project?',
            validate: (input) => (input ? true : 'Project name cannot be empty.'),
        },
    ]);

    return answers;
}

function updatePackageJson(projectRoot, projectName) {
    const packageJsonPath = path.join(projectRoot, 'package.json');

    // Read the existing package.json
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

    // Update the name property
    packageJson.name = projectName;

    // Write the updated package.json back to the filesystem
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2), 'utf-8');
    console.log(`Updated package.json with project name: ${projectName}`);
}

function setupDockerFiles(projectRoot, projectName) {
    const dockerfilePath = path.join(projectRoot, 'Dockerfile');
    const dockerComposePath = path.join(projectRoot, 'docker-compose.yml');

    // Update Dockerfile
    const dockerfileContent = `
# ${projectName}/Dockerfile

FROM node:20.17.0-alpine as base

# Set the working directory to /app
WORKDIR /app

# Copy only the configuration files for the workspace
COPY package*.json ./ 
COPY tsconfig.base.json ./ 

# Copy only the necessary folders
COPY ./libs/shared-ui ./libs/shared-ui
COPY ./apps/${projectName} ./apps/${projectName}

# Expose port 3000
EXPOSE 3000

# Second build stage (development)
FROM base as dev

# Set the working directory to /app/libs/shared-ui
WORKDIR /app/libs/shared-ui

# Install dependencies for shared-ui
RUN npm install

# Set the working directory to /app/apps/${projectName}
WORKDIR /app/apps/${projectName}

# Install dependencies for ${projectName}
RUN npm install

# Copy the remaining source files into the container
COPY ./apps/${projectName} .
`;

    // Write the updated Dockerfile back to the filesystem
    fs.writeFileSync(dockerfilePath, dockerfileContent.trim(), 'utf-8');
    console.log(`Updated Dockerfile for project: ${projectName}`);

    // Update docker-compose.yml
    const dockerComposeContent = `
version: '3.8'

services:
  ${projectName}:
    build:
      context: ../../
      dockerfile: ./apps/${projectName}/Dockerfile
    volumes:
      - ./src:/app/apps/${projectName}/src
      - ../../libs/shared-ui/src:/app/libs/shared-ui/src
    working_dir: /app/apps/${projectName}
    command: "npm run dev"
    ports:
      - "3000:3000"
    environment:
      - PORT=3000
      - VITE_API_URL=http://localhost:8080
`;

    // Write the updated docker-compose.yml back to the filesystem
    fs.writeFileSync(dockerComposePath, dockerComposeContent.trim(), 'utf-8');
    console.log(`Updated docker-compose.yml for project: ${projectName}`);
}


// Calculate __dirname for ESM
const __dirname = new URL('.', import.meta.url).pathname;

// Main function to run the script
async function main() {
    const { projectType, projectName } = await promptUser();
    const projectRoot = `apps/${projectName}`;

    // Select template repository based on project type
    const templateRepo = projectType === "backend" ?
        'https://github.com/Grimowsky/nestJS-api-nx-template.git' :
        'https://github.com/Grimowsky/react-ui-nx-template.git';

    // Define the target path for the new project
    const targetPath = path.join(__dirname, 'apps', projectName);

    // Clone the template repository
    exec(`git clone ${templateRepo} ${projectRoot}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error cloning repository: ${error.message}`);
            return;
        }

        console.log(`Application "${projectName}" has been successfully created.`);

        // Remove the .git folder
        const gitFolderPath =  `${projectRoot}/.git`
        try {
            fs.rmSync(gitFolderPath, { recursive: true, force: true });
            console.log(`The ".git" folder has been removed.`);
            updatePackageJson(projectRoot, projectName);
            // Only set up Docker files if the project type is frontend
            if (projectType === 'frontend') {
                setupDockerFiles(projectRoot, projectName);
            }
        } catch (err) {
            console.error(`Error removing the ".git" folder: ${err.message}`);
        }
    });
}

// Run the main function
main().catch(err => console.error(err));
