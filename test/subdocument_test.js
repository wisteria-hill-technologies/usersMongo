const assert = require('assert');
const User = require('../src/user');

describe('Subdocuments', ()=> {
  it('can create a subdocument', (done) => {
    const joe = new User({ name: 'Joe', posts: [{ title: 'MyPostTitle' }] });
    joe.save()
      .then(()=>User.findOne({ name: 'Joe'}))
      .then((user)=>{
        assert(user.posts[0].title==="MyPostTitle");
        done();
      });
  });

  it('Can add subdocuments to an existing record', (done)=>{
    const joe = new User({
      name: 'Joe',
      posts: []
    });
    joe.save()
      .then(()=>User.findOne({ name: 'Joe' })) // .then(()=>User.findOne({ name: 'Joe' })) is the same as .then(()=>{ return User.findOne({ name: 'Joe' }) }).
      .then((user)=>{
        user.posts.push({ title: 'MyPostTitle'});
        return user.save();  //make sure to return here, so that we can chain another promise.
      })
      .then(()=>User.findOne({ name: 'Joe'}))
      .then((user)=>{
        assert(user.posts[0].title==="MyPostTitle");
        done();
      });
  });

  it('can remove an exisiting subdocument', (done)=>{
    const joe = new User({ name: 'Joe', posts:[ {title: 'New Title'}] });
    joe.save()
      .then(()=>User.findOne({ name: 'Joe' }))
      .then((user)=>{
        user.posts[0].remove(); //Important!! When you remove subdocument, you will still need to save afterwords, unlike model class/model instance.remove().
        return user.save();
      })
      .then(()=>User.findOne({ name: 'Joe'}))
      .then((user)=>{
        assert(user.posts.length===0);
        done();
      });
  });
});
