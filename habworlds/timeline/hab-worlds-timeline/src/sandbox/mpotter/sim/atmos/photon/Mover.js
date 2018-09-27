'use strict'
// Handles moving the photon and its children
tm.add ('app.sim.atmos.photon.Mover', ['app.sim.atmos.photon.Color'], function (o, p, d) {
    o.animateTo = function (startX, startY, distX, distY, rotation, duration, callback) {
        var endY, startY;

        d.particleList = window.chamber.getParticleList ();

        // startY = Math.random () * 200;
        // endY = Math.random () * 200;

        // d.dom.classList.remove ('hide')

        if (!d.fadingIn) {
            // Make sure photons are visible
            anime ({
                targets: d.dom,
                'fill-opacity': 1,
                'stroke-opacity': 1,
                duration: 0
            })
            anime ({
                targets: d.dom.childNodes,
                'fill-opacity': 1,
                'stroke-opacity': 1,
                duration: 0,
                complete: function () {
                    o.correctChildOpacity ();
                }
            })

            // console.log ('here')
        }

        // console.log ('Starting location:', y)
        // console.log ('Starting location:', y)
        d.animating = true;
        d.alreadyCollided = false;
        o.moveTo (
            startX,
            // startY,
            startY
        );

        // console.log (d.dom.transform)

        o.transformBy (
            distX,
            distY,
            rotation,
            duration,
            false
        )

        if (callback) {
            // console.log ('Callback exists.')
            d.onAnimateDone = callback;
        }
    }

    o.moveCircle = function (item, leader) {
        var speed;

        item.lastPosition = item.getPosition ().y;

        // A much more simple solution than what I was originally going to do
        // Move faster at the center of the path
        if (item.currentMovement <= item.distanceMiddle) {
            item.gravity += item.acceleration
        }
        else {
            item.gravity -= item.acceleration
        }

        // Prevent too little or too much gravity
        if (item.gravity > item.maxGravity) { item.gravity = item.maxGravity }
        else if (item.gravity < 0) { item.gravity = 0 }

        // Apply speed based on direction
        if (item.direction == 'down') {
            speed = item.speed + item.gravity;
        }
        else {
            speed = -item.speed - item.gravity;
        }

        // Move photon
        item.moveBy (0, speed, 0, true);

        // Update how far the photon has moved
        item.currentMovement += item.speed + item.gravity;

        // Reset properties for moving in opposite direction
        if (item.currentMovement >= item.maxMovement) {
            if (item.direction == 'down') {
                item.direction = 'up'
            }
            else {
                item.direction = 'down'
            }

            item.currentMovement = 0;
            item.gravity = 0;
        }
    }

    o.override ({
        onTransformBy: function (original, data) {
            var item, key, list, my, their, totalRadius, visible, xDist, yDist;

            // Animate the photons in a snake-like matter
            o.photonMovement ();

            if (d.lead) {

                visible = d.lead.dom.style ['fill-opacity']

                if (visible < 0.1) { visible = 0 }

                // Collision check against particles
                if (d.collidable && !d.alreadyCollided && visible) {
                    // console.log (d.circleList [d.circleList.length - 1].getPosition ())
                    my = {
                        x: d.lead.photon.getPosition ().x + d.x,
                        y: d.lead.photon.getPosition ().y + d.y,
                        // x: d.x + d.frontX,
                        // y: d.y,
                        radius: d.radius
                    }

                    // console.log (my)

                    list = d.particleList;
                    for (key in list) {
                        item = list [key];

                        if ( !item.group.getDom ().classList.contains ('hide') ) {
                            their = item.group.getPosition ();
                            their.radius = 20;

                            // console.log (my.x)

                            // Circular collision. Assuming their radius for now
                            xDist = Math.abs ( my.x - their.x );
                            yDist = Math.abs ( my.y - their.y );

                            totalRadius = my.radius + their.radius;

                            // console.log ('xDist:', xDist)
                            // console.log ('yDist:', yDist)
                            // console.log ('totalRadius:', totalRadius)

                            // Collision occured
                            if (xDist < totalRadius && yDist < totalRadius) {
                                if (o.rollForAbsorption ()) {
                                    item.owner.exciteParticle (item.group)

                                    // d.dom.classList.add ('hide')
                                    anime ({
                                        targets: d.dom,
                                        'fill-opacity': 0,
                                        'stroke-opacity': 0,
                                        easing: 'linear',
                                        duration: 300
                                    })

                                    anime ({
                                        targets: d.dom.childNodes,
                                        'fill-opacity': 0,
                                        'stroke-opacity': 0,
                                        easing: 'linear',
                                        duration: 300
                                    })

                                    data.anime.complete ();
                                    data.anime.pause ();
                                    d.alreadyCollided = true;
                                    // o.onMoveByDone ();
                                }
                                // Prevent from collision from happening every frame
                                else {
                                    d.alreadyCollided = true;
                                }
                            }
                        }
                    }
                }
            }
        },

        onTransformByDone: function () {
            if (d.animating) {
                d.animating = false;
                // console.log ('Check if callback is set')
                o.callbackCheck ();
            }
        }
    })

    o.callbackCheck = function () {
        if (d.onAnimateDone) {
            d.onAnimateDone ();
            d.onAnimateDone = null;
        }
    }

    o.getAnimating = function () { return d.animating }

    o.photonMovement = function () {
        var item, int, leader, list, yPos;

        if (d.circleList) {
            // Iterate through every circle, except for the leader and move them where they need to be.
            list = d.circleList
            for (int = list.length - 2; int >= 0; int--) {
                item = list [int];
                leader = list [int + 1]

                if (item && leader) {

                    item.lastPosition = item.getPosition ().y;
                    item.moveBy (0, -item.lastPosition, 0, true);
                    item.moveBy (0, leader.lastPosition, 0, true);
                }
            }

            // Move the leader with the fancy movement equation and store their old position
            o.moveCircle (d.circleList [d.circleList.length - 1]);

        }
    }

    o.rollForAbsorption = function () {
        var absorption, transmission;
        // Check percent of light passing through chamber, roll against that.
        // 100% means no photons are captured
        // 0% means all photons are captured

        transmission = window.gasRepo [window.currentGas].getLightPassingThrough ();

        if (transmission === undefined) { transmission = 100 }

        absorption = 100 - transmission;

        return (Math.random () * 100) < absorption
    }
})
