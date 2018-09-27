'use strict';
tm.add ('tm.svg.Polygon', ['tm.svg.Dom'], function (o, p, d) {

    // Public Methods
    o.setup = function (config) {
        d.attr.points = {key: 'points'};

        if (!d.dom) {
            config.tag = 'polygon';
            p.changeTag (config)
        }
    }

    // o.override ({
    //     setDrawInfo: function (original, key, updateAttr) {
    //         var brush, info;
    //
    //         // Get the draw info for the object
    //         info = original (key, updateAttr);
    //         switch (key) {
    //             case 'src':
    //                 inf
    //                 break;
    //         }
    //     }
    // })
})
