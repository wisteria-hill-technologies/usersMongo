# Basic Mongo Setup with Mocha Testing

### Install mongoose, nodemon and mocha
  npm install --save mongoose nodemon mocha   

### Virtual Type example
.virtual tells the schema we want virtual field
Use Case:
    If post is not a model itself but a subdocument for User, <br/>
    but we want to create a field called postCount in User. <br />
    In this case, we do not create the field in the mongoDB itself but do it in the server as a vritual type with mongoose.
```
UserSchema.virtual('postCount').get(function() { //use function keyword here. Don't use arrow function here, as 'this' will change.
  return this.posts.length;  // 'this' refer to User.
});
```

### Mongoose Middleware
Example In User schema
When(right before) a user is removed, remove blogPosts which belong to the user as well.
```
UserSchema.pre('remove', function(next){  // pre is a middleware. Every middleware requires 'next'.
  const BlogPost = mongoose.model('BlogPost'); // Load blogPost model here instead of the top of the page, in order to avoid cyclic load between blogPost and user models.
  // DO NOT iterate though each blogpost! like this.blogPosts.each(id => ... But, do it as below
  BlogPost.remove({ _id: { $in: this.blogPosts }})  //'this' here means an instance of User (e.g. joe). $in means that , if the id is in 'user.blogPosts', remove it. $in only takes an array.
    .then(()=>next());
});
```

