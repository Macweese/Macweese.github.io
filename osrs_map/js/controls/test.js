'use strict';

import {Position} from '../model/Position.js';

export var testerr = L.Control.extend({

    addTo: function(map) {
        var x = 3100;
        var y = 3100;
        var z = 0;

        this._searchMarker = new L.marker(new Position(x, y, z).toCentreLatLng(this._map));
        console.log(x, y, z);
	
		this._searchMarker.once('click', (e) => this._map.removeLayer(this._searchMarker));
		
        this._searchMarker.addTo(this._map);

        this._map.panTo(this._searchMarker.getLatLng());
		
		if (this._map.plane != z) {
			this._map.plane = z;
			this._map.updateMapPath();
		}
    }
});