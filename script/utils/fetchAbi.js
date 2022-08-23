// Function to fetch your smart contract ABI data
const axios = require("axios").default;
const polygonExplorerApiKey = process.env.EXPLORER_API_KEY;
const ethereumExplorerApiKey = process.env.ETHEREUM_EXPLORER_API_KEY;

async function fetchAbiDataGoerli(contractAddress) {
    // https://api-testnet.polygonscan.com
    // https://api.polygonscan.com
    try {
        return (
            await axios.get(
                `https://api-goerli.etherscan.io/api?module=contract&action=getabi&address=${contractAddress}&apikey=${ethereumExplorerApiKey}`
            )
        ).data;
    } catch (error) {
        console.log(`Error in fetchAbiData: ${error}`);
        process.exit(1);
    }
}

async function fetchAbiDataPolygon(contractAddress) {
    // https://api-testnet.polygonscan.com
    // https://api.polygonscan.com
    try {
        return (
            await axios.get(
                `https://api-testnet.polygonscan.com/api?module=contract&action=getabi&address=${contractAddress}&apikey=${polygonExplorerApiKey}`
            )
        ).data;
    } catch (error) {
        console.log(`Error in fetchAbiData: ${error}`);
        process.exit(1);
    }
}

module.exports = { fetchAbiDataGoerli, fetchAbiDataPolygon };
