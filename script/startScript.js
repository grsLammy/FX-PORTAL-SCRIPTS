const ps = require("prompt-sync");
const prompt = ps();
const sendMessageOperations = require("./simpleMessage/sendMessageOperations");
const ERC20TokenOperations = require("./ERC20/ERC20TokenOperations");
const ERC721TokenOperations = require("./ERC721/ERC721TokenOperations");
const ERC1155TokenOperations = require("./ERC1155/ERC1155TokenOperations");
const MintableERC20TokenOperations = require("./MintableERC20/MintableERC20TokenOperations");

async function startScript() {
    console.log("\n-----------------------------------------");
    console.log("Starting the FX PORTAL script process");
    console.log("-----------------------------------------\n");

    console.log("Select the type of operation to proceed:-");
    console.log("1. Simple Message Transfer Operations.");
    console.log("2. ERC20 Token Operations.");
    console.log("3. ERC721 Token Operations.");
    console.log("4. ERC1155 Token Operations.");
    console.log("5. Mintable ERC20 Token Operations.\n");
    const choice = prompt("Enter your choice: ");

    if (!choice) return console.log("Choice cannot be null");
    if (choice !== "1" && choice !== "2" && choice !== "3" && choice !== "4" && choice !== "5")
        return console.log(`Transaction ${choice} is unsupported`);

    try {
        if (choice === "1") await sendMessageOperations();
        if (choice === "2") await ERC20TokenOperations();
        if (choice === "3") await ERC721TokenOperations();
        if (choice === "4") await ERC1155TokenOperations();
        if (choice === "5") await MintableERC20TokenOperations();
        return;
    } catch (error) {
        console.log(`Error at startScript: ${error}`);
    }
}

startScript()
    .then(() => {
        console.log("\n\n---------- ENDING ALL PROCESS ----------.\n\n");
        process.exit(0);
    })
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
