'use strict';

import {Position} from '../model/Position.js';

const currentUrl = new URL(window.location.href);

const urlCentreX = currentUrl.searchParams.get("centreX");
const urlCentreY = currentUrl.searchParams.get("centreY");
const urlCentreZ = currentUrl.searchParams.get("centreZ");
const urlRadius = currentUrl.searchParams.get("rad");
const urlZoom = currentUrl.searchParams.get("zoom");
const urlArea = currentUrl.searchParams.get("area");

export var circleControl = L.Control.extend({

    onAdd: function (map) {

        this._areaMarkerGroup = this._createAreaMarker();

    },

    _createAreaMarker: function() {
        var x = urlCentreX;
        var y = urlCentreY;

        if (!$.isNumeric(x) || !$.isNumeric(y) || !$.isNumeric(z)) {
            return;
        }

        if (this._areaMarkerGroup !== undefined) {
            this._map.removeLayer(this._areaMarkerGroup);
        }

        var areaMarkerGroup = new L.FeatureGroup();

        var circle = L.circle([x.toLatLng(this._map), y.toLatLng(this._map)], {radius: 100, clickable: true})
        areaMarkerGroup.addLayer(circle);

        this._areaMarkerGroup.once('click', (e) => this._map.removeLayer(this._areaMarkerGroup));

        currentUrl.searchParams.append("rad", "100")

        this._map.panTo(this._areaMarkerGroup.getLatLng());
		
		if (this._map.plane != z) {
			this._map.plane = z;
			this._map.updateMapPath();
		}

        return _areaMarkerGroup;
    }
});