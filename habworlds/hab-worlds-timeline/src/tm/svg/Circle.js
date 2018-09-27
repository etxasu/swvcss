'use strict';
tm.add ('tm.svg.Circle', ['tm.svg.Dom'], function (o, p, d) {
    // Public methods.
    o.setup = function (config) {
        d.attr.x = {key: 'cx'};
        d.attr.y = {key: 'cy'};
        d.attr.radius = o.setDrawInfo;

        if (!d.dom) {
            config.tag = 'circle';
            p.changeTag (config);
        }
    }
    o.override ({
        setDrawInfo: function (original, key, updateAttr) {
            var info;

            // Get the draw info for the object.
            info = original (key, updateAttr);
            switch (key) {
                case 'radius':
                    info.r = d.radius;

                    // Check if we need to update the dom attributes.
                    if (updateAttr && d.dom) {
                        d.dom.setAttributeNS (null, 'r', info.r);
                    }
                    break;
            }

            return info;
        }
    })
})
