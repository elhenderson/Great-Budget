const express = require("express");
const router = express();
const jwt = require("jsonwebtoken");
const Envelope = require("../models/Envelope");
const User = require("../models/User");

router.get("/", (req, res) => {
  const userId = jwt.decode(req.cookies.token).id;
  console.log(userId)
  // console.log(`Cookies: ${JSON.stringify(req.cookies.token)}`)
  User.findOne({_id: userId})
  // .then((result) => res.json(result))
  .then((result) => res.json(result.envelopes))
  .catch(err => console.log(err));
});

router.post("/", (req, res) => {
  const newEnvelope = new Envelope({
    name: req.body.name,
    amount: req.body.amount
  });
  newEnvelope.save()
  .then((result) => res.json(result));
});

module.exports = router;

