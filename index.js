/*
 * Leaflet.layerscontrol-minimap
 *
 * Layers control with synced minimaps for Leaflet.
 *
 * Jan Pieter Waagmeester <jieter@jieter.nl>
 */
var cloneLayer = require('leaflet-clonelayer');

require('leaflet.sync');

L.Control.Layers.Minimap = L.Control.Layers.extend({
    options: {
        position: 'topright',
        topPadding: 10,
        bottomPadding: 40,
        overlayBackgroundLayer: L.tileLayer('http://{s}.tile.openstreetmap.se/hydda/base/{z}/{x}/{y}.png', {
            attribution: 'Tiles courtesy of <a href="http://openstreetmap.se/" target="_blank">OpenStreetMap Sweden</a> &mdash; ' +
            'Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        })
    },

    filter: function (string) {
        string = string.trim();

        var visibleLayers = {};
        var layerLabels = this._container.querySelectorAll('label');
        for (var i = 0; i < layerLabels.length; i++) {
            var layerLabel = layerLabels[i];

            if (string !== '' && layerLabel._layerName.indexOf(string) === -1) {
                L.DomUtil.addClass(layerLabel, 'leaflet-minimap-hidden');
            } else {
                L.DomUtil.removeClass(layerLabel, 'leaflet-minimap-hidden');
                visibleLayers[layerLabel._layerName] = cloneLayer(layerLabel._minimap._layer);
            }
        }
        this._onListScroll();

        return visibleLayers;
    },

    isCollapsed: function () {
        return !L.DomUtil.hasClass(this._container, 'leaflet-control-layers-expanded');
    },

    _expand: function () {
        L.Control.Layers.prototype._expand.call(this);
        this._onListScroll();
    },

    _initLayout: function () {
        L.Control.Layers.prototype._initLayout.call(this);

        L.DomUtil.addClass(this._container, 'leaflet-control-layers-minimap');
        L.DomEvent.on(this._container, 'scroll', this._onListScroll, this);
    },

    _update: function () {
        L.Control.Layers.prototype._update.call(this);

        this._map.on('resize', this._onResize, this);
        this._onResize();

        this._map.whenReady(this._onListScroll, this);
    },

    _addItem: function (obj) {
        var container = obj.overlay ? this._overlaysList : this._baseLayersList;
        var label = L.DomUtil.create('label', 'leaflet-minimap-container', container);
        label._layerName = obj.name;
        var checked = this._map.hasLayer(obj.layer);

        label._minimap = this._createMinimap(
            L.DomUtil.create('div', 'leaflet-minimap', label),
            obj.layer,
            obj.overlay
        );
        var span = L.DomUtil.create('span', 'leaflet-minimap-label', label);

        var input;
        if (obj.overlay) {
            input = document.createElement('input');
            input.type = 'checkbox';
            input.className = 'leaflet-control-layers-selector';
            input.defaultChecked = checked;
        } else {
            input = this._createRadioElement('leaflet-base-layers', checked);
        }
        input.layerId = L.stamp(obj.layer);
        span.appendChild(input);

        L.DomEvent.on(label, 'click', this._onInputClick, this);

        var name = L.DomUtil.create('span', '', span);
        name.innerHTML = ' ' + obj.name;

        return label;
    },

    _onResize: function () {
        var mapHeight = this._map.getContainer().clientHeight;
        var controlHeight = this._container.clientHeight;

        if (controlHeight > mapHeight - this.options.bottomPadding) {
            this._container.style.overflowY = 'scroll';
        }
        this._container.style.maxHeight = (mapHeight - this.options.bottomPadding - this.options.topPadding) + 'px';
    },

    _onListScroll: function () {
        var minimaps = document.querySelectorAll('label[class="leaflet-minimap-container"]');
        if (minimaps.length === 0) {
            return;
        }

        var first, last;
        if (this.isCollapsed()) {
            first = last = -1;
        } else {
            var minimapHeight = minimaps.item(0).clientHeight;
            var container = this._container;
            var listHeight = container.clientHeight;
            var scrollTop = container.scrollTop;

            first = Math.floor(scrollTop / minimapHeight);
            last = Math.ceil((scrollTop + listHeight) / minimapHeight);
        }

        for (var i = 0; i < minimaps.length; ++i) {
            var minimap = minimaps[i].childNodes.item(0);
            var map = minimap._miniMap;
            var layer = map._layer;

            if (!layer) {
                continue;
            }

            if (i >= first && i <= last) {
                if (!map.hasLayer(layer)) {
                    layer.addTo(map);
                }
                map.invalidateSize();
            } else if (map.hasLayer(layer)) {
                map.removeLayer(layer);
            }
        }
    },

    _createMinimap: function (mapContainer, originalLayer, isOverlay) {
        var minimap = mapContainer._miniMap = L.map(mapContainer, {
            attributionControl: false,
            zoomControl: false
        });

        // disable interaction.
        minimap.dragging.disable();
        minimap.touchZoom.disable();
        minimap.doubleClickZoom.disable();
        minimap.scrollWheelZoom.disable();

        // create tilelayer, but do not add it to the map yet.
        if (isOverlay && this.options.overlayBackgroundLayer) {
            // add a background for overlays if a background layer is defined.
            minimap._layer = L.layerGroup([
                cloneLayer(this.options.overlayBackgroundLayer),
                cloneLayer(originalLayer)
            ]);
        } else {
            minimap._layer = cloneLayer(originalLayer);
        }

        var map = this._map;
        map.whenReady(function () {
            minimap.setView(map.getCenter(), map.getZoom());
            map.sync(minimap);
        });

        return minimap;
    }
});

L.control.layers.minimap = function (baseLayers, overlays, options) {
    return new L.Control.Layers.Minimap(baseLayers, overlays, options);
};
