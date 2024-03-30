const express = require('express');
const app = express();
const connect_db = require('./db.js');
const login_router = require('./routers/login.js');
const authorization_router = require('./routers/authorization.js');
const cors = require('cors')

const allowedOrigins = ['http://localhost:3000'];

app.use(cors({
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
}));

app.use('/auth', login_router);
app.use('/permission', authorization_router);

connect_db(()=>{
    app.listen(5443, ()=>{
        console.log(`Listening on port 5443`);
    })
})