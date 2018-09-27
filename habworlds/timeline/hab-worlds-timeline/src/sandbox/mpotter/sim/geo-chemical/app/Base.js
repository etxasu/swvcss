'use strict'
tm.add ('sim.geo.chemical.app.Base', function (o, p, d) {
    o.setup = function (config) {
        d.selector = config.selector;
        d.container = $ (d.selector);

        d.height = $ (d.selector.scene).height ();
        d.width = $ (d.selector.scene).width ();

        d.scene = tm.new ('sim.geo.chemical.scene.Base', {
            height: d.height,
            width: d.width,
            selector: d.selector
        })

        d.animateEventList = d.scene.getAnimateEventList ();

        /*
            Create SVG Components
        */
        d.svg = tm.new ('tm.svg.Svg', {
            appendTo: d.selector.scene,
            width: d.width,
            height: d.height + 20,
            brush: {
                color: 'gold',
                line: {
                    width: 1,
                    color: 'black'
                }
            }
        })

        d.scene.animateScene ();
    }


})
