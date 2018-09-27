/*
    Creates the visualization for the transfer of carbon
*/
'use strict'
tm.add ('sim.geo.chemical.bin.molecule.Base', ['tm.svg.Circle'], function (o, p, d) {
    o.setup = function (config) {
        d.svg = config.svg;

        d.svg.add (o);

        // d.svg.getDom ().appendChild (d.dom)
    }

})
