const AWS = require('aws-sdk')
const tabledata = require('../tabledata.js');
const DynamoDB = new AWS.DynamoDB.DocumentClient();

const myFunc = async (userId, todoId, newdata) => {
    let params = {
        TableName: tabledata.TableName,
        Item: {
            PK: `user::${userId}`,
            SK: `todo::${todoId}`,
            data: newdata
        }
    }
    try {
        await DynamoDB.put(params).promise();
        return {
            id: todoId,
            data: newdata
        }
    }
    catch (err) {
        console.log("DB error:", err);
        return null;
    }
    
}

module.exports = myFunc;