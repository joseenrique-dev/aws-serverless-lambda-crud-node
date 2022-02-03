const AWS = require('aws-sdk');

const removeTask = async (events) => {
    try {
        const dynamodb = new AWS.DynamoDB.DocumentClient();
        const { id } = events.pathParams;
        await dynamodb
            .delete({
                TableName: 'TaskTable',
                Key: { id },
            })
            .promise();

        return {
            status: 200,
            body: JSON.stringify({
                message: 'Task removed successfuly',
            }),
        };
    } catch (error) {
        console.log(error); //and cloud watch do the rest :smile:
    }
};

module.exports = {
    removeTask,
};
