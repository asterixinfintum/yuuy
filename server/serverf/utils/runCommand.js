const { spawn } = require('child_process');

async function runCommand(command, args, envVars = {}) {
    return new Promise((resolve, reject) => {
        const env = {
            ...process.env,
            ...envVars
        };

        const childProcess = spawn(command, args, {
            shell: false,
            env
        });

        let stdoutData = '';
        let stderrData = '';

        childProcess.stdout.on('data', (data) => {
            stdoutData += data;
            console.log(`stdout: ${data}`);
        });

        childProcess.stderr.on('data', (data) => {
            stderrData += data;
            console.error(`stderr: ${data}`);
        });

        childProcess.on('close', (code) => {
            if (code === 0) {
                resolve({ stdout: stdoutData, stderr: stderrData });
            } else {
                reject(new Error(`Command failed with exit code ${code}\nstderr: ${stderrData}`));
            }
        });

        childProcess.on('error', (error) => {
            reject(new Error(`Failed to start the command: ${error.message}`));
        });
    });
}

export default runCommand;