const assert = require('assert');
const User = require('../src/user');

describe('Validating records', ()=>{
  it('requires a username', ()=>{
    const user = new User({name: undefined });
    const validationResult = user.validateSync(); //validate vs validateSync.  validateSync is synchronous validation, so that we can place the validation result in the 'validationResult' const, without passing callback function with the result.
    // validate example: user.validate((validationResult)=>{ do something here with the result.  });
    const { message } = validationResult.errors.name;
    assert(message === "Name is required.");
  });

  it('requires a username longer than 2 characters', ()=>{
    const user = new User({ name: 'Al' });
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;
    assert(message === "Name must be longer than 2 characters.");
  });
});
