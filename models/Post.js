const mongoose = require('mongoose'); 
const { ObjectId } = mongoose.Schema.Types; 

const PostSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true
    }, 
    body: {
        type: String, 
        required: true
    }, 
    due: {
        type: String, 
        required: true
    }, 
    github: {
        type: String, 
        required: true
    }, 
    teamMembers: {
        type: String, 
        required: true 
    }, 
    severity: {
        type: String, 
        required: true 
    }, 
    likes: [{
        type: ObjectId, 
        ref: 'User'
    }], 
    comments: [{
        text: String, 
        postedBy: { type: ObjectId, ref: 'User' }
    }],
    postedBy: {
        type: ObjectId, 
        ref: 'User' 
    }, 
    status: {
        type: String, 
        required: true 
    }, 
    language: {
        type: String, 
        required: true 
    }, 
    framework: {
        type: String, 
        required: true 
    }
}, {timestamps: true}); 

mongoose.model('Post', PostSchema);         