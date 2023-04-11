const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');

describe('Middleware', ()=>{
  let joe, blogPost;

  beforeEach((done)=>{
    joe = new User({ name:'Joe' });
    blogPost = new BlogPost({ title: 'Mongo Is Great!', content: 'This is the content about Mongo.'});

    joe.blogPosts.push(blogPost); // push the entire blogPost object, but mongoose will only create association using the object Id.

    Promise.all([joe.save(), blogPost.save()]) // With Promise.all, callback is called with 'then' only after all the functions are completed.
      .then(()=> done());
  });

  it('users clean up dangling blogposts on deleteOne', (done)=> {
    joe.deleteOne()
      .then(()=> BlogPost.countDocuments())
      .then((count)=> {
        assert(count === 0);
        done();
      })
        .catch(err => {
          console.log('error: ', err);
        });
  });
});
