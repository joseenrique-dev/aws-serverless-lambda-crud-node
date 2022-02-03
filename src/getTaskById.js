const AWS = require('aws-sdk');

const getTaskById = async (event) => {
    const { id } = event.pathParameters;

    const dynamodb = new AWS.DynamoDB.DocumentClient();

    const selectedTask = await dynamodb
        .get({
            TableName: 'TaskTable',
            Key: {
                id: id,
            },
        })
        .promise();

    const result = selectedTask.Item;

    return {
        status: 200,
        body: {
            result,
        },
    };
};

module.exports = {
    getTaskById,
};
