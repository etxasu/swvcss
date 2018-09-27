'use strict'
// Handles base photon dom construction, clean up, and, opacity control
tm.add ('app.sim.atmos.photon.Base', ['tm.svg.Group'], function (o, p, d) {
    o.setup = function (config) {
        if (config.collidable === undefined) { config.collidable = true }

        if (!config.color) { config.color = 'gold' }

        d.radius = 5;
        o.createPhoton ();
        d.collidable = config.collidable
    }

    o.createPhoton = function () {
        var alpha, circle, end, int, pos;

        d.circleList = [];
        d.frontX = 0;

        end = 12;
        for (int = 1; int < end; int++) {

            // As the int increases, so does the alpha
            alpha =  int / end
            pos = int * (d.radius / 1.3);

            d.frontX += pos / 2;

            circle = tm.new ('tm.svg.Circle', {
                x: pos,
                y: 0,
                radius: d.radius,
                brush: {
                    color: 'rgb(255,233,0)',
                    line: {
                        width: 0,
                        color: 'transparent',
                    }
                }
            })

            circle.getDom ().style ['fill-opacity'] = alpha

            circle.maxAlpha = alpha;
            circle.maxMovement = 20;
            circle.currentMovement = 0;
            circle.speed = 0.5;
            circle.direction = 'down';
            circle.gravity = 0;
            circle.acceleration = 1.9;
            circle.maxGravity = 50;
            circle.distanceMiddle = circle.maxMovement / 2;
            circle.lastPostion = circle.getPosition ().y;
            // o.photonMovement (circle, int * 100, duration)

            // Spread the total distance to move across the number of circles
            // This will make up our indexes for the moveArray

            o.add (circle);
            d.circleList.push (circle);

            if (int === end - 1) {
                d.lead = {
                    photon: circle,
                    dom: circle.getDom (),
                    position: circle.getPosition ()
                }
            }
        }
    }

    o.cleanUp = function (delay) {
        if (delay === undefined) { delay = 1000 }

        window.setTimeout (function () {
            var myDelay;

            myDelay = delay;

            anime ({
                targets: d.dom,
                'fill-opacity': 0,
                'stroke-opacity': 0,
                easing: 'linear',
                duration: delay
            })

            anime ({
                targets: d.dom.childNodes,
                'fill-opacity': 0,
                'stroke-opacity': 0,
                easing: 'linear',
                duration: delay
            })

            var item, key, list, subItem, subKey, subList;

            list = d.circleList
            for (key in list) {
                item = list [key]

                $ ( item.getDom () ).remove ()

                delete d.circle
            }

            $ ( d.dom ).remove ()

            list = d
            for (key in list) {
                delete list [key]
            }
        }, delay)
    }
})
