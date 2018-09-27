tm.add ('app.sim.atmos.data.gas.H2', ['app.sim.atmos.data.Gas'], function (o, p, d) {
    o.setup = function (config) {
        o.generateGasData ()
    }

    o.override ({
        setupCapi: function (original) {
            d.name = 'Hydrogen';
            d.molecule = 'H₂';

            original ();
        }
    })
})
