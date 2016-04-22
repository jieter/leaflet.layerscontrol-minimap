# Leaflet Layers control with minimaps

Displays minimaps in a layers control.

 - Only updates layers currently in view.
 - uses [Leaflet.Sync](https://github.com/turban/Leaflet.Sync) and [leaflet-clonelayer](https://github.com/jieter/leaflet-clonelayer)
 - Tested with Leaflet 0.7.7 and 1.0.0-rc.1

## Usage

Exactly like [Leaflets default layers control](http://leafletjs.com/reference.html#control-layers),
with some extra options. Add the scripts + css to your html:

```HTML
<link rel="stylesheet" href="control.layers.minimap.css" />
<script src="L.Control.Layers.Minimap.js"></script>
```
and add the control to your map:

```JavaScript
L.control.layers.minimap(basemaps, overlays, options).addTo(map);
```

## npm

Leaflet layers control minimap is available via npm too:

`npm install leaflet.layerscontrol-minimap`


### Extra options

In addition to the options available for `L.Control.Layers`:

 - `topPadding`: pixels the control is padded from top of the map. Defaults to 10px.
 - `bottomPadding`: pixels the control needs to keep free at the bottom of the control. Defaults to 40px.
 - `overlayBackgroundLayer` a (tile)layer which is added to the minimap of each overlay. Defaults to [GeoIQ Acetate basemap](http://leaflet-extras.github.io/leaflet-providers/preview/#filter=Acetate.basemap)

### Extra methods

One extra method is added:

 - `filter(string)`: if called with a non-empty string is passed, only layers with a name containing that substring are shown, while the others are set to `display: none`. The method will return a map with the layers currently visible.

## Live example

http://jieter.github.io/Leaflet.layerscontrol-minimap/

![Screenshot](screenshot.png)
