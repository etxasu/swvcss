'use strict'
tm.add ('sim.greenhouse.property.toggle.Group', ['tm.svg.Dom'], function (o, p, d) {
    o.setup = function (config) {
        var item, key, list;
        d.id = config.id;

        d.dom = document.createElement ('div');
        d.dom.id = d.id;
        d.dom = $ (d.dom)
        d.dom.addClass ('property toggle group');

        d.toggleRepo = {};

        list = config.toggleList;
        for (key in list) {
            item = list [key];

            item.selector = '#' + d.id;

            d.toggleRepo [item.name] = tm.new ('sim.greenhouse.property.toggle.Base', item);

            d.dom.append (d.toggleRepo [item.name].getDom ());
        }

        $ (d.selector).append (d.dom)
    }

    o.clickItem = function (name) {
        $ (d.toggleRepo [name].getDom ()).click ();
    }
})
