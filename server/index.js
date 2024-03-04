'use strict';

const express = require('express');
const body = require('body-parser');
const cookie = require('cookie-parser');
const morgan = require('morgan');
const uuid = require('uuid').v4;
const path = require('path');
const app = express();

app.use(morgan('dev'));
app.use(express.static(path.resolve(__dirname, '..', 'public')));
app.use(express.static(path.resolve(__dirname, 'images')));
app.use(body.json());
app.use(cookie());

const ads = [
    {inner: "Oбъявление 1"},
    {inner: "Oбъявление 2"},
    {inner: "Oбъявление 3"},
    {inner: "Oбъявление 4"},
];

const users = {
    'd.dorofeev@corp.mail.ru': {
        username: 'd.dorofeev@corp.mail.ru',
        password: 'password',
        age: 21,
    },
    'username': {
        username: 'username',
        password: 'password',
        age: 21,
    }
}
const ids = {};

app.get('/main', (req, res) => {
    res.json(ads.flat());
});

app.post('/login',  (req, res) => {
    const password = req.body.password;
    const username = req.body.username;
    if (!password || !username) {
        return res.status(400).json({error: 'Не указан E-Mail или пароль'});
    }
    if (!users[username] || users[username].password !== password) {
        return res.status(400).json({error: 'Не верный E-Mail и/или пароль'});
    }

    const id = uuid();
    ids[id] = username;

    res.cookie('session_id', id, {expires: new Date(Date.now() + 1000 * 60 * 10)});
    res.status(200).json({id});
});

const port = process.env.PORT || 3000;

app.listen(port, function () {
    console.log(`Server listening port ${port}`);
});