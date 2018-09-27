'use strict'
tm.add ('component.property.toggle.Group', ['tm.svg.Dom'], function (o, p, d) {
    o.setup = function (config) {
        var item, key, list;
        d.id = config.id;

        d.dom = document.createElement ('div');
        d.dom.id = d.id;
        d.dom = $ (d.dom)
        d.dom.addClass ('property toggle group');

        d.toggleList = [];

        list = config.toggleList;
        for (key in list) {
            item = list [key];

            item.selector = '#' + d.id;

            d.toggleList.push (tm.new ('sim.greenhouse.property.toggle.Base', item));

            d.dom.append (d.toggleList [key].getDom ());
        }

        $ (d.selector).append (d.dom)
    }
})
