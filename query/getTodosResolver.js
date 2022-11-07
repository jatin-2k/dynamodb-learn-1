const AWS = require('aws-sdk')
const tabledata = require('../tabledata.js');
const DynamoDB = new AWS.DynamoDB.DocumentClient();

const myFunc = async (userId) => {
    //console.log("USER ID ----------", userId);
    const params = {
        TableName: tabledata.TableName,
        ExpressionAttributeValues: {
            ':pk': `user::${userId}`,
            ':sk': "todo"
        },
        KeyConditionExpression: 'PK = :pk and begins_with(SK, :sk)'
    }
    try {
        const Items = await DynamoDB.query(params).promise()
        //console.log("My Items -------------",Items);
        let todos = []
        Items.Items.map((item) => {
            if(item.SK != 'profile')
            todos.push({
                id: item.SK.split("::")[1],
                data: item.data
            })
        })
        return todos;
    }
    catch (err) {
        console.log("DB error:", err);
        return null;
    }
    
}

module.exports = myFunc;
// async () => {
    
//     return [{
//             id: "00",
//             data: "test todo"
//         },
//         {
//             id: "01",
//             data: "test todo"
//         }];
// }