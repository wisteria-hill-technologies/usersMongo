const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

before((done)=>{  //before will run the code inside only once.
  mongoose.connect('mongodb://localhost/users_test');
  mongoose.connection
    .once('open', ()=> {
      //Once the connection is open, it will run the function.
      done(); //call this only when mongoose connects to mongoDB successfully.
    })
    .on('error', (error)=>{  //on is run when mongo emits an error.
      console.warn('Warning', error);
    });
});

beforeEach((done)=>{ //beforeEach runs code insdie before each test.
  // clear users in database with drop()
  mongoose.connection.collections.users.drop(()=>{
    // Ready to run the next test!
    done(); //use done here so that the next test will be executed only after the users in the database are deleted.
  });
});
