'use strict'

const express = require('express');
const app = express(),
    cookieParser = require('cookie-parser');
const session = require('express-session');
const port = 3000 || process.env._PORT;
const routes = require('./routes/index');
const flash = require('connect-flash')
const path = require('path')
const bodyParser = require('body-parser')

// settings

app.set('port', port)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// middlewares
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use(express.static(path.join(__dirname, 'dashboard')))
app.use(cookieParser())
app.use(session({
    secret: 'Luna',
    saveUninitialized: false,
    resave: false
}))

app.use(flash())

app.use((req, res, next) => {
    app.locals.msg = req.flash('message');
    app.locals._id = req.session.id;
    next()
})

// routes

app.use(routes)

//initialization

app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`)
})

