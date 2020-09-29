const express = require('express'); 
const router = express.Router(); 
const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin'); 
const Post = mongoose.model('Post'); 

router.get('/allpost', requireLogin, (req, res) => {
    Post.find()
        .populate('postedBy', "_id firstName lastName")
        .populate('comments.postedBy', '_id firstName lastName')
        .sort('-createdAt')
        .then(posts => {
            res.json({ posts })
        })
        .catch(err => {
            console.log(err)
        })
})

router.get('/getsubpost', requireLogin, (req, res) => {
    Post.find({postedBy: {$in: req.user.following}})
        .populate('postedBy', "_id firstName lastName")
        .populate('comments.postedBy', '_id firstName lastName')
        .sort('-createdAt')
        .then(posts => {
            res.json({ posts })
        })
        .catch(err => {
            console.log(err)
        })
})

router.post('/createpost', requireLogin, (req, res) => {
    const { title, body, due, github, teamMembers, severity, status, language, framework } = req.body 

    if(!title || !body || !due || !github || !teamMembers || !severity || !status || !language || !framework){
        return res.status(422).json({ error: 'Please complete all fields' })
    }

    req.user.password = undefined; 

    const post = new Post({ 
        title, 
        body, 
        due, 
        github, 
        teamMembers, 
        severity, 
        postedBy: req.user, 
        status, 
        language, 
        framework 
    })

    post.save().then(result => {
        res.json({ post: result })
    })
    .catch(err => {
        console.log(err)
    })
})

router.get('/mypost', requireLogin, (req, res) => {

    Post.find({ postedBy: req.user._id })
        .populate('postedBy', "_id firstName lastName")
        .then(mypost => {
            res.json({ mypost })
        })
        .catch(err => {
            console.log(err)
        })

})


router.put('/like', requireLogin, (req, res) => {
    Post.findByIdAndUpdate(req.body.postId, {
        $push: {likes: req.user._id}
    }, {
        new: true 
    }).exec((err, result) => {
        if(err) {
            return res.status(422).json({ error: err })
        } else {
            res.json(result)
        }
    })
})

router.put('/comment', requireLogin, (req, res) => {
    const comment = {
        text: req.body.text, 
        postedBy: req.user._id 
    }

    Post.findByIdAndUpdate(req.body.postId, {
        $push: {comments: comment}
    }, {
        new: true 
    })
    .populate('comments.postedBy', '_id firstName lastName date')
    .populate('postedBy', '_id firstName lastName date')
    .exec((err, result) => {
        if(err) {
            return res.status(422).json({ error: err })
        } else {
            res.json(result)
        }
    })
})

router.delete('/deletepost/:postId', requireLogin,(req, res) => {
    Post.findOne({ _id: req.params.postId })
        .populate('postedBy', '_id')
        .exec((err, post) => {
            if (err || !post) {
                return res.status(422).json({ error: err })
            } 

            if (post.postedBy._id.toString() === req.user._id.toString()) {
                post.remove()
                .then(result => {
                    res.json(result)
                }).catch(err => {
                    console.log(err)
                })
            }
        })
})

module.exports = router; 