// rabbitmq.js
const amqp = require('amqplib');

async function publishToQueue(queueName, message) {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    // Ensure the queue exists
    await channel.assertQueue(queueName, { durable: false });

    // Publish the message to the queue
    channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)), { persistent: true });

    // Close the connection
    await channel.close();
    await connection.close();
}

async function consumeFromQueue(queueName) {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();

  // Declare a queue for receiving messages
  await channel.assertQueue(queueName, { durable: false });

  // Consume messages from the queue
  channel.consume(queueName, async (message) => {
    if (message !== null) {
      const requestData = JSON.parse(message.content.toString());
      // Here we can send the notification via email or sms
      console.log('Received data:', requestData);

      // Acknowledge the message to remove it from the queue
      channel.ack(message);
    }
  }).then(async ()=>{
    console.log("Batch processed")
    await channel.close();
    await connection.close();
  })
}

module.exports = { publishToQueue, consumeFromQueue };
