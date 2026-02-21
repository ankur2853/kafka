const { Kafka } = require('kafkajs');
const connection = require("./database");

// Initialize Kafka client with the broker URL (Kafka, not Zookeeper)
const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092']  // Corrected to connect to Kafka broker, not Zookeeper
});

// Consumer function to read messages
const consumer = kafka.consumer({ groupId: 'metaverse' });
const consumeMessages = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'test-topic', fromBeginning: true });
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
        const messageString = message.value.toString();
        // console.log(`Received message: ${message.value.toString()}`);

        const payload = JSON.parse(messageString);
        const query ="INSERT INTO `users`(`name`, `email`, `password`,`eStatus`) VALUES (?, ?, ?, ?)";
        const results = await connection.query(query, [
            payload.name,
            payload.email,
            payload.password,
            'y'
          ]);
        console.log(results);
    },
  });
};

// Run both produce and consume functions
const run = async () => {
  // Consume messages (will keep listening until stopped)
  await consumeMessages();
};

run().catch(console.error);
