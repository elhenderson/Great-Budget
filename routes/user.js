const express = require("express");
const router = express();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const keys = require("../keys")
const User = require('../models/User');

router.post('/register', async (req, res) => {
  const passwordToStore = await new Promise((resolve, reject) => {
    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
      if (err) reject(err)
      resolve(hash)
    });

  })
    const newUser = await new User({
    email: req.body.email,
    password: passwordToStore,
    envelopes: {"test": "test"}
  });
  await newUser.save()
  .then((result) => res.json(result));
});


router.post("/login", (req, res) => {
  User.findOne({email: req.body.email})
  .then((user) => {
    const token = jwt.sign({id: user._id}, keys.keys.private)
    bcrypt.compare(req.body.password, user.password, function (err, result) {
      if (result == true) {
        res.json({
          success: true,
          message: 'Authentication successful',
          token: token
        })
      } else {
        res.json({success: false})
      }
    })
  })
  .catch(err => console.log(err))
})


module.exports = router;