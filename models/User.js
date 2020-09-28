const mongoose = require('mongoose'); 
const { ObjectId } = mongoose.Schema.Types; 

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String, 
        required: true
    }, 
    lastName: {
        type: String, 
        required: true
    }, 
    jobTitle: {
        type: String, 
        required: true
    }, 
    email: {
        type: String, 
        required: true 
    }, 
    password: {
        type: String, 
        required: true 
    }, 
    followers: [{
        type: ObjectId, 
        ref: 'User'
    }],
    following: [{
        type: ObjectId, 
        ref: 'User'
    }], 
    image: {
        type: String, 
        default: 'https://res.cloudinary.com/tk23/image/upload/v1601243773/defaultpic_ikg5mi.jpg'
    }, 
    resetToken: String, 
    expireToken: Date
}); 

mongoose.model("User", UserSchema); 