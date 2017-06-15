const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PostSchema = require('./postSchema');

const UserSchema = new Schema({
  name: {
    type: String,
    validate: {
      validator: (name) => name.length > 2,
      message: 'Name must be longer than 2 characters.'
    },
    required: [true, 'Name is required.']
  },
  posts: [PostSchema],  //To add subdocuments, just do like this.
  likes: Number,
  blogPosts: [{
    type: Schema.Types.ObjectId,
    ref: 'BlogPost'
  }]
});

//Virtual Types
//.virtual tells the schema we want virtual field
//Use function here. .get(function(){ }) Not, () => {} in this case, to make 'this' refer to User.
UserSchema.virtual('postCount').get(function() {
  return this.posts.length;
});

UserSchema.pre('remove', function(next){  // pre is a middleware. Every middleware requires 'next'.
  const BlogPost = mongoose.model('BlogPost'); //Load blogPost model here instead of the top of the page, in order to avoid cyclic load between blogPost and user models.
  BlogPost.remove({ _id: { $in: this.blogPosts }})  //'this' here means an instance of User (e.g. joe). $in means that , if the id is in 'user.blogPosts', remove it.
    .then(()=>next());

});

const User = mongoose.model('User', UserSchema);

module.exports = User;
