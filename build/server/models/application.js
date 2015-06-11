// Generated by CoffeeScript 1.9.3
var Application, Manifest, cozydb;

cozydb = require('cozydb');

Manifest = require('../lib/manifest').Manifest;

module.exports = Application = cozydb.getModel('Application', {
  name: String,
  displayName: String,
  description: String,
  slug: String,
  state: String,
  isStoppable: {
    type: Boolean,
    "default": false
  },
  date: {
    type: Date,
    "default": Date.now
  },
  icon: String,
  iconPath: String,
  iconType: String,
  color: {
    type: String,
    "default": null
  },
  git: String,
  errormsg: String,
  errorcode: String,
  branch: String,
  port: Number,
  permissions: Object,
  password: String,
  homeposition: Object,
  widget: String,
  version: String,
  comment: String,
  needsUpdate: {
    type: Boolean,
    "default": false
  },
  favorite: {
    type: Boolean,
    "default": false
  }
});

Application.all = function(params, callback) {
  return Application.request("bySlug", params, callback);
};

Application.destroyAll = function(params, callback) {
  return Application.requestDestroy("all", params, callback);
};

Application.prototype.checkForUpdate = function(callback) {
  var manifest, setFlag;
  setFlag = (function(_this) {
    return function() {
      return _this.updateAttributes({
        needsUpdate: true
      }, function(err) {
        if (err) {
          return callback(err);
        } else {
          return callback(null, true);
        }
      });
    };
  })(this);
  if (this.needsUpdate) {
    return callback(null, true);
  } else {
    manifest = new Manifest();
    return manifest.download(this, (function(_this) {
      return function(err) {
        var repoVersion;
        if (err) {
          return callback(err);
        } else {
          repoVersion = manifest.getVersion();
          if (repoVersion == null) {
            return callback(null, false);
          } else if (_this.version == null) {
            return setFlag();
          } else if (_this.version !== repoVersion) {
            return setFlag();
          } else {
            return callback(null, false);
          }
        }
      };
    })(this));
  }
};

Application.prototype.getHaibuDescriptor = function() {
  var descriptor;
  descriptor = {
    user: this.slug,
    name: this.slug,
    domain: "127.0.0.1",
    repository: {
      type: "git",
      url: this.git
    },
    scripts: {
      start: "server.coffee"
    },
    password: this.password
  };
  if ((this.branch != null) && this.branch !== "null") {
    descriptor.repository.branch = this.branch;
  }
  return descriptor;
};
