const AWS = require('aws-sdk');

/**
 * Get a specific task
 * @param {Event} event Http request event
 * @returns
 */
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
