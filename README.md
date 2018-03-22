# Rugo Map

Rugo Map is an Electron JavaScript desktop application. You can edit tracks on
a map layer. Using the context menu (right mouse click) you can save and load the tracks.
Furthermore, you can switch layers between OSM layer, ESRI layer, OpenTopomap, or Stamen layer.


Load GPX files with the context menu and "Load GPX". In order to save again as a GPX you can
click "Save GPX" in the context menu.
Also, you can edit the track and save it with "Save Track" (in a custom format).


# Development

## Requirements

Install a recent version of Node.

## First Time

After cloning the source from Github, first run the following command:

```
npm install
```


## Starting the Application

```
npm start
```

## Testing the Application

```
jest tests/*.js
```



## Roadmap

On the roadmap there are several features:

* load and save GeoJSON
* load and save KML


## References

Rugo Map is standing on the shoulder of giants. It builds upon the following
technologies:

* OpenStreetMap
* Node
* Electron
* Leaflet.js
* Leaflet.pm
* gpx-parse

## License

Rugo Map is licensed under Apache 2.0 License.

## Trademark

Rugo Map is a trademark of Thomas Derflinger.
