
// Layers
const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

const stamenLayer = new L.StamenTileLayer("terrain");

const esriLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'
});

const topoLayer = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
	maxZoom: 17,
	attribution: 'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

let rugoMap = new L.Map("mainMap", {
  center: new L.LatLng(48.1345, 11.6053),
  zoom: 16
});

rugoMap.addLayer(osmLayer);

// Search control

//const provider = new OpenStreetMapProvider();
//const searchControl = new GeoSearchControl({ provider: provider });

//rugoMap.addControl(searchControl);

var lastLayer = osmLayer;

rugoMap.switchLayer = function(id) {
  rugoMap.removeLayer(lastLayer);

  switch (id) {
    case 1: rugoMap.addLayer(osmLayer);
            lastLayer = osmLayer;
            break;
    case 2: rugoMap.addLayer(stamenLayer);
            lastLayer = stamenLayer;
            break;
    case 3: rugoMap.addLayer(esriLayer);
            lastLayer = esriLayer;
            break;
    case 4: rugoMap.addLayer(topoLayer);
            lastLayer = topoLayer;
            break;
    default: break;
  }
}

var options = {
  position: 'topleft', // toolbar position, options are 'topleft', 'topright', 'bottomleft', 'bottomright'
  drawMarker: false, // adds button to draw markers
  drawPolyline: true, // adds button to draw a polyline
  drawRectangle: false, // adds button to draw a rectangle
  drawPolygon: false, // adds button to draw a polygon
  drawCircle: false, // adds button to draw a cricle
  cutPolygon: true, // adds button to cut a hole in a polygon
  editMode: true, // adds button to toggle edit mode for all layers
  removalMode: true, // adds a button to remove layers
};

// add leaflet.pm controls to the map
rugoMap.pm.addControls(options);

rugoMap.on('pm:create', function (e) {
    console.log("pm:create!");
    console.dir(window.mappy.pm.Draw.Line._layer.getLatLngs());
      //debugger;
  });

rugoMap.on('pm:edit', function (e) {
    console.log("pm:edit!");
    console.dir(window.mappy.pm.Draw.Line._layer.getLatLngs());
});

export default rugoMap;
