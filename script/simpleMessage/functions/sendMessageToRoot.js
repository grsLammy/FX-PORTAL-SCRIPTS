const { ethers } = require("ethers");
const ps = require("prompt-sync");
const prompt = ps();
const config = require("../../../config");
const { fetchAbiDataPolygon } = require("../../../utils/fetchAbi");
const { fetchGasPrice } = require("../../../utils/fetchGasPrice");
require("dotenv").config();

const projectID = process.env.INFURA_PROJECT_ID;
const pKey = process.env.PRIVATE_KEY_POLYGON;
const walletAddress = process.env.PUBLIC_KEY;

const sendMessageToRoot = async () => {
    try {
        const message = prompt("Enter your message to send to Root chain: ");
        if (!message) return console.log("Message cannot be null");

        const abiCoder = ethers.utils.defaultAbiCoder;
        const encodedMessage = abiCoder.encode(["string"], [message]);

        // Using Infura provider to connect to the goerli chain
        const provider = new ethers.providers.InfuraProvider("maticmum", projectID);
        const nonce = await provider.getTransactionCount(walletAddress);

        // Initialize your wallet account address as your signer
        // pKey here is your metamask account private key
        const signer = new ethers.Wallet(pKey, provider);

        // Fetch the latest gas price data from the polygon v2 gas station API
        const { maxFee, maxPriorityFee } = await fetchGasPrice();

        // Contract address for FxStateChildTunnel
        const fxStateChildTunnel_address = config.FxStateChildTunnel;

        // Fetch your smart contract ABI data from the blockchain
        // Your smart contract must be deployed and verified
        const abiData = await fetchAbiDataPolygon(fxStateChildTunnel_address);
        const fxStateChildTunnel_ABI = abiData.result;

        // Get contract for FxStateChildTunnel
        const fxStateChildTunnel_contract = new ethers.Contract(
            fxStateChildTunnel_address,
            fxStateChildTunnel_ABI,
            provider
        );

        // Connect wallet to contract
        const fxStateChildTunnel = fxStateChildTunnel_contract.connect(signer);

        const estimatedGasLimit = await fxStateChildTunnel.estimateGas.sendMessageToRoot(encodedMessage, {
            gasLimit: 14_999_999,
            nonce: nonce,
            maxFeePerGas: maxFee,
            maxPriorityFeePerGas: maxPriorityFee,
        });
        const tx = await fxStateChildTunnel.sendMessageToRoot(encodedMessage, {
            gasLimit: estimatedGasLimit,
            nonce: nonce,
            maxFeePerGas: maxFee,
            maxPriorityFeePerGas: maxPriorityFee,
        });
        await tx.wait();
        const txHash = tx.hash;
        console.log("\nTransaction Hash: ", txHash);
        console.log(`Transaction Details: https://mumbai.polygonscan.com/tx/${txHash}`);

        return;
    } catch (error) {
        console.log("Error in sendMessageToRoot", error);
        process.exit(1);
    }
};

module.exports = sendMessageToRoot;
