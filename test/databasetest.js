process.env.NODE_ENV = 'test';

/* Require the dev-dependencies */
let assert = require('assert');
let mongoClient = require('mongodb').MongoClient;
let url = 'mongodb://localhost:27017';
let dbName = 'myProject';


/* Checking server is runing or not */

/* Test Route /GET  */

mongoClient.connect(url,function(err,client){
    assert.equal(null,err)
    console.log("Connection successfully to server");
})
