const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// User Schema
const UserSchema = mongoose.Schema ({
  name: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  phonenumber: {
    type: String,
    required: true
  }
});

const User = module.exports = mongoose.model('Users', UserSchema);

module.exports.getUserById = function(id, callback) {
  User.findById(id, callback);
}

module.exports.getUserFindAll = function() {
  console.log(User.find({}));
}

module.exports.getUserByUsername = function(username, callback) {
  const query = {username: username}
  User.findOne(query, callback);
}

module.exports.addUser = function(newUser, callback) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if(err) throw err;
      if (newUser.image == "null") newUser.image = "https://support.plymouth.edu/kb_images/Yammer/default.jpeg";
      newUser.password = hash;
      newUser.save(callback);
    });
  });
}

module.exports.comparePassword = function(candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if(err) throw err;
    callback(null, isMatch);
  });
}

module.exports.adjustUser = function(adUser, callback) {
  console.log(adUser);
  User.findByIdAndUpdate(adUser._id, adUser, callback)
}

module.exports.rmUser = function(user, callback) {
  console.log(user);
  User.findByIdAndRemove(user, callback)
}
