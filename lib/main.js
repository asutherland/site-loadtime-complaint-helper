/**
 *
 **/

console.log('*** Starting Up');

let $pageMod = require('sdk/page-mod'),
//    $loadtimeDb = require('./loadtime-db'),
    $self = require('sdk/self');

let loadMod = null;
let pageWorkers = [];

//let db = new $loadtimeDb.LoadtimeDB(setupPagemod);

// this === pageWorker instance
function workerDetached() {
  let idx = pageWorkers.indexOf(this);
  if (idx !== -1)
    pageWorkers.splice(idx, 1);
}

function setupPagemod() {
  loadMod = $pageMod.PageMod({
    include: ['http://bugzilla.mozilla.org/*',
              'https://bugzilla.mozilla.org/*'], //db.domains,
    contentScriptFile: $self.data.url('lib/load-perf-collector.js'),
    onAttach: function(pageWorker) {
      console.log('attaching!');
      pageWorkers.push(pageWorker);
      pageWorker.on('detach', workerDetached);
      pageWorker.port.on('perfData', function(msg) {
        console.log('Perf data received', msg.domain, msg.navType, '\n',
                    JSON.stringify(msg.perfData, null, 2));
      });
    },
  });
}
console.log('creating pagemod');
setupPagemod();
