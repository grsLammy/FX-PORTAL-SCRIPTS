const { getFxPortalClient } = require("./FxPortalClient");
const config = require("../../config");

const token = config.RootERC20Token;
const burnTxHash = "0x7737b9bcfebf88403beaa6440abf2b061f0491c8e2b867be704d90c88bc800d5";
async function withdrawExit() {
    // initiate fxClient
    console.log("token: ", token);
    const fxClient = await getFxPortalClient();
    console.log("FxClient: ", fxClient);
    const erc20Token = fxClient.erc20(token, true);
    console.log("erc20Token: ", erc20Token);
    // execute transaction
    const txResult = await erc20Token.withdrawExit(burnTxHash);
    const txHash = await txResult.getTransactionHash();
    console.log("Transaction Hash:", txHash);
}

withdrawExit()
    .then(() => {
        console.log("\n\n---------- ENDING WITHDRAWEXIT PROCESS ----------.\n\n");
        process.exit(0);
    })
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
