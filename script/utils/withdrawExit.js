const { getFxPortalClient } = require("./FxPortalClient");
const config = require("../../config");

const token = config.RootERC20Token;
async function withdrawExit(burnTxHash) {
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

module.exports = { withdrawExit };
