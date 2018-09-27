'use strict'
tm.add ('sim.greenhouse.control.Atmosphere', ['sim.greenhouse.control.Base', 'sim.greenhouse.control.atmosphere.Capi'], function (o, p, d) {
    o.setup = function (config) {
        d.id = 'atmos-named-group';
        d.planetGroupId = d.id + '-planet'

        d.dom = document.createElement ('div');
        d.dom.id = d.id;
        d.dom = $ (d.dom)

        d.pressureMin = 0.001;
        d.pressureMax = 3.721;

        d.totalPressure = 0;

        // Create dom elements

        // Create planet section
        d.planetGroup = tm.new ('sim.greenhouse.named.Group', {
            id: d.planetGroupId,
            title: 'Planet',
            selector: 'body'
        })

        d.energyLabel = tm.new ('sim.greenhouse.property.Label', {
            id: 'atmos-energy-label',
            title: 'Energy Absorbed %',
            value: 0,
            selector: '#' + d.planetGroupId,
            unit: '%'
        })

        d.transmittedLabel = tm.new ('sim.greenhouse.property.Label', {
            id: 'atmos-transmitted-label',
            title: 'Energy Transmitted %',
            value: 100,
            selector: '#' + d.planetGroupId,
            unit: 'unitless'
        })

        d.totalPressureLabel = tm.new ('sim.greenhouse.property.Label', {
            id: 'atmos-pressure-label',
            title: 'Total Pressure (atm)',
            value: 0,
            selector: '#' + d.planetGroupId,
            unit: 'atm'
        })

        // Append planet section
        d.dom.append (d.planetGroup.getDom ())

        // Create button section
        d.toggleId = 'atmo-gas-toggle';

        var item, key, list;
        // NOTE: Change this to load in data from another object dedicated to holding
        // informtaion about the various gases
        list = [
            { name: 'CO' }, { name: 'N₂O' }, { name: 'O₂' }, { name: 'H₂S' }, { name: 'Ar' },

            { name: 'CO₂' }, { name: 'NO' }, { name: 'O₃' }, { name: 'SO₂' }, { name: 'Kr' },

            { name: 'CH₄' }, { name: 'NO₂' }, { name: 'H₂' }, { name: 'He' }, { name: 'Xe' },

            { name: 'N₂' }, { name: 'NH₃' }, { name: 'H₂O' }, { name: 'Ne' }
        ]

        var replaceWith = {
            '₂': '<sub>2</sub>',
            '₃': '<sub>3</sub>',
            '₄': '<sub>4</sub>',
        }

        for (key in list) {
            item = list [key];

            item.label = item.name

            var subKey, subItem;
            for (subKey in replaceWith) {
                subItem = replaceWith [subKey]

                if (item.name.indexOf (subKey) > -1) {
                    item.label = item.name.replace (subKey, subItem)
                }
            }

            item.id = d.toggleId + list [key].name;
            item.clickHandler = {
                handler: o.toggleGasInputSlider,
                data: { name: item.name, label: item.label }
            }
        }

        d.gasButtonManager = tm.new ('sim.greenhouse.property.toggle.Group', {
            id: d.toggleId,
            selector: '#' + d.id,
            toggleList: list,
        })

        d.activeGasInputSliders = {}

        // Append button section
        d.dom.append (d.gasButtonManager.getDom ())


        // Create gas control section
        d.gasControlId = d.id + '-gas-control'

        d.gasControlGroup = tm.new ('sim.greenhouse.named.Group', {
            id: d.gasControlId,
            title: 'Atmospheric Gases Present (atm)',
            selector: 'body'
        })

        // Append gas control section
        d.dom.append (d.gasControlGroup.getDom ());

        // Create area for holding gas slider-inputs
        d.gasSliderInputId = d.id + '-gas-slider-input'

        d.gasSliderInputArea = document.createElement ('div');
        d.gasSliderInputArea.id = d.gasSliderInputId
        d.gasSliderInputArea = $ (d.gasSliderInputArea);
        d.gasSliderInputArea.addClass ('atmosphere input-slider area')

        d.gasControlGroup.getDom ().append (d.gasSliderInputArea);

        $ (d.selector).append (d.dom);

        d.onChange = config.onChange

        o.addCapiForGasButtons (list);
    }

    o.calculateTotalPressure = function () {
        var item, key, list, pressure;

        pressure = 0;
        list = d.activeGasInputSliders;
        for (key in list) {
            item = list [key]

            if (item.active) {
                pressure += item.slider.getValue ().value;
            }
        }

        d.totalPressure = pressure;
        d.totalPressureLabel.setValue (pressure.toFixed (3))
    }

    o.onGasChange = function (data) {
        o.calculateTotalPressure ();

        if (typeof data == 'object') { data.type = 'pressure' }
        if (typeof d.onChange == 'function') { d.onChange (data) }
    }

    o.getGasButtonManager = function () { return d.gasButtonManager }
    o.getTotalPressure = function () { return d.totalPressure }

    o.setEnergyAbsorbed = function (absorption, transmission) {
        d.energyLabel.setValue (absorption);
        d.transmittedLabel.setValue (transmission)
    }

    o.setGasSliderEnabled = function (name, enabled) {
        if (d.activeGasInputSliders [name]) {
            d.activeGasInputSliders [name].slider.setEnabled (enabled)
        }
    }

    o.setGasPressure = function (name, pressure) {
        if (d.activeGasInputSliders [name]) {
            d.activeGasInputSliders [name].slider.setValue (pressure)
        }
    }

    o.toggleGasInputSlider = function (data, event) {
        var slider;

        if (!d.activeGasInputSliders [data.name]) {
            d.activeGasInputSliders [data.name] = {}
        }

        if (!d.activeGasInputSliders [data.name].active) {

            if (!d.activeGasInputSliders [data.name].slider) {
                slider = tm.new ('sim.greenhouse.property.input.Slider', {
                    id: 'atmos-gas-input-slider-' + data.name,
                    title: data.label,
                    min: d.pressureMin,
                    max: d.pressureMax,
                    selector: 'body',
                    unit: 'atm',
                    value: 1,
                    step: 0.001,
                    onChange: function (evntData) {
                        o.onGasChange (
                            Object.assign (
                                evntData,
                                { name: data.name, active: true }
                            )
                        )
                    }
                })

                d.activeGasInputSliders [data.name].slider = slider
                d.gasSliderInputArea.append (slider.getDom ())
            }
            else {
                slider = d.activeGasInputSliders [data.name].slider.getDom ();

                d.gasSliderInputArea.append (slider)
                slider.removeClass ('hide')
            }

            d.activeGasInputSliders [data.name].active = true;

            d.gasSliderInputArea.scrollTop (d.gasSliderInputArea [0].scrollHeight);

            if (typeof d.onChange == 'function') {
                slider = d.activeGasInputSliders [data.name].slider

                d.onChange ({
                    type: 'active',
                    name: data.name,
                    value: slider.getValue ().value,
                    active: true
                })
            }
        }
        else {
            slider = d.activeGasInputSliders [data.name].slider
            slider.getDom ().addClass ('hide')
            d.activeGasInputSliders [data.name].active = false;

            if (typeof d.onChange == 'function') {
                d.onChange ({
                    type: 'active',
                    name: data.name,
                    value: slider.getValue ().value,
                    active: false
                })
            }
        }

        o.calculateTotalPressure ();
    }
})
