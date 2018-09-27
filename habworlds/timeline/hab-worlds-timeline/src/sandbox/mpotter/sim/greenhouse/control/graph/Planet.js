'use strict'
tm.add ('sim.greenhouse.control.graph.Planet', ['sim.greenhouse.control.graph.Base'], function (o, p, d) {
    o.setup = function (config) {
        var dimension, height, padding;

        d.canPlotPlanck = true;
        d.canPlotGas = true;
        d.lastKelvin = 0
        height = 300;

        dimension = {
            height: height,
            width: height
        }

        // padding left + padding right needs to equal 100
        // same with padding top and bottom
        padding = {
            top: 20,
            left: 70,
            bottom: 80,
            right: 30,
        }

        d.graph = tm.new ('sim.greenhouse.graph.Wavelength', {
            selector: {
                container: 'body',
            },
            name: '',
            width: dimension.width,
            height: dimension.height,
            padding: padding,
            segmentCount: 5,
            precision: 100,
            xAxis: {
                label: 'Wavelength of Light (nm)',
                maxValue: 50
            },
            yAxis: {
                label: 'Flux (W/m2)',
                maxValue: 5,
                x: -260, y: 5,
            },
            onZoom: o.onZoom,
            hack: {
                xAxis: {
                    postCaluclationLabelModifier: 1000
                },
                yAxis: {
                    maxLabelLength: 4
                }
            }
        })

        d.gasRepo = {
            'CH₄': tm.new ('app.sim.atmos.data.gas.Ch4', { color: '#e6c35c', name: 'CH₄', }),
            'CO': tm.new ('app.sim.atmos.data.gas.Co', { color: '#dba93a', name: 'CO', }),
            'CO₂': tm.new ('app.sim.atmos.data.gas.Co2', { color: '#e09b49', name: 'CO₂', }),
            'H₂': tm.new ('app.sim.atmos.data.gas.H2', { color: '#61cff2', name: 'H₂', }),
            'H₂O': tm.new ('app.sim.atmos.data.gas.H2o', { color: '#61b1f2', name: 'H₂O', }),
            'H₂S': tm.new ('app.sim.atmos.data.gas.H2s', { color: '#6181f2', name: 'H₂S', }),
            'N₂': tm.new ('app.sim.atmos.data.gas.N2', { color: '#f2616e', name: 'N₂', }),
            'N₂O': tm.new ('app.sim.atmos.data.gas.N2o', { color: '#d94d88', name: 'N₂O', }),
            'NH₃': tm.new ('app.sim.atmos.data.gas.Nh3', { color: '#f261a7', name: 'NH₃', }),
            'NO': tm.new ('app.sim.atmos.data.gas.No', { color: '#c13057', name: 'NO', }),
            'NO₂': tm.new ('app.sim.atmos.data.gas.No2', { color: '#c72752', name: 'NO₂', }),
            'O₂': tm.new ('app.sim.atmos.data.gas.O2', { color: '#c2d3e0', name: 'O₂', }),
            'O₃': tm.new ('app.sim.atmos.data.gas.O3', { color: '#aab3b3', name: 'O₃', }),
            'SO₂': tm.new ('app.sim.atmos.data.gas.So2', { color: '#4bb05b', name: 'SO₂', }),

            // Noble Gases
            'He': tm.new ('app.sim.atmos.data.Gas', { name: 'Helium', molecule: 'He' }),
            'Ne': tm.new ('app.sim.atmos.data.Gas', { name: 'Neon', molecule: 'Ne' }),
            'Ar': tm.new ('app.sim.atmos.data.Gas', { name: 'Argon', molecule: 'Ar' }),
            'Kr': tm.new ('app.sim.atmos.data.Gas', { name: 'Krypton', molecule: 'Kr' }),
            'Xe': tm.new ('app.sim.atmos.data.Gas', { name: 'Xenon', molecule: 'Xe' }),
        }

        d.gasRepo ['He'].generateGasData ();
        d.gasRepo ['Ne'].generateGasData ();
        d.gasRepo ['Ar'].generateGasData ();
        d.gasRepo ['Kr'].generateGasData ();
        d.gasRepo ['Xe'].generateGasData ();

        d.activeGasRepo = {};

        d.dom = $ (document.createElement ('div'));
        d.dom.append (d.graph.getDom ());

        d.resetZoom = $ ( document.createElement ('button') )
        d.resetZoom.html ('Reset Zoom')
        d.resetZoom.addClass ('ui button')
        d.resetZoom.click (d.graph.resetZoom)

        d.dom.append (d.resetZoom);

        d.graph.resetZoom ();
    }

    o.getTotalAbsorption = function () {
        return Number (d.totalAbsorption.toFixed (4))
    }

    o.getTotalTransmission = function () {
        return Number (d.totalTransmission.toFixed (4))
    }

    o.getGasRepo = function () { return d.gasRepo }

    o.checkAnyGasActive = function () {
        var item, key, list;

        list = d.activeGasRepo
        for (key in list) {
            item = list [key];

            if (item) { return true }
        }

        return false
    }

    o.removeData = function (data) {
        d.activeGasRepo [data.name] = false;
        d.gasRepo [data.name].setActive (false);
        d.graph.removeData (data);
    }

    o.plotGasData = function (data) {
        var item, key, list, pointList, pointRepo;

        pointList = d.gasData

        if (d.canPlotPlanck) {
            d.canPlotPlanck = false
            // Determine unmodified curve
            d.graph.plotData ({
                name: 'predictedPlanck',
                color: 'rgba(255,255,255,0.5)',
                kelvin: d.kelvin,
                gasRepo: false,
                connectLines: true,
                owner: o,
                callback: function () { d.canPlotPlanck = true }
            })
        }

        if ( o.checkAnyGasActive () ) {
            // Determine modified curve
            d.graph.plotData ({
                name: 'pressurePlanck',
                color: 'rgba(255,255,255,1)',
                kelvin: d.kelvin,
                gasRepo: d.gasRepo,
                connectLines: true,
                owner: o
            })
        }
        else {
            d.graph.removeData ({name: 'pressurePlanck'})
        }

    }

    o.pullGasData = function (name) {
        var item, key, list, pointList;

        pointList = [];

        list = d.gasRepo [name].getGasData ();
        for (key in list) {
            item = list [key];

            pointList.push ({
                gas: name,
                wavelength: Number (key),
                transmission: item.transmission
            })
        }

        return pointList
    }

    o.setGasActive = function (data) {
        if (data.name) {
            switch (data.type) {
                case 'active':
                    d.gasRepo [ data.name ].setActive (data.active);
                    d.gasRepo [ data.name ].setPressure (data.value);
                    d.activeGasRepo [data.name] = data.active;
                    break;
                case 'pressure':
                    d.gasRepo [ data.name ].setPressure (data.value);
                    break;
            }
        }
    }

    o.setKelvin = function (kelvin) {
        d.lastKelvin = d.kelvin;
        d.kelvin = kelvin;
    }

    o.calculateTotalTransmission = function () {
        var activeGases, end, increment, int, item, key, list, highestAbsorption, modifier, pressure, stringKey, pressuredTransmission, transmission, value;
        // Called whenever there is a new gas added or a change in pressure

        // Collect only the active gases to iterate over
        activeGases = []
        list = d.gasRepo
        for (key in list) {
            item = list [key];

            if (item.getActive ()) {
                activeGases.push ({
                    gas: key,
                    pressure: item.getPressure (),
                    list: item.getGasData ()
                })
            }
        }

        // Iterate from 0 to 50 with an increment of 0.001
        // Check all active gas data for a wavelength at that point, take the lowest trasnmission value from all wavelengths
        // 100% transmission means that all investigated wavelengths are reporting 100 transmission
        // 0% transmission means that all investigated wavelengths are reporting 0 transmission
        // Each incremented point is worth ((50 * 0.001) * 2) percent
        list = activeGases;
        transmission = 100;
        increment = 0.001
        end = 10
        value = (increment / end)
        modifier = end / 1.3
        int = 0
        if (list.length) {
            while (int < end) {
                highestAbsorption = 0
                stringKey = int.toFixed (4)

                for (key in list) {
                    item = list [key];

                    if (item.list [stringKey]) {
                        pressure = item.pressure

                        if (isNaN (pressure)) { pressure = 0 }

                        pressuredTransmission = (100 - item.list [stringKey].transmission) * pressure
                        if (pressuredTransmission > highestAbsorption) {
                            // console.log ('Transmission rate found', stringKey, pressuredTransmission)
                            highestAbsorption = pressuredTransmission
                        }
                        // ---
                        // console.log ('Adding', (highestAbsorption * value), 'to', transmission)
                        // break;
                        // ---
                    }
                }

                transmission -= ((highestAbsorption * modifier) * value)
                int += increment
            }
        }

        // console.log ('Final transmission:', transmission)

        // The surface of a planet reflects 4% of incoming energy
        transmission += 4;

        // Make sure the transmission is not over 100
        if (transmission > 100) { transmission = 100 }
        // or less than 4 due to the planet having a surface
        if (transmission < 4) { transmission = 4 }

        d.totalTransmission = transmission
        d.totalAbsorption =  100 - transmission

        // console.log ('Transmission %', d.totalTransmission)

        return {
            totalTransmission: d.totalTransmission.toFixed (2),
            totalAbsorption: d.totalAbsorption.toFixed (2),
        }
    }

    o.override ({
        plotData: function (original, data) {
            var info, item, key, list;

            original (data)

            o.setGasActive (data);
            o.plotGasData ()
        },
    })
});
