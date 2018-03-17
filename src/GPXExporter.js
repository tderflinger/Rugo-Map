var xmlserializer = require('xmlserializer');

class GPXExporter {


    export() {
        let doc = document.implementation.createDocument("", "", "");
        let gpxElem = doc.createElement("gpx");
    
        let track = doc.createElement('trk');
        gpxElem.appendChild(track);
    
        let nameElem = doc.createElement('name');
        let nameTextNode = doc.createTextNode("Example Name");
        nameElem.appendChild(nameTextNode);
    
        track.appendChild(nameElem);
    
        let trackSeg = doc.createElement('trkseg');
    
        let trackPoint = doc.createElement('trkpt');
    
        trackSeg.appendChild(trackPoint);
    
        track.appendChild(trackSeg);
    
        doc.appendChild(gpxElem);
    
        let sXML = xmlserializer.serializeToString(doc);

        return sXML;
    }

}

module.exports = new GPXExporter();