const express = require("express");
const router = express();
const jwt = require("jsonwebtoken");
const Envelope = require("../models/Envelope");
const User = require("../models/User");

router.get("/", (req, res) => {
  if (!jwt.decode(req.cookies.token)) {
    res.json({success: false});
    return
  }
  const userId = jwt.decode(req.cookies.token).id;
  // console.log(`Cookies: ${JSON.stringify(req.cookies.token)}`)
  User.findOne({_id: userId})
  // .then((result) => res.json(result))
  .then((result) => res.json(result.envelopes))
  .catch(err => {
    res.json({success: false})
    console.log(err);
  })
});

router.get("/unallocated", (req, res) => {
  if (!jwt.decode(req.cookies.token)) {
    res.json({success: false});
    return
  }
  const userId = jwt.decode(req.cookies.token).id;
  // console.log(`Cookies: ${JSON.stringify(req.cookies.token)}`)
  User.findOne({_id: userId})
  // .then((result) => res.json(result))
  .then((result) => res.json(result.unallocated))
  .catch(err => {
    res.json({success: false})
    console.log(err);
  })
});

router.put("/", (req, res) => {
  const userId = jwt.decode(req.cookies.token).id;
  // const envelopeValue = req.body.value.envelopeValue
  // const envelopeToUpdate = req.body.envelopeName
  console.log(req.body)
  User.findOneAndUpdate({_id: userId}, {$set: {envelopes: req.body.envelopes}})
  .then(result => res.json(result))
  .catch(err => console.log(err))
})

router.put("/unallocated", (req, res) => {
  const userId = jwt.decode(req.cookies.token).id;
  // const envelopeValue = req.body.value.envelopeValue
  // const envelopeToUpdate = req.body.envelopeName
  console.log(req.body)
  User.findOneAndUpdate({_id: userId}, {$set: {unallocated: req.body.unallocated}})
  .then(result => res.json(result))
  .catch(err => console.log(err))
})

router.put("/delete", (req, res) => {
  const userId = jwt.decode(req.cookies.token).id;
  // console.log(req.body)
  const envelopes = req.body.envelopes
  const envelopeToDelete = req.body.envelopeToDelete
  delete envelopes[envelopeToDelete]
  console.log(envelopes)
  User.findOneAndUpdate({_id: userId}, {$set: {envelopes: envelopes}})
  .then(result => res.json(result))
  .catch(err => console.log(err));
})

router.post("/", (req, res) => {
  const newEnvelope = new Envelope({
    name: req.body.name,
    amount: req.body.amount
  });
  newEnvelope.save()
  .then((result) => res.json(result));
});

module.exports = router;

