const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const exjwt = require('express-jwt');
const cors = require('cors');
require('dotenv').config();

const port = process.env.PORT || 5000;
const app = express();

const db = require("./models");

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
    next();
})

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

const jwtMW = exjwt({
    secret: process.env.SECRET_KEY
})

app.get('/express-backend', jwtMW, (req, res) => {
    res.send({ message: 'You connected to express' });
});

app.post('/get-user', jwtMW, (req, res) => {
    console.log(req);
    const email = req.body.email;
    console.log(email);
    res.send(email);
})

app.post('/register', (req, res) => {
    const { email, firstName, lastName, password } = req.body;
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, function (err, hash) {
        db.User.create({
            email: email,
            firstName: firstName,
            lastName: lastName,
            password: hash
        }).then(result => {
            console.log("User created: ", result);
            res.json("User created!");
        });
    });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    console.log("User logging in: ", email);
    db.User.findOne({
        where: { email: email }
    }).then(user => {
        console.log("user found");
        if (user === null) {
            res.json(false);
        }
        bcrypt.compare(password, user.password, function (err, result) {
            if (result === true) {
                console.log("Valid login.");
                const token = jwt.sign({ id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName }, process.env.SECRET_KEY, { expiresIn: 129600});
                res.json({
                    success: true,
                    err: null,
                    token
                });
            } else {
                console.log("wrong log in");
                res.status(401).json({
                    success: false,
                    token: null,
                    err: 'Wrong password or user!'
                });
            }
        });
    });
});

app.get('/home', (req, res) => {
    console.log("JWT checked");
    res.send('You are authenticated');
});

app.post('/admin', jwtMW, (req, res) => {
    const jwtWithOutBearer = req.headers.authorization.slice(7);
    const decoded = jwt.verify(jwtWithOutBearer, process.env.SECRET_KEY);
    const userId = decoded.id;
    db.User.findByPk(userId).then(user => res.send(user));
});

db.sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log("DB synced, app listening on port ", port);
    });
});

module.exports = app;