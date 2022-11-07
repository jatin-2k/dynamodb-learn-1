const AWS = require('aws-sdk')
const tabledata = require('../tabledata.js');
const DynamoDB = new AWS.DynamoDB.DocumentClient();

const myFunc = async (userId, todoId) => {
    const params = {
        TableName: tabledata.TableName,
        ExpressionAttributeValues: {
            ':pk': `user::${userId}`,
            ':sk': `todo::${todoId}`
        },
        KeyConditionExpression: 'PK = :pk and SK = :sk'
    }
    try {
        const Items = await DynamoDB.query(params).promise()
        //console.log("My Items -------------",Items);
        let todo;
        Items.Items.map((item) => {
            if(item.SK != 'profile')
            todo ={
                id: item.SK.split("::")[1],
                data: item.data
            }
        })
        return todo;
    }
    catch (err) {
        console.log("DB error:", err);
        return null;
    }
    
}

module.exports = myFunc;