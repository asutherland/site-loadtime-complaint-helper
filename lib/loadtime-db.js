let indexedDB = require('sdk/indexed-db');

const DB_VERSION = 1;

exports.LoadtimeDB = function(callOnLoaded) {
  let self = this;

  let req = indexedDB.open('loadtime', DB_VERSION);
  req.onerror = function() {
    console.error('Problem opening db');
  };
  req.onupgradeneeded = function(event) {
    let db = req.result;

    db.createObjectStore('domains');
    db.createObjectStore('datapoints');
  };
  req.onsuccess = function() {
    self._db = req.result;

    self._loadDomains();
  };
  this._callOnLoaded = callOnLoaded;
  this.domains = null;
};
exports.LoadtimeDB.prototype = {
  _loadDomains: function() {
    let trans = this._db.transaction(['domains'], 'readonly');
    let domainsStore = trans.objectStore('domains');
    let domainsReq = domainsStore.mozGetAll();

    domainsReq.onerror = function() {
      console.error('Problem loading domains list!');
    };

    domainsReq.onsuccess = function(event) {
      let values = domainsReq.result;

      this.domains = values.map(function(val) { return val.domain; });
    }.bind(this);
  },

  addDomain: function(domain) {
    this.domains.push(domain);

    let trans = this._db.transaction(['domains'], 'readwrite');
    let domainsStore = trans.objectStore('domains');
    domainsStore.put({ domain: domain }, domain);
  },

  removeDomain: function(domain) {
    let idx = this.domains.indexOf(domain);
    if (idx !== -1)
      this.domains.splice(idx, 1);

    let trans = this._db.transaction(['domains'], 'readwrite');
    let domainsStore = trans.objectStore('domains');
    domainsStore.delete(domain);
  },
};
