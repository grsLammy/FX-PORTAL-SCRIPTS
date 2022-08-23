const { ethers, getNamedAccounts } = require("hardhat");

const func = async () => {
    const { deployments } = hre;
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();

    await deploy("rootERC271Token", {
        from: deployer,
        args: [],
        log: true,
        skipIfAlreadyDeployed: true,
        contract: "rootERC721Token",
    });
};

func.tags = ["rootERC721Token"];
module.exports = func;
