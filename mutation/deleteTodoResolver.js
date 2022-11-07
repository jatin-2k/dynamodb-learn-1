const AWS = require('aws-sdk')
const tabledata = require('../tabledata.js');
const DynamoDB = new AWS.DynamoDB.DocumentClient();

const myFunc = async (userId, todoId) => {
    let newId = tabledata.guid();
    let params = {
        TableName: tabledata.TableName,
        Key: {
            PK: `user::${userId}`,
            SK: `todo::${todoId}`
        }
    }
    try {
        await DynamoDB.delete(params).promise();
        return todoId;
    }
    catch (err) {
        console.log("DB error:", err);
        return null;
    }
    
}

module.exports = myFunc;