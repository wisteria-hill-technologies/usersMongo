const assert = require('assert');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');
const Comment = require('../src/comment');

describe('Associations', ()=>{
  let joe, blogPost, comment; // lower-case to indicate instances.

  beforeEach((done)=>{
    joe = new User({ name:'Joe' });
    blogPost = new BlogPost({ title: 'Mongo Is Great!', content: 'This is the content about Mongo.'});
    comment = new Comment({ content: 'Congrats on your great post!'});

    joe.blogPosts.push(blogPost); // push the entire blogPost object, but mongoose will only create association using the object Id.
    blogPost.comments.push(comment);
    comment.user = joe; // assign the entire user object, but mongoose will only create association using the object Id.

    Promise.all([joe.save(), blogPost.save(), comment.save()]) // With Promise.all, callback is called with 'then' only after all the functions are completed.
      .then(()=> done());
  });

  it.only('saves a relation between a user and a blogpost', (done)=>{ //if you put it.only(..)  Only this test will be run.
    User.findOne({ name: 'Joe'})
      .then((user)=>{
        console.log(user);
        done();
      });
  });
});
