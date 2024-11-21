const express = require('express')
const cors = require('cors');
const db = require('./app/config/db');
const app = express();
const port =3000;
const route =require('./app/routes/index.route')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}))

db.connect();

route(app);

app.listen(port,() =>{
    console.log(`Example app listening on port ${port}`);
})

module.exports = app;