const { v4 } = requiere('uuid');
const AWS = requiere('aws-sdk');

const addTask = async (event) => {
    const dynamodb = new Date();
    const { title, description } = JSON.parse(event.body);
    const createAt = new Date();
    const id = v4();

    const newTask = {
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
