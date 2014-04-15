# Leaflet Layers control with minimaps

Displays minimaps in a layers control.

 - Only updates layers currently in view.
 - Depends on [Leaflet.Sync](https://github.com/turban/Leaflet.Sync) for syncing.
 - Tested with Leaflet 0.7

## Usage

Exactly like [Leaflets default layers control](http://leafletjs.com/reference.html#control-layers),
with some extra options. Add the scripts + css to your html:

```HTML
<link rel="stylesheet" href="control.layers.minimap.css" />
<script src="lib/L.Map.Sync.js"></script>
<script src="L.Control.Layers.Minimap.js"></script>
```
and add the control to your map:

```JavaScript
L.control.layers.minimap(basemaps, overlays, options).addTo(map);
```

### Extra options

In addition to the options available for `L.Control.Layers`:

 - `topPadding`: pixels the control is padded from top of the map. Defaults to 10px.
 - `bottomPadding`: pixels the control needs to keep free at the bottom of the control. Defaults to 40px.
 - `overlayBackgroundLayer` a (tile)layer which is added to the minimap of each overlay. Defaults to `acetate-base`.

### Extra methods

One extra method is added:

 - `filter(string)`: if called with a non-empty string is passed, only layers with a name containing that substring are shown, while the others are set to `display: none`.

## Live example

http://jieter.github.io/Leaflet.layerscontrol-minimap/

![Screenshot](screenshot.png)
