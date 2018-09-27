tm.add ('app.sim.atmos.data.Gas', function (o, p, d) {
    o.setup = function (config) {
        if (!config.color) { config.color = 'white' }

        d.rawGasData = [];
        d.gasData = {};
        d.color = config.color;
        d.name = config.name;
        d.molecule = config.molecule;

        if (!d.molecule) { d.molecule = d.name }

        if (window.simcapi && d.name) {
            o.setupCapi ();

            d.onCapiChange = config.onCapiChange;
        }
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

    o.getActive = function () { return d.active; }
    o.getColor = function () { return d.color; }
    o.getGasData = function () { return d.gasData; }
    o.getMolecule = function () { return d.molecule; }
    o.getName = function () { return d.name; }
    o.getPressure = function () { return d.pressure; }

    o.generateGasData = function () {
        var data, int, end;

        end = 50;
        int = 0;
        data = {}

        while (int <= end) {
            data [int.toFixed (3).toString ()] = {transmission: 100}

            int++
        }

        d.gasData = data
        return data
    }

    o.setPressure = function (pressure) {
        d.pressure = pressure

        if (d.simModel) {
            d.ignoreChange = true
            d.simModel.set ('pressure', pressure)
            d.ignoreChange = false
        }
    }

    o.setActive = function (active) {
        d.active = active
        if (d.simModel) {
            d.ignoreChange = true
            d.simModel.set ('selected', active)
            d.ignoreChange = false
        }
    }

    o.setCapiListener = function (listener) { d.onCapiChange = listener }

    o.setupCapi = function () {
        var namespace, simModel;

        d.capi = {
            defaults: {
                name: d.name,
                molecule: d.molecule,
                pressure: 0,
                pressureSliderEnabled: true,
                selected: false,
            }
        }

        simModel = new simcapi.CapiAdapter.CapiModel (d.capi.defaults);
        d.simModel = simModel;

        namespace = 'Gas.' + d.molecule;
        simcapi.CapiAdapter.expose ('name', simModel, {
            alias: namespace + '.name',
        })
        simcapi.CapiAdapter.expose ('molecule', simModel, {
            alias: namespace + '.molecule',
        })
        simcapi.CapiAdapter.expose ('pressure', simModel, {
            alias: namespace + '.pressure',
        })
        simcapi.CapiAdapter.expose ('pressureSliderEnabled', simModel, {
            alias: namespace + '.pressureSliderEnabled',
        })
        simcapi.CapiAdapter.expose ('selected', simModel, {
            alias: namespace + '.selected',
        })

        simModel.on ('change:name', function (simModel, value) {
            o.capiChange ({ simModel: simModel, value: value, key: 'name' })
        })
        simModel.on ('change:molecule', function (simModel, value) {
            o.capiChange ({ simModel: simModel, value: value, key: 'molecule' })
        })
        simModel.on ('change:pressure', function (simModel, value) {
            o.capiChange ({ simModel: simModel, value: value, key: 'pressure' })
        })
        simModel.on ('change:pressureSliderEnabled', function (simModel, value) {
            o.capiChange ({ simModel: simModel, value: value, key: 'pressureSliderEnabled' })
        })
        simModel.on ('change:selected', function (simModel, value) {
            o.capiChange ({ simModel: simModel, value: value, key: 'selected' })
        })
    }

    o.capiChange = function (data) {
        if (d.ignoreChange) { return; }
        if (d.onCapiChange) {
            data.name = d.molecule;
            d.onCapiChange (d.name, data)
        }
    }
})
