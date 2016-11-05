// modules =================================================
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');

// configuration ===========================================

// config files
const db = require('./config/db')

// set our port
const port = process.env.PORT || 8080

// connect to mongoDB database 
// (uncomment after you enter in your own credentials in config/db.js)
mongoose.connect(db.url);

require('./config/passport')(passport); // pass passport for configuration

// get all data/stuff of the body (POST) parameters
// parse application/json 
app.use(bodyParser.json())

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'))

// passport config
app.use(session({
    secret: 'sabioisthebest', // session secret
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash())

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public'))

// routes ==================================================
app.use('/', require('./app/routes'))// configure our routes


// start app ===============================================
app.listen(port, () => {
    console.log(`Magic happens on port: ${port}`)
})

// expose app           
exports = module.exports = app
