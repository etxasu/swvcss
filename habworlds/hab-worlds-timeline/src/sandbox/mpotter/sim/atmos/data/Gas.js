tm.add ('app.sim.atmos.data.Gas', function (o, p, d) {
    o.setup = function () {
        d.rawGasData = [];
        d.gasData = {};
    }

    o.fixUpData = function () {
        var item, key, list;

        list = d.rawGasData;
        for (key in list) {
            item = list [key];

            if (!isNaN (item.wavelength)) {
                d.gasData [item.wavelength.toString ()] = { transmission: Number (item.transmission) }
            }
        }
    }

    o.getGasData = function () {
        return d.gasData;
    }
})
