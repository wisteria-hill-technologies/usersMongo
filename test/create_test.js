const assert = require('assert');
const User = require('../src/user');

describe('Creating records', ()=>{
  it('saves a user', (done)=>{ //add done so that other codes outside it will not be executed until 'it' is done.
    const joe = new User({
      name: "Joe"
    });
    joe.save()
      .then(()=>{

        // Has joe been saved successfully?
        // Check if Joe is saved below with assert.
        assert(!joe.isNew); //.isNew means the data exists but not saved in the database yet. !joe.isNew means joe is saved.
        done();  //sinal with 'done()'' that this 'it' funciton is complete, and that we can move on to next test.
      });

  });
});
