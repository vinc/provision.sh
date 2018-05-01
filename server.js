var express = require("express");
var path = require("path");
var app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(express.static(path.join(__dirname, "public")));
app.use("/node_modules", express.static(path.join(__dirname, "node_modules")));

app.get("/", function(req, res, next) {
  if (req.query.platform) {
    res.set("Content-Type", "text/plain");
    res.render("script", {
      platform: req.query.platform,
      cloud: req.query.cloud,
      domain: req.query.domain,
      services: (req.query.services || "").split(","),
      layout: false
    });
  } else {
    next();
  }
});

["", "About", "Docs"].forEach(function(page) {
  app.get("/" + page.toLowerCase(), function(req, res, next) {
    res.render(page.toLowerCase(), {
      title: [page, "Provision.sh"].filter((s) => s.length > 0).join(" - ")
    });
  });
});

app.listen(3000);
