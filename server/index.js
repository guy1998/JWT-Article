const express = require('express');
const app = express();
const connect_db = require('./db.js');

connect_db(()=>{
    app.listen(5443, ()=>{
        console.log(`Listening to HTTPS on port 5443`);
    })
})