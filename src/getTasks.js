const AWS = require('aws-sdk');

const getTasks = async (event) => {
    try {
        const dynamodb = new AWS.DynamoDB.DocumentClient();

        const allTask = await dynamodb
            .scan({
                TableName: 'TaskTable',
            })
            .promise();

        const resultTask = allTask.Items;
        return {
            statusCode: 200,
            body: resultTask,
        };
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    getTasks,
};
