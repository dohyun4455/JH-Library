const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const config = require('../config/database');
const KakaoStrategy = require('passport-kakao').Strategy;
const NaverStrategy = require('passport-naver').Strategy;

module.exports = function(passport) {
  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
  opts.secretOrKey = config.secret;
  passport.use('jwt', new JwtStrategy(opts, (jwt_payload, done) => {
    User.getUserById(jwt_payload.data._id, (err, user) => {
      if(err) {
        return done(err, false);
      }

      if(user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  }));


  passport.use('kakao-login', new KakaoStrategy({
    clientID: 'dc780e41dc1a2f6693ed85c5cbaaf803',
    clientSecret: 'JqeyPWbjgW90Qjdo6WsXBh7puEXVL3Tj',
    //callbackURL: 'http://localhost:8080/auth/kakao/callback'
    callbackURL: 'http://46.101.84.253:8080/auth/kakao/callback'
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(profile);
    const NewUserId = "kakao:" + profile.id;
    const NewUserPassword = NewUserId;
    if (profile._json.kaccount_email == null) addr = "null";
    else addr = profile._json.kaccount_email;


    User.getUserByUsername(NewUserId, (err, user) => {
      if(err) throw err;
      if(!user) {
        let newUser = new User ({
          name: profile.username,
          email: addr,
          address: profile.username,
          username: NewUserId,
          password: NewUserPassword,
          image: profile._json.properties.profile_image,
          phonenumber: "01012345678"
        });

        User.addUser(newUser, (err, user) => {
          if(err) {
            console.log("Failed to register user");
          } else {
            console.log("User registered");
          }
        });
        console.log("계정이 존재하지않아 회원가입");
        return done(null, user);
      }else {
        //이미 유저가 존재한다면 바로 로그인시켜줌.
        console.log("계정이 존재하므로 로그인");
        return done(null, user);
      }

  })}));

  passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use('naver-login',new NaverStrategy({
        clientID: '6ZPGKB7q1tGDhUfhCu35',
        clientSecret: 'iUE_7YPRn3',
        callbackURL: 'http://46.101.84.253:8080/auth/naver/callback'
	},
    function(accessToken, refreshToken, profile, done) {
      console.log(profile);
      const NewUserId = "naver:" + profile.id;
      const NewUserPassword = NewUserId;
      if (profile._json.email == null) addr = "null";
      else addr = profile._json.email;


      User.getUserByUsername(NewUserId, (err, user) => {
        if(err) throw err;
        if(!user) {
          let newUser = new User ({
            name: profile.displayName,
            email: addr,
            address: profile.displayName,
            username: NewUserId,
            password: NewUserPassword,
            image: profile._json.profile_image,
            phonenumber: "01012345678"
          });

          User.addUser(newUser, (err, user) => {
            if(err) {
              console.log("Failed to register user");
            } else {
              console.log("User registered");
            }
          });
          console.log("계정이 존재하지않아 회원가입");
          return done(null, user);
        }else {
          //이미 유저가 존재한다면 바로 로그인시켜줌.
          console.log("계정이 존재하므로 로그인");
          return done(null, user);
        }
    })}));
}
