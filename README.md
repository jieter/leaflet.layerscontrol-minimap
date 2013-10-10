# Leaflet Layers control with minimaps

Displays minimaps in a layers control. Works with Leaflet 0.6.4.

## API

Follows Leaflets [`L.Control.Layers`](http://leafletjs.com/reference.html#control-layers), but needs [`L.Sync`](https://github.com/turban/Leaflet.Sync) (in `lib/L.Map.Sync.js`) + some css (in `control.layers.minimap.css`):

```JavaScript
L.control.layers.minimap(basemaps, overlays, options).addTo(map);
```

![Screenshot](screenshot.png)

## Not yet complete!

 - Currently only implemented for basemaps, not overlays.
 - `Polygon`s do not work as expected.

Could haves:

 - zoom offsets
 - basemap option for overlayish layers (maybe just copy the basemap from the main map.)