// Creates and contacts the control for the God rays
'use strict'
tm.add ('sim.greenhouse.app.Rays', ['sim.greenhouse.app.Micro'], function (o, p, d) {
    o.setup = function (config) {
        d.rayControl = tm.new ('sim.greenhouse.control.Rays', {
            scene: d.scene,
        })

        d.rayControlAnim = o.addToAnimateList ({
            method: o.animateRayControl,
            data: {}
        })
    }

    o.animateRayControl = function () {
        d.rayControl.animateRays ();
    }

    o.override ({
        starChange: function (original, data) {
            // console.log ('Scene app starChange');

            original (data);

            if (d.rayControl) {
                d.rayControl.setColor (d.sun.color)
            }
        }
    })
})
