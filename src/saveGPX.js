import {
  remote
} from "electron";
const dialog = remote.dialog;
var fs = require('fs');

let GPXExporter = require('./GPXExporter');

const rugoSaveGpx = function () {
  let element = document.getElementById('poly-map');

  var event = new Event('export');
  element.dispatchEvent(event);

  // You can obviously give a direct path without use the dialog (C:/Program Files/path/myfileexample.txt)
  dialog.showSaveDialog((fileName) => {
    if (typeof (fileName) === 'undefined') {
      console.log("You didn't save the file");
      return;
    }

    let element = document.getElementById('poly-map');
    const content = element.getAttribute('polylines');

    let polylines = JSON.parse(content);

    let gpxSeg = [];

    for (let polyline in polylines) {
        console.log(JSON.stringify(polylines[polyline]));

        let gpxLine = [];
        for (let line of polylines[polyline]) {
            gpxLine.push({ lat: line.lat, lng: line.lng, ele:0, time: "2009-10-17T18:37:26Z" });
        }

        gpxSeg.push(gpxLine)
    }

    const sXML = GPXExporter.export(gpxSeg);

    // fileName is a string that contains the path and filename created in the save file dialog.
    fs.writeFile(fileName, sXML, (err) => {
      if (err) {
        alert("An error ocurred creating the file " + err.message)
      }

      alert("The file has been succesfully saved");
    });

  });
}

export default rugoSaveGpx;
