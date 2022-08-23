const { ethers } = require("ethers");
const ps = require("prompt-sync");
const prompt = ps();
const config = require("../../config");
const { fetchAbiDataGoerli } = require("../../utils/fetchAbi");
require("dotenv").config();

const projectID = process.env.INFURA_PROJECT_ID;
const pKey = process.env.PRIVATE_KEY_GOERLI;

const sendMessageToChild = async () => {
    try {
        const message = prompt("Enter your message to send to Child chain: ");
        if (!message) return console.log("Message cannot be null");

        const abiCoder = ethers.utils.defaultAbiCoder;
        const encodedMessage = abiCoder.encode(["string"], [message]);

        // Using Infura provider to connect to the goerli chain
        const provider = new ethers.providers.InfuraProvider("goerli", projectID);

        // Initialize your wallet account address as your signer
        // pKey here is your metamask account private key
        const signer = new ethers.Wallet(pKey, provider);

        // Contract address for FxStateRootTunnel
        const fxStateRootTunnel_address = config.FxStateRootTunnel;

        // Fetch your smart contract ABI data from the blockchain
        // Your smart contract must be deployed and verified
        const abiData = await fetchAbiDataGoerli(fxStateRootTunnel_address);
        const fxStateRootTunnel_ABI = abiData.result;

        // Get contract for FxStateRootTunnel
        const fxStateRootTunnel_contract = new ethers.Contract(
            fxStateRootTunnel_address,
            fxStateRootTunnel_ABI,
            provider
        );

        // Connect wallet to contract
        const fxStateRootTunnel = fxStateRootTunnel_contract.connect(signer);
        const tx = await fxStateRootTunnel.sendMessageToChild(encodedMessage);
        await tx.wait();
        const txHash = tx.hash;
        console.log("\nTransaction Hash: ", txHash);
        console.log(`Transaction Details: https://goerli.etherscan.io/tx/${txHash}`);
        return;
    } catch (error) {
        console.log("Error in sendMessageToChild", error);
        process.exit(1);
    }
};

module.exports = sendMessageToChild;
