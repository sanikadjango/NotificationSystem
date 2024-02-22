// nodeService.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const { publishToQueue, consumeFromQueue } = require("./rMQ.js")

app.use(bodyParser.json());

app.post('/send-notification', (req, res) => {
  const notificationData = req.body;
  console.log('Processing Request:', notificationData);

  publishToQueue("notifications",notificationData)

  res.status(200).json({ message: 'Data queued successfully.' });
});

//in real case scenario, some other service will consume the notification. But for simplicity I have written it in the same node instance.
app.get('/get-notification', (req, res) => {
  consumeFromQueue("notifications")
  res.status(200).json({ message: 'Queued notifications processed successfully.' });
})

const port = 3001;
app.listen(port, () => {
  console.log(`Node.js Service is running on http://localhost:${port}`);
});



