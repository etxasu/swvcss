/*
    Creates all the bins used for storing carbon and connection controller
*/
'use strict'
tm.add ('sim.geo.chemical.app.Bin', ['sim.geo.chemical.app.Base'], function (o, p, d) {
    o.setup = function (config) {
        var radius, selector, type;

        d.controlsGroup = tm.new ('component.named.Group', {
            selector: '#left-sidebar-body',
            id: 'controls-group',
            title: 'Controls'
        })

        d.controlsGroup.getDom ().addClass ('slider-group')

        d.temperature = 255;

        d.effectiveTempSlider = tm.new ('component.property.input.Slider', {
            selector: '#controls-group > .content',
            min: 200,
            mid: 300,
            max: 400,
            step: 1,
            decimals: 0,
            title: 'Effective Temperature (K)',
            name: 'effective-temp',
            onChange: o.onSliderChange
        })

        d.effectiveTempSlider.setValue (255)

        d.h2oLabel = tm.new ('component.property.Label', {
            id: 'h2o-greenhouse-label',
            title: 'H<sub>2</sub>O Greenhouse (K)',
            value: 30,
            selector: d.controlsGroup.getContentSelector (),
            unit: 'unitless',
        })

        d.h2oGreenhouse = 30;

        d.co2Label = tm.new ('component.property.Label', {
            id: 'co2-greenhouse-label',
            title: 'CO<sub>2</sub> Greenhouse (K)',
            value: 30,
            selector: d.controlsGroup.getContentSelector (),
            unit: 'unitless',
        })

        d.co2Greenhouse = 30;

        d.surfaceTempLabel = tm.new ('component.property.Label', {
            id: 'surface-temp-label',
            title: 'Surface Temperature (K)',
            value: 30,
            selector: d.controlsGroup.getContentSelector (),
            unit: 'unitless',
        })

        d.sliderGroup = tm.new ('component.named.Group', {
            selector: '#left-sidebar-body',
            id: 'slider-group',
            title: 'Flow Sliders'
        })

        d.sliderGroup.getDom ().addClass ('slider-group')

        d.connectionRepo = {};

        d.bin = {
            radius: 30,
            selector: d.sliderGroup.getContentSelector (),
            type: config.binType,
        }

        d.binRepo = {
            'Air': o.createBin ({
                title: 'Air',
                x: 400, y: 40,
            }),
            'Rain': o.createBin ({
                title: 'Rain',
                x: 600, y: 40
            }),
            'Soil': o.createBin ({
                title: 'Soil',
                x: 480, y: 140
            }),
            'River': o.createBin ({
                title: 'River',
                x: 480, y: 240
            }),
            'Ocean': o.createBin ({
                title: 'Ocean',
                x: 600, y: 320
            }),
            'Sea Floor': o.createBin ({
                title: 'Sea Floor',
                x: 600, y: 400
            }),
            'Volcano': o.createBin ({
                title: 'Volcano',
                x: 400, y: 440
            }),
            'Moon': o.createBin ({
                title: 'Moon',
                x: 80, y: 80,
                radius: 20
            }),
        }
    }

    o.createBin = function (data) {
        var bin;

        if (data.type === undefined) { data.type = d.bin.type }
        if (data.radius === undefined) { data.radius = d.bin.radius }

        bin = tm.new (data.type, {
            x: data.x, y: data.y,
            radius: data.radius,
            title: data.title,
            onConnection: o.onConnection,
            onConnectionRemoved: o.onConnectionRemoved,
            onCarbonChange: o.onCarbonChange,
            svg: d.svg,
            selector: d.bin.selector,
        })

        return bin
    }

    o.onCarbonChange = function () {}

    o.onConnection = function (data) {
        var connectionKey, end, start;

        start = {
            bin: data.startBin,
            title: data.startBin.getTitle (),
        }

        end = {
            bin: data.endBin,
            title: data.endBin.getTitle (),
        }

        connectionKey = data.connectionKey

        if (!d.connectionRepo [ connectionKey ]) {
            d.connectionRepo [connectionKey] = {
                start: start.bin,
                end: end.bin,
                remove: function () { o.removeConnection (connectionKey) }
            }
        }
    }

    o.onConnectionRemoved = function (data) {
        var key, item, list;

        key = data.connectionKey;

        delete d.connectionRepo [ key ];
    }

    o.onSliderChange = function (data) {}
})
