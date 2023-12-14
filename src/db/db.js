const mongoose = require('mongoose');

mongoose.connect( 'mongodb+srv://admin123:admin@cluster0.strys4u.mongodb.net/KnitKraft?retryWrites=true&w=majority',{ useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to database!');
  })
  .catch((error) => {
    console.log('Connection failed!');
    console.log(error);
  });

module.exports = mongoose;
