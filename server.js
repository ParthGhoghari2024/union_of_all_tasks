const express = require('express')
const app = express()
const port = 3000
const ejs = require('ejs');
var cookieParser = require('cookie-parser')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser())

const dotenv = require("dotenv").config();

const con = require("./db");
app.engine('ejs', require('ejs').__express);
app.set('view engine', 'ejs');
app.use(express.static("public"));


con.connect((err) => {
    if (err) throw err;
    console.log("mysql connected");
});


const mainRouter = require("./route/index");
app.use(mainRouter);

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})