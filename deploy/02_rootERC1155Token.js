const { ethers, getNamedAccounts } = require("hardhat");

const func = async () => {
    const { deployments } = hre;
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();

    await deploy("rootERC1155Token", {
        from: deployer,
        args: [],
        log: true,
        skipIfAlreadyDeployed: true,
        contract: "rootERC1155Token",
    });
};

func.tags = ["rootERC1155Token"];
module.exports = func;
