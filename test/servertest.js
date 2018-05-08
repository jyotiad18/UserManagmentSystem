process.env.NODE_ENV = 'test';

/* Require the dev-dependencies */
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let server = require('../server.js');

chai.use(chaiHttp);

/* Checking server is runing or not */

/* Test Route /GET  */

describe('/GET',()=>{
    it('it should cannot GET',(done)=>{
        chai.request(server)
            .get('/')
            .end((err,res)=>{
                res.should.have.status(404);
                
                done();

            })
        
    })
});
