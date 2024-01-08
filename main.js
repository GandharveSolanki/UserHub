
//imports
require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3000;


const MONGO_URL = process.env.MONGO_URL;

//template engine setup
app.set("view engine", "ejs");

//middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
    session({
        secret: "A secret Key",
        saveUninitialized: true,
        resave:false,
})
);
app.use((req, res, next) => {
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
});

//connection
mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("connected to the database"))
  .catch((err) => console.log(err));


app.get("/", (req, res) => {
    res.send("Hello World");
})

app.listen(PORT, () => {
    console.log(`Sever started at PORT: ${PORT}`);
})