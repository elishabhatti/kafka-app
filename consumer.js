import kafka from "./client.js";

async function init() {
    const consumer = kafka.consumer({groupId: "user-1"});
    await consumer.connect();
    console.log("Consumer connected.");

    await consumer.subscribe({topics: ["rider-updates"], fromBeginning: true});

    await consumer.run({
        eachMessage: async ({topic, partition, message, heartbeat, pause}) => {
            console.log(`[${topic} | ${partition}] ${message.key} -> ${message.value.toString()}`);
        }
    })
}
init().catch(e => console.error(`[consumer] ${e.message}`, e));