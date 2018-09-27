tm.add ('sim.greenhouse.property.Unit', ['tm.svg.Dom'], function (o, p, d) {
    o.setup = function (config) {
        // Set config defaults
        if (config.value === undefined) { config.value = 0 }
        if (!config.exchangTable) { config.exchangeTable = {} }

        // Store config data
        d.unit = config.unit;
        d.activeUnit = d.unit;
        d.value = config.value;
        // Expected format for exchangeTable
        /*
            unit = 'feet'
            {
                'feet': 1, // This is programattically added
                'two feet': 2,
                'inches': 12, // 1 foot is equal to 12 inches
                'um': 1e+7
            }
        */
        d.exchangeTable = config.exchangeTable;

        if (d.exchangeTable [d.unit] === undefined) { d.exchangeTable [d.unit] = 1 }
    }


    o.getActiveUnit = function () {
        return d.activeUnit
    }

    o.getValue = function () {
        return {
            coreValue: d.value / d.exchangeTable [d.exchangeTable],
            value: d.value
        };
    }

    o.setActiveUnit = function (unit) {
        if (d.exchangeTable [unit] !== undefined) {
            d.activeUnit = unit
        }
        else {
            console.log (unit, 'is not a valid option to exchange', d.unit, 'with.');
        }
    }

    o.setValue = function (value) {
        d.value = value * d.exchangeTable [d.activeUnit];
    }
})
