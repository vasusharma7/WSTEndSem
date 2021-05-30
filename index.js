const express = require("express");
var path = require("path");
const app = express();
const port = 5000;
const connectDB = require("./config/db");
connectDB();

//setup public folder
app.use(express.static("./public"));

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
// parse application/json
app.use(express.json());

app.get("/", function (req, res) {
  res.render("home.html");
});

app.use('/', express.static('public'))

app.use("/api/", require("./routes/commons"));

app.get("/node", (req, res) => res.send("Hey Nerd!"));

app.listen(port, () => console.log(`App Started on port ${port}!`));
