import {
  remote
} from "electron";
const dialog = remote.dialog;
var fs = require('fs');

const rugoLoad = function () {

  dialog.showOpenDialog((fileNames) => {
    fs.readFile(fileNames[0], 'utf-8', function (err, data) {
      const jsonData = JSON.parse(data);

      let element = document.getElementById('poly-map');
      element.setAttribute('polylines', data);

      var event = new Event('import');
      element.dispatchEvent(event);
    });
  });

}

export default rugoLoad;
