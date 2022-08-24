const ps = require("prompt-sync");
const prompt = ps();

const depositERC20Token = require("./functions/depositERC20Token");
const mapTokenERC20Token = require("./functions/mapTokenERC20Token");
const withdrawERC20Token = require("./functions/withdrawERC20Token");

async function ERC20TokenOperations() {
    console.log("\n-----------------------------------------");
    console.log("ERC20 TOKEN OPERATIONS");
    console.log("-----------------------------------------\n");
    console.log("Select a type of ERC20 Token Operation:-");
    console.log("1. Deposit ERC20 Token from Root chain to Child chain.");
    console.log("2. Map ERC20 Token from Root chain to Child chain.");
    console.log("3. Withdraw ERC20 Token on Root chain.\n");
    const choice = prompt("Enter your choice: ");
    console.log("\n");
    if (!choice) return console.log("Choice cannot be null");
    if (choice !== "1" && choice !== "2" && choice !== "3")
        return console.log(`Transaction ${choice} is unsupported`);

    try {
        if (choice === "1") await depositERC20Token();
        if (choice === "2") await mapTokenERC20Token();
        if (choice === "3") await withdrawERC20Token();
        return;
    } catch (error) {
        console.log(`Error at ERC20TokenOperations: ${error}`);
    }
}

module.exports = ERC20TokenOperations;
