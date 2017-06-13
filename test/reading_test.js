const assert = require('assert');
const User = require('../src/user');

describe('Reading users out of the databse', ()=>{
  let joe;

  beforeEach((done)=>{
    joe = new User({ name: 'Joe'});
    joe.save()
      .then(()=>done());
  });

  it('finds all users with a name of joe', (done)=>{
    //.find: find all the users that match the given criteria. It returns an array. On the other hand, findOne will find a single record that matches the criteria.
    User.find({ name: "Joe" })
      .then((users)=>{
        //_id is an object id, so you will need to convert it to string.
        assert(users[0]._id.toString() === joe._id.toString());
        done();
      });

  });
});
