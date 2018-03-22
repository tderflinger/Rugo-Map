var xmlserializer = require('xmlserializer');

class GPXExporter {


  export (trackPoints) {
    let doc = document.implementation.createDocument("", "", null);
    let gpxElem = document.createElementNS('http://www.topografix.com/GPX/1/1', 'gpx');

    let track = document.createElement('trk');
    gpxElem.appendChild(track);

    let nameElem = document.createElement('name');
    let nameTextNode = document.createTextNode("Example Name");
    nameElem.appendChild(nameTextNode);

    track.appendChild(nameElem);

    for (let seg of trackPoints) {
      let trackSeg = document.createElement('trkseg');

      for (let point of seg) {
        let trackPoint = document.createElement('trkpt');
        trackPoint.setAttribute('lat', point.lat);
        trackPoint.setAttribute('lon', point.lng);

        let ele = document.createElement('ele');
        let eleText = document.createTextNode(point.ele);
        ele.appendChild(eleText);

        let time = document.createElement('time');
        let timeText = document.createTextNode(point.time);
        time.appendChild(timeText);

        trackPoint.appendChild(ele);
        trackPoint.appendChild(time);

        trackSeg.appendChild(trackPoint);
      }


      track.appendChild(trackSeg);
    }

    doc.appendChild(gpxElem);

    let sXML = xmlserializer.serializeToString(doc);

    return sXML;
  }

}

module.exports = new GPXExporter();
