'use strict';
tm.add ('tm.svg.Brush', ['tm.svg.dom.Attr'], function (o, p, d) {
    o.setup = function (config) {
        d.attr.color = true;
        d.attr.line = true;

        if (!config.line) {
            config.line = {
                width: 0,
                color: 'transparent',
            }
        }

        o.update (config);
    }
    o.override ({
        getDrawInfo: function (original, data) {
            var info;

            info = {
                color: d.color,
                line: d.line,
            }
            return info;
        },
    })
})
