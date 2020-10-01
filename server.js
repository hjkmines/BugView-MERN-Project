const express = require('express'); 
const mongoose = require('mongoose'); 
const app = express(); 
const { MONGOURI } = require('./config/keys'); 
const path = require('path') 

const PORT = process.env.PORT || 5000; 


mongoose.connect(process.env.MONGODB_URI || MONGOURI, {
    useUnifiedTopology: true, 
    useNewUrlParser: true 
}); 

mongoose.connection.on('connected', ()=> {
    console.log('MongoDB Connected!')
}); 

mongoose.connection.on('error', ()=> {
    console.log('Error connecting to MongoDB')
})

require('./models/User'); 
require('./models/Post'); 

app.use(express.json()); 
app.use(require('./routes/auth')); 
app.use(require('./routes/post')); 
app.use(require('./routes/user')); 

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}


app.listen(PORT, () => console.log(`Server started on port ${PORT}`)); 