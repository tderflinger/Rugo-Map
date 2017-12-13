import "./stylesheets/main.css";

// Small helpers you might want to keep
import "./helpers/context_menu.js";
import "./helpers/external_links.js";

// ----------------------------------------------------------------------------
// Everything below is just to show you how it works. You can delete all of it.
// ----------------------------------------------------------------------------

import { remote } from "electron";
import jetpack from "fs-jetpack";
import env from "env";

const app = remote.app;
const dialog = remote.dialog;
var fs = require('fs');

const appDir = jetpack.cwd(app.getAppPath());

// Holy crap! This is browser window with HTML and stuff, but I can read
// files from disk like it's node.js! Welcome to Electron world :)
const manifest = appDir.read("package.json", "json");

const osMap = {
  win32: "Windows",
  darwin: "macOS",
  linux: "Linux"
};


const {Menu, MenuItem} = remote

const menu = new Menu()
menu.append(new MenuItem({label: 'Load Track', click() { load(); }}));
menu.append(new MenuItem({label: 'Save Track', click() { save(); }}))
menu.append(new MenuItem({type: 'separator'}))
menu.append(new MenuItem({label: 'OSM Layer', click: () => { map.removeLayer(lastLayer); map.addLayer(osmLayer); lastLayer = osmLayer; }}))
menu.append(new MenuItem({label: 'Stamen Layer', click: () => { map.removeLayer(lastLayer); map.addLayer(stamenLayer); lastLayer = stamenLayer; }}))
menu.append(new MenuItem({label: 'ESRI Layer', click: () => { map.removeLayer(lastLayer); map.addLayer(esriLayer); lastLayer = esriLayer; }}))
menu.append(new MenuItem({label: 'Topomap Layer', click: () => { map.removeLayer(lastLayer); map.addLayer(topoLayer); lastLayer = topoLayer; }}))

window.addEventListener('contextmenu', (e) => {
  e.preventDefault()
  menu.popup(remote.getCurrentWindow())
}, false)



var stamenLayer = new L.StamenTileLayer("terrain");
var map = new L.Map("mainMap", {
  center: new L.LatLng(48.1345, 11.6053),
  zoom: 16
});

var esriLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'
});

var topoLayer = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
	maxZoom: 17,
	attribution: 'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

var osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

map.addLayer(esriLayer);

var lastLayer = esriLayer;

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
map.pm.addControls(options);

map.on('pm:create', function (e) {
    console.log("pm:create!");
    console.dir(window.mappy.pm.Draw.Line._layer.getLatLngs());
      //debugger;
  });

map.on('pm:edit', function (e) {
    console.log("pm:edit!");
    console.dir(window.mappy.pm.Draw.Line._layer.getLatLngs());
  });


window.save = function() {
  let content = "";
  let contentPure = "";
  let contentObj = {};
  for (const mylayer in window.mappy._layers) {
    if (typeof window.mappy._layers[mylayer].getLatLngs !== 'undefined') {
      let coordinates = window.mappy._layers[mylayer].getLatLngs();
      let polyl = [];
      for (const coord of coordinates) {
            let lat = coord['lat'];
            let lng = coord['lng'];
            polyl.push([lat, lng]);
            console.log('Lat: '+lat+' / Long: '+lng);
      }

      contentObj[mylayer] = window.mappy._layers[mylayer].getLatLngs();
      console.log("Layer: "+JSON.stringify(window.mappy._layers[mylayer].getLatLngs()));
      if (polyl.length !== 0) {
        contentPure += JSON.stringify(polyl);
      }
    }
  }


  content = JSON.stringify(contentObj);

  // You can obviously give a direct path without use the dialog (C:/Program Files/path/myfileexample.txt)
  dialog.showSaveDialog((fileName) => {
      if (fileName === undefined){
          console.log("You didn't save the file");
          return;
      }

      // fileName is a string that contains the path and filename created in the save file dialog.
      fs.writeFile(fileName, content, (err) => {
          if(err){
              alert("An error ocurred creating the file "+ err.message)
          }

          alert("The file has been succesfully saved");
      });

      fs.writeFile('./track.json', contentPure, (err) => {
          if(err){
              alert("An error ocurred creating the file "+ err.message)
          }

          alert("The file has been succesfully saved");
      });

  });
}

window.load = function() {

  dialog.showOpenDialog((fileNames) => {
    fs.readFile(fileNames[0], 'utf-8', function (err, data) {
      const jsonData = JSON.parse(data);

      console.log(JSON.stringify(jsonData));

      for (const mylayer in jsonData) {
        let polyl = [];

        let coordinates = jsonData[mylayer];
        for (const coord of coordinates) {
              let lat = coord['lat'];
              let lng = coord['lng'];
              polyl.push([lat, lng]);
        }

        var polyline = L.polyline(polyl, {color: 'blue'}).addTo(map);
            }
    });
  });

}


window.mappy = map;



// window.mappy._layers
// window.mappy.pm.Draw.Line._layer.getLatLngs()
