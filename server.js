var express = require("express");
var path = require("path");
var app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(express.static(path.join(__dirname, "public")));
app.use("/node_modules", express.static(path.join(__dirname, "node_modules")));

app.get("/", function(req, res, next) {
  res.render("index", { title: "Provision.sh" });
});

app.get("/about", function(req, res, next) {
  res.render("about", { title: "About Provision.sh" });
});

app.listen(3000);
