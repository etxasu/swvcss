'use strict'
tm.add ('component.property.toggle.Base', ['tm.svg.Dom'], function (o, p, d) {
    o.setup = function (config) {
        d.id = config.id;
        d.selector = config.selector;
        d.name = config.name;

        if (d.name === false) { d.name = 'xx'; d.hide = true }

        tm.html ('sim.greenhouse.property.toggle.Base', {
            selector: 'body',
            append: true,
            data: {
                id: d.id,
                name: d.name
            }
        })

        d.dom = $ ('#' + d.id)
        d.domIcon = $ ('#' + d.id + ' > i')

        if (d.hide) {
            d.dom.addClass ('invisible')
            d.domIcon.addClass ('invisible')
        }
        else {
            d.dom.click (function (event) {
                d.dom.toggleClass ('active');
                d.domIcon.toggleClass ('outline');
                o.clickEvent (event)
            })
        }

        $ (d.selector).append (d.dom)

        d.evntList = [];

        if (config.clickHandler) { o.addClickHandler (config.clickHandler) }
    }

    o.addClickHandler = function (data) {
        d.evntList.push (data)
    }

    o.clickEvent = function (event) {
        var item, key, list;

        list = d.evntList;
        for (key in list) {
            item = list [key];

            try {
                item.handler (item.data, event)
            } catch (error) { console.log (error) }
        }
    }
})
