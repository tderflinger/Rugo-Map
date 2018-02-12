import { remote } from "electron";
const dialog = remote.dialog;
var fs = require('fs');

const rugoSave = function() {
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
      if (typeof (fileName) === 'undefined'){
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

export default rugoSave;
