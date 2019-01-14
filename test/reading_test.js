const assert = require('assert');
const User = require('../src/user');

describe('Reading users out of the databse', ()=>{
  let alex, joe, bob, tony; //make them available inside this whole describe block

  beforeEach((done)=>{
    alex = new User({ name: 'Alex'});
    joe = new User({ name: 'Joe'});
    bob = new User({ name: 'Bob'});
    tony = new User({ name: 'Tony'});

    Promise.all([alex.save(), joe.save(), bob.save(), tony.save()])
      .then(() => done());
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
  });
  it('can sort, skip, and limit the result set', (done) => {
    User.find({})
      .sort({ name: 1 }) // sort by, 1 is ascending, -1 descending.
      .skip(1) // skip 1 item first.
      .limit(2) // show only 2 items after the skipped item(s).
      .then(users => {
        assert(users.length === 2);
        assert(users[0].name === 'Bob');
        assert(users[1].name === 'Joe');
        done();
      })
      .catch(err => console.log(err));
  });
});
