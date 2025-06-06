const express = require('express');
const bodyParser = require('body-parser');
const { routerLoginIn } = require('./routes/login');
const { routerSignUp } = require('./routes/signup');
require('dotenv').config();
const session = require('express-session');
const { routerLoginOut } = require('./routes/logout');
const cors = require('cors'); // Importing the cors package

const app = express(); // Initializing the express app
const port = process.env.SPORT; // Loading the server port specified in env file

app.use(session({ // Config cookie session middleware
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production', 
        // Enable only for HTTPS
        httpOnly: true,
        // Prevent client-side access to cookies
        sameSite: 'lax',
        // Mitigate CSRF attacks
        maxAge: 24 * 60 * 60 * 1000
    }
}));
app.use(cors({
    origin: process.env.CORS_PORT, // Allowing requests from this origin
    credentials: true // Allowing credentials to be sent with requests
})); // Configuring CORS to allow cross-origin requests
app.use(bodyParser.json()); // Config Bodyparser middleware
app.use('/login', routerLoginIn); // Config different routes
app.use('/signup', routerSignUp); 
app.use('/logout', routerLoginOut);
app.use('/browse', require('./routes/browse').routerBrowse); // Config browse route
app.use('/feedback', require('./routes/feedback').routerFeedback); // Config feedback route
app.use('/borrow', require('./routes/borrow').routerBorrow); // Config borrow route
app.use('/trade', require('./routes/trade').routerTrade); // Config trade route
app.use('/item_feedback', require('./routes/item_feedback').routerFeedback); // Config item feedback route
app.use('/upload', require('./routes/upload').routerUpload); // Config upload route
app.use('/user', require('./routes/user').routerUser); // Config user route
app.use('/requests', require('./routes/request').routerRequest); // Config request route
app.use('/notifications', require('./routes/notifications').routerNot); // Config notifications route
app.use('/userfeedback', require('./routes/user_feedback').routerUserFeedback); // Config user feedback route

// Starting the server
app.listen(port, () => {
    console.log("Server running on port " + port);
})