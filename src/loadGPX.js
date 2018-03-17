const gpxParse = require("gpx-parse");

module.exports = class GPXParse {

  parse(fileName) {
    //gpx from file
    gpxParse.parseGpxFromFile(fileName, function(error, data) {
      const element = document.getElementById("poly-map");

      // convert to custom format that leaflet-polymer understands
      let layer = {};
      let polyl = [];

      for (let segment of data.tracks[0].segments[0]) {
        let lat = segment['lat'];
        let lng = segment['lon'];
        if ((typeof lat === 'undefined') || (typeof lng === 'undefined')) {
          continue;
        }
        polyl.push( {lat: lat, lng: lng });
      };

      layer["100"] = polyl;

      element.setAttribute("polylines", JSON.stringify(layer));

      var event = new Event('import');
      element.dispatchEvent(event);
    });
  }
}
