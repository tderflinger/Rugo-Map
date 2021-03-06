import { remote } from "electron";
const dialog = remote.dialog;
var fs = require('fs');

const rugoSave = function() {
  let element = document.getElementById('poly-map');
  
  var event = new Event('export');
  element.dispatchEvent(event);

  // You can obviously give a direct path without use the dialog (C:/Program Files/path/myfileexample.txt)
  dialog.showSaveDialog((fileName) => {
      if (typeof (fileName) === 'undefined'){
          console.log("You didn't save the file");
          return;
      }

      let element = document.getElementById('poly-map');
      const content = element.getAttribute('polylines');

      // fileName is a string that contains the path and filename created in the save file dialog.
      fs.writeFile(fileName, content, (err) => {
          if(err){
              alert("An error ocurred creating the file "+ err.message)
          }

          alert("The file has been succesfully saved");
      });

  });
}

export default rugoSave;
