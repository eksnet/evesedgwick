//
optimizelyGeo = {
  'city': "NEWYORK",
  'continent': "NA",
  'country': "US",
  'region': "NY",
  'ip': "96.246.40.165"
};
if (typeof window['optimizely'] !== "undefined" &&
    window['optimizely'] !== null) {
  try {
    var visitorObj = window['optimizely']['data']['visitor'];
    visitorObj['location']['city'] = optimizelyGeo['city'];
    visitorObj['location']['continent'] = optimizelyGeo['continent'];
    visitorObj['location']['country'] = optimizelyGeo['country'];
    visitorObj['location']['region'] = optimizelyGeo['region'];
    visitorObj['ip'] = optimizelyGeo['ip'];
  }
  catch(error) {}
  if (typeof window['optimizely']['activateGeoDelayedExperiments'] !== "undefined") {
    window['optimizely']['activateGeoDelayedExperiments']();
  }
  else {
    optimizelyGeo = {};
  }
}
