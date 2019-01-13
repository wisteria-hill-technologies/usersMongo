const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

before((done)=>{  //before will run the code inside only once.
  mongoose.connect('mongodb://localhost/users_test', { useMongoClient: true });
  mongoose.connection
    .once('open', ()=> {
      //Once the connection is open, it will run the function.
      done(); //call this only when mongoose connects to mongoDB successfully.
    })
    .on('error', (error)=>{  //on is run when mongo emits an error.
      console.warn('Warning', error);
    });
});

beforeEach((done)=>{ //beforeEach runs code inside before each test. Make sure to pass 'done' so that the next test will not be executed before the process in this beforeEach is finished.
  // clear users in database with drop()
  const { users, comments, blogposts } = mongoose.connection.collections; // Important!! mongoose lower-case and pluralise all the collections. So, use lower-case and pluralise all the collections you are calling here.
  users.drop(()=>{
    comments.drop(()=>{
      blogposts.drop(()=>{
        // Ready to run the next test!
        done(); //use done here so that the next test will be executed only after users, comments, and blogPosts in the database are deleted.
      });
    });
  });
});
