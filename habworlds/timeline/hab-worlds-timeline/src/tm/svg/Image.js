'use strict';
tm.add ('tm.svg.Image', ['tm.svg.Dom'], function (o, p, d) {

    // Public Methods
    o.setup = function (config) {
        d.attr.x = true;
        d.attr.y = true;
        d.attr.width = true;
        d.attr.height = true;
        // d.attr.href = {key: 'xlink:href'};
        d.attr.href = true;

        if (!d.dom) {
            config.tag = 'image';
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
