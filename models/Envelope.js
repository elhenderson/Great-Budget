const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EnvelopeSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  amount: {
    type: Number,
    required: true
  }
});

module.exports = Envelope = mongoose.model("Envelope", EnvelopeSchema);