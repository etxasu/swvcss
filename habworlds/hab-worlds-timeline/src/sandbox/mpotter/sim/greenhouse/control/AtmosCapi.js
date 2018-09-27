'use strict';
tm.add ('sim.greenhouse.control.atmosphere.Capi', [], function (o, p, d) {
    o.addCapiForGasButtons = function (list) {
        var capi, item, key, namespace, simModel;
        if (window && window.simcapi) {
            for (key in list) {
                item = list [key];

                o.setupCapi (item.name)
            }
        }
    }

    o.setupCapi = function (name) {
        var capi, namespace, simModel;

        capi = {}
        namespace = 'Gas';

        capi [name + 'Enabled'] = true;
        capi [name + 'Visible'] = true;

        simModel = new simcapi.CapiAdapter.CapiModel (capi)
        simcapi.CapiAdapter.expose (name + 'Enabled', simModel, {
            alias: namespace + '.' + name + '.Button.Enabled',
        })
        simcapi.CapiAdapter.expose (name + 'Visible', simModel, {
            alias: namespace + '.' + name + '.Button.Visible',
        })

        simModel.on ('change:' + name + 'Enabled', function (simModel, value) {
            o.setButtonEnabled (name, value)
        })
        simModel.on ('change:' + name + 'Visible', function (simModel, value) {
            o.setButtonVisible (name, value)
        })
    }

    o.setButtonEnabled = function (name, value) {
        if (value) {
            $ ('#atmo-gas-toggle' + name).removeClass ('disabled')
        }
        else {
            $ ('#atmo-gas-toggle' + name).addClass ('disabled')
        }
    }

    o.setButtonVisible = function (name, value) {
        if (value) {
            $ ('#atmo-gas-toggle' + name).removeClass ('hide')
        }
        else {
            $ ('#atmo-gas-toggle' + name).addClass ('hide')
        }
    }
})
