const passport = require('passport');
const atob = require('atob');

const mongoose = require('mongoose');
const keys = require('../config/keys');
//const atob = require('btoa');
const Axios = require('axios');

require('../models/User')

const User = mongoose.model('User');

let fakeUser = {
  _id: "5e2318cb3eafac4d46214490", 
  googleId: "102470277569645688672", 
  displayName: "Steven Becker12", 
  __v: 0}

  
  function route(req,res){
    req.session = req.session || {}  
    req.session.user_tmp = fakeUser
    res.redirect('http://localhost:3000/blogs')
  } 

module.exports = app => {

  
    //app.use(middleware);
   
  
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile']
    })
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('http://localhost:3000/blogs');
    }
  );

  app.get('/auth/logout', (req, res) => {
    req.logout();
    res.redirect('http://localhost:3000/');
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};
