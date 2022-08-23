// generating burn proof using tx hash of withdraw transaction

const { POSClient, use } = require("@maticnetwork/maticjs");
const { Web3ClientPlugin } = require("@maticnetwork/maticjs-ethers");
const { providers, Wallet } = require("ethers");

use(Web3ClientPlugin);

const polygonPKey = process.env.PRIVATE_KEY_POLYGON;
const goerliPKey = process.env.PRIVATE_KEY_GOERLI;
const projectID = process.env.INFURA_PROJECT_ID;

// connect provider to interact with eth and polygon chain
const parentProvider = new ethers.providers.InfuraProvider("goerli", projectID);
const childProvider = new ethers.providers.InfuraProvider("maticmum", projectID);
const privateKey = "private key"; // only for testing purpose, use env for real development

const posClient = new POSClient();

async function burnProof(burnHash) {
    // initialization of posClient using matic js lib

    await posClient.init({
        network: "testnet",
        version: "mumbai",
        parent: {
            provider: new Wallet(goerliPKey, parentProvider),
            defaultConfig: {
                from: "0xB75D71adFc8E5F7c58eA89c22C3B70BEA84A718d",
            },
        },
        child: {
            provider: new Wallet(polygonPKey, childProvider),
            defaultConfig: {
                from: "0xfDcDF3cFa272c67C17824FC792C9fF798C98eDed",
            },
        },
    });

    // interact to exit manager using withdraw manager to get burn proof
    const exit_manager = posClient.withdrawManager.exitManager;
    const SIG = "0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036";
    const proof = await exit_manager.buildPayloadForExit(burnHash, SIG);
    return proof;
}

module.exports = { burnProof };
