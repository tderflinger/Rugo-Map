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

//import rugoMap from './rugoMap';
import rugoLoad from './load';
import rugoSave from './save';

const app = remote.app;

const appDir = jetpack.cwd(app.getAppPath());

// Holy crap! This is browser window with HTML and stuff, but I can read
// files from disk like it's node.js! Welcome to Electron world :)
const manifest = appDir.read("package.json", "json");

const osMap = {
  win32: "Windows",
  darwin: "macOS",
  linux: "Linux"
};

const OSM_LAYER = "osm";
const STAMEN_LAYER = "stamen";
const ESRI_LAYER = "esri";
const TOPO_LAYER = "topo";

const {Menu, MenuItem} = remote

const menu = new Menu()
menu.append(new MenuItem({label: 'Load Track', click: () => { rugoLoad(); }}));
menu.append(new MenuItem({label: 'Save Track', click: () => { rugoSave(); }}));
menu.append(new MenuItem({label: 'Load GPX', click: () => {
  const GPXParse = require('./loadGPX.js');
  const gpxParse = new GPXParse();
  const dialog = remote.dialog;

  dialog.showOpenDialog((fileNames) => {
    gpxParse.parse(fileNames[0]);
  });
}}));


function changeLayer(layerKey) {
  const element = document.getElementById('poly-map');
  element.setAttribute("layer-key", layerKey);
}

menu.append(new MenuItem({type: 'separator'}));

menu.append(new MenuItem({label: 'OSM Layer', click: () => {
  changeLayer(OSM_LAYER);
}}));

menu.append(new MenuItem({label: 'Stamen Layer', click: () => { 
  changeLayer(STAMEN_LAYER);
}}));

menu.append(new MenuItem({label: 'ESRI Layer', click: () => { 
  changeLayer(ESRI_LAYER);
}}));

menu.append(new MenuItem({label: 'Topomap Layer', click: () => { 
  changeLayer(TOPO_LAYER); 
}}));

window.addEventListener('contextmenu', (e) => {
  e.preventDefault()
  menu.popup(remote.getCurrentWindow())
}, false)

//window.mappy = rugoMap;
