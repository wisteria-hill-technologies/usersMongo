const assert = require('assert');
const User = require('../src/user');

describe('Reading users out of the databse', ()=>{
  let joe; //make joe available inside this whole describe block

  beforeEach((done)=>{
    joe = new User({ name: 'Joe'});
    joe.save()
      .then(()=>done());
  });

  it('finds all users with a name of joe', (done)=>{
    //.find: find all the users that match the given criteria. It returns an array. 
    // .find({}) will return everything in the class as there is no criteria.
    //On the other hand, findOne will find a single record (first one) that matches the criteria.
    User.find({ name: "Joe" })
      .then((users)=>{
        //IMPORTANT: _id is an object id, so you will need to convert it to string.
        assert(users[0]._id.toString() === joe._id.toString());
        done();
      });
  });

  it('find a user with a particular id', (done)=> {
    User.findOne({ _id: joe._id })
      .then((user)=>{
        assert(user.name === "Joe");
        done();
      });
  })
});
