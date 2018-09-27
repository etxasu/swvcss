// Manages a group of gas molecules
'use strict'
tm.add ('sim.greenhouse.molecule.Gas', function (o, p, d) {
    o.setup = function (config) {
        var end, gasConfig, int;

        if (config.maxPressure === undefined) { config.maxPressure = 3.721 }

        // Assign config values
        d.svg = config.svg;
        d.maxPressure = config.maxPressure;
        d.width = config.width;
        d.height = config.height;

        // Assign additional values
        d.particleCount = 10;
        d.moleculeList = [];
        d.density = 0;

        // Create molecule doms
        end = d.particleCount;
        int = 0;
        while (int < end) {
            d.moleculeList.push (
                tm.new ('sim.greenhouse.molecule.Dom', {
                    width: d.width,
                    height: d.height
                })
            )

            d.svg.add (d.moleculeList [int])

            int++
        }


        o.hideAll ();
    }

    // Iterate over visible, none animating molecules
    o.animate = function () {
        var end, int, item;

        end = d.density;

        if (end > d.particleCount) { end = d.particleCount }

        for (int = 0; int < end; int++) {
            item = d.moleculeList [int];

            item.animate ();
        }
    }

    // Takes pressure amount and determines how many molecules are present in chamber
    o.getDensity = function () {
        var density;

        density = Math.ceil (d.particleCount * ( d.pressure / d.maxPressure ));
        d.density = density;

        return density
    }

    o.hideAll = function () {
        var item, key, list;

        list = d.moleculeList;
        for (key in list) {
            item = list [key];

            item.setVisible (false);
        }
    }

    o.setActive = function (active) {
        var end, int;

        d.active = active;

        if (d.active) {
            o.setVisible (0, o.getDensity ());
        }
        else {
            o.hideAll ();
        }
    }

    o.setPressure = function (pressure) {
        var value;

        d.pressure = pressure;
        o.setVisible (0, o.getDensity ());
    }

    o.setVisible = function (start, end) {
        var int, item;

        o.hideAll ();

        int = start;
        while (int < end) {
            item = d.moleculeList [int];

            item.setVisible (true);
            int++
        }
    }
})
