const express = require('express'); 
const router = express.Router(); 
const mongoose = require('mongoose'); 
const User = mongoose.model('User');
const crypto = require('crypto'); 
const bcrypt = require('bcryptjs'); 
const jwt = require("jsonwebtoken"); 
// const { JWT_SECRET } = require('../config/keys'); 
const JWT_SECRET = process.env.JWT_SECRET
const requiredLogin = require('../middleware/requireLogin'); 
const nodemailer = require('nodemailer'); 
const sendgridTransport = require('nodemailer-sendgrid-transport'); 

router.post('/signup', (req, res) => {
    const { firstName, lastName, password, email, jobTitle, image } = req.body 
    if(!email || !password || !firstName || !lastName || !jobTitle ) {
       return res.status(422).json({ error: 'Please add all the fields' })
    }

    User.findOne({ email: email })
        .then((savedUser) => {
            if(savedUser) {
                return res.status(422).json({ error: 'User already exists with that email address!' })
            }

            bcrypt.hash(password, 12)
                .then( hashedPassword => {

                    const user = new User ({
                        firstName, 
                        lastName, 
                        jobTitle, 
                        email, 
                        password: hashedPassword, 
                        image
                    })
        
                    user.save()
                        .then(user => {
                            res.json({ message: 'Saved Successfully' })
                        })
                        .catch(err => {
                            console.log(err)
                        })
                })
            
        })
        .catch(err => {
            console.log(err)
        })
})

router.post('/signin', (req, res) => {

    const { email, password } = req.body

    if(!email || !password) {
       return res.status(422).json({ error: 'Please provide email and password' })
    }

    User.findOne({ email: email })
        .then( savedUser => {

            if(!savedUser) {
               return res.status(422).json({ error: 'Invalid email or password' })
            }

            bcrypt.compare(password, savedUser.password)
                .then(doMatch => {

                    if(doMatch) {
                        // res.json({ message: 'Successfully signed in' })
                        const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET)
                        const { _id, firstName, lastName, jobTitle, email, followers, following, image } = savedUser; 
                        res.json({ token, user: {_id, firstName, lastName, jobTitle, email, followers, following, image} })
                    } else {
                        return res.status(422).json({ error: 'Invalid password' })
                    }
                    
                }) 
                .catch(err => {
                    console.log(err)
                })
        })
})


module.exports = router 
