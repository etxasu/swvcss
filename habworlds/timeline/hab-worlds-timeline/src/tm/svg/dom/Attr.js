'use strict';
tm.add ('tm.svg.dom.Attr', ['tm.Base'], function (o, p, d) {
    // Shared methods.
    o.setup = function (config) {
        d.attr = {};
    }
    o.getDrawInfo = function () {}
    o.setDrawInfo = function (key, updateAttr) {
        var brush, info;

        // Get the draw info for the object.
        info = {}
        switch (key) {
            case 'brush':
                if (d.brush.getDrawInfo) {
                    info.brush = d.brush.getDrawInfo ();
                }
                else {
                    info.brush = d.brush;
                }

                // Check if we need to update the dom attributes.
                if (updateAttr && d.dom) {
                    if (info.brush.color) { d.dom.setAttributeNS (null, 'fill', info.brush.color); }
                    if (info.brush.line) {
                        if (info.brush.line.color) { d.dom.setAttributeNS (null, 'stroke', info.brush.line.color); }
                        if (info.brush.line.width) { d.dom.setAttributeNS (null, 'stroke-width', info.brush.line.width); }
                    }
                }
                break;

            case 'transform':
                // Check if we need to update the dom attributes.
                if (updateAttr && d.dom) {
                    d.dom.setAttributeNS (null, 'transform', 'translate(10, 10)');
                }
                break;
        }

        return info;
    }
    o.update = function (data) {
        var info, item, key, list, type;

        list = data;
        for (key in list) {
            info = d.attr [key];

            if (info) {
                d [key] = list [key];
                item = d [key];

                // Check if the attribute needs to be remapped
                // to a different name on the dom.
                type = tm.getType (info);

                switch (type) {
                    case 'Function':
                        if (d.dom) {
                            info = info (key, true);
                        }
                        break;

                    case 'Object':
                        key = info.key;
                    default:
                        if (d.dom) {
                            d.dom.setAttributeNS (null, key, item);
                        }
                }
            }
        }
    }
})
