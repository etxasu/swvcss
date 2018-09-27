'use strict';
tm.start (function () {
    var path;

    path = {
        tm: '/src/tm',
        svg: '/src/tm/svg',
        timeline: '/src/sim/timeline',
    }

    tm.load ({
        list: [
            // Bring in Tamed Objects.
            path.tm + '/Base.js',
            path.tm + '/input/mouse/Drag.js',

            // Bring in the Tamed SVG.
            path.svg + '/dom/Attr.js',
            path.svg + '/Box.js',
            path.svg + '/Brush.js',
            path.svg + '/Circle.js',
            path.svg + '/Dom.js',
            path.svg + '/Group.js',
            path.svg + '/Line.js',
            path.svg + '/Svg.js',
            path.svg + '/Text.js',

            // Bring in the Timeline App.
            path.timeline + '/axis/Section.js',
            path.timeline + '/axis/Axis.js',
            path.timeline + '/Sandbox.js',
            path.timeline + '/Timeline.js',
            path.timeline + '/App.js',
            path.timeline + '/App.hbs',
        ],
        done: function () {
            tm.new ('sim.timeline.App', {
                appendTo: '#app',
            })
        }
    })
})
