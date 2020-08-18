'use strict';

import Locations from '../model/Locations.js';
import {Position} from '../model/Position.js';

const currentUrl = new URL(window.location.href);
const urlArea = currentUrl.searchParams.get("area");
const urlRadius = currentUrl.searchParams.get("radius");

var area = L.circle([]);

export var AreaMarker = L.Control.extend({
    options: {
        position: 'topleft',
    },
    

    _createArea: function() {
        var area = new L.FeatureGroup();

        for (var x = MIN_X; x <= MAX_X; x += REGION_WIDTH) {
            var startPos = new Position(x, MIN_Y, 0);
            var endPos = new Position(x, MAX_Y, 0);

            var line = L.polyline([startPos.toLatLng(this._map), endPos.toLatLng(this._map)], {clickable: false})
            gridFeatureGroup.addLayer(line);
        }

        for (var y = MIN_Y; y <= MAX_Y; y += REGION_HEIGHT) {
            var startPos = new Position(MIN_X, y, 0);
            var endPos = new Position(MAX_X, y, 0);

            var line = L.polyline([startPos.toLatLng(this._map), endPos.toLatLng(this._map)], {clickable: false})
            gridFeatureGroup.addLayer(line);
        }

        var area = L.circle([{urlCentreX}, {urlCentreY}], {
            color: 'blue',
            fillColor: '#f03',
            fillOpacity: 0.5,
            radius: urlRadius
        }).addTo(map);

        return _createArea;
    }

});