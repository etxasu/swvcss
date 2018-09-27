// Takes two options, only allows one to be active at a time
'use strict'
tm.add ('sim.atmos.quiz.input.Switch', function (o, p, d) {
    o.setup = function (config) {
        d.selector = config.selector;
        d.id = config.id;
        d.onChange = config.onChange

        d.option = {
            one: {
                name: config.option.one
            },
            two: {
                name: config.option.two
            }
        }

        tm.html ('sim.atmos.quiz.input.Switch', {
            selector: d.selector,
            append: true,
            data: {
                id: d.id,
                optionOne: d.option.one.name,
                optionTwo: d.option.two.name
            }
        })

        d.dom = $ ('#' + d.id);
        d.option.one.dom = $ ('#' + d.id + '-one')
        d.option.two.dom = $ ('#' + d.id + '-two')

        d.option.one.dom.addClass ('active')

        d.option.one.dom.on ('click', function () { o.switch ('one') })
        d.option.two.dom.on ('click', function () { o.switch ('two') })
    }

    o.switch = function (key) {
        var otherKey;

        otherKey = 'two'

        if (key === otherKey) { otherKey = 'one' }

        d.onChange (d.option [key].name)

        d.option [key].dom.addClass ('active')
        d.option [otherKey].dom.removeClass ('active')
    }
})
