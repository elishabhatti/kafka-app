import kafka from "./client.js";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function init() {
  const producer = kafka.producer();
  console.log("Connecting producer...");
  await producer.connect();
  console.log("Producer connected.");

  rl.setPrompt("> ");
  rl.prompt();
  rl.on("line", async function (line) {
    const [riderName, location] = line.split(" ");
    await producer.send({
      topic: "rider-updates",
      messages: [
        {
          partition: location.toLowerCase() === "north" ? 0 : 1,
          key: "location-updates",
          value: JSON.stringify({ name: riderName, loc: location }),
        },
      ],
    });
  }).on("close", async () => {
    await producer.disconnect();
  });
}
init().catch((e) => console.error(`[producer] ${e.message}`, e));
