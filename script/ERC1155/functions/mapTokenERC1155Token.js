require("dotenv").config();
const ps = require("prompt-sync");
const prompt = ps();
const { ethers } = require("ethers");
const config = require("../../../config");
const { fetchAbiDataGoerli } = require("../../utils/fetchAbi");

const projectID = process.env.INFURA_PROJECT_ID;
const pKey = process.env.PRIVATE_KEY_GOERLI;

const depositERC1155Token = async () => {
    try {
        const rootToken = prompt("Enter the address of your Root token: ");
        if (!rootToken) return console.log("Message cannot be null");
        if (rootToken.length !== 42) return console.log(`${rootToken} is not a valid address`);

        // Using Infura provider to connect to the goerli chain
        const provider = new ethers.providers.InfuraProvider("goerli", projectID);

        // Initialize your wallet account address as your signer
        // pKey here is your metamask account private key
        const signer = new ethers.Wallet(pKey, provider);

        // Contract address for FxERC1155RootTunnel
        const fxERC1155RootTunnel_address = config.FxERC1155RootTunnel;

        // Fetch your smart contract ABI data from the blockchain
        // Your smart contract must be deployed and verified
        const abiData = await fetchAbiDataGoerli(fxERC1155RootTunnel_address);
        const fxERC1155RootTunnel_ABI = abiData.result;

        // Get contract for fxERC1155RootTunnel
        const fxERC1155RootTunnel_contract = new ethers.Contract(
            fxERC1155RootTunnel_address,
            fxERC1155RootTunnel_ABI,
            provider
        );

        // Connect wallet to contract
        const fxERC1155RootTunnel = fxERC1155RootTunnel_contract.connect(signer);
        const tx = await fxERC1155RootTunnel.mapToken(rootToken);
        await tx.wait();
        const txHash = tx.hash;
        console.log("\nTransaction Hash: ", txHash);
        console.log(`Transaction Details: https://goerli.etherscan.io/tx/${txHash}`);
        console.log("\nToken Mapped successfully");
        return;
    } catch (error) {
        console.log("Error at depositERC1155Token", error);
        process.exit(1);
    }
};

module.exports = depositERC1155Token;
