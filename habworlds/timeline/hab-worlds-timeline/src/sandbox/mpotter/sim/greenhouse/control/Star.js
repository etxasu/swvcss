'use strict'
tm.add ('sim.greenhouse.control.Star', ['sim.greenhouse.control.Base'], function (o, p, d) {
    o.setup = function (config) {
        d.id = 'star-named-group';

        // Create dom elements
        d.group = tm.new ('sim.greenhouse.named.Group', {
            id: d.id,
            title: 'Star',
            selector: d.selector
        })

        d.lum = {
            min: 0.001,
            max: 10000,
        }

        d.luminositySlider = tm.new ('sim.greenhouse.property.input.Slider', {
            id: 'star-luminosity-slider',
            title: 'Luminosity (L<sub>s</sub>)',
            min: d.lum.min,
            max: d.lum.max,
            mid: 1,
            step: 0.0001,
            selector: '#' + d.id,
            unit: 'ls',
            value: 1,
            onChange: o.onChange
        })

        d.massLabel = tm.new ('sim.greenhouse.property.Label', {
            id: 'star-mass-label',
            title: 'Mass (M<sub>s</sub>)',
            value: 100,
            selector: '#' + d.id,
            unit: 'ms'
        })

        d.peakLabel = tm.new ('sim.greenhouse.property.Label', {
            id: 'star-peak-label',
            title: 'Peak λ (nm)',
            value: 100,
            selector: '#' + d.id,
            unit: 'nm'
        })

        d.temperatureLabel = tm.new ('sim.greenhouse.property.Label', {
            id: 'star-temperature-label',
            title: 'Effective Temperature (K)',
            value: 90,
            selector: '#' + d.id,
            unit: 'ls'
        })

        d.dom = d.group.getDom ();
    }

    o.calculateMass = function (data) {
        var mass, lum, value;

        lum = data.value;
        // This is the correct formula
        mass = Math.pow ( lum, (1 / 3.5) ).toFixed (2)

        d.massLabel.setValue (mass);
        d.mass = mass
    }

    o.getLuminosity = function () { return d.luminositySlider.getValue ().value; }
    o.getLuminosityLimits = function () { return d.lum }

    o.onChange = function (data) {
        o.calculateMass (data);
        o.calculateEffectiveTemperature (data);

        if (typeof d.onChange == 'function') { d.onChange ({
            type: 'luminosity',
            value: data.coreValue,
            maxValue: d.lum.max,
            minValue: d.lum.min,
            percent: data.percent
        }) }
    }

    o.setMass = function (mass) {
        var lum;

        d.massLabel.setValue (mass);
        d.mass = mass;

        lum = mass * d.sunTemp;
        o.setLuminosity (lum);
    }

    o.getPeakWavelength = function () {
        return d.peakLabel.getValue ()
    }

    o.getluminosity = function () {
        return d.luminositySlider.getValue ()
    }

    o.getTemperature = function () {
        return d.temperatureLabel.getValue ()
    }

    o.getMass = function () {
        return d.massLabel.getValue ()
    }

    o.setPeakWavelength = function (frequency) {
        // Converting micrometers to nanometers
        d.peakLabel.setValue (frequency * 1000)
    }

    o.setLuminosity = function (lum) {
        d.luminositySlider.setValue (lum)
    }

    o.override ({
        calculateEffectiveTemperature: function (original, data) {
            var effectiveTemperature, maxTemp, percent, sunMass, temp;

            maxTemp = 25000;
            temp = d.sunTemp * d.mass

            if (temp > d.sunTemp) {
                percent = d.luminositySlider.getValue ().value / d.lum.max;
                temp = ((maxTemp - d.sunTemp) * percent ) + d.sunTemp;

            }

            d.effectiveTemperature = temp
            d.temperatureLabel.setValue (Math.floor (temp));
        }
    })
})
