require("dotenv").config();
const { ethers } = require("ethers");
const config = require("../../../config");
const { fetchAbiDataGoerli } = require("../../utils/fetchAbi");

const projectID = process.env.INFURA_PROJECT_ID;
const pKey = process.env.PRIVATE_KEY_GOERLI;

const receiveMessage = async (proof) => {
    try {
        // Using Infura provider to connect to the goerli chain
        const provider = new ethers.providers.InfuraProvider("goerli", projectID);

        // Initialize your wallet account address as your signer
        // pKey here is your metamask account private key
        const signer = new ethers.Wallet(pKey, provider);

        // Contract address for FxERC20RootTunnel
        const fxERC20RootTunnel_address = config.FxERC20RootTunnel;

        // Fetch your smart contract ABI data from the blockchain
        // Your smart contract must be deployed and verified
        const abiData = await fetchAbiDataGoerli(fxERC20RootTunnel_address);
        const fxERC20RootTunnel_ABI = abiData.result;

        // Get contract for FxERC20RootTunnel
        const fxERC20RootTunnel_contract = new ethers.Contract(
            fxERC20RootTunnel_address,
            fxERC20RootTunnel_ABI,
            provider
        );

        // Connect wallet to contract
        const fxERC20RootTunnel = fxERC20RootTunnel_contract.connect(signer);
        const tx = await fxERC20RootTunnel.receiveMessage(proof);
        await tx.wait();
        const txHash = tx.hash;
        console.log("\nTransaction Hash: ", txHash);
        console.log(`Transaction Details: https://goerli.etherscan.io/tx/${txHash}`);
        console.log("\nBurn Proof received on Root chain successfully!");
        return;
    } catch (error) {
        console.log("Error at receiveMessage", error);
        process.exit(1);
    }
};

module.exports = receiveMessage;
