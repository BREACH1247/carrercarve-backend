// index.js
const express = require('express');
const mongoose = require('mongoose');

// Import Controllers
const welcomeRoute = require('./controllers/welcome');
const signupRoute = require('./controllers/signup');
const loginRoute = require('./controllers/login');
const editPhoneNumberRoute = require('./controllers/editPhoneNumber');
const submitTestRoute = require('./controllers/submitTest');
const verify = require('./middleware/auth')
const app = express();
app.use(express.json());
const mongourl = "mongodb+srv://kingsmen47:aditya1247@nodetuts.uwugd.mongodb.net/exam?retryWrites=true&w=majority"
// Connect to MongoDB
mongoose.connect(mongourl,{
    useNewUrlParser: true,
})
.then(() => {
    console.log("Connected")
})
.catch((e) => console.log(e))

// Define routes
app.use('/welcome',welcomeRoute);
app.use('/api/signup',signupRoute);
app.use('/api/login',loginRoute);
app.use('/api/edit/phonenumber',verify,editPhoneNumberRoute);
app.use('/api/submit-test',submitTestRoute);

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
