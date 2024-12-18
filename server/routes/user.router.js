const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');




const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);
  const Roles = req.body.Roles || "0"; // Defaulting to 0 if no role is provided 

  const queryText = `INSERT INTO "user" (username, password, "Roles")
    VALUES ($1, $2, $3) RETURNING id`;
  pool
    .query(queryText, [username, password, Roles])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  const user = req.user; // this will contain the user info, including the role 
  if(user){
    res.send(
      {
        id: req.user.id, 
        username: req.user.username,
        Roles: req.user.Roles, // include the role in the response 



    });
    console.log("roles", req.user.Roles);
  }else {
    res.sendStatus(401); // authorized user 
   
  }
});

// clear all server session information about this user
router.post('/logout', (req, res, next) => {
  // Use passport's built-in method to log out the user
  req.logout((err) => {
    if (err) { return next(err); }
    res.sendStatus(200);
  });
});

module.exports = router;
