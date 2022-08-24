const ps = require("prompt-sync");
const prompt = ps();
const sendMessageToChild = require("./functions/sendMessageToChild");
const sendMessageToRoot = require("./functions/sendMessageToRoot");

async function sendMessageOperations() {
    console.log("\n-----------------------------------------");
    console.log("SIMPLE MESSAGE OPERATION");
    console.log("-----------------------------------------\n");
    console.log("Select a type of Simple Message Operation:-");
    console.log("1. Send Message from Root chain to Child chain.");
    console.log("2. Send Message from Child chain to Root chain.\n");
    const choice = prompt("Enter your choice: ");

    if (!choice) return console.log("Choice cannot be null");
    if (choice !== "1" && choice !== "2") return console.log(`Transaction ${choice} is unsupported`);

    try {
        if (choice === "1") await sendMessageToChild();
        if (choice === "2") await sendMessageToRoot();
        return;
    } catch (error) {
        console.log(`Error at sendMessageOperations: ${error}`);
    }
}

module.exports = sendMessageOperations;
