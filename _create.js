const AWS = require('aws-sdk');
const table = require('./tabledata');
require('dotenv').config({});


const DynamoDB = new AWS.DynamoDB.DocumentClient({
    region: "ap-south-1",
    credentials: {
        accessKeyId: process.env.KEY,
        secretAccessKey: process.env.SECRET,
        sessionToken: process.env.SESSION
    }
})

let params = {
    TableName: table.TableName,
    Item: {
        PK: "student::1",
        SK: "hasCourse::id2",
        GSI: "course::cse101"
    }
}

DynamoDB.put(params).promise()
    .then((data) => {
        console.log("----------request SUCCESS-----------");
        console.log(data);
    })
    .catch((err) => {
        console.log("----------request FAILED-----------");
        console.log(err);
    });