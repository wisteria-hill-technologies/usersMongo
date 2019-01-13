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

  it('loads a relation between a user and a blogpost', (done)=>{ //if you put it.only(..)  Only this test will be run.
    User.findOne({ name: 'Joe'})
      .populate('blogPosts') //user will only have an id of blogPost, so the modifier(.populate) will populate it with actual blogPost object.
      .then((user)=>{
        assert(user.blogPosts[0].title === 'Mongo Is Great!');
        done();
      });
  });

  it('loads a full relation graph', (done)=>{
    User.findOne({ name: 'Joe' })
      .populate({
        path: 'blogPosts',
        populate: {
          path: 'comments',
          model: 'Comment',
          populate: {
            path: 'user',
            model: 'User'
          }
        }
      })
      .then((user)=>{
        // console.log(user.blogPosts[0].comments[0].user);
        assert(user.name==='Joe');
        assert(user.blogPosts[0].title === 'Mongo Is Great!');
        assert(user.blogPosts[0].comments[0].content==='Congrats on your great post!');
        assert(user.blogPosts[0].comments[0].user.name==='Joe');
        done();
      });
  });
});
