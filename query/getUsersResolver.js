const AWS = require('aws-sdk')
const tabledata = require('../tabledata.js');
const DynamoDB = new AWS.DynamoDB.DocumentClient();

const myFunc = async () => {
    var params = {
        TableName: tabledata.TableName
    }
    try {
        const res = await DynamoDB.scan(params).promise()
        console.log("MY RESULT ------------",res);
        let dataOf = {};
        let users = [];
        res.Items.map((userdata) => {
            if(userdata.SK === 'profile'){
                dataOf[userdata.PK] = {
                    id: userdata.PK.split("::")[1],
                    name: userdata.data,
                    todo: []
                }
            }
            if(userdata.SK.split("::")[0] === 'todo'){
                dataOf[userdata.PK].todo.push({
                    id: userdata.SK.split('::')[1],
                    data: userdata.data
                })
            }
        })
        for(let [key, value] of Object.entries(dataOf)){
            users.push(value);
        }
        return users;
    }
    catch (err) {
        console.log("DB error:", err);
        return null;
    }
    
}

module.exports = myFunc;

// module.exports = async () => {
    
//     return [{
//             id: "00",
//             data: "test todo"
//         },
//         {
//             id: "01",
//             data: "test todo"
//         }];
// }