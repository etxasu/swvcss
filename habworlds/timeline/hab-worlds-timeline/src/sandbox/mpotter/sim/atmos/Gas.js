tm.add ('app.sim.atmos.Gas', function (o, p, d) {
    o.setup = function (config) {
        var item, key, list;
        if (!config.photonType) { config.photonType = 'app.sim.atmos.photon.Mover' }
        if (!config.color) { config.color = 'red' }
        if (config.excitationThreshold === undefined) { config.excitationThreshold = 50 }

        tm.html ('app.sim.atmos.gas.Button', {
            selector: config.selector.container,
            append: true,
            data: config
        })

        tm.html ('app.sim.atmos.gas.Option', {
            selector: config.selector.select,
            append: true,
            data: config
        })

        d.photonType = config.photonType;
        d.name = config.name;
        d.displayName = config.name;
        d.molecule = config.molecule;
        d.moleculeId = config.molecule;
        d.numParticles = 0;
        d.maxParticles = config.numParticles;
        d.partPressure = config.partPressure;
        d.maxPressure = 3.721;
        d.minPressure = 3.721e-7;
        d.photolysisWavelength = config.photolysisWavelength;
        d.mysteryPressure = config.mysteryPressure;
        d.selected = config.selected;
        d.color = config.color;
        d.selector = config.selector;
        d.currentPressure = 0;
        d.excitationThreshold = config.excitationThreshold;
        d.particleData = {
            primary: config.primaryParticle,
            subParticleList: config.subParticleList
        }
        d.visibleParticleCount = 30;
        d.wavelengthTransmission = config.wavelengthTransmission;
        d.pressuredWavelengthTransmission = config.wavelengthTransmission;
        d.mysteryWavelengthTransmission = config.wavelengthTransmission;
        d.dimension = window.chamber.getDimension ();
        d.uid = config.uid;

        d.button = $ ('#' + d.molecule + '-button');
        d.button.click (function () {

            if (d.active) {
                o.setActive (false);
            }
            else {
                $ ('#gas-select').dropdown ('set selected', d.name + ' (' + d.molecule + ')')
                // $ ('#gas-select').dropdown ('set selected', d.name + '-option')
                o.setActive (true)
            }
        });

        d.option = $ ('#' + d.molecule + '-option');

        if (!window.gasRepo) { window.gasRepo = {} }
        window.gasRepo [d.name] = o;

        list = Object.keys (window.gasRepo);
        for (key in list) {
            item = list [key];

            if (item == d.name) {
                d.index = Number (key);
                break;
            }
        }

        if (window.simcapi) {
            d.metaSimModel = config.metaSimModel;
            d.simModel = new simcapi.CapiAdapter.CapiModel ({
                name: d.name,
                molecule: d.molecule,
                numParticles: d.maxParticles,
                partPressure: d.partPressure,
                photolysisWavelength: d.photolysisWavelength,
                mysteryPressure: 0,
                selected: false,
            })

            var namespace;

            namespace = 'AtmosphericChamber.Gas.' + d.molecule
            simcapi.CapiAdapter.expose ('name', d.simModel, {
                alias: namespace + '.name'
            })
            simcapi.CapiAdapter.expose ('molecule', d.simModel, {
                alias: namespace + '.molecule'
            })
            simcapi.CapiAdapter.expose ('numParticles', d.simModel, {
                alias: namespace + '.numParticles'
            })
            simcapi.CapiAdapter.expose ('partPressure', d.simModel, {
                alias: namespace + '.partPressure'
            })
            simcapi.CapiAdapter.expose ('photolysisWavelength', d.simModel, {
                alias: namespace + '.photolysisWavelength'
            })
            simcapi.CapiAdapter.expose ('mysteryPressure', d.simModel, {
                alias: namespace + '.mysteryPressure'
            })
            simcapi.CapiAdapter.expose ('selected', d.simModel, {
                alias: namespace + '.selected'
            })

            d.simModel.on('change:name', function(model, value) {
                var target;

                d.displayName = value;
                target = $ ('[data-value="' + d.molecule + '-option"]');

                target.html (d.displayName);

                target = '[data-value="' + d.molecule + '-option"]';
                if ($ (target).hasClass ('selected')) {
                    target = 'div.default.text';
                    $ (target).html (d.displayName);
                }
            });
            d.simModel.on('change:molecule', function(model, value) {
                $ ('#' + d.molecule + '-button').html (value);
            });
            d.simModel.on('change:numParticles', function(model, value) {
                d.numParticles = value;
                o.updateObjectSetting ();
            });
            d.simModel.on('change:photolysisWavelength', function(model, value) {
                d.photolysisWavelength = value;
            });
            d.simModel.on('change:mysteryPressure', function(model, value) {
                if (isNaN (value)) {
                    d.simModel.set ('mysteryPressure', 0)
                }
                else {
                    d.mysteryPressure = value;

                    if (value === 0) {
                        window.transmissionGraph.removeData ({name: 'mystery'});
                        window.absorbtionGraph.removeData ({name: 'mystery'});
                    }
                    else if (value > 0) {
                        o.updateMysteryGraphData ();
                        o.showMysteryData ();
                    }
                }
            });
            d.simModel.on('change:partPressure', function(model, value) {
                var max, min, percent;
                d.partPressure = value;

                max = 3.721
                min = 3.721e-7;

                if (value < min) { value = min }
                if (value > max) { value = max }
                percent = value / max;

                d.currentPressure = percent * 100;

                pressureSpan = $ (d.selector.objectSetting.partPressure);
                pressureSpan.html (value);
            });
            d.simModel.on('change:selected', function(model, value) {
                var target;

                d.metaSimModel.set ('gasSelectName', d.displayName);

                d.selected = value;

                if (value) {
                    target = '[data-value="' + d.molecule + '-option"]';

                    $ (target).attr ('selected', true)
                    $ (target).addClass ('active selected')

                    target = 'div.default.text';
                    $ (target).html (d.name);

                    target = '#gas-select';
                    $ (target).change ();

                    target = 'div.default.text';
                    $ (target).html (d.displayName);

                    // console.log ('Selecting a value on', target)
                    // target.val (3).change ();
                }
            });
        }
    }

    o.addParticlesToChamber = function () {
        var end, id, int, list, primaryParticle, subParticle;
        if (!d.particleList) {
            d.particleList = []

            for (int = 0; int < d.visibleParticleCount; int++) {

                id = 'group-' + d.molecule + '-' + int;
                group = o.createParticleGroup (id);

                if (int !== 0) {
                    group.group.getDom ().classList.add ('hide');
                }

                d.particleList.push ({
                    id: '#' + id,
                    group: group.group,
                    particleList: group.particleList,
                    owner: o,
                    position: {x: 0, y: 0},
                    isExcited: false,
                    absorbedPhotons: 0,
                    excitementThreshold: 1,
                    photonInterval: Math.random () * 50 + 50,
                    currentPhotonTimer: 20,
                    excitedAnimating: false
                });
            }

            window.chamber.addParticles (d.particleList);
        }
        else {
            list = d.particleList;
            for (key in list) {
                item = list [key];

                item.removed = false;

                // Make sureu that the particle has correct opacities
                anime ({
                    targets: item.id,
                    'opacity': 1,
                    'fill-opacity': 1,
                    'stroke-opacity': 1,
                    duration: 100,
                    easing: 'linear',
                })

                // Remove the hide class
                item.group.getDom ().classList.remove ('hide')
            }
        }
    }

    o.calculateLightPassingThroughChamber = function (wavelength) {
        var finalValue, item, key, list, value, variance;
        // Take the current wavelength and find the closest transmission value
        // Use that / the partial pressure to determine the amount of light passing through the chamber
        // The remainder is the percentage

        finalValue = 100;
        value = 0;
        wavelength = Number (wavelength)
        if (wavelength < 1) {
            variance = 0.05;
        }
        else {
            variance = 0.9;
        }
        list = d.pressuredWavelengthTransmission
        for (key in list) {
            item = list [key];
            key = Number (key);

            if (key <= (wavelength + variance) && key >= (wavelength - variance)) {
                value = Number (item.transmission.toFixed (2))

                // Look for interesting transmission values
                if (value !== 100) {
                    // console.log ('Taking value:', value)
                    if (value < finalValue) {
                        finalValue = value
                    }
                }
            }
        }

        value = finalValue

        if (value === undefined) { value = 100 }
        else {
            // value *= 1 - d.partPressure / 3.721

            if (value >= 100) { value = 100 }
        }

        value = Number (value).toFixed (2)

        d.lightPassingThrough = value;

        $ ('#light-passing-through').html (value + '%')
    }

    o.createParticleGroup = function (id) {
        var end, id, int, item, group, list, particleList, primaryParticle, subGroup, subParticle, subParticleList;

        particleList = [];
        group = tm.new ('tm.svg.Group');

        // primaryParticle = tm.new ('tm.svg.Circle', {
        primaryParticle = tm.new ('app.sim.Particle', {
            x: 0,
            y: 0,
            href: d.particleData.primary.image,
            label: d.particleData.primary.label,
            radius: d.particleData.primary.radius,
            primaryParticle: true,
            offsetImage: true,
            brush: {
                color: d.particleData.primary.color,
                line: {
                    width: 1,
                    color: 'white'
                }
            }
        });

        primaryParticle.getDom ().classList.add ('particle-primary');

        particleList.push (primaryParticle);

        list = d.particleData.subParticleList;
        end = list.length;
        for (int = 0; int < end; int++) {
            item = list [int];

            subGroup = tm.new ('tm.svg.Group');

            // subParticle = tm.new ('tm.svg.Circle', {
            subParticle = tm.new ('app.sim.Particle', {
                baseX: item.x,
                baseY: item.y,
                href: item.image,
                label: item.label,
                radius: item.radius,
                // height: d.particleData.primary.radius,
                // width: d.particleData.primary.radius,
                brush: {
                    color: item.color,
                    line: {
                        width: 1,
                        color: 'white'
                    }
                },
            })

            subParticle.getDom ().classList.add ('particle-sub-' + int);
            subGroup.add (subParticle);
            subParticle.moveBy (item.x / 1.5, item.y / 1.5, 0, true)
            group.add (subGroup);
            particleList.push (subParticle);
        }

        group.getDom ().id = id;
        group.add (primaryParticle);

        return {
            group: group,
            particleList: particleList
        }
    }

    o.startAnimatingParticles = function () {
        if (!d.animating) {
            o.animateParticle ();
            d.animating = window.setInterval (
                function () {
                    o.animateParticle ();
                }, 1000 / 30 // Check if particles need to update their animations again
            )
        }
    }

    o.stopAnimatingParticles = function () {
        if (d.animating) {
            window.clearInterval (d.animating);
            d.animating = null;
        }
    }

    o.animateParticle = function (data) {
        var animation, counter, delay, int, item, key, list, photonCount, xDestination, yDestination;
        // iterate through every particle and animate each of them to a random coordinate

        counter = 1;
        list = d.particleList;
        for (key in list) {
            item = list [key];
            int = Number (key)

            if (item.isExcited) {
                if (!item.group.getDom ().classList.contains ('hide')) {
                    item.currentPhotonTimer++;

                    if (item.currentPhotonTimer >= item.photonInterval) {
                        item.currentPhotonTimer = 0;
                        // Set up a random interval for the next time the particle is excited
                        item.photonInterval = Math.random () * 50 + 50;

                        // photonCount = Math.ceil ( Math.random () * (item.absorbedPhotons / 2) );
                        // item.absorbedPhotons -= photonCount;

                        // Particles always emit all of the photons gathered
                        photonCount = item.absorbedPhotons;
                        item.absorbedPhotons = 0;

                        o.emitPhoton (item, photonCount);
                    }

                    //subParticleList = document.querySelectorAll (item.id + ' > g > g')

                    subList = item.particleList;
                    for (subKey = 1; subKey <= subList.length - 1; subKey++) {
                        subItem = subList [subKey];

                        o.setStrokeColor (item, window.chamber.getColor ())
                        o.setStrokeWidth (item, 3)

                        if ( !item ['subParticle' + subKey + 'Animating'] ) {

                            // console.log ('animating', subKey)
                            // item [] = true;

                            o.excitedAnimation ({
                                item: item,
                                subParticle: subItem,
                                key: 'subParticle' + subKey + 'Animating',
                                index: subKey
                            });
                        }
                    }

                    if (item.absorbedPhotons < item.excitementThreshold) {
                        // remove colored highlighting
                        o.setStrokeColor (item, 'white')
                        o.setStrokeWidth (item, 1)

                        item.isExcited = false;
                    }
                }
            }

            if (!item.animating) {
                o.normalAnimation (item)
            }
        }
    }

    o.normalAnimation = function (data) {
        var animation, currentPosition, x, y, wall;

        data.animating = true;

        // Pick a random edge to move to
        wall = Math.round ( Math.random () * 3 )

        if (wall == data.lastWall) {
            wall += 1;

            if (wall > 3) { wall = 0 }
        }

        data.lastWall = wall;

        var padding = 46;

        if (wall === 0) {
            wall = 'left';
            x = d.dimension.innerChamber.x + 55;
            y = (Math.random () * d.dimension.innerChamber.height) + d.dimension.innerChamber.y;

            // Prevent Gas particles from bouncing against the corners outside of the chamber
            if (y < padding + d.dimension.innerChamber.y) { y = padding + d.dimension.innerChamber.y }
            if (y > (d.dimension.innerChamber.y + d.dimension.innerChamber.height) - padding) { y = (d.dimension.innerChamber.y + d.dimension.innerChamber.height) - padding; }
        }
        else if (wall === 1) {
            wall = 'right'
            x = d.dimension.innerChamber.x + d.dimension.innerChamber.width - 15;
            y = (Math.random () * d.dimension.innerChamber.height) + d.dimension.innerChamber.y;

            // Prevent Gas particles from bouncing against the corners outside of the chamber
            if (y < padding + d.dimension.innerChamber.y) { y = padding + d.dimension.innerChamber.y }
            if (y > (d.dimension.innerChamber.y + d.dimension.innerChamber.height) - padding) { y = (d.dimension.innerChamber.y + d.dimension.innerChamber.height) - padding; }
        }
        else if (wall === 2) {
            wall = 'top'
            x = (Math.random () * d.dimension.innerChamber.width) + d.dimension.innerChamber.x
            y = d.dimension.innerChamber.y - 60;

            // Prevent Gas particles from bouncing against the corners outside of the chamber
            if (x < padding + d.dimension.innerChamber.x) { x = padding + d.dimension.innerChamber.x }
            if (x > (d.dimension.innerChamber.x + d.dimension.innerChamber.width) - padding) { x = (d.dimension.innerChamber.x + d.dimension.innerChamber.width) - padding; }
        }
        else if (wall === 3) {
            wall = 'bottom'
            x = (Math.random () * d.dimension.innerChamber.width) + d.dimension.innerChamber.x
            y = d.dimension.innerChamber.height + d.dimension.innerChamber.y - 50;

            // Prevent Gas particles from bouncing against the corners outside of the chamber
            if (x < padding + d.dimension.innerChamber.x) { x = padding + d.dimension.innerChamber.x }
            if (x > (d.dimension.innerChamber.x + d.dimension.innerChamber.width) - padding) { x = (d.dimension.innerChamber.x + d.dimension.innerChamber.width) - padding; }
        }

        currentPosition = data.group.getPosition ();

        // data.group.moveBy (
        //     x - currentPosition.x,
        //     y - currentPosition.y,
        //     2500 + (Math.random () * 1500),
        //     false,
        //     function () {
        //         data.animating = false;
        //     }
        // )

        data.group.transformBy (
            x - currentPosition.x,
            y - currentPosition.y,
            (Math.random () * 360) / 2 + 10,
            2500 + (Math.random () * 1500),
            false,
            function () {
                data.animating = false;
            }
        )
    }

    o.excitedAnimation = function (data) {
        var animation, end, duration, group, item, key, list, modifier, particle;

        data.item [ data.key ] = true

        group = data.item;
        key = data.key;
        duration = 200 + (Math.random () * 200);
        list = data.item.particleList;
        particle = data.subParticle
        modifier = particle.getModifier ();

        particle.transformBy (
            // Transform amount
            15 * modifier.x, 15 * modifier.y,
            // Rotation
            0,
            // Duration
            duration / 2,
            // No animation
            false,
            // Callback
            function () {
                particle.transformBy (
                    // Transform amount
                    15 * -modifier.x, 15 * -modifier.y,
                    // Rotation
                    0,
                    // Duration
                    duration / 2,
                    // No Animation
                    false,
                    // callback
                    function () {
                        group [ key ] = false
                    }
                )
            }
        )
    }

    o.emitPhoton = function (particle, photonCount) {
        var distance, duration, end, int, item, isNegative, key, list, position, photon, x, y;

        // console.log ('emitting', photonCount, 'photons')

        position = particle.group.getPosition ();
        end = photonCount;
        for (int = 0; int < end; int++) {
            photon = tm.new (d.photonType, {
                x: 0,
                y: 0,
                collidable: false,
                color: window.chamber.getColor ()
            })

            o.handlePhoton (particle, photon)
        }
    }

    o.handlePhoton = function (particle, photon) {
        var distance, duration, end, int, item, isNegative, key, list, position, x, y;

        distace = 1000;
        duration = 3000;

        window.chamber.getPhotonGroup ().add (photon);

        x = particle.group.getPosition ().x;
        y = particle.group.getPosition ().y;

        // Figure out the general direction that the photon is moving and rotate accordingly
        // photon.rotateBasedOnMovement (d.x, d.y, x, y);

        // o.animatePhoton (photon, x, y);'
        photon.fadeIn (200);

        var dir, direction, distance, rand;

        distance = 500;
        direction = {
            up: { x: 0, y: -distance, rotation: 270},
            upRight: {x: distance, y: -distance, rotation: 315},
            right: { x: distance, y: 0, rotation: 0},
            rightDown: { x: distance, y: distance, rotation: 45},
            down: { x: 0, y: distance, rotation: 90},
            downLeft: { x: -distance, y: distance, rotation: 135},
            left: { x: -distance, y: 0, rotation: 180},
        }

        rand = Math.floor (
            Math.random () * Object.keys (direction).length
        )

        dir = direction [ Object.keys (direction) [rand] ]

        // photon.transformBy (x, y, 0, 0, true);
        photon.animateTo (
            // Start position (x, y)
            x, y,
            // Distance to travel (x, y)
            0, 0,
            // rotation (Deg)
            dir.rotation,
            // duration
            0,
            // Callback
            function () {
                var myDuration, myPhoton;

                myPhoton = photon;
                myDuration = duration;

                myPhoton.animateTo (
                    // Start position (x, y)
                    x, y,
                    // Distance to travel (x, y)
                    dir.x, dir.y,
                    // rotation (Deg)
                    0,
                    // duration
                    duration,
                    // Callback
                    false
                )

                myPhoton.cleanUp (myDuration)
            }
        )

        photon.setColor (window.chamber.getColor ())
    }

    o.exciteParticle = function (group) {
        var item, key, list, wavelength;

        list = d.particleList
        for (key in list) {
            item = list [key];

            if (item.group == group) {
                wavelength = window.chamber.getWavelength ();

                if (wavelength <= d.photolysisWavelength) {
                    o.setStrokeColor (item, window.chamber.getColor ())
                    o.setStrokeWidth (item, 3)
                    o.photolysis (item);
                }
                else {
                    item.absorbedPhotons++

                    if (item.absorbedPhotons >= item.excitementThreshold) {
                        // console.log (item.id, 'has become excited.')
                        item.isExcited = true
                    }
                }

                // console.log ('Exciting particle...')

                break;
            }
        }
    }

    o.photolysis = function (particle) {
        var duration, item, key, list;

        // console.log ('destroying particle!', item.id)

        duration = 3000

        anime ({
            targets: particle.id,
            'opacity': 0,
            'fill-opacity': 0,
            'stroke-opacity': 0,
            duration: duration,
            easing: 'linear',
            complete: function () {
                particle.group.getDom ().classList.add ('hide')

                o.setStrokeColor (particle, 'white')
                o.setStrokeWidth (particle, 1)

                window.setTimeout (function () {
                    var myParticle = particle
                    if (myParticle.removed === false || myParticle.removed === undefined) {
                        myParticle.group.getDom ().classList.remove ('hide')
                    }

                    anime ({
                        targets: myParticle.id,
                        'opacity': 1,
                        'fill-opacity': 1,
                        'stroke-opacity': 1,
                        duration: 100,
                        easing: 'linear',
                        complete: function () {

                        }
                    })
                    // Prevents any particles from re-appearing if the user adjusts the partial pressue
                    // while a particle is invisible
                    // o.setCurrentPressure (d.currentPressure);
                }, 4000)
            }
        })

        list = particle.particleList;
        for (key in list) {
            item = list [key];

            if (Number (key) > 0) {
                o.photolizeParticle (item, duration)
            }
        }
    }

    o.photolizeParticle = function (particle, duration) {
        particle.transformBy (
            // Distance x, y
            0, 30,
            // rotation
            0,
            // duration
            duration,
            // no animation
            false,
            // callback
            function () {
                particle.transformBy (
                    0, -30,
                    0,
                    0,
                    true
                )
            }
        )
    }

    o.removeParticlesFromChamber = function () {
        var item, key, list;

        if (d.particleList) {
            list = d.particleList;
            for (key in list) {
                item = list [key];

                item.removed = true;
                item.group.getDom ().classList.add ('hide')
            }
        }
    }

    o.getActive = function () { return d.active; }

    o.getCurrentPressure = function () { return d.currentPressure; }

    o.getLightPassingThrough = function () { return d.lightPassingThrough }

    o.getMaxParticleCount = function () { return d.maxParticles; }

    o.getParticleCount = function () { return d.numParticles; }

    o.getColor = function () { return d.color; }

    o.getMolecule = function () { return d.molecule; }

    o.getWavelengthTransmission = function () { return d.wavelengthTransmission; }

    o.getPressuredWavelengthTransmission = function () { return d.pressuredWavelengthTransmission }

    o.resetParticleCount = function () {
        d.numParticles = d.maxParticles;
        window.updateTotalParticle ();
        o.updateObjectSetting ();
    }

    o.reduceMoleculeCount = function () {
        d.numParticles--;
        window.updateTotalParticle ();
        o.updateObjectSetting ();
    }

    o.setActive = function (value) {
        d.active = value;

        if (!value) {
            window.transmissionGraph.removeData ({name: d.name});
            window.absorbtionGraph.removeData ({name: d.name});

            d.button.removeClass ('grey');
        }
        else {
            d.button.addClass ('grey');
            o.showData ();
        }
    }

    o.setStrokeColor = function (item, color) { $ (item.id + ' circle').css ({stroke: color}) }

    o.setStrokeWidth = function (item, size) { $ (item.id + ' circle').css ({'stroke-width': size}) }

    o.setCurrentPressure = function (value, max) {
        var end, int, item, key, list, particlePercent, visibleParticleCount;

        d.currentPressure = Number (value);

        particlePercent = d.currentPressure / max;
        visibleParticleCount = Math.round ( particlePercent * d.visibleParticleCount )
        if (visibleParticleCount < 1) { visibleParticleCount = 1 }

        // console.log (particlePercent, 'of', d.visibleParticleCount, 'is', visibleParticleCount)

        if (!d.particleList) {
            o.addParticlesToChamber ();
        }

        end = d.particleList.length;
        for (int = 0; int < end; int++) {
            item = d.particleList [int];

            item.group.getDom ().classList.add ('hide');
        }

        end = visibleParticleCount;
        for (int = 0; int < end; int++) {
            item = d.particleList [int];

            item.group.getDom ().classList.remove ('hide');

            // console.log (item.particleList)
        }

        // console.log (visibleParticleCount);

        $ (d.selector.objectSetting.partPressure).html (d.currentPressure)

        o.updateObjectSetting ();

        // if (value > 0) { o.addParticlesToChamber () }
        // else if (value == 0 && d.particleList) { o.removeParticlesFromChamber () }
    }

    o.showData = function () {
        var button, item, key, list, dataPointList, molecule;

        list = window.gasRepo;
        for (key in list) {
            item = list [key];

            if (item) {
                item.setActive (false);
            }
        }

        d.active = true;
        d.button.addClass ('grey');


        dataPointList = d.pressuredWavelengthTransmission;

        if (!dataPointList) {
            dataPointList = {}
        }

        window.transmissionGraph.plotData ({
            name: d.name,
            displayName: d.displayName,
            color: d.color,
            dataPointList: dataPointList
        })

        window.absorbtionGraph.plotData ({
            name: d.name,
            displayName: d.displayName,
            color: d.color,
            dataPointList: dataPointList
        })
    }

    o.showMysteryData = function () {
        if (d.mysteryPressure) {
            var dataPointList;

            dataPointList = d.mysteryWavelengthTransmission;

            if (!dataPointList) {
                dataPointList = {}
            }

            window.transmissionGraph.plotData ({
                owner: o,
                name: 'mystery' + d.uid,
                displayName: 'mystery',
                color: 'white',
                dataPointList: dataPointList
            })

            window.absorbtionGraph.plotData ({
                owner: o,
                name: 'mystery' + d.uid,
                displayName: d.displayName,
                color: 'white',
                dataPointList: dataPointList
            })
        }
    }

    o.pressurizeWavelengthTransmission = function () {
        var item, key, list, max, modifier, value;

        modifier = Number (d.partPressure);
        d.pressuredWavelengthTransmission = {}
        // max = 3.721 * 2;
        max = 1;

        list = d.wavelengthTransmission;
        for (key in list) {
            item = list [key];

            if (item.transmission != 100) {

                // if I have a transmission of 15% at 1 atmospherem at 3 atmospheres this should be 5%

                // 3.721e-7 should equal very small transmission amounts
                // 1 should equal the transmission amount found in the data
                // 3.721 should be 3 times the amount found in the data

                value = item.transmission / (modifier / max)
                value = value - 100;

                if (value < 0) { value = 0 }
                else if (value > 100) { value = 100 }

                d.pressuredWavelengthTransmission [key] = {
                    transmission: value
                }
            }
        }

        return d.pressuredWavelengthTransmission
    }

    o.updateGraphData = function () {
        // For now, just have a max partial pressure double the effective absorption rate
        // for any wavelength that does not have 100% transmission

        o.pressurizeWavelengthTransmission ();

        if (d.active) {
            o.showData ();
        }
    }

    o.updateMysteryGraphData = function () {
        if (d.mysteryPressure > 0) {
            window.gasRepo ['mystery'] = {
                getColor: function () { return 'white' }
            };

            o.pressurizeWavelengthTransmission ();
        }
    }

    o.updateObjectSetting = function () {
        var decimalCount, expression, exponent, numParticleSpan, max, min, percent, pressure, pressureSpan, pressureString, value;

        // console.log ('Is', d.name, 'the current selected gas?', window.currentGas)
        // console.log ('What is the current gas?', window.currentGas)

        if (window.currentGas == d.name) {
            numParticleSpan = $ (d.selector.objectSetting.numParticle);
            // add commas every third number

            d.numParticles = d.maxParticles * ( (d.partPressure - d.minPressure) / (d.maxPressure - d.minPressure) );

            // numParticleSpan.html ( d.numParticles.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") );
            if (d.numParticles > 0) {
                value = d.numParticles
                // value= value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                exponent = 0;

                while ( value > 10 ) {
                    value /= 10;
                    exponent++;
                }
            }
            else {
                value = 0;
            }

            // Fixing a very specific edge-case bug.
            if (exponent === undefined) { exponent = 10; value = 3.49 }

            numParticleSpan.html ( value.toFixed (2) + 'e' + exponent);
            window.updateTotalParticle ();

            percent = d.currentPressure / $ ('#part-pressure') [0].max ;

            // Make sure at our lowest value, we see 3.721e-7 atmospheres
            if (percent < 0.001) {
                min = 3.721e-7;
                max = 3.721e-7;
            }
            else if (percent <= 0.5) {
                percent *= 2
                min = 3.721e-7;
                max = 1;
            }
            else {
                percent -= 0.5;
                percent *= 2;
                min = 1;
                max = 3.721;
            }

            pressure = ((max - min) * percent) + min

            // Figure out how times to mutiply this in order to get at least 1
            if (pressure <= 0.999) {
                var counter;
                counter = 0;
                while (pressure <= 0.999) {
                    counter++
                    pressure *= 10;
                }

                pressure = pressure.toFixed (3) + 'e-' + counter;
            }
            else {
                pressure = pressure.toFixed (3)
            }

            pressureSpan = $ (d.selector.objectSetting.partPressure);
            pressureSpan.val (pressure);

            var myEvent;

            myEvent = new Event ('input');
            pressureSpan [0].dispatchEvent (myEvent);

            d.partPressure = pressure;
            o.updateGraphData ();
        }
    }
})
