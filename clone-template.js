// clone-template.js
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const projectType = process.argv[2]
const projectName = process.argv[3];

if(!projectType) {
    console.error('Invalid project type!')
    process.exit(1)
}

const templateRepo = projectType === "backend" ?
    'https://github.com/Grimowsky/nestJS-api-nx-template.git' :
    'https://github.com/Grimowsky/react-ui-nx-template.git';

const targetPath = path.join(__dirname, 'apps', projectName);

if (!projectName) {
    console.error('You must provide a project name as an argument.');
    process.exit(1);
}

// Clone the template repository
exec(`git clone ${templateRepo} ${targetPath}`, (error, stdout, stderr) => {
    if (error) {
        console.error(`Error cloning repository: ${error.message}`);
        return;
    }

    console.log(`Application "${projectName}" has been successfully created.`);

    // Remove the .git folder
    const gitFolderPath = path.join(targetPath, '.git');
    try {
        fs.rmSync(gitFolderPath, { recursive: true, force: true });
        console.log(`The ".git" folder has been removed.`);
    } catch (err) {
        console.error(`Error removing the ".git" folder: ${err.message}`);
    }
});
