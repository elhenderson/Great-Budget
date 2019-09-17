const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

const userRoutes = require("./routes/user");
const envelopeRoutes = require('./routes/envelope');

app.use("/api/user", userRoutes);
app.use("/api/envelopes", envelopeRoutes);




if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/greatBudget";

mongoose.connect(MONGODB_URI, {useNewUrlParser: true, useFindAndModify: false})
.then(console.log("Connected"))
.catch(err => console.error(err));

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));