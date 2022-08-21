"use strict";
const AWS = require("aws-sdk");

const updateTodo = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const { completed } = await JSON.parse(event.body);
  const { id } = event.pathParameters;

  await dynamodb
    .update({
      TableName: "TodoTable",
      Key: { id },
      UpdateExpression: "set completed = :completed",
      ExpressionAttributeValues: {
        ":completed": completed,
      },
      ReturnValues: "ALL_NEW",
    })
    .promise();

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Todo Updated",
    }),
  };
};

module.exports = {
  handler: updateTodo,
};
