const assert = require('assert');
const User = require('../src/user');

describe('Deleting a user', ()=>{
  let joe;

  beforeEach((done)=>{
    joe = new User({ name: "Joe" });
    joe.save()
      .then(() => done());
  });

  // Many ways to delete a record in mongoDB
  it('model instance: remove', (done)=>{
    joe.remove()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user === null);
        done();
      });
  });

  it('class method: remove', (done)=>{
    // Remove a bunch of records with some given criteria
    User.remove({ name: "Joe" })
      .then(()=>User.findOne({ name: "Joe" }))
      .then((user)=>{
        assert(user===null);
        done();
      });
  });

  it('class method: findOneAndRemove', (done)=>{
    User.findOneAndRemove({ name: 'Joe' })  //find and delete one particluar user object.
      .then(()=>User.findOne({ name: "Joe" }))
      .then((user)=>{
        assert(user===null);
        done();
      });
  });

  it('class method: findByIdAndRemove', (done)=>{
    User.findByIdAndRemove(joe._id) //you can just pass on id instead of an id object.
      .then(()=>User.findOne({ name: "Joe" }))
      .then((user)=>{
        assert(user===null);
        done();
      })
  });

});
