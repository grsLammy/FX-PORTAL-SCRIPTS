const ps = require("prompt-sync");
const prompt = ps();

const depositERC721Token = require("./functions/depositERC721Token");
const mapTokenERC721Token = require("./functions/mapTokenERC721Token");
const withdrawERC721Token = require("./functions/withdrawERC721Token");

async function ERC721TokenOperations() {
    console.log("\nSelect a type of ERC721 Token Operation:-");
    console.log("1. Deposit ERC721 Token from Root chain to Child chain.");
    console.log("2. Map ERC721 Token from Root chain to Child chain.");
    console.log("3. Withdraw ERC721 Token on Root chain.");
    const choice = prompt("Enter your choice: ");
    console.log("\n");
    if (!choice) return console.log("Choice cannot be null");
    if (choice !== "1" && choice !== "2" && choice !== "3")
        return console.log(`Transaction ${choice} is unsupported`);

    try {
        if (choice === "1") await depositERC721Token();
        if (choice === "2") await mapTokenERC721Token();
        if (choice === "3") await withdrawERC721Token();
        return;
    } catch (error) {
        console.log(`Error at ERC721TokenOperations: ${error}`);
    }
}

module.exports = ERC721TokenOperations;
