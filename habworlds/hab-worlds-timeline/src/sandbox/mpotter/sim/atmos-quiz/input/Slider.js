'use strict'
tm.add ('sim.atmos.quiz.input.Slider', ['app.sim.atmos.quiz.input.Base'], function (o, p, d) {
    o.setup = function (config) {
        // Provide config defaults
        if (config.selector === undefined) { config.selector = 'body' }
        if (config.max === undefined) { config.max = 1 }
        if (config.min === undefined) { config.min = 1 }
        if (config.step === undefined) { config.step = 1 }
        if (config.value === undefined) { config.value = config.min }

        // Assign Config values
        d.selector = config.selector;
        d.id = config.id;
        d.min = config.min;
        d.max = config.max;
        d.step = config.step;
        d.value = config.value;
        d.title = config.title;

        tm.html ('sim.atmos.quiz.input.Slider', {
            selector: d.selector,
            append: true,
            data: {
                id: d.id,
                min: d.min,
                max: d.max,
                step: d.step,
                title: d.title,
                value: d.value
            }
        })

        d.dom = $ ('#' + d.id);
    }
})
