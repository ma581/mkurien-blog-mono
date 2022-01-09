const { DynamoDB } = require('aws-sdk');

exports.handler = async function (event) {

  const articleId = event.queryStringParameters.articleId;
  let likes = 0;
  const dynamo = new DynamoDB();

  console.info(`articleId ${articleId}`);

  await dynamo.getItem({
    TableName: process.env.LIKES_TABLE_NAME,
    Key: { articleId: { N: articleId.toString() } },
  }).promise()
    .then(res => {
      likes = res.Item.likes.N
    })
    .catch(err => {
      console.error(`err ${JSON.stringify(err)}`);
    });

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "text/plain",
      'Access-Control-Allow-Origin': "*"
    },
    body: likes
  };
};