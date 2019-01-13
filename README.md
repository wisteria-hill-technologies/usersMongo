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
