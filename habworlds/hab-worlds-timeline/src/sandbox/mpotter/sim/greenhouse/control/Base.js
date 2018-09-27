// This will hold any functionality/setup that is shared amongst the control objects
'use strict'
tm.add ('sim.greenhouse.control.Base', ['tm.svg.Dom'], function (o, p, d) {
    o.setup = function (config) {
        d.onChange = config.onChange;
        d.selector = config.selector;
        d.app = config.app;
        d.mass = 1;
        d.sunTemp = 5800;
        d.effectiveTemperature = d.sunTemp;
    }

    o.calculateEffectiveTemperature = function (data) {
        var effectiveTemperature, sunMass;

        effectiveTemperature = d.sunTemp * d.mass

        d.effectiveTemperature = effectiveTemperature
        d.temperatureLabel.setValue (Math.floor (effectiveTemperature));
    }

    o.getEffectiveTemperature = function () { return d.effectiveTemperature }

    o.resizeGraph = function () {
        if (d.graph) {
            d.graph.resizeGraph ()
        }
    }

    o.setComponentVisible = function (key, visible) {
        if (visible) {
            d [key].getDom ().removeClass ('hide')
        }
        else {
            d [key].getDom ().addClass ('hide')
        }
    }

    o.setComponentEnabled = function (key, enabled) {
        d [key].setEnabled (enabled)
    }
})
