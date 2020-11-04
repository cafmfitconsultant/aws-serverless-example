const AWS = require("aws-sdk");
const sqs = new AWS.SQS({
  region: "us-east-1",
});
exports.handler = async (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'SQS event processed.',
      input: event,
    }),
  };

  console.log('event: ', JSON.stringify(event));

  var body = event.Records[0].body;
  console.log("body: ", body);

  callback(null, response);
};