const { Kafka } = require('kafkajs');

// Initialize Kafka client with the broker URL (Kafka, not Zookeeper)
const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092']  // Corrected to connect to Kafka broker, not Zookeeper
});
const jsonData = {
    name: "Ankur",
    email: "ankur@gmail.com",
    password: "123456"
  };
  const jsonString = JSON.stringify(jsonData);

// Producer function to send messages
const producer = kafka.producer();
const produceMessage = async () => {
  await producer.connect();
  await producer.send({
    topic: 'test-topic',   // Make sure to create this topic if it doesn't exist
    messages: [
      { value: jsonString },
    ],
  });
  console.log('Message sent successfully!');
  await producer.disconnect();
};


// Run both produce and consume functions
const run = async () => {
    setInterval(async () => {
        await produceMessage();
      }, 1000); // 2000 ms = 2 seconds
};


run().catch(console.error);

