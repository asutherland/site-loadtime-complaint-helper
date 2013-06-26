// This script gets attached at 'end' which means when window.onload fires.
// As such, we don't need to do any event listening or anything like that,
// we can just send our precious data back.

console.log('page-worker active');
function reportData() {
  let timing = window.performance.timing;
  let base = timing.navigationStart;
  self.port.emit(
    'perfData',
    {
      domain: window.location.hostname,
      date: Date.now(),
      navType: window.performance.navigation.type,
      perfData: {
        fetchStart: timing.fetchStart - base,
        domainLookupStart: timing.domainLookupStart - base,
        domainLookupEnd: timing.domainLookupEnd - base,
        connectStart: timing.connectStart - base,
        connectEnd: timing.connectEnd - base,
        secureConnectionStart: timing.secureConnectionStart - base,
        requestStart: timing.requestStart - base,
        requestEnd: timing.requestEnd - base,
        domLoading: timing.domLoading - base,
        domInteractive: timing.domInteractive - base,
        domContentLoadedEventStart: timing.domContentLoadedEventStart - base,
        domContentLoadedEventEnd: timing.domContentLoadedEventEnd - base,
        loadEventStart: timing.loadEventStart - base,
        loadEventEnd: timing.loadEventEnd - base,
      }
    });
}
window.setTimeout(reportData, 0);
