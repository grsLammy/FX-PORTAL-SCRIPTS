const ps = require("prompt-sync");
const prompt = ps();

async function ERC20TokenOperations() {
    console.log("\nSelect a type of ERC20 Token Operation:-");
    console.log("1. Deposit ERC20 Token from Root chain to Child chain.");
    console.log("2. Map ERC20 Token from Root chain to Child chain.");
    console.log("3. Withdraw ERC20 Token on Root chain.");
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
