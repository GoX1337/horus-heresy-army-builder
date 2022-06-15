const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('./user');

const router = express.Router();

router.post('/register', async (req, res) => {
    if (!req.body.username || !req.body.password || !req.body.email) {
        res.status(400).send({ "message": "username, password and email are mandatory" });
    } 

    let user = await User.findOne({ username: req.body.username });
    if(user){
        res.status(200).send(user);
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(String(req.body.password), salt);
    user = new User({
        username: req.body.username, 
        password: hash,
        email: req.body.email,
        
    });
    await user.save();
    res.status(200).send(user);
});

router.post('/token', async (req, res) => {
    let user = await User.findOne({ username: req.body.username });
    if (user && bcrypt.compareSync(String(req.body.password), user.password)) {
        const token = jwt.sign({ "user": user._id }, process.env.APISECRET, {
            expiresIn: 60 * 60 * 24
        });
        res.status(200).send({ "token": token });
    }
    else {
        res.status(403).send({"message": 'Forbidden: wrong username/password' });
    }
});

module.exports = router;