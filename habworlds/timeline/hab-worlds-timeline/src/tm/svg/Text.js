'use strict';
tm.add ('tm.svg.Text', ['tm.svg.Dom'], function (o, p, d) {
    // Public methods.
    o.setup = function (config) {
        d.attr.x = true;
        d.attr.y = true;
        d.attr.text = o.setDrawInfo;
        d.attr.font = o.setDrawInfo;

        if (!d.dom) {
            config.tag = 'text';
            p.changeTag (config);
        }
    }
    o.override ({
        setDrawInfo: function (original, key, updateAttr) {
            var brush, info;

            // Get the draw info for the object.
            info = original (key, updateAttr);
            switch (key) {
                case 'font':
                    info.font = d.font;

                    // Check if we need to update the dom attributes.
                    if (updateAttr && d.dom) {
                        if (d.font.family) { d.dom.setAttributeNS (null, 'font-family', d.font.family); }
                        if (d.font.size) { d.dom.setAttributeNS (null, 'font-size', d.font.size); }
                        if (d.font.weight) { d.dom.setAttributeNS (null, 'font-weight', d.font.weight); }
                    }
                    break;

                case 'text':
                    info.text = d.text;

                    // Check if we need to update the dom attributes.
                    if (updateAttr && d.dom) {
                        // d.dom.textContent = d.text;
                        d.dom.innerHTML = d.text;
                    }
                    break;
            }

            return info;
        }
    })
})
