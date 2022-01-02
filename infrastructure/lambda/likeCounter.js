const { DynamoDB, Lambda } = require('aws-sdk');

exports.handler = async function(event) {

  const articleId = event.queryStringParameters.articleId
  // create AWS SDK clients
  const dynamo = new DynamoDB();
  const lambda = new Lambda();

  // update dynamo entry for "article" with likes++
  await dynamo.updateItem({
    TableName: process.env.LIKES_TABLE_NAME,
    Key: { articleId: { N: articleId.toString() } },
    UpdateExpression: 'ADD likes :incr',
    ExpressionAttributeValues: { ':incr': { N: '1' } }
  }).promise();

  // call downstream function and capture response
  const resp = await lambda.invoke({
    FunctionName: process.env.DOWNSTREAM_FUNCTION_NAME,
    Payload: JSON.stringify(event)
  }).promise();

  console.log('downstream response:', JSON.stringify(resp, undefined, 2));

  // return response back to upstream caller
  return JSON.parse(resp.Payload);
};