tm.add ('app.sim.atmos.instructor.Graph', ['app.sim.atmos.data.Graph'], function (o, p, d) {
    o.setup = function (config) {
        d.isMysteryData = config.isMysteryData
    }

    o.setIsMysteryData = function (isMysteryData) {
        d.isMysteryData = isMysteryData
    }

    o.override ({
        plotData: function (original, data) {
            if (d.isMysteryData) {
                data.color = 'black'
            }

            original ();
        }
    })

})
