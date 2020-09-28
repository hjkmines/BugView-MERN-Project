const express = require('express'); 
const router = express.Router(); 
const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin'); 
const Post = mongoose.model('Post'); 
const User = mongoose.model('User'); 

router.get('/user/:id', requireLogin,(req, res) => {
    User.findOne({ _id: req.params.id })
        .select('-password')
        .then(user => {
            Post.find({ postedBy: req.params.id })
            .populate('postedBy', '_id firstName lastName')
            .exec((err, posts) => {
                if (err) {
                    return res.status(422).json({ error: err })
                }
                res.json({ user, posts })
            })
        }).catch(err => {
            return res.status(404).json({ error: 'User not found' })
        })
})

router.put('/follow', requireLogin, (req, res) => {
    User.findByIdAndUpdate(req.body.followId, {
        $push: {followers: req.user._id}
    }, { 
        new: true 
    }, (err, result) => {
        if (err) {
            return res.status(422).json({ error: err })
        }

        User.findByIdAndUpdate(req.user.id, {
            $push: {following: req.body.followId}
        }, {new: true}).select('-password').then(result => {
            res.json(result)
        }).catch(err => {
            return res.status(422).json({error: err})
        })
    }
    )
    
})

router.put('/unfollow', requireLogin, (req, res) => {
    User.findByIdAndUpdate(req.body.followId, {
        $pull: {followers: req.user._id}
    }, { 
        new: true 
    }, (err, result) => {
        if (err) {
            return res.status(422).json({ error: err })
        }

        User.findByIdAndUpdate(req.user.id, {
            $pull: {following: req.body.followId}
        }, {new: true}).select('-password').then(result => {
            res.json(result)
        }).catch(err => {
            return res.status(422).json({error: err})
        })
    }
    )
    
})

router.put('/updateimage', requireLogin, (req, res) => {
    User.findByIdAndUpdate(req.user._id, {$set: {image: req.body.image}}, {new: true}, 
        (err, result) => {
            if (err) {
                return res.status(422).json({error: 'Can not upload new image'})
            }
            res.json(result)
    })
})

router.post('/search', (req, res) => {
    let userPattern = new RegExp('^' + req.body.query)
    User.find({ email: {$regex: userPattern} })
        .select('_id email')
        .then( user => {
            res.json({user})
        }).catch(err => {
            console.log(err)
        })
})

module.exports = router; 