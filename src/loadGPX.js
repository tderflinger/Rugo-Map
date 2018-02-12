const gpxParse = require("gpx-parse");

module.exports = class GPXParse {

  parse(fileName) {
    //from file
    gpxParse.parseGpxFromFile(fileName, function(error, data) {
    	//do stuff
    	console.log('inside function!');
    	console.log(JSON.stringify(data.tracks[0].segments));

      let polyl = [];

      for (let segment of data.tracks[0].segments[0]) {
        let lat = segment['lat'];
        let lng = segment['lon'];
        if ((typeof lat === 'undefined') || (typeof lng === 'undefined')) {
          continue;
        }
        polyl.push([lat, lng]);
      };

      var polyline = L.polyline(polyl, {color: 'blue'}).addTo(window.mappy);

      var corner1 = L.latLng(polyl[0][0], polyl[0][1]),
      corner2 = L.latLng(polyl[polyl.length-1][0], polyl[polyl.length-1][1]),
      bounds = L.latLngBounds(corner1, corner2);

      window.mappy.fitBounds(bounds);
    });
  }
}
