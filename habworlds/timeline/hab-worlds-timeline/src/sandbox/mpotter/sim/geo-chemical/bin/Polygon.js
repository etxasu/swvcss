'use strict'
tm.add ('sim.geo.chemical.bin.Polygon', ['tm.svg.Polygon'], function (o, p, d) {
    o.delete = function () {
        var item, key, list;

        // remove element from dom
        d.dom.parentNode.removeChild (d.dom);

        // remove data
        list = d
        for (key in list) {
            delete d [key]
        }
    }
})
