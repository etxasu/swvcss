// Handles creating and directing photons
tm.add ('app.sim.atmos.chamber.Photon', ['app.sim.atmos.chamber.Particle'], function (o, p, d) {
    o.setup = function (config) {
        if (!config.photonType) {
            config.photonType = 'app.sim.atmos.photon.Mover'
        }

        d.photonType = config.photonType;
        o.createPhotonList ();
    }

    o.animatePhotonList = function () {
        var callback, duratio, incrementn, item, key, list, start, xDestination, yDestination;

        // Make sure all photons are done animating
        list = d.photonsAnimating;
        for (key in list) {
            item = list [key];

            if (item == true) { return }
        }

        increment = d.dimension.innerChamber.y / d.photonList.length;

        list = d.photonList;
        for (key in list) {
            item = list [key];
            int = Number (key)

            if ( !d.photonsAnimating [key] ) {
                d.photonsAnimating [key] = true
                yDestination = increment * int

                o.photonAnimator (item, yDestination, key);
            }
        }
    }

    o.photonAnimator = function (photon, y, key) {
        var callback, duration, increment, start, xDestination;

        duration = 3000;
        start = d.dimension.innerChamber.x - 150;
        xDestination = d.dimension.innerChamber.width + 200;

        callback = function () {
            d.photonsAnimating [key] = false
            // console.log ('Photon', key, 'has finished animating')
        }

        photon.animateTo (
            // Start position (x, y)
            start, y + d.dimension.innerChamber.y,
            // Distance to travel (x, y)
            xDestination, 0,
            // rotation (Deg)
            0,
            // duration
            duration,
            // Callback
            callback
        )
    }

    o.createPhotonList = function () {
        var end, group, int, photon;

        d.photonsAnimating = [];

        if (d.photonList.length == 0) {
            // end = 5;
            end = 3;
            // end = 0;
            for (int = 0; int < end; int++) {
                photon = tm.new (d.photonType, {
                    x: 0,
                    y: 0,
                    radius: 10,
                    brush: {
                        color: 'gold',
                    }
                })

                d.photonList.push (photon)
                d.photonGroup.add (photon)
                d.photonsAnimating.push (false);
            }
        }
    }

    o.getPhotonGroup = function () {
        return d.photonGroup;
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
})
