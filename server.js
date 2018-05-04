require("dotenv").config();

var express = require("express");
var path = require("path");
var hbs = require("hbs");
var app = express();

hbs.registerPartials(__dirname + "/views/partials");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(express.static(path.join(__dirname, "public")));
app.use("/node_modules", express.static(path.join(__dirname, "node_modules")));

["", "config.tf"].forEach(function(page) {
  app.get("/" + page, function(req, res, next) {
    if (req.query.platform) {
      res.set("Content-Type", page === "" ? "application/x-sh" : "text/plain");
      res.render(page === "" ? "script" : "config", {
        platform: req.query.platform,
        cloud: req.query.cloud,
        domain: req.query.domain,
        app: req.query.domain.replace(/[.]/g, "-"),
        services: (req.query.services || "").split(","),
        url: {
          base: process.env.SITE_URL || "http://localhost:3000",
          search: req.url.slice(req.path.length)
        },
        layout: false
      });
    } else {
      next();
    }
  });
});

["", "About", "Docs"].forEach(function(page) {
  app.get("/" + page.toLowerCase(), function(req, res, next) {
    res.render(page.toLowerCase(), {
      site: process.env.SITE_URL || "http://localhost:3000",
      title: [page, "Provision.sh"].filter((s) => s.length > 0).join(" - ")
    });
  });
});

app.listen(process.env.PORT || 3000);
