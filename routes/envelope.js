const express = require("express");
const router = express();
const Envelope = require("../models/Envelope");

router.get("/:id", (req, res) => {
  Envelope.find(id)
  .then((result) => res.json(result))
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