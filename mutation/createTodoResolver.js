const AWS = require('aws-sdk')
const tabledata = require('../tabledata.js');
const DynamoDB = new AWS.DynamoDB.DocumentClient();

const myFunc = async (userId, todoData) => {
    let newId = tabledata.guid();
    let params = {
        TableName: tabledata.TableName,
        Item: {
            PK: `user::${userId}`,
            SK: `todo::${newId}`,
            data: todoData
        }
    }
    try {
        await DynamoDB.put(params).promise();
        return {
            id: newId,
            data: todoData
        }
    }
    catch (err) {
        console.log("DB error:", err);
        return null;
    }
    
}

module.exports = myFunc;