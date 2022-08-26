const ps = require("prompt-sync");
const prompt = ps();

const depositERC20Token = require("./functions/depositERC20Token");
const mapTokenERC20Token = require("./functions/mapTokenERC20Token");
const withdrawERC20Token = require("./functions/withdrawERC20Token");
const withdrawToERC20Token = require("./functions/withdrawToERC20Token");
const { withdrawExitERC20Token } = require("./functions/withdrawExitERC20Token");

async function ERC20TokenOperations() {
    console.log("\n-----------------------------------------");
    console.log("ERC20 TOKEN OPERATIONS");
    console.log("-----------------------------------------\n");
    console.log("Select a type of ERC20 Token Operation:-");
    console.log("1. Deposit ERC20 Token from Root chain to Child chain.");
    console.log("2. Map ERC20 Token from Root chain to Child chain.");
    console.log("3. Withdraw ERC20 Token on Root chain.");
    console.log("4. Withdraw ERC20 Token to any receiver address on Root chain.");
    console.log("5. Submit burn hash proof to Root chain to unlock token. (withdrawExit)\n");
    const choice = prompt("Enter your choice: ");
    console.log("\n");
    if (!choice) return console.log("Choice cannot be null");
    if (choice !== "1" && choice !== "2" && choice !== "3" && choice !== "4" && choice !== "5")
        return console.log(`Transaction ${choice} is unsupported`);

    try {
        if (choice === "1") await depositERC20Token();
        if (choice === "2") await mapTokenERC20Token();
        if (choice === "3") await withdrawERC20Token();
        if (choice === "4") await withdrawToERC20Token();
        if (choice === "5") await withdrawExitERC20Token();
        return;
    } catch (error) {
        console.log(`Error at ERC20TokenOperations: ${error}`);
    }
}

module.exports = ERC20TokenOperations;
