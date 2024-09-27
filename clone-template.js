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
        } catch (err) {
            console.error(`Error removing the ".git" folder: ${err.message}`);
        }
    });
}

// Run the main function
main().catch(err => console.error(err));
