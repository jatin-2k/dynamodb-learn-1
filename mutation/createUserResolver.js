const AWS = require('aws-sdk')
const tabledata = require('../tabledata.js');
const DynamoDB = new AWS.DynamoDB.DocumentClient();

const myFunc = async (userName) => {
    let newId = tabledata.guid();
    let params = {
        TableName: tabledata.TableName,
        Item: {
            PK: `user::${newId}`,
            SK: "profile",
            data: userName
        }
    }
    try {
        await DynamoDB.put(params).promise();
        return {
            id: newId,
            name: userName,
            todo: []
        }
    }
    catch (err) {
        console.log("DB error:", err);
        return null;
    }
    
}

module.exports = myFunc;