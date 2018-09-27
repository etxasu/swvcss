'use strict'
tm.add ('sim.greenhouse.control.graph.Star', ['sim.greenhouse.control.graph.Planet'], function (o, p, d) {
    o.setup = function (config) {
        var item, key, list, pressure;

        if (!config.id) { config.id = 'star-graph-control' }

        d.id = config.id;

        d.absorbedLabel = tm.new ('sim.greenhouse.property.Label', {
            id: 'star-energy-label',
            title: 'Energy Absorbed %',
            value: 0,
            selector: 'body',
            unit: '%'
        })

        d.transmittedLabel = tm.new ('sim.greenhouse.property.Label', {
            id: 'star-transmitted-label',
            title: 'Energy Transmitted %',
            value: 100,
            selector: 'body',
            unit: 'unitless'
        })

        pressure = 1
        d.baseGasPressureRepo = {}
        // list = d.gasRepo;
        // for (key in list) {
        //     item = list [key];
        //
        //     d.activeGasRepo [key] = true;
        //     d.baseGasPressureRepo [key] = pressure;
        //     item.setActive (true)
        //     item.setPressure (pressure);
        // }

        $ (d.absorbedLabel.getDom ()).addClass ('star-graph-label')
        $ (d.transmittedLabel.getDom ()).addClass ('star-graph-label')

        window.setTimeout (function () {
            $ ('#graph-tabber-right-tabs-content-0').append (
                d.absorbedLabel.getDom (),
                d.transmittedLabel.getDom ()
            )
        }, 500)
    }

    // Before plotting gas data, add planet gas pressures to the baseGasPressures to
    // get the result for plotting
    o.configureGasRepo = function () {
        var base, gas, item, key, list;

        list = d.gasRepo
        for (key in list) {
            item = list [key];

            gas = d.planetGasRepo [key].getPressure ();

            if (!gas) { gas = 0 }

            item.setPressure (gas + d.baseGasPressureRepo [key]);
        }
    }

    o.setPlanetGasRepo = function (repo) { d.planetGasRepo = repo }

    o.override ({
        plotGasData: function (original, data) {
            var result;
            o.configureGasRepo ();

            original (data)

            result = o.calculateTotalTransmission ();

            d.transmittedLabel.setValue (result.totalTransmission)
            d.absorbedLabel.setValue (result.totalAbsorption)
        }
    })
})
