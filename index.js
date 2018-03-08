// eslint no-param-reassign: ["error", { "props": false }]
// eslint no-underscore-dangle: ["error", { "allow": ["_id"] }]


'use strict';


const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const mongoose = require('mongoose');
const validator = require('validator');

const app = express();
mongoose.connect(process.env.MONGO_URL || "mongodb://fatimabk1:213@213-social-to-do-i4uhp.mongodb.net/test");

const Users = require('./models/users.js');
const Tasks = require('./models/tasks.js');


// var MongoClient = require('mongodb').MongoClient;
// var uri = "mongodb+srv://fatimabk1:213@213-social-to-do-i4uhp.mongodb.net/test";
// MongoClient.connect(uri, function(err, client) {
//    const collection = client.db("test").collection("devices");
//    // perform actions on the collection object
//    client.close();
// });


// Configure our app
const store = new MongoDBStore({
    uri: process.env.MONGO_URL,
    collection: 'sessions',
});
app.engine('handlebars', exphbs({
    defaultLayout: 'main',
}));
app.set('view engine', 'handlebars');

// For parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true,
}));

// Configure session middleware that will parse the cookies
// of an incoming request to see if there is a session for this cookie.
app.use(session({
    secret: process.env.SESSION_SECRET || 'super secret session',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: 'auto',
    },
    store,
}));

// Middleware that looks up the current user for this sesssion, if there
// is one.
app.use((req, res, next) => {
    if (req.session.userId) {
        Users.findById(req.session.userId, (err, user) => {
            if (!err) {
                res.locals.currentUser = user;
            }
            next();
        });
    } else {
        next();
    }
});

/**
 * Middleware that checks if a user is logged in.
 * If so, the request continues to be processed, otherwise a
 * 403 is returned.
 * @param  {Request} req - The request
 * @param  {Response} res - sdf
 * @param  {Function} next - sdfs
 * @returns {undefined}
 */
function isLoggedIn(req, res, next) {
    if (res.locals.currentUser) {
        next();
    } else {
        res.sendStatus(403);
    }
}

/**
 * Middleware that loads a users tasks if they are logged in.
 * @param  {Request} req - An express request object
 * @param  {Response} res - An express response object
 * @param  {Callback} next - Called when the function is done
 * @returns {undefined}
 */
function loadUserTasks(req, res, next) {
    // Removed
    next();
}

// Return the home page after loading tasks for users, or not.
app.get('/', loadUserTasks, (req, res) => {
      res.render('index');
});

// Handle submitted form for new users
app.post('/user/register', (req, res) => {
    if(req.name == null || req.email == null || req.password == null){
      Window.alert("Please fill in all fields to register.");
    } else if(req.password != req.passwordConfirmation){
      Window.alert("Passwords must match.");
    } else if(req.pasword.length < 0 || req.password.length > 50){
      Window.alert("Password must be between 1 and 50 characters.");
    } else if (    ){
      Window.alert("Invalid email entered.");
    } else {
      // Add user data to User schema
      // Return HTMl for logged-in view
      res.send('woot');
    }
    res.render('/');
});

app.post('/user/login', (req, res) => {


    res.send('woot');
});

// Log a user out
app.get('/user/logout', (req, res) => {
    res.send('woot');
});

//  All the controllers and routes below this require
//  the user to be logged in.
app.use(isLoggedIn);

// Handle submission of new task form
app.post('/tasks/:id/:action(complete|incomplete)', (req, res) => {
    res.send('woot');
});

app.post('/tasks/:id/delete', (req, res) => {
    res.send('woot');
});

// Handle submission of new task form
app.post('/task/create', (req, res) => {
    res.send('woot');
});

// Start the server
const port = process.env.PORT || 3500;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
