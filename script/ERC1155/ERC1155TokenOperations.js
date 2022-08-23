const ps = require("prompt-sync");
const prompt = ps();

async function ERC1155TokenOperations() {
    console.log("\nSelect a type of ERC721 Token Operation:-");
    console.log("1. Deposit single ERC1155 Token from Root chain to Child chain.");
    console.log("2. Deposit batch ERC1155 Tokens from Root chain to Child chain.");
    console.log("3. Map ERC1155 Token from Root chain to Child chain.");
    console.log("4. Withdraw single ERC1155 Token on Root chain.");
    console.log("5. Withdraw batch ERC1155 Tokens on Root chain.");
    const choice = prompt("Enter your choice: ");
    console.log("\n");
    if (!choice) return console.log("Choice cannot be null");
    if (choice !== "1" && choice !== "2" && choice !== "3")
        return console.log(`Transaction ${choice} is unsupported`);

    try {
        if (choice === "1") await depositERC1155Token();
        if (choice === "2") await depositBatchERC1155Token();
        if (choice === "3") await mapTokenERC1155Token();
        if (choice === "4") await withdrawERC1155Token();
        if (choice === "5") await withdrawBatchERC1155Token();
        return;
    } catch (error) {
        console.log(`Error at ERC1155TokenOperations: ${error}`);
    }
}

module.exports = ERC1155TokenOperations;
