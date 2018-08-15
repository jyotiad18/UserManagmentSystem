process.env.NODE_ENV = 'test';

/* Require the dev-dependencies */
let chai = require('chai');
let should = chai.should();

let usertypes = require('../src/model/usertype');
let validations = require('../src/utils/validation'); 

/* check validation of usertype  */

describe('Check Validation File',()=>{
    it('It should return true',(done)=>{
        
        // Arrange
        var value = {
             typename : ''
        }

        //act 
        let result = false;
        validations.CheckValidation(value,usertypes.schema,(resp)=> {
            result = resp;
        });
       //assert
          result.should.have.true;
          result.should.not.be.false;
        done();
        
    });
});

/* Negative check */

describe('Check Validation File',()=>{
    it('It should return false',(done)=>{
        
        // Arrange
        var value = {
             typename : ''
        }

        //act 
        let result = null;
        validations.CheckValidation(value,usertypes.schema,(resp)=> {
            result = resp;
            //console.log(result);
        });
       //assert
          result.should.have.false;
         
        done();
        
    });
});
