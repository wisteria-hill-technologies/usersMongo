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

const User = mongoose.model('User', UserSchema);

module.exports = User;
