const mongoose = require('mongoose');

mongoose.connect( 'mongodb+srv://krishna:krishna@krishna.ycyvltx.mongodb.net/app',{ useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to database!');
  })
  .catch((error) => {
    console.log('Connection failed!');
    console.log(error);
  });

module.exports = mongoose;
