'use strict'
tm.add ('app.sim.atmos.Photon', ['tm.svg.Group'], function (o, p, d) {
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

            if (int === end - 1) { d.lead = {
                photon: circle,
                dom: circle.getDom (),
                position: circle.getPosition ()
            } }
        }

    }

    o.correctChildOpacity = function () {
        var alpha, circle, end, int;

        end = d.circleList.length - 1;
        for (int = 0; int < end; int++) {
            // As the int increases, so does the alpha
            alpha =  int / end

            if (isNaN (alpha)) { alpha = 0 }

            circle = d.circleList [int]

            circle.getDom ().style ['fill-opacity'] = alpha
        }
    }

    o.fadeIn = function (duration, callback) {
        var alpha, circle, end, int, onFinish;

        d.fadingIn = true;

        anime ({
            targets: d.dom,
            'fill-opacity': 0,
            'stroke-opacity': 0,
            easing: 'linear',
            duration: 0
        })

        anime ({
            targets: d.dom.childNodes,
            'fill-opacity': 0,
            'stroke-opacity': 0,
            easing: 'linear',
            duration: 0
        })

        end = d.circleList.length - 1;
        for (int = 0; int < end; int++) {
            circle = d.circleList [int]

            if (int === end - 1) { onFinish = callback }
            o.fadeDomIn (circle.getDom (), circle.maxAlpha, duration, onFinish)
            // circle.getDom ().style ['fill-opacity'] = alpha
        }
    }

    o.fadeDomIn = function (dom, alpha, duration, callback) {
        anime ({
            targets: dom,
            'fill-opacity': alpha,
            'stroke-opacity': alpha,
            easing: 'linear',
            duration: duration,
            complete: function () { if (callback) {callback (); d.fadingIn = false; }}
        })
    }

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

    o.getAnimating = function () { return d.animating }

    o.setColor = function (color) {
        var item, key, list;

        list = d.circleList;
        for (key in list) {
            item = list [key];

            item.getDom ().style.fill = color
        }

        // Determine length of photon based on color
    }

    o.cleanUp = function (delay) {
        if (delay === undefined) { delay = 1000 }

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

        window.setTimeout (function () {
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

    o.animateTo = function (startX, startY, rotation, distance, duration, callback) {
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

        o.moveBy (
            distance,
            // endY - startY,
            0,
            // 1600 + (Math.random () * 600)
            duration,
            false
        )

        if (callback) {
            // console.log ('Callback exists.')
            d.onAnimateDone = callback;
        }
    }

    o.rotateBasedOnMovement = function (originX, originY, targetX, targetY) {
        var down, left, right, up;

        if (originX != targetX) {
            if (originX > targetX) { left = true }
            else { right = true }
        }

        if (originY != targetY) {
            if (originY > targetY) { down = true }
            else { up = true }
        }

        // anime ({
        //     // targets: d.circleList [d.circleList.length - 1].getDom (),
        //     targets: d.dom,
        //     rotate: '1turn',
        //     // duration: 0,
        //     easing: 'linear'
        // })

        // Check for diagonals
        // if (up && left) {
        //     anime ({
        //         targets: d.dom,
        //         rotate: 225,
        //         duration: 0
        //     })
        //     return;
        // }
        // else if (up && right) {
        //     anime ({
        //         targets: d.dom,
        //         rotate: -45,
        //         duration: 0
        //     })
        //     return;
        // }
        // else if (down && left) {
        //     anime ({
        //         targets: d.dom,
        //         rotate: 135,
        //         duration: 0
        //     })
        //     return;
        // }
        // else if (down && right) {
        //     anime ({
        //         targets: d.dom,
        //         rotate: 45,
        //         duration: 0
        //     })
        //     return;
        // }

        // check for singular directions
        // if (left) {
        //     anime ({
        //         targets: d.dom,
        //         rotate: 180,
        //         duration: 0
        //     })
        //     return;
        // }
        // else if (up) {
        //     anime ({
        //         targets: d.dom,
        //         rotate: -90,
        //         duration: 0
        //     })
        //     return;
        // }
        // else if (down) {
        //     anime ({
        //         targets: d.dom,
        //         rotate: 90,
        //         duration: 0
        //     })
        //     return;
        // }

        // Don't need to hand the right-only case since the dom is already built facing that way
    }

    o.override ({
        onMoveBy: function (original, data) {
            var item, key, list, my, their, totalRadius, visible, xDist, yDist;

            if (d.lead) {
                // Animate the photons in a snake-like matter
                o.photonMovement ();

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

                            if (xDist < totalRadius && yDist < totalRadius) {
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
                        }
                    }
                }
            }
        },

        onMoveByDone: function () {
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
})
