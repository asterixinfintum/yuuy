const hre = require("hardhat");
const fs = require("fs").promises;
const path = require("path");

async function cleanUpCompile() {
    const directories = [
        hre.config.paths.artifacts,
        hre.config.paths.cache
    ];
    for (const dir of directories) {
        try {
            await fs.rm(dir, { recursive: true, force: true });

            console.log(`Removed ${dir} directory`)
        } catch (error) {
            if (error.code !== 'ENOENT') {
                console.log(`Error removing dir:`, error);
            } else {
                console.log(`Directory not found ${dir}`);
            }
        }
    }
}

export default cleanUpCompile;

/*cleanUpCompile()
    .then(() => console.log('done'))
    .catch(error => console.log(error));*/