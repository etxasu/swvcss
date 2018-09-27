'use strict';
tm.add ('tm.svg.Line', ['tm.svg.Dom'], function (o, p, d) {

    // Public methods.
    o.setup = function (config) {
        d.attr.start = o.setDrawInfo;
        d.attr.end = o.setDrawInfo;

        if (!d.dom) {
            config.tag = 'line';
            p.changeTag (config);
        }
    }
    o.override ({
        getPosition: function () {
            return {
                start: {
                    x: d.start.x,
                    y: d.start.y,
                },
                end: {
                    x: d.end.x,
                    y: d.end.y,
                },
            }
        },
        
        setDrawInfo: function (original, key, updateAttr) {
            var brush, info;

            // Get the draw info for the object.
            info = original (key, updateAttr);
            switch (key) {
                case 'start':
                    info.x1 = d.start.x;
                    info.y1 = d.start.y;

                    // Check if we need to update the dom attributes.
                    if (updateAttr && d.dom) {
                        d.dom.setAttributeNS (null, 'x1', info.x1);
                        d.dom.setAttributeNS (null, 'y1', info.y1);
                    }
                    break;

                case 'end':
                    info.x2 = d.end.x;
                    info.y2 = d.end.y;

                    // Check if we need to update the dom attributes.
                    if (updateAttr && d.dom) {
                        d.dom.setAttributeNS (null, 'x2', info.x2);
                        d.dom.setAttributeNS (null, 'y2', info.y2);
                    }
                    break;
            }

            return info;
        }
    })
})
