const assert = require('assert');
const User = require('../src/user');

describe('Updating records', ()=>{
  let joe;
  beforeEach((done)=>{
    joe = new User({ name: "Joe", likes: 0 });
    joe.save()
      .then(()=>done());
  });

  function assertName(operation, done) {
    operation
      .then(()=>User.find({}))  //find({}) means no criteria. find everything.
      .then((users)=>{
        assert(users.length === 1);
        assert(users[0].name === 'Alex');
        done();
      });
  }

  it('update a user model instance, using set and save', (done)=>{
    joe.set('name', 'Alex'); //use set when you want to update properties incrementally and save after words.
    assertName(joe.save(), done);

  });

  it('update a user model instance, using update', (done)=>{
    assertName(joe.update({ name: 'Alex' }), done); //update at one go.
  });

  it('A model class can update', (done)=>{
    assertName(
      User.update({ name: 'Joe'}, { name: 'Alex'}), //This will update all the records with the first argument ('Joe') and replace them with the second argument ('Alex').
      done
    );
  });

  it('A model class can update one record', (done)=>{
    assertName(
      User.findOneAndUpdate({ name: 'Joe' }, { name: 'Alex' }), //find the first record with name 'Joe' and update it with name 'Alex'.
      done
    );
  });

  it('A model class can find a record with and Id and update', (done)=>{
    assertName(
      User.findByIdAndUpdate(joe.id, { name: 'Alex' }),
      done
    );
  });

  //xit will not run the test.
  it('A user can have their postcount incremented by 1', (done)=>{
    //$inc will increment the specified property (e.g. postCount) with the specified number (e.g. 1, 2, -2 or whatever number).
    User.update({ name: 'Joe'}, { $inc: { likes: 1 } })
      .then(()=>User.findOne({ name: 'Joe'}))
      .then((user)=>{
        assert(user.likes === 1);
        done();
      });
  });

});
