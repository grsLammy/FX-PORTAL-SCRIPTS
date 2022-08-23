const { getNamedAccounts } = require("hardhat");
const func = async (hre) => {
    const { deployments } = hre;
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();

    await deploy("rootERC20Token", {
        from: deployer,
        args: [],
        log: true,
        skipIfAlreadyDeployed: true,
        contract: "rootERC20Token",
    });
};

func.tags = ["rootERC20Token"];
module.exports = func;
