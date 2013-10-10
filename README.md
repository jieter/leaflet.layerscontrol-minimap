# Leaflet Layers control with minimaps

Displays minimaps in a layers control. Works with Leaflet 0.6.4.

## API

Follows Leaflets [`L.Control.Layers`](http://leafletjs.com/reference.html#control-layers), but needs [`L.Sync`](https://github.com/turban/Leaflet.Sync) (in `lib/L.Map.Sync.js`) + some css (in `control.layers.minimap.css`):

```JavaScript
L.control.layers.minimap(basemaps, overlays, options).addTo(map);
```
### extra options

In addition to the options available for `L.Control.Layers`:

 - `topPadding`: pixels the control is padded from top of the map.
 - `bottomPadding`: pixels the control needs to keep free at the bottom of the control.
 - `overlayBackgroundLayer

![Screenshot](screenshot.png)

## Not yet complete!

 - `Polygon` minimaps do not work as expected.

Could haves:

 - zoom offsets
