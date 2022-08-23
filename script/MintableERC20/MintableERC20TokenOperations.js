const ps = require("prompt-sync");
const prompt = ps();

async function MintableERC20TokenOperations() {
    console.log("\nSelect a type of Mintable ERC20 Token Operation:-");
    console.log("1. Deposit Mintable ERC20 Token from Root chain to Child chain.");
    console.log("2. Deploy Child ERC20 Token on Child chain.");
    console.log("3. Mint ERC20 Token on Child chain.");
    console.log("4. Withdraw ERC20 Token on Root chain");
    const choice = prompt("Enter your choice: ");
    console.log("\n");
    if (!choice) return console.log("Choice cannot be null");
    if (choice !== "1" && choice !== "2" && choice !== "3" && choice !== "4")
        return console.log(`Transaction ${choice} is unsupported`);

    try {
        if (choice === "1") await depositMintableERC20Token();
        if (choice === "2") await deployMintableERC20Token();
        if (choice === "3") await mintMintableERC20Token();
        if (choice === "3") await withdrawMintableERC20Token();

        return;
    } catch (error) {
        console.log(`Error at ERC20TokenOperations: ${error}`);
    }
}

module.exports = MintableERC20TokenOperations;
