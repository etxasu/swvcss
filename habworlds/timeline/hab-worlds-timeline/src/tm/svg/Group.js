'use strict';
tm.add ('tm.svg.Group', ['tm.svg.Dom'], function (o, p, d) {
    // Public methods.
    o.setup = function (config) {
        d.attr.start = o.setDrawInfo;
        d.attr.end = o.setDrawInfo;

        if (!d.dom) {
            config.tag = 'g';
            p.changeTag (config);
        }
    }
})
