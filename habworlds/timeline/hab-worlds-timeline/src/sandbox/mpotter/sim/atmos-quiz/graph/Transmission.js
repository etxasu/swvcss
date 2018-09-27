tm.add ('app.sim.atmos.graph.Transmission', ['sim.greenhouse.graph.Wavelength'], function (o, p, d) {
    o.setup = function (config) {
        if (!config.globalName) { config.globalName = 'transmissionGraph' }
        window [config.globalName] = o;
        d.percentType = 'Transmission Percent'
    }

    o.override ({
        stopDrawingZoomBox: function (original) {
            original ();
            o.replotData ();
        }
    })
})
