'use strict';
tm.add ('tm.svg.Box', ['tm.svg.Dom'], function (o, p, d) {
    // Public methods.
    o.setup = function (config) {
        d.attr.x = true;
        d.attr.y = true;
        d.attr.width = true;
        d.attr.height = true;

        if (!d.dom) {
            config.tag = 'rect';
            p.changeTag (config);
            // // d.dom.setAttributeNS (null, 'transform', 'translate(10, 10)');
            // // transform="translate(30,40)"
            // d.x = 0;
            // setInterval (function () {
            //     d.x += 1;
            //     d.y = 100;
            //     console.log ('here:', d.x);
            //     d.dom.setAttributeNS (null, 'transform','translate(' + d.x + ',' + d.y + ')');
            // }, 100);
        }

    }
    o.move = function (x) {
        console.log ('*** HUH')
        // d.dom.setAttributeNS (null, 'transform', 'scale(10, 1)');
        d.dom.setAttributeNS (null, 'transform', 'translate(' + x + ', 0)');
    }
})
