var map = L.map('map', {
    zoomControl: false,
    center: [48, -3],
    zoom: 5
});

var geojson = JSON.parse('{"type":"FeatureCollection","features":[{"type":"Feature","properties":{},"geometry":{"type":"Point","coordinates":[2.63671875,65.87472467098549]}},{"type":"Feature","properties":{},"geometry":{"type":"Point","coordinates":[-14.765625,-3.864254615721396]}},{"type":"Feature","properties":{},"geometry":{"type":"Point","coordinates":[4.74609375,45.706179285330855]}},{"type":"Feature","properties":{},"geometry":{"type":"LineString","coordinates":[[-13.18359375,46.437856895024225],[-8.96484375,49.83798245308484],[-5.09765625,43.83452678223684],[-30.41015625,38.272688535980976],[-32.34375,55.87531083569679],[-42.01171875,54.97761367069625],[-62.22656249999999,30.751277776257812]]}},{"type":"Feature","properties":{},"geometry":{"type":"Polygon","coordinates":[[[-13.0078125,12.039320557540584],[-13.0078125,39.36827914916014],[16.5234375,29.99300228455108],[9.4921875,12.039320557540584],[-13.0078125,12.039320557540584]]]}}]}');

var baselayers = {
    'OpenStreetMap': L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
    }),

    'MapQuest Aerial': L.tileLayer('http://oatile{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.jpg', {
        attribution: 'Tiles Courtesy of <a href="http://www.mapquest.com/">MapQuest</a> &mdash; Portions Courtesy NASA/JPL-Caltech and U.S. Depart. of Agriculture, Farm Service Agency',
        subdomains: '1234'
    }),

    'Stamen Toner': L.tileLayer('http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png', {
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
        subdomains: 'abcd',
        minZoom: 0,
        maxZoom: 20
    }),

    'Stamen Watercolor': L.tileLayer('http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg', {
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
        subdomains: 'abcd',
        minZoom: 3,
        maxZoom: 16
    })
};

var overlays = {
    'Polygon': L.polygon(
        [[0, 0], [48, -3], [50, -3], [50, -4], [52, 4], [0, 0]], {
            color: '#aa0000',
            fillColor: '#ff0000'
        }
    ),

    'GeoJSON': L.geoJson(geojson, {
        style: function (feature) {
            if (feature.geometry.type === 'LineString') {
                return {
                    color: '#ff00ff'
                };
            }
        }
    }),

    'FeatureGroup': L.featureGroup([
        L.marker([42, -2]),
        L.marker([43, -3]),
        L.marker([44, -4]),
        L.marker([45, -5]),
        L.marker([46, -6]),
        L.polyline([[42, -2], [46, -6]]),
        L.circle([44, -4], 240000, {
            color: '#000fff'
        })
    ]),

    'LayerGroup': L.layerGroup([
        L.marker([52, 2]),
        L.marker([53, 3]),
        L.marker([54, 4]),
        L.marker([55, 5]),
        L.marker([56, 6]),
        L.polyline([[52, 2], [56, 6]]),
        L.circle([54, 4], 240000, {
            color: '#fff000'
        })
    ]),

    'Marker': L.marker([50, 2]),
    'Polyline': L.polyline(
        [[48, -3], [50, -3], [50, -4], [52, 4], [0, 0]]
    ),
    'Circle': L.circle([53, 4], 111111)
};


var layersControl = L.control.layers.minimap(baselayers, overlays, {
    collapsed: false
}).addTo(map);

var filter = function () {
    var hash = window.location.hash;
    var filterIndex = hash.indexOf('filter=');
    if (filterIndex !== -1) {
        var filterString = hash.substr(filterIndex + 7).trim();
        layersControl.filter(filterString);
    }
};

baselayers.OpenStreetMap.addTo(map);

L.DomEvent.on(window, 'hashchange', filter);
filter();

var info = L.control();
info.options.position = 'topleft';
info.onAdd = function () {
    var div = L.DomUtil.create('div', 'info');
    L.DomUtil.create('h4', '', div).innerHTML = '<a href="https://github.com/jieter/Leaflet.layerscontrol-minimap">Leaflet.layers-control-minimap preview</a>';
    L.DomUtil.create('p', '', div).innerHTML = 'Leaflet layers control showing minimaps.';

    return div;
};

info.addTo(map);
