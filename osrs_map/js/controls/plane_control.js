'use strict';

export var PlaneControl = L.Control.extend({
    options: {
        position: 'topleft'
    },

    onAdd: function (map) {
        var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control noselect');
        container.style.background = 'none';
        container.style.width = '40px';
        container.style.height = 'auto';
        

        var incrementPlaneButton = L.DomUtil.create('a', 'leaflet-bar leaflet-control leaflet-control-custom', container);
        incrementPlaneButton.id = 'increase-level';
        incrementPlaneButton.innerHTML = '<span class="fa-stack fa-1x" id="layer-down"><i class="fa fa-arrow-up fa-stack-1x" style="color:DeepSkyBlue; opacity: 0.8"></i><i class="fas fa-layer-group fa-stack-2x" style="opacity: 0.5"></i></span>';
        L.DomEvent.on(incrementPlaneButton, 'click', this._increasePlane, this);

        var decrementPlaneButton = L.DomUtil.create('a', 'leaflet-bar leaflet-control leaflet-control-custom', container);
        decrementPlaneButton.id = 'decrease-level';
        decrementPlaneButton.innerHTML = '<span class="fa-stack fa-1x"><i class="fa fa-arrow-down fa-stack-1x" style="color:Tomato; opacity: 0.8"></i><i class="fas fa-layer-group fa-stack-2x" style="opacity: 0.5"></i></span>';

        L.DomEvent.on(decrementPlaneButton, 'click', this._decreasePlane, this);

        L.DomEvent.disableClickPropagation(container);
        return container;
    },

    _increasePlane: function() {
        if (this._map.plane == 3) {
            return;
        }
        this._map.plane++;
        this._map.updateMapPath();
        this._dispatchPlaneChangedEvent();
    },

    _decreasePlane: function() {
        if (this._map.plane == 0) {
            return;
        }
        this._map.plane--;
        this._map.updateMapPath();
        this._dispatchPlaneChangedEvent();
    },

    _dispatchPlaneChangedEvent: function() {
        this._map.fire('planeChanged', {
            plane: this._map.plane
        });
    }
});