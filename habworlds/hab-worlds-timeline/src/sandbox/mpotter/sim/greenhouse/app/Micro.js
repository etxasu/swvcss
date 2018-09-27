'use strict'
tm.add ('sim.greenhouse.app.Micro', ['sim.greenhouse.app.Graph'], function (o, p, d) {
    o.setup = function (config) {
        d.molecularView = tm.new ('sim.greenhouse.molecule.view.Scene', {
            selector: d.selector.scene,
            scene: d.scene
        })

        // d.molecularViewAnim = o.addToAnimateList ({
        //     method: o.animateMolecularView,
        //     data: {}
        // })

        d.headerBar = $ (d.selector.header);

        d.microToggle = $ (document.createElement ('div'));
        d.microToggle.addClass ('ui right floated icon button');
        d.microToggle.html ([
            '<i class="zoom icon"></i>'
        ].join ('\n'))

        // console.log ('- Not adding micro view toggle button to ui.')
        // d.headerBar.append (d.microToggle)

        d.molecularView.hide ();
        d.microViewVisible = false;

        d.microToggle.on ('click', function () {
            if (d.microViewVisible) {
                d.molecularView.hide ();
                d.microViewVisible = false
            }
            else {
                d.molecularView.show ();
                d.microViewVisible = true
            }
        })
    }

    o.animateMolecularView = function () {
        // d.molecularView.onAnimate ()
    }

    o.override ({
        // atmosChange: function (original, data) {
        //     var name, pressure;
        //
        //     original (data);
        //
        //     d.molecularView.setGasPressure (data.name, data.value);
        //
        //     if (data.type == 'active') {
        //         d.molecularView.setGasActive (data.name, data.active);
        //     }
        //
        //     name = data.name;
        //     pressure = 1 - data.pressure/3.721;
        //
        //     d.molecularView.setGasDensity (name, pressure);
        //     // d.atmosControl.setEnergyAbsorbed (d.molecularView.getAbsorbedPercent ())
        // },
    })
})
