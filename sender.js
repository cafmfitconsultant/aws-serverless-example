const AWS = require("aws-sdk");
const config = require('./config');

const sqs = new AWS.SQS({
  region: "us-east-1",
});
exports.handler = async (event, context, callback) => {
  const queueUrl = config.getQueueUrl();
  const message = event.Records[0].Sns.Message;
  const params = {
    MessageBody: message,
    QueueUrl: queueUrl,
  };
  const responseBody = {
    message: ""
  };
  let responseCode = 200;

  try {
    const data = await sqs.sendMessage(params).promise();
    responseBody.message = `Sent to ${queueUrl}`;
    responseBody.messageId = data.MessageId;
  } catch (error) {
    console.info("error:", `failed to send message ${error}`);
    responseCode = 500;
  }

  const response = {
    statusCode: responseCode,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(responseBody),
  };
  callback(null, response);
};