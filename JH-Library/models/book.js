const mongoose = require('mongoose');
const config = require('../config/database');

// User Schema
const BookSchema = mongoose.Schema ({
  title: {
    type: String
  },
  author: {
    type: String,
    required: true
  },
  isbn: {
    type: String,
    required: true
  },
  borrow: {
    type: String,
    required: true
  },
  when: {
    type: String,
    required: true
  },
  when2: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  }
});

const Book = module.exports = mongoose.model('Books', BookSchema);

module.exports.getUserById = function(id, callback) {
  Book.findById(id, callback);
}

module.exports.addUser = function(newUser, callback) {
  newUser.save(callback);
}

module.exports.borrow = function(book, callback) {
  console.log(book);
  Book.findByIdAndUpdate(book._id, book, callback)
}

module.exports.returnbook = function(book, callback) {
  console.log(book);
  Book.findByIdAndUpdate(book._id, book, callback)
}
