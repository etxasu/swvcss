// Handles the rendering of gas particles and when to show them.
tm.add ('app.sim.atmos.chamber.Particle', ['app.sim.atmos.chamber.Light'], function (o, p, d) {
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

    o.getParticleList = function () {
        return d.particleList;
    }
})
