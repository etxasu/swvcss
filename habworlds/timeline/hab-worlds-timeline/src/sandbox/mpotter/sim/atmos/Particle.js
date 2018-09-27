'use strict'
tm.add ('app.sim.Particle', ['tm.svg.Group'], function (o, p, d) {
    o.setup = function (config) {
        var circleX, circleY, dom, radius, x, y;

        // if (config.radius) { config.height = config.radius; config.width = config.radius }
        if (config.height === undefined) { config.height = config.radius }
        if (config.width === undefined) { config.width = config.radius }

        delete config.tag;

        radius = config.radius

        d.circle = tm.new ('tm.svg.Circle', {
            x: 0,
            y: 0,
            radius: config.radius / 2,
            brush: {
                color: 'transparent',
                line: {
                    width: 1,
                    color: 'white'
                }
            }
        })

        d.graphic = tm.new ('tm.svg.Image', {
            href: config.href,
            width: config.radius,
            height: config.radius,
            x: -radius / 2,
            y: -radius / 2
        });

        o.add (d.circle);
        o.add (d.graphic);

        d.baseX = config.baseX;
        d.baseY = config.baseY;
    }

    o.getModifier = function () {
        var x, y;

        x = 0;
        y = 0;

        if (d.baseX !== 0) {
            x = -1
            if (d.baseX > 0) { x = 1 }
        }

        if (d.baseY !== 0) {
            y = -1
            if (d.baseY > 0) { y = 1 }
        }

        return { x: x, y: y }
    }
})
