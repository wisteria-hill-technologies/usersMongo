const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PostSchema = require('./postSchema');

const UserSchema = new Schema({
  name: {
    type: String,
    validate: { // validation logic and message
      validator: (name) => name.length > 2,
      message: 'Name must be longer than 2 characters.'
    },
    required: [true, 'Name is required.']  // when this field is required
  },
  posts: [PostSchema],  //To add subdocuments, just do like this.
  likes: Number,
  blogPosts: [{
    type: Schema.Types.ObjectId,
    ref: 'BlogPost'
  }]
}, { usePushEach: true });

//Virtual Types
//.virtual tells the schema we want virtual field
// Use "function" keyword here. .get(function(){ }) Not, () => {} in this case, to make 'this' refer to User.
// Also, virtual types utilises getter function (.get as below) in javascript.
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get
UserSchema.virtual('postCount').get(function() {
  return this.posts.length;
});

UserSchema.pre('remove', function(next){  // pre is a middleware. Every middleware requires 'next'.
  const BlogPost = mongoose.model('BlogPost'); // Load blogPost model here instead of the top of the page, in order to avoid cyclic load between blogPost and user models.
  // DO NOT iterate though each blogpost! like this.blogPosts.each(id => ... But, do it as below
  BlogPost.remove({ _id: { $in: this.blogPosts }})  //'this' here means an instance of User (e.g. joe). $in means that , if the id is in 'user.blogPosts', remove it. $in only takes an array.
    .then(()=>next());
});

const User = mongoose.model('User', UserSchema); // User model

module.exports = User;
