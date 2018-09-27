// Handles creating photons in the micro view
'use strict'
tm.add ('sim.greenhouse.molecule.view.Photon', ['sim.greenhouse.molecule.view.Base'], function (o, p, d) {
    o.setup = function (config) {
        var end, int, item;

        // Assign Config Values

        // Create default information
        d.photonCount = 5;
        d.photonList = [];
        d.animatingPhotons = {};
        d.gasPressure = {};
        d.reflectChance = 50;

        // Set up photons
        end = d.photonCount;
        for (int = 0; int < d.photonCount; int++) {
            d.photonList.push ( tm.new ('sim.greenhouse.photon.Mover', { collidable: false }) )

            item = d.photonList [int]

            d.masterGroup.add (item)
        }
    }

    o.animatePhoton = function (data) {
        var distance, duration, key, photon, rotate, startX, startY;

        photon = data.photon;
        duration = data.duration;
        distance = data.distance;
        startX = data.startX;
        startY = data.startY;
        rotate = data.rotate;
        key = data.key;

        photon.animateTo (
            0, -500,
            0, 0,
            rotate,
            0,
            function () {
                photon.animateTo (
                    startX, startY,
                    0, distance,
                    0,
                    duration,
                    function () {
                        photon.animateTo (
                            0, -500,
                            0, 0,
                            -rotate,
                            0,
                            function () {
                                d.animatingPhotons [key] = false;
                            }
                        )
                    }
                )
            }
        )
    }

    o.animateDeflectedPhoton = function (data) {
        var deflectAngle, direction, distance, duration, key, photon, rotate, startX, startY;

        photon = data.photon;
        duration = data.duration / 2;
        distance = data.distance / 2;
        startX = data.startX;
        startY = data.startY;
        rotate = data.rotate;
        key = data.key;
        deflectAngle = 100;

        // For maximal visibility:
        // Make sure that photons on the left side deflect to the right
        // and photons on the right deflect to the left
        if (startX < 100) { direction = 1; }
        else if (startX >= 100) { direction = 0; }

        if (direction) {
            direction = 1
            deflectAngle = 100
        }
        else {
            direction = -1
            deflectAngle = -130
        }

        // Rotate the photon upward
        photon.animateTo (
            0, -500,
            0, 0,
            rotate,
            0,
            function () {
                // Start moving them toward the atmosphere
                photon.animateTo (
                    startX, 300,
                    0, -100,
                    0,
                    duration,
                    function () {
                        // Rotate the photon away from the sun
                        photon.getDom ().classList.add ('hide')
                        photon.animateTo (
                            startX, 90,
                            0, 0,
                            deflectAngle,
                            10,
                            function () {
                                photon.getDom ().classList.remove ('hide')
                                photon.fadeIn (100)
                                photon.animateTo (
                                    startX - (startX/2 * direction), 90,
                                    distance * -direction, 100,
                                    0,
                                    duration,
                                    function () {
                                        // Reset photon rotation
                                        photon.animateTo (
                                            0, -300,
                                            0, 0,
                                            deflectAngle + -rotate,
                                            0,
                                            function () {
                                                d.animatingPhotons [key] = false;
                                            }
                                        )
                                    }
                                )
                            }
                        )
                    }
                )
            }
        )
    }

    o.getAbsorbedPercent = function () { return d.absorbedPercent }

    o.rollForDelfection = function () {
        var density, item, key, list, maxDensity, result;

        maxDensity = 9;
        density = 0;

        // Iterate through the various stored pressures
        list = d.gasPressure;
        for (key in list) {
            item = list [key];

            if (typeof item == 'number') { density += item }
        }

        // Make sure density does not exceed the limit
        if (density > maxDensity) { density = maxDensity; }
        // console.log (
        //     'Rolling to deflect with a',
        //     Math.round (density / (maxDensity + (maxDensity / 10)) * 100),
        //     'percent chance'
        // )
        d.absorbedPercent = Math.round ((density/1.01 / maxDensity) * 100)

        // Roll for if the photon deflects
        // Allow a 10% chance that the photon will escape even at ridiculus pressures
        result = (Math.random () * (maxDensity + (maxDensity / 10)) ) < density

        // Return if the photon deflected
        return result
    }

    o.setGasDensity = function (name, pressure) {
        d.gasPressure [name] = pressure;
    }

    o.setReflectChance = function (value) {
        d.reflectChance = value;
    }

    o.override ({
        onAnimate: function (original) {
            var data, deflected, fromSun, increment, item, key, list;

            original ();

            increment = $ (d.svg.getDom ()).width () / d.photonCount
            list = d.photonList;
            for (key in list) {
                item = list [key];

                if (!d.animatingPhotons [key]) {
                    d.animatingPhotons [key] = true;
                    key = Number (key);
                    fromSun = Math.round (Math.random () * 100);
                    deflected = 0;

                    if (fromSun >= d.reflectChance) { fromSun = 1 }
                    else { fromSun = 0 }

                    data = {
                        photon: item,
                        startX: key * increment,
                        duration: Math.random () * 3000 + 2000,
                        key: key,
                        startY: -200,
                        distance: 500,
                        rotate: 90,
                    }

                     if (!fromSun) {
                         data.startY = 300;
                         data.distance = -500;
                         data.rotate = 270;

                         deflected = o.rollForDelfection ();
                     }

                    // startX, startY, distX, distY, rotation, duration, callback
                    if (!deflected) {
                        o.animatePhoton (data)
                    }
                    else {
                        o.animateDeflectedPhoton (data);
                    }
                }
            }
        }
    })
})
