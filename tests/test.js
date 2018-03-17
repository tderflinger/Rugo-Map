let GPXExporter = require('../src/GPXExporter');

test('adds 1 + 2 to equal 3', () => {
  const xml = GPXExporter.export();
  console.log(xml);
  expect(1+2).toBe(3);
});
