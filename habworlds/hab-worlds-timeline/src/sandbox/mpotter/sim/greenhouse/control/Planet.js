'use strict'
tm.add ('sim.greenhouse.control.Planet', ['sim.greenhouse.control.Base'], function (o, p, d) {
    o.setup = function (config) {
        d.id = 'planet-named-group';

        // Create dom elements
        d.group = tm.new ('sim.greenhouse.named.Group', {
            id: d.id,
            title: 'Planet',
            selector: d.selector
        })

        d.distance = {
            min: 0.01,
            max: 50,
            earthLike: 1
        }

        // Kelvin rates when earth is a black body
        d.kelvin = {
            earthLike: 255,
            current: 255,
            min: 22.6,
            max: 11460
        }

        // The min kelvin is applied in the calculation so it needs to be removed
        // from whatever the earthlike temperature is
        d.earthLike -= d.kelvin.min

        // Multiply the kelvin calculated by this.
        d.albedo = {
            earthLike: 0.3
        }

        d.kelvin.current = d.kelvin.max * (1 - d.albedo) * d.albedoModifier + d.kelvin.min

        d.distanceSlider = tm.new ('sim.greenhouse.property.input.Slider', {
            id: 'planet-distance-slider',
            title: 'Distance (au)',
            min: d.distance.min,
            max: d.distance.max,
            step: 0.01,
            selector: '#' + d.id,
            unit: 'au',
            value: 1,
            onChange: o.onDistanceChange
        })

        d.albedoSlider = tm.new ('sim.greenhouse.property.input.Slider', {
            id: 'planet-albedo-slider',
            title: 'Albedo',
            min: 0.001,
            max: 1,
            step: 0.001,
            selector: '#' + d.id,
            unit: 'unitless',
            value: 0.3,
            onChange: o.onAlbedoChange
        })


        d.peakLabel = tm.new ('sim.greenhouse.property.Label', {
            id: 'planet-peak-label',
            title: 'Peak λ (nm)',
            value: 0,
            selector: '#' + d.id,
            unit: 'nm'
        })

        d.temperatureLabel = tm.new ('sim.greenhouse.property.Label', {
            id: 'planet-temperature-label',
            title: 'Effective Temperature (K)',
            value: 0,
            selector: '#' + d.id,
            unit: 'k'
        })

        d.otherTemperatureLabel = tm.new ('sim.greenhouse.property.Label', {
            id: 'other-planet-temperature-label',
            title: 'Planet Effective Temperature (K)',
            value: 277.6,
            selector: '#header-bar',
            unit: 'k'
        })

        d.otherTemperatureLabel.getDom ().addClass ('header-bar-label')

        d.dom = d.group.getDom ();

    }

    o.getAlbedo = function () { return d.albedoSlider.getValue () }
    o.getDistance = function () { return d.distanceSlider.getValue () }
    o.getDistanceMinMax = function () { return d.distance }
    o.getPeakWavelength = function () { return d.peakLabel.getValue () }
    o.getTemperature = function () { return d.kelvin.current }

    o.start = function () {
        // d.distanceSlider.setValue (1)
        // d.albedoSlider.setValue (10)
    }

    o.onDistanceChange = function (data) {
        // Equation for temperature here!
        d.distance.current = data.coreValue
        o.calculateKelvin ();

        d.temperatureLabel.setValue (d.kelvin.current);
        if (typeof d.onChange == 'function') { d.onChange ({
            type: 'distance',
            value: data.coreValue
        }) }
    }

    o.onAlbedoChange = function (data) {
        // d.peakLabel.setValue (data.coreValue);
        d.albedo.current = data.coreValue;
        o.calculateKelvin ();

        d.temperatureLabel.setValue (d.kelvin.current);
        d.otherTemperatureLabel.setValue (d.kelvin.current);
        if (typeof d.onChange == 'function') { d.onChange ({
            type: 'albedo',
            value: data.coreValue
        }) }
    }

    o.calculateKelvin = function () {
        var albedoMod, distanceMod, kelvinMod;

        albedoMod = d.albedo.current / d.albedo.earthLike;
        distanceMod = d.distance.current / d.distance.earthLike;

        if (albedoMod === 0) { albedoMod = 0.01 }

        kelvinMod = ( d.kelvin.earthLike / (albedoMod * distanceMod) );
        d.kelvin.current = kelvinMod + d.kelvin.min

        d.kelvin.current = Math.round (d.kelvin.current * 100) / 100
    }

    o.setAlbedo = function (value) {
        d.albedoSlider.setValue (value);
    }

    o.setDistance = function (value) {
        d.distanceSlider.setValue (value);
    }

    o.setPeakWavelength = function (frequency) {
        // Converting micrometers to nanometers
        d.peakLabel.setValue (frequency * 1000)
    }

})
