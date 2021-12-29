const { DynamoDB, Lambda } = require('aws-sdk');

const MAX_NUMBERIC_DYNAMO_DB = 10 ^ 38;
const MAX_FEEDBACK_LENGTH = 250;
const MAX_LENGTH = 50;

exports.handler = async function (event) {
  const articleId = event.queryStringParameters.articleId
  const feedbackId = getRandomInteger(0, MAX_NUMBERIC_DYNAMO_DB)
  
  const body = JSON.parse(event.body)
  console.log("parsed body: ", body)
  const email = getParam(body, "email")

  const twitterHandle = getParam(body, "twitterHandle")
  const feedback = getParam(body, "feedback", MAX_FEEDBACK_LENGTH)

  // create AWS SDK clients
  const dynamo = new DynamoDB();

  const nowEpochTimestamp = Date.now();
  const resp = await dynamo.putItem({
    TableName: process.env.FEEDBACK_TABLE_NAME,
    Item: {
      feedbackId: { N: feedbackId.toString() },
      articleId: { N: articleId.toString() },
      timestamp: { N: nowEpochTimestamp.toString() },
      date: { S: new Date(nowEpochTimestamp).toDateString() },
      email: { S: email.toString() },
      feedback: { S: feedback.toString() },
      twitterHandle: { S: twitterHandle.toString() },
      read: { BOOL: false },
    }
  }).promise();

  console.log('downstream response:', JSON.stringify(resp, undefined, 2));

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "text/plain",
      'Access-Control-Allow-Origin': '*'
    },
  };
};

function getParam(body, param, maxLength=MAX_LENGTH) {
  return body[param] ? body[param].substring(0, maxLength) : "";
}

function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}