// Holds draw data for a single gas
'use strict'
tm.add ('sim.greenhouse.molecule.Dom', ['tm.svg.Dom'], function (o, p, d) {
    o.setup = function (config) {
        var namespace, shape;

        // Assume defaults
        if (config.height === undefined) { config.height = 200 }

        // Assign config values
        d.height = config.height;
        d.width = config.width;
        d.boundaries = {
            min: {
                x: 0,
                y: d.height
            },
            max: {
                x: d.width,
                y: 0
            },
            atmosphere: d.height / 2
            // atmosphere: 30
        }

        namespace = "http://www.w3.org/2000/svg";
        shape = document.createElementNS (namespace, 'circle');
        shape.setAttributeNS ( null, 'cx', 0 );
        shape.setAttributeNS ( null, 'cy', 80 );
        shape.setAttributeNS ( null, 'r', 10);
        shape.setAttributeNS ( null, 'fill', 'white');

        d.dom = shape;

        d.onAnimateDone = config.onAnimateDone;
    }

    o.animate = function () {
        var isNegative, position, time, x, y;

        if (!d.animating) {
            d.animating = true;

            // Move left unless already at left side
            x = -d.boundaries.max.x
            if (d.x < 10) { x = d.boundaries.max.x }

            // Pick a spot between the atmosphere area and bottom of view
            y = (Math.random () * d.boundaries.atmosphere/2) - d.y

            time = Math.random () * 3000 + 2000

            o.moveBy (x, y, time, false, o.animateDone)
        }
    }

    o.animateDone = function () {
        // Animation cleanup
        d.animating = false;

        // Callback
        if (d.onAnimateDone) { d.onAnimateDone (); }
    }

    o.reset = function () { o.moveTo (0, 0) }

    o.setVisible = function (visible) {
        d.visible = visible;

        if (!visible) { d.dom.classList.add ('hide') }
        else { d.dom.classList.remove ('hide') }
    }
});
