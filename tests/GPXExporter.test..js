let GPXExporter = require('../src/GPXExporter');

test('exports a polygon to GPX', () => {
  const xml = GPXExporter.export([[{lat: "33", lng: "55", ele: 0, time: "2009-10-17T18:37:26Z"}, 
  {lat: "66.7", lng: "99", ele:1, time: "2009-10-17T18:37:26Z"}]]);
  console.log(xml);
});
