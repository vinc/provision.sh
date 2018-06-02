var querystringify = function(value) {
  if (!value) {
    return "";
  }
  return value.
    toLowerCase().
    replace(/ and /g, ",").
    replace(/,+\s*/g, ",");
};

var app = new Vue({
  el: "#app",
  data: {
    platform: "Dokku",
    cloud: "DigitalOcean",
    domain: "example.com",
    services: "Postgres and Redis"
  },
  computed: {
    exports: function() {
      switch (querystringify(this.cloud)) {
        case "digitalocean": return "export DIGITALOCEAN_TOKEN=xxxx\n";
        case "aws": return "export AWS_ACCESS_KEY_ID=xxxx\nexport AWS_SECRET_ACCESS_KEY=xxxx\n";
        case "scaleway": return "export SCALEWAY_ORGANIZATION=xxxx\nexport SCALEWAY_TOKEN=xxxx\n";
      }
    },
    url: function() {
      return window.location.origin +
        "?platform=" + querystringify(this.platform) +
        "&cloud=" + querystringify(this.cloud) +
        "&domain=" + querystringify(this.domain) +
        "&services=" + querystringify(this.services);
    }
  },
  methods: {
    update: function(event) {
      $(event.target).popover("update");
      var value = event.target.innerText;
      var model = event.target.dataset.bind;
      this[model] = value;
    }
  }
});

$(function() {
  $("[data-toggle='popover']").popover();
  $(".popover-dismiss").popover({ trigger: "focus" });
});
