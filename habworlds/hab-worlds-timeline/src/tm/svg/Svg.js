'use strict';
tm.add ('tm.svg.Svg', ['tm.svg.Dom'], function (o, p, d) {
    o.setup = function (config) {

        // d.attr.viewBox = true;
        d.attr.width = true;
        d.attr.height = true;
        d.width = config.width;
        d.height = config.height;

        if (!d.dom) {
            config.tag = 'svg';
            config.viewBox = '0 0 ' + d.width + ' ' + d.height;
            p.changeTag (config);
        }

        d.dom.setAttributeNS (null, 'id', 'bob');
        d.dom.style.display = 'block';
    }
})
