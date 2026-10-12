import kafka from "./client.js";

async function init() {
    const admin = kafka.admin();
    console.log("Connecting...");
    await admin.connect();
    console.log("Connected!");

    console.log("creating topics...");
    await admin.createTopics({
        topics: [{
            topic: "rider-updates",
            numPartitions: 2,
        }]
    })
    console.log("Topics created successfully!");
    console.log("Disconnecting...");
    await admin.disconnect();
    console.log("Disconnected!");
}

init().catch(console.error);