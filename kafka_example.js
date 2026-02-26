const { Kafka } = require('kafkajs');

// Initialize Kafka client with the broker URL (Kafka, not Zookeeper)
const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092']  // Corrected to connect to Kafka broker, not Zookeeper
});

// Producer function to send messages
const producer = kafka.producer();
const produceMessage = async () => {
  await producer.connect();
  await producer.send({
    topic: 'test-topic',   // Make sure to create this topic if it doesn't exist
    messages: [
      { value: 'Hii i am ankur currenlty my role is software engineer' },
    ],
  });
  console.log('Message sent successfully!');
  await producer.disconnect();
};

// Consumer function to read messages
const consumer = kafka.consumer({ groupId: 'metaverse' });
const consumeMessages = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'test-topic', fromBeginning: true });
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(`Received message: ${message.value.toString()}`);
    },
  });
};

// Run both produce and consume functions
const run = async () => {
  // Produce a message
  await produceMessage();

  // Consume messages (will keep listening until stopped)
  await consumeMessages();
};

run().catch(console.error);
