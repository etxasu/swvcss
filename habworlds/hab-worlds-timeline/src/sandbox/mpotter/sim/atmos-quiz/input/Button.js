'use strict'
tm.add ('sim.atmos.quiz.input.Button', ['app.sim.atmos.quiz.input.Base'], function (o, p, d) {
    o.setup = function (config) {
        // Provide config defaults
        if (config.selector === undefined) { config.selector = 'body' }

        // Assign Config values
        d.selector = config.selector;
        d.id = config.id;
        d.label = config.label;
        d.onClick = config.onClick

        tm.html ('sim.atmos.quiz.input.Button', {
            selector: d.selector,
            append: true,
            data: {
                id: d.id,
                label: d.label
            }
        })

        d.dom = $ ('#' + d.id);
        d.dom.on ('click', d.onClick)
    }
})
