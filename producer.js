import kafka from "./client.js";

async function init() {
    const producer = kafka.producer();
    console.log("Connecting producer...");
    await producer.connect();
    console.log("Producer connected.");

    await producer.send({
        topic: "rider-updates",
        messages: [
            { partition: 0, key: 'location-update', value: JSON.stringify({name: 'Tony', loc: 'South'}) },
            // { partition: 0, key: 'location-update', value: JSON.stringify({name: 'Alice', loc: 'Bangalore'}) },
        ],
    });
    await producer.disconnect();

}
init().catch(e => console.error(`[producer] ${e.message}`, e));