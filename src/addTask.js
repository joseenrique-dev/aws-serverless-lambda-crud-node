const { v4 } = require('uuid');
const AWS = require('aws-sdk');

const addTask = async (event) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient();

    const { title, description } = JSON.parse(event.body);
    const createAt = new Date();
    const id = v4();

    const newTask = {
        id,
        title,
        description,
        createAt,
    };

    await dynamodb
        .put({
            TableName: 'TaskTable',
            Item: newTask,
        })
        .promise();

    return {
        statusCode: 200,
        body: JSON.stringify(newTask),
    };
};

module.exports = {
    addTask,
};
