const ps = require("prompt-sync");
const prompt = ps();
const { getFxPortalClient } = require("./FxPortalClient");

async function isCheckPointed() {
    try {
        console.log("\n-----------------------------------------");
        console.log("INITIATING ISCHECKPOINTED PROCESS");
        console.log("-----------------------------------------\n");

        const burnTxnHash = prompt("Enter the burn transaction hash: ");
        if (!burnTxnHash) return console.log("Message cannot be null");
        //if (burnTxnHash.length !== 42) return console.log(`${burnTxnHash} is not a valid address`);
        // initiate fxClient
        const fxClient = await getFxPortalClient();

        // check if the burn hash has been checkpointed
        const isCheckPointedStatus = await fxClient.isCheckPointed(burnTxnHash);
        console.log("\nTransaction Hash checkpoint status: ", isCheckPointedStatus);
        if (!isCheckPointedStatus) console.log("Reverting back as hash was not checkpointed yet...");
    } catch (error) {
        console.log("Error at isCheckPointed", error);
        process.exit(1);
    }
}

isCheckPointed()
    .then(() => {
        console.log("\n\n---------- ENDING ALL PROCESS ----------\n\n");
        process.exit(0);
    })
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
