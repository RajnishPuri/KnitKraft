const mongoose = require('mongoose');

// Create a schema for the user
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
      },
      password: {
        type: String,
        required: true
      },
      passwordAgain: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      mobileNumber: {
        type: String,
        required: true
      },
      dateOfBirth: {
        type: String,
        required: true
      },
      role: {
        type: String,
        enum: ['farmer', 'seller', 'warehouse', 'teacher'],
        required: true
      }
     
    });
    

    

// Create a model using the schema
const Userregister = mongoose.model('Userregister', userSchema);

module.exports = Userregister;
