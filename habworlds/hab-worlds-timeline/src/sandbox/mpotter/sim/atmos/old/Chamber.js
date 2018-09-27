tm.add ('app.sim.atmos.Chamber', function (o, p, d) {
    o.setup = function (config) {
        d.width = $ (config.selector.container + ' > svg').width ();
        d.height = $ (config.selector.container + ' > svg').height ();
        d.selector = config.selector;
        d.particleList = [];
        d.photonList = [];
        d.wavelength = 0.1;

        d.dimension = {
            particleView: {
                width: 951,
                height: 601
            },
            innerChamber: {
                x: 230,
                y: 200,
                width: 450,
                height: 300
            }
        }

        o.drawStage ();
        o.createPhotonList ();

        window.chamber = o;
    }

    o.addParticles = function (particleList) {
        var item, key, list;

        list = particleList;
        for (key in list) {
            item = list [key];

            if (item) {
                d.photonGroup.add (item.group);

                item.group.moveBy (
                    d.dimension.innerChamber.x,
                    d.dimension.innerChamber.y,
                    0,
                    true
                )
            }
        }

        d.particleList = d.particleList.concat (particleList);
        // console.log ('Added', particleList, 'to chamber particles.');
    }

    o.startParticles = function () {
        if (!d.particleLoopCheck) {
            d.particleLoopCheck = window.setInterval (function () {
                var item, key, list;

                o.animatePhotonList ();

                list = d.particleList;
                for (key in list) {
                    item = list [key];

                    item.owner.startAnimatingParticles ();
                }
            }, 1000 / 60)
        }
    }

    o.stopParticles = function () {
        var item, key, list;

        list = d.particleList;
        for (key in list) {
            item = list [key];

            item.owner.stopAnimatingParticles ();
        }

        if (d.particleLoopCheck) {
            window.clearInterval (d.particleLoopCheck);
            d.particleLoopCheck = null;
        }
    }

    o.animatePhotonList = function () {
        var callback, duration, item, key, list, start, xDestination, yDestination;

        if (!d.photonAnimating) {
            d.photonAnimating = true
            start = d.dimension.innerChamber.x - 150;
            xDestination = d.dimension.innerChamber.width + 200;
            duration = 3000
            callback = null;

            list = d.photonList;
            for (key in list) {
                item = list [key];
                int = Number (key)

                if ( !item.getAnimating () ) {

                    yDestination = 40 * int

                    if (int == list.length - 1) {
                        callback = function () {
                            d.photonAnimating = false
                        }
                    }

                    // console.log ('Photon animation duration:', duration)

                    item.animateTo (
                        // Start position
                        start,
                        yDestination + d.dimension.innerChamber.y - 10,
                        // rotation
                        0,
                        // distance
                        xDestination,
                        // duration
                        duration,
                        callback
                    )
                }
            }
        }
    }

    o.createPhotonList = function () {
        var end, group, int, photon;

        if (d.photonList.length == 0) {
            end = 5;
            // end = 1;
            // end = 2;
            for (int = 0; int < end; int++) {
                photon = tm.new ('app.sim.atmos.Photon', {
                    x: 0,
                    y: 0,
                    radius: 10,
                    brush: {
                        color: 'gold',
                    }
                })

                d.photonList.push (photon)
                d.photonGroup.add (photon)
            }
        }
    }

    o.drawStage = function () {
        var box, clip, defs, dom, height, namespace, shape, width;

        width = 200;
        height = 100;

        d.chamberBackView = tm.new ('tm.svg.Svg', {
            appendTo: d.selector.particleView,
            width: d.dimension.particleView.width,
            height: d.dimension.particleView.height,
            brush: {
                color: 'gold',
                line: {
                    width: 1,
                    color: 'black'
                }
            }
        })

        $ (d.chamberBackView.getDom ()).attr ('name', 'Background')

        d.particleView = tm.new ('tm.svg.Svg', {
            appendTo: d.selector.particleView,
            width: d.dimension.particleView.width,
            height: d.dimension.particleView.height,
            brush: {
                color: 'gold',
                line: {
                    width: 1,
                    color: 'black'
                }
            }
        })

        dom = d.particleView.getDom ()
        namespace = "http://www.w3.org/2000/svg";
        // defs = document.createElementNS (namespace, 'defs');
        clip = document.createElementNS (namespace, 'clipPath');
        clip.setAttributeNS (null, 'id', 'chamber-clip');

        // defs.appendChild (clip);
        // dom.appendChild (defs);
        dom.appendChild (clip);

        shape = document.createElementNS (namespace, 'rect');
        shape.setAttributeNS (null, 'x', 240);
        shape.setAttributeNS (null, 'y', 0);
        shape.setAttributeNS (null, 'height', 1000);
        shape.setAttributeNS (null, 'width', 450);

        clip.appendChild (shape);

        $(d.particleView.getDom ()).attr ('name', 'Photon Area')

        d.chamberFrontView = tm.new ('tm.svg.Svg', {
            appendTo: d.selector.particleView,
            width: d.dimension.particleView.width,
            height: d.dimension.particleView.height,
            brush: {
                color: 'gold',
                line: {
                    width: 1,
                    color: 'black'
                }
            }
        })

        $ (d.chamberFrontView.getDom ()).attr ('name', 'Foreground')

        // d.particleSpace = tm.new ('tm.svg.Box', {
        //     width: d.dimension.particleView.width,
        //     height: d.dimension.particleView.height,
        //     brush: {
        //         color: 'black'
        //     }
        // })

        d.chamberBack = tm.new ('tm.svg.Image', {
            href: 'https://i.imgur.com/f5JqB5Y.png',
            x: 0,
            y: 0,
            height: d.dimension.particleView.height,
            width: d.dimension.particleView.width
        })

        d.chamberBack.getDom ().ondragstart = function () {return false};

        d.chamberLight = tm.new ('tm.svg.Image', {
            // Grey version
            href: 'https://i.imgur.com/SFlrsvB.png',
            // Yellow version
            // href: 'https://i.imgur.com/la8AT29.png',
            x: 0,
            y: 0,
            height: d.dimension.particleView.height,
            width: d.dimension.particleView.width
        })

        d.chamberLight.getDom ().ondragstart = function () {return false};

        // d.sun

        d.chamberCover = tm.new ('tm.svg.Image', {
            href: 'https://i.imgur.com/VrlO9SE.png',
            x: 0,
            y: 0,
            height: d.dimension.particleView.height,
            width: d.dimension.particleView.width
        })

        d.chamberCover.getDom ().ondragstart = function () {return false};

        d.photonGroup = tm.new ('tm.svg.Group')
        d.photonGroup.getDom ().setAttributeNS (null, 'clip-path', 'url(#chamber-clip)')
        $ (d.photonGroup.getDom ()).width (800)

        box = tm.new ('tm.svg.Box', {
            x: 0,
            y: 0,
            height: 1000,
            width: 1000,
            brush: {
                color: 'transparent',
                line: {
                    width: 0,
                    color: 'transparent'
                }
            }
        })

        // Make sure the clip-area is as big as it is set to be
        d.photonGroup.getDom ().appendChild (box.getDom ())

        d.chamberBackView.add (d.chamberBack);
        d.chamberBackView.add (d.chamberLight);
        d.particleView.add (d.photonGroup)
        d.chamberFrontView.add (d.chamberCover);
        // d.particleView.add (d.particleSpace);
        // d.particleView.getDom ().classList.add ('hide');

        // d.svg.add (d.sun)
        // d.svg.add (d.lightChamber)

        d.canSeeParticleView = true
        o.showParticleView ();
    }

    o.getDimension = function () {
        return d.dimension
    }

    o.getParticleList = function () {
        return d.particleList;
    }

    o.getParticleView = function () {
        return d.particleView;
    }

    o.getPhotonGroup = function () {
        return d.photonGroup;
    }

    o.getColor = function () {
        return d.color;
    }

    o.showParticleView = function () {
        d.particleView.getDom ().classList.remove ('hide');
        o.startParticles ();
    }

    o.hideParticleView = function () {
        d.particleView.getDom ().classList.add ('hide');
        o.stopParticles ();
    }

    o.getWavelength = function () {
        return d.wavelength;
    }

    o.calculateRemainingLight = function () {
        var gasPressure, item, key, list, transmission, totalTransmission, wavelength;

        wavelength = d.wavelength;
        list = window.gasRepo;
        totalTransmission = 100;

        for (key in list) {
            item = list [key];

            if (item) {
                // console.log ('Current particles', item.getParticleCount ())
                // console.log ('Max particles', item.getMaxParticleCount ())
                gasPressure = item.getParticleCount () / item.getMaxParticleCount ();
                // console.log ('Gas pressure', gasPressure)
                if (isNaN (gasPressure)) { gasPressure = 0 }

                transmission = item.getWavelengthTransmission [wavelength];

                if (transmission === undefined) { transmission = 1 }
                else { transmission = transmission.transmission }

                totalTransmission -= (transmission * gasPressure)
            }
        }

        // Get the current wavelength
        // Iterate through gas repo
        // For each gas:
            // Get the transmission percent for the current wavelength

        // console.log (totalTransmission)
        $ ('#light-passing-through').html (totalTransmission)
    }

    o.setWavelength = function (value) {
        var distance, minLength, maxLength, minValue, maxValue, nanometers, percent;

        minValue = Math.abs ( Number ( $ ('#light-wavelength').attr ('min') ) );
        maxValue = Math.abs ( Number ($ ('#light-wavelength').attr ('max') ) );

        // console.log ('Min value', minValue, '. Max value', maxValue);

        value = Math.abs (value)
        // console.log ('The passed-in value', value);

        // distance = maxValue + minValue;
        // console.log ('Distance between the max and min values', distance);

        percent = (value - minValue) / (maxValue - minValue);
        // console.log ('Calculated percentaged', percent);
        if (percent <= 0.5) {
            percent *= 2;
            minLength = 0.1; // nano meters
            maxLength = 1000; // nano meters

        } else {
            // 0.6 to become the remainder 0.4 * 2 0.8
            percent -= 0.5;
            percent *= 2;
            minLength = 1000; // nano meters
            maxLength = 50000; // nano meters
        }

        nanometers = ((maxLength - minLength) * percent ) + minLength

        d.wavelength =  (nanometers / 1000).toFixed (2);
        if (d.wavelength < 0.01) { d.wavelength = 0.01 }
        // console.log ('Light wavelength in μm', nanometers / 1000)
        $ ('#light-wavelength-value').val (d.wavelength)
    }

    o.setLightColor = function (value) {
        var  hue, item, key, list, particleSpaceDom, percent, maxLength, minLength, sunDom;

        o.setWavelength (value);

        // console.log (value)

        // visible spectrum, if the wavelength is outside of this range, no calculations are needed
        maxValue = 0.9;
        minValue = 0.3;

        if (d.wavelength > maxValue) {
            hue = 360
        }
        else if (d.wavelength < minValue) {
            hue = 288
        }
        else {
            percent = (d.wavelength - minValue) / (maxValue - minValue);

            if (percent > 0.9) {
                hue = 0
            }
            else if (percent < 0.1) {
                hue = 288
            }
            else {
                hue = percent * 360
                hue = Math.abs (hue - 330)
            }

            // console.log (hue)
        }

        d.color = 'hsl(' + hue + ', 100%, 50%)';

        sunDom = d.chamberLight.getDom ();
        sunDom.setAttributeNS (null, 'fill', d.color);
        sunDom.style.fill = d.color;

        // particleSpaceDom = d.particleSpace.getDom ();
        // particleSpaceDom.style.fill = 'hsl(' + hue + ', 50%, 25%)';

        list = d.photonList
        for (key in list) {
            item = list [key];

            item.setColor ( d.color );
        }
    }
})
