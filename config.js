// config.js
const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  getQueueUrl: () => {
    if (process.env.ENV === 'local') {
      return `http://${process.env.LOCALSTACK_HOSTNAME}:${process.env.LOCALSTACK_EDGE_PORT}/${process.env.LOCALSTACK_EDGE_PORT}/GeneratedReportQueue`;
    }
    return process.env.QueueUrl
  }
};