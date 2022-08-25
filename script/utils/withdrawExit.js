const ps = require("prompt-sync");
const prompt = ps();
const config = require("../../config");
const { getFxPortalClient } = require("./FxPortalClient");

const token = config.RootERC20Token;
async function withdrawExit() {
    try {
        console.log("\n-----------------------------------------");
        console.log("INITIATING WITHDRAWEXIT PROCESS");
        console.log("-----------------------------------------\n");

        const burnTxnHash = prompt("Enter the burn transaction hash: ");
        if (!burnTxnHash) return console.log("Message cannot be null");
        //if (burnTxnHash.length !== 42) return console.log(`${burnTxnHash} is not a valid address`);
        // initiate fxClient
        const fxClient = await getFxPortalClient();
        const erc20Token = fxClient.erc20(token, true);

        // check if the burn hash has been checkpointed
        const isCheckPointedStatus = await fxClient.isCheckPointed(burnTxnHash);
        console.log("\nTransaction Hash checkpoint status: ", isCheckPointedStatus);
        if (!isCheckPointedStatus) return console.log("Reverting back as hash was not checkpointed yet...");

        // execute transaction
        console.log("\nProceeding with withdrawExit process...");
        const txResult = await erc20Token.withdrawExit(burnTxnHash);
        const txHash = await txResult.getTransactionHash();
        console.log("Transaction Hash:", txHash);
        console.log(`Transaction Details: https://goerli.etherscan.io/tx/${txHash}`);
        console.log(`\nTokens unlocked on root chain successfully\n`);
    } catch (error) {
        console.log("Error at withdrawExit", error);
        process.exit(1);
    }
}

module.exports = { withdrawExit };
