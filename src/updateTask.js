const AWS = require('aws-sdk');

/**
 * Update Task by task id
 * @param {Event} event Http request event
 * @returns
 */
const updateTask = async (event) => {
    try {
        const dynamodb = new AWS.DynamoDB.DocumentClient();
        const { id } = event.pathParameters;
        const { done, title, description } = JSON.parse(event.body);
        console.log('get values', { done, title, description });
        await dynamodb
            .update({
                TableName: 'TaskTable',
                Key: { id },
                UpdateExpression:
                    'set done = :done, title = :title, description = :description',
                ExpressionAttributeValues: {
                    ':done': done,
                    ':title': title,
                    ':description': description,
                },
                ReturnValues: 'ALL_NEW',
            })
            .promise();

        return {
            status: 200,
            body: JSON.stringify({
                message: 'Task updated successfuly',
            }),
        };
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    updateTask,
};
