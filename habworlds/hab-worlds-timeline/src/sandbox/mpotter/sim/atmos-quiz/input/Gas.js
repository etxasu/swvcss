tm.add ('app.sim.atmos.quiz.input.Gas', ['app.sim.atmos.quiz.input.Base'], function (o, p, d) {
    o.setup = function (config) {
        d.id = config.molecule;
        d.name = config.name;
        d.selector = config.selector;
        d.label = config.label;
        d.normalId = config.normalMolecule

        tm.html ('app.sim.atmos.quiz.gas.Button', {
            selector: d.selector,
            append: true,
            data: {
                label: d.label,
                molecule: d.id,
            }
        })

        d.dom = $ ('#' + d.id + '-button')
        d.dom.click (o.onClick)

        if (config.onClick) {
            o.addEventListener ({
                name: 'click',
                listener: config.onClick
            })
        }
    }

    o.onClick = function (event) {
        o.callEventListeners ({
            name: 'click',
            data: {
                molecule: d.id,
                name: d.name
            }
        })

        // d.dom.toggleClass ('active')
    }
})
