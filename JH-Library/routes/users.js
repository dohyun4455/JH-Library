const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');

// Register
router.post('/register', (req, res, next) => {
  let newUser = new User ({
    name: req.body.name,
    email: req.body.email,
    address: req.body.address,
    username: req.body.username,
    password: req.body.password,
    image: req.body.image,
    phonenumber: req.body.phonenumber
  });

  User.addUser(newUser, (err, user) => {
    if(err) {
      res.json({success: false, msg: 'Failed to register user'});
    } else {
      res.json({success: true, msg: 'User registered'});
    }
  });
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if(err) throw err;
    if(!user) {
      return res.json({success: false, msg: 'User not found'});
    }
    User.comparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch) {
        const token = jwt.sign({data: user}, config.secret, {
          expiresIn: 604800 // 1 week
        });
        res.json({
          success: true,
          token: 'JWT '+token,
          user: {
            id: user._id,
            name: user.name,
            address: user.address,
            username: user.username,
            email: user.email
          }
        })
      } else {
        return res.json({success: false, msg: 'Wrong password'});
      }
    });
  });
});

// Profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  res.json({user: req.user});
});

router.post('/adjustment', (req, res, next) => {
  let newUser = new User ({
    _id: req.body._id,
    name: req.body.name,
    email: req.body.email,
    address: req.body.address,
    phonenumber: req.body.phonenumber
  });

  User.adjustUser(newUser, (err, user) => {
    if(err) {
      res.json({success: false, msg: 'Failed to adjustment user'});
    } else {
      res.json({success: true, msg: 'User Adjustment Success'});
    }
  });
});

router.get('/adminuser', function(req,res) {
    User.find(function(err, users){
        if(err) return res.status(500).send({error: 'database failure'});
        res.json(users);
      });
});

router.post('/userremove',  function(req, res){
    User.remove({ _id: req.body._id }, function(err, output){
        if(err) return res.status(500).json({success: false, error: "database failure" });
        res.json({success: true});
    })
});


module.exports = router;
