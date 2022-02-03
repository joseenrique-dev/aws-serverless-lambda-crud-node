const { v4 } = requiere('uuid');

const addTask = async (event) => {
    const { title, description } = event.body;
    const createAt = new Date();
    const id = v4();
};

module.exports = {
    addTask,
};
