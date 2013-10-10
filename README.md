# Leaflet Layers control with minimaps

Displays minimaps in a layers control.

## API

Follows default `L.Control.Layers`, but needs `L.Sync` (in `lib/L.Map.Sync.js`) + some css (in `control.layers.minimap.css`):

```JavaScript
L.control.layers.minimap(basemaps, overlays, options).addTo(map);
```

## Not yet complete!

 - Currently only implemented for basemaps, not overlays.
 - `MultiPolyLine`, `MultiPolygon`, `CircleMarker`, `LayerGroup`, `FeatureGroup`, `GeoJSON` not supported.


