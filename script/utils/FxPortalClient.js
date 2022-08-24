const { use, setProofApi } = require("@maticnetwork/maticjs");
const { Web3ClientPlugin } = require("@maticnetwork/maticjs-web3");
const { FxPortalClient } = require("@fxportal/maticjs-fxportal");
const { ethers, Wallet } = require("ethers");
const config = require("../../config");
require("dotenv").config();

use(Web3ClientPlugin);

// To use withdrawExitFaster(), set the proof api
// Once set, the proof api will be used globally for faster exits.
setProofApi("https://apis.matic.network/");

const polygonPKey = process.env.PRIVATE_KEY_POLYGON;
const goerliPKey = process.env.PRIVATE_KEY_GOERLI;
const projectID = process.env.INFURA_PROJECT_ID;

// connect provider to interact with eth and polygon chain
const parentProvider = new ethers.providers.InfuraProvider("goerli", projectID);
const childProvider = new ethers.providers.InfuraProvider("maticmum", projectID);

async function getFxPortalClient(network = "testnet", version = "mumbai") {
    try {
        const fxPortalClient = new FxPortalClient();
        return await fxPortalClient.init({
            network: network,
            version: version,
            parent: {
                provider: new Wallet(goerliPKey, parentProvider),
                defaultConfig: {
                    from: config.RootUser,
                },
            },
            child: {
                provider: new Wallet(polygonPKey, childProvider),
                defaultConfig: {
                    from: config.ChildUser,
                },
            },
        });
    } catch (error) {
        console.log("error unable to initiate fxPortalClient", error);
    }
}

module.exports = {
    getFxPortalClient: getFxPortalClient,
};
