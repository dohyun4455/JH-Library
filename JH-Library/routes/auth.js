const express = require('express');
const passport = require('passport');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config/database');

let userdat = {};

  router.get('/kakao', passport.authenticate('kakao-login'));
  router.get('/kakao/callback', passport.authenticate('kakao-login', {
      failureRedirect : '/login',
      failureFlash : true // allow flash messages
    }), (req, res, next) => {

      const token = jwt.sign({data: req.user}, config.secret, {expiresIn: 604800}); // 1 week

      userdat = {
        token: 'JWT '+token,
        user: {
          id: req.user._id,
          name: req.user.name,
          address: req.user.address,
          username: req.user.username,
          email: req.user.email,
          image: req.user.image,
          phonenumber: req.user.phonenumber
        }
      };

      res.redirect('/conf');
      console.log('Login Success');
    }
  );

  router.get('/conf', (req, res) => {
    res.json(userdat);
    console.log(userdat);
  });

  // Setting the naver oauth routes
  router.get('/naver', passport.authenticate('naver-login'));

  // creates an account if no account of the new user
  router.get('/naver/callback', passport.authenticate('naver-login', {
          failureRedirect: '/login'
      }), (req, res, next) => {

        const token = jwt.sign({data: req.user}, config.secret, {expiresIn: 604800}); // 1 week

        userdat = {
          token: 'JWT '+token,
          user: {
            id: req.user._id,
            name: req.user.name,
            address: req.user.address,
            username: req.user.username,
            email: req.user.email,
            image: req.user.image,
            phonenumber: req.user.phonenumber
          }
        };

        res.redirect('/conf');
        console.log('Login Success');
      }
    );



module.exports = router;
