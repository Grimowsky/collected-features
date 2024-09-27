// clone-template.js
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const projectName = process.argv[2];
const templateRepo = 'https://github.com/Grimowsky/react-ui-nx-template.git'; // Change to the URL of your template repository
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
