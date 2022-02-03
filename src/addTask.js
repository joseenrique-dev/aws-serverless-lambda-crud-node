const { v4 } = require('uuid');
const AWS = require('aws-sdk');
const middy = require('@middy/core');
const jsonBodyParser = require('@middy/http-json-body-parser');

/**
 * Add Task
 * @param {Event} event Http request event
 * @returns
 */
const addTask = async (event) => {
    try {
        const dynamodb = new AWS.DynamoDB.DocumentClient();

        const { title, description } = event.body;
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
            status: 200,
            body: JSON.stringify(newTask),
        };
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    addTask: middy(addTask).use(jsonBodyParser()),
};
