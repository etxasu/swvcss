// Ties elements created in base together through listeners
'use strict'
tm.add ('app.sim.atmos.quiz.app.Quiz', ['app.sim.atmos.quiz.app.Base'], function (o, p, d) {
    o.setup = function (config) {
        var graphArea;

        d.pressure = 0.01

        // Create gas data
        d.gasRepo = {
            'CH4': tm.new ('app.sim.atmos.data.gas.Ch4', { color: '#e6c35c', name: 'CH4' }),
            'CO': tm.new ('app.sim.atmos.data.gas.Co', { color: '#dba93a', name: 'CO' }),
            'CO2': tm.new ('app.sim.atmos.data.gas.Co2', { color: '#e09b49', name: 'CO2' }),
            'H2': tm.new ('app.sim.atmos.data.gas.H2', { color: '#61cff2', name: 'H2' }),
            'H2O': tm.new ('app.sim.atmos.data.gas.H2o', { color: '#61b1f2', name: 'H2O' }),
            'H2S': tm.new ('app.sim.atmos.data.gas.H2s', { color: '#6181f2', name: 'H2S' }),
            'N2': tm.new ('app.sim.atmos.data.gas.N2', { color: '#f2616e', name: 'N2' }),
            'N2O': tm.new ('app.sim.atmos.data.gas.N2o', { color: '#d94d88', name: 'N2O' }),
            'NH3': tm.new ('app.sim.atmos.data.gas.Nh3', { color: '#f261a7', name: 'NH3' }),
            'NO': tm.new ('app.sim.atmos.data.gas.No', { color: '#c13057', name: 'NO' }),
            'NO2': tm.new ('app.sim.atmos.data.gas.No2', { color: '#c72752', name: 'NO2' }),
            'O2': tm.new ('app.sim.atmos.data.gas.O2', { color: '#c2d3e0', name: 'O2' }),
            'O3': tm.new ('app.sim.atmos.data.gas.O3', { color: '#aab3b3', name: 'O3' }),
            'SO2': tm.new ('app.sim.atmos.data.gas.So2', { color: '#4bb05b', name: 'SO3' }),

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

        if (window.simcapi) { simcapi.Transporter.notifyOnReady (); }

        d.mode = 'transmission';

        d.transmissionBase = d.graph.getGraphArea ().top
        d.absorbtionBase = d.graph.getGraphArea ().bottom
        // console.log (d.gasRepo)
    }

    o.plotData = function () {
        d.studentGraph.plotData ({
            displayName: 'student graph',
            name: 'gas',
            color: 'rgba(255,255,255,1)',
            gasRepo: d.gasRepo,
            connectLines: false,
            owner: o,
            base: d [d.mode + 'Base']
        })
    }

    o.override ({
        onGasSelect: function (original, data) {
            if (!d.selectingGas) {
                d.selectingGas = true;

                original (data);

                var active, item, key, list;

                list = d.gasRepo
                for (key in list) {
                    item = list [key];

                    if (key !== data.molecule) {
                        item.setActive (false)
                        $ ('#' + key + '-button').removeClass ('active')
                    }
                }


                key = data.molecule;
                active = d.gasRepo [key].getActive ();

                if (active) {
                    $ ('#' + key + '-button').removeClass ('active')
                    d.gasRepo [key].setActive (false)
                    active = false;
                    d.activeGasKey = '';
                }
                else {
                    $ ('#' + key + '-button').addClass ('active')

                    d.gasRepo [key].setActive (true)
                    active = true;
                    d.activeGasKey = key;
                }

                d.gasRepo [key].setPressure (d.pressure)
                d.studentGraph.removeData ({ name: 'gas' })

                if (active) {
                    o.plotData ()
                }

                d.selectingGas = false;
            }
        },

        onSwitch: function (original, mode) {
            original (mode);

            d.mode = mode.toLowerCase ();

            o.plotData ();
        },

        setPressure: function (original, value) {
            original (value);

            if (d.activeGasKey) {
                d.gasRepo [d.activeGasKey].setPressure (value.value)
            }

            d.studentGraph.removeData ({ name: 'gas' })
            o.plotData ();
        }

    })
})
