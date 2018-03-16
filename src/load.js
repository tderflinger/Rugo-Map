import {
  remote
} from "electron";
const dialog = remote.dialog;
var fs = require('fs');

const rugoLoad = function () {

  dialog.showOpenDialog((fileNames) => {
    fs.readFile(fileNames[0], 'utf-8', function (err, data) {
      const jsonData = JSON.parse(data);
      /*
            console.log(JSON.stringify(jsonData));

            for (const mylayer in jsonData) {
              let polyl = [];

              let coordinates = jsonData[mylayer];
              for (const coord of coordinates) {
                    let lat = coord['lat'];
                    let lng = coord['lng'];
                    polyl.push([lat, lng]);
              }

              var polyline = L.polyline(polyl, {color: 'blue'}).addTo(window.mappy);
            } */

      let element = document.getElementById('poly-map');
      element.setAttribute('polylines', data);

      var event = new Event('import');
      element.dispatchEvent(event);
    });
  });

}

export default rugoLoad;
