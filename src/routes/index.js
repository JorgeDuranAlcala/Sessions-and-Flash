const express = require('express');
const router = express.Router()

router.get('/', (req, res) => {
    res.render('index')
})

router.post('/register', (req, res) => {
    req.flash('message', `You're already registered`)
    req.flash('user', req.body)
    res.redirect('profile')
})

router.get('/profile', (req, res) => {
    res.render('profile')
})

module.exports = router