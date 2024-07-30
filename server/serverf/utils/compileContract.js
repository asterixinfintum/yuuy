const hre = require("hardhat");

const { types, task } = require("hardhat/config");

async function compile() {
    try {
        console.log("attempting to compile...");

        await hre.run("compile");

        console.log("compile successful!");
    } catch (error) {
        console.log(error)
    }
}

export default compile;

/*compile()
    .then(() => console.log('done'))
    .catch(error => console.log(error));*/