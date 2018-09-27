/*
    Creates the visualization for the transfer of carbon
*/
'use strict'
tm.add ('sim.geo.chemical.bin.Animation', ['sim.geo.chemical.bin.Carbon'], function (o, p, d) {
    o.setup = function (config) {
        var carbon, end, int;
        d.carbonList = [];
        d.animatingCarbon = 0;
        d.carbonDistance = d.radius / 2

        int = 0;
        end = d.maxCarbon;
        while (int < end) {
            carbon = tm.new ('sim.geo.chemical.bin.molecule.Base', {
                svg: d.svg,
                parent: o,
                x: d.x, y: d.y,
                radius: 5,
                brush: {
                    color: 'white',
                    line: {
                        color: 'rgb(196, 57, 57)',
                        width: 2
                    }
                }
            })

            $ (carbon.getDom ()).css ({ 'pointer-events': 'none' })

            d.carbonList.push ({
                o: carbon,
                canAnimate: true
            })

            int++
        }
    }

    o.sendTo = function (data) {
        var carbon, delay, distance, duration, dom, modifier, random, target, targetBin;

        // console.log ('Current Carbon:', d.animatingCarbon)

        if (d.animatingCarbon >= d.carbonList.length) { d.animatingCarbon = 0 }

        carbon = d.carbonList [d.animatingCarbon].o;
        d.animatingCarbon++;
        delay = data.delay;
        distance = d.carbonDistance;
        duration = 1000 + (Math.random () * 200 + 100)
        dom = carbon.getDom ();
        target = data.target.getPosition ();
        targetBin = data.target
        random = {};

        modifier = 1
        if (Math.random () < 0.5) { modifier = -1 }
        random.x = d.x + (Math.random () * distance) * modifier;

        modifier = 1
        if (Math.random () < 0.5) { modifier = -1 }
        random.y = d.y + (Math.random () * distance) * modifier;

        anime ({
            targets: dom,
            cx: random.x, cy: random.y,
            delay: delay/2 + (Math.random () * delay/2),
            duration: duration,
            elasticity: 700,
            'fill-opacity': 1,
            // easing: 'easeInOutQuad',
            complete: function (anim) {
                anime ({
                    targets: dom,
                    cx: target.x, cy: target.y,
                    duration: duration,
                    easing: 'easeInBack',
                    complete: function (anim) {
                        anime ({
                            targets: dom,
                            'fill-opacity': 0,
                            duration: 30,
                            complete: function (anim) {
                                anime ({
                                    targets: dom,
                                    cx: d.x, cy: d.y,
                                    'fill-opacity': 1,
                                    duration: 0
                                })

                                targetBin.addCarbon (1)
                            }
                        })
                    }
                })
            }
        })
    }

    o.override ({
        carbonSentAnimation: function (original, data) { o.sendTo (data) }
    })
})
