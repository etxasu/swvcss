'use strict';
tm.add ('sim.timeline.Minimap', ['tm.Base'], function (o, p, d) {
    o.setup = function (config) {
        // Config defaults
        if (!config.selector) { config.selector = {} }

        // Assign config values
        d.selector = config.selector
        d.container = $ (d.selector.container);
        d.target = $ (d.selector.target);

        // Set up visible area
        d.viewArea = document.createElement ('div');

        $ (d.viewArea).width (100)
        $ (d.viewArea).height (100)
        $ (d.viewArea).css ({
            border: 'solid black 2px',
            'background-color': 'rgba(0,0,0,0.5)'
        })

        d.viewArea.addEventListener ('mousedown', function () { console.log ('here') })
        d.container.append (d.viewArea)
    }

    o.makeMap = function () {
        d.map = d.target.clone ();

        d.map.css ('width', d.target.width ());
        d.map.css ('height', d.target.height ());

        d.container.append (d.map);
        // d.map.append ( $ (d.box.getDom ()).clone () )
    }

    o.synchronize = function () {
        // d.container.html ('');
        // o.makeMap ();
    }
})
