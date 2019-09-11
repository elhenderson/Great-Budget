const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    require: true
  },
  password: {
    type: String,
    required: true
  },
  envelopes: {
    type: Array
  }
});

module.exports = User = mongoose.model("User", UserSchema);