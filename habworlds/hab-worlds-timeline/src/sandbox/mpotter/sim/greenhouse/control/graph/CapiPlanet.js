'use strict'
tm.add ('sim.greenhouse.control.graph.CapiPlanet', ['sim.greenhouse.control.graph.Planet'], function (o, p, d) {
    o.setup = function (config) {
        var item, key, list;

        d.onChange = config.onChange;

        list = d.gasRepo;
        for (key in list) {
            item = list [key];

            item.setCapiListener (o.onCapiChange)
        }
    }

    o.onCapiChange = function (name, data) {
        var actualName, pressure;

        actualName = data.name;

        if (data.key == 'selected') {
            if (data.value) {
                o.plotGasData ({ name: actualName })
            }
            else {
                o.removeData ({ name: actualName })
            }

            if (d.onChange) {
                d.onChange ({
                    type: data.key,
                    name: actualName,
                    value: data.value
                })
            }
        }
        else if (data.key == 'pressure') {
            pressure = 1 - ( 1 * (data.value / 100));

            o.plotGasData ({
                name: actualName,
                pressure: pressure
            })
        }
        else if (data.key == 'pressureSliderEnabled') {
            actualName = d.gasKeyRepo [data.simModel.get ('name')];

            if (d.onChange) {
                d.onChange ({
                    type: data.key,
                    name: actualName,
                    value: data.value
                })
            }
        }
    }
})
