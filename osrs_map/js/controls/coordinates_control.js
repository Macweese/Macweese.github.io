'use strict';

import {Position} from '../model/Position.js';

export var CoordinatesControl = L.Control.extend({
    options: {
        position: 'topleft'
    },

    onAdd: function (map) {

        var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control');
        container.id = 'coordinates-container';
        container.style.height = 'auto';
        L.DomEvent.disableClickPropagation(container);

        var coordinatesForm = L.DomUtil.create('form', 'leaflet-bar leaflet-control leaflet-control-custom form-inline', container);
        
        var formGroup = L.DomUtil.create('div', 'form-group', coordinatesForm);
        
        this._xCoordInput = this._createInput("xCoord", "x", formGroup);
        this._yCoordInput = this._createInput("yCoord", "y", formGroup);
        this._zCoordInput = this._createInput("zCoord", "z", formGroup);

        L.DomEvent.on(this._map, 'mousemove', this._setMousePositionCoordinates, this);

        return container;
    },

    _createInput: function(id, title, container, keyupFunc) {
        var coordInput = L.DomUtil.create('input', 'form-control coord', container);
        coordInput.type = 'text';
        coordInput.id = id;

        L.DomEvent.disableClickPropagation(coordInput);
        L.DomEvent.on(coordInput, 'keyup', this._goToCoordinates, this);

        return coordInput;
    },

    _goToCoordinates: function() {
        var x = this._xCoordInput.value;
        var y = this._yCoordInput.value;
        var z = this._zCoordInput.value;

        if (!$.isNumeric(x) || !$.isNumeric(y) || !$.isNumeric(z)) {
            return;
        }

//        var url = window.location.href;
//        var str = "https://macweese.github.io/?centreX=3178&centreY=3495&centreZ=0&zoom=9";
//        var xxxx = url.search("X=");
//        var yyyy = url.search("Y=");
//        var zzzz = url.search("Z=");
//        var ZUrl = url.search("m=");
//        console.log(xUrl);
//        console.log(yUrl);
//        console.log(zUrl);
//        //var xUrlLength = xUrl+4;
//        //var yUrlLength = yUrl+4;
//        //var zUrlLength = zUrl+1;
//        //var x = url.slice(xUrl, xUrlLength);
//        //var y = url.slice(zUrl, yUrlLength);
//        //var z = url.slice(yUrl, zUrlLength);
//
//        this._searchMarker = new L.marker(new Position(xUrl, yUrl, zUrl).toCentreLatLng(this._map));
//
//        this._searchMarker.addTo(this._map);
//
//        this._map.panTo(this._searchMarker.getLatLng());

        if (this._searchMarker !== undefined) {
            this._map.removeLayer(this._searchMarker);
        }

        this._searchMarker = new L.marker(new Position(x, y, z).toCentreLatLng(this._map));
        console.log(x, y, z);
	
		this._searchMarker.once('click', (e) => this._map.removeLayer(this._searchMarker));
		
        this._searchMarker.addTo(this._map);

        this._map.panTo(this._searchMarker.getLatLng());
		
		if (this._map.plane != z) {
			this._map.plane = z;
			this._map.updateMapPath();
		}
    },

    _setMousePositionCoordinates: function(e) {
		if (this._map.getContainer() !== document.activeElement) {
			return;
		}
		
        var mousePos = Position.fromLatLng(this._map, e.latlng, this._map.plane);

        this._xCoordInput.value = mousePos.x;
        this._yCoordInput.value = mousePos.y;
        this._zCoordInput.value = mousePos.z;
    }
});