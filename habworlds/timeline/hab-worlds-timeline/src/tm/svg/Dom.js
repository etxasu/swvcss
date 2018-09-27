'use strict';
tm.add ('tm.svg.Dom', ['tm.svg.dom.Attr'], function (o, p, d) {
    // Private methods.
    p.changeTag = function (data) {
        var parent;

        if (data.tag) {
            d.tag = data.tag;
            d.dom = document.createElementNS (d.xmlns, data.tag);

            o.update (data);

            if (data.appendTo) {
                parent = document.querySelector (data.appendTo);
                parent.appendChild (d.dom);
            }
        }
    }

    // Public methods.
    o.setup = function (config) {
        d.xmlns = 'http://www.w3.org/2000/svg';
        d.attr.id = true;
        d.attr.brush = o.setDrawInfo;
        // d.attr.transform = o.setDrawInfo;

        d.x = 0;
        d.y = 0;
        d.width = 0;
        d.height = 0;
        d.rotation = 0;

        if (config.tag) { p.changeTag (config); }
    }
    o.getDom = function () { return d.dom; }
    o.getPosition = function () { return { x: d.x, y: d.y } }

    o.moveBy = function (x, y, duration, noAnimation, onDone) {
        if (duration === undefined) {
            duration = 1000;
        }

        // console.log (x, y, duration, noAnimation, onDone)

        if (!x) {
            x = d.x;
        }
        else {
            x = d.x + x;
        }

        if (!y) {
            y = d.y;
        }
        else {
            y = d.y + y;
        }

        if (noAnimation) {
            if (d.dom) {
                d.x = x;
                d.y = y;
                d.dom.setAttributeNS (null, 'transform', 'translate(' + d.x + ', ' + d.y + ')');
            }
        }
        else {
            anime({
                targets: d,
                x: x,
                y: y,
                easing: 'linear',
                round: 1,
                duration: duration,
                update: function (data) {
                    if (d.dom) {
                        d.dom.setAttributeNS (null, 'transform', 'translate(' + d.x + ', ' + d.y + ')');
                    }

                    // console.log ('Translating by:', x)

                    o.onMoveBy ({
                        type: 'moveBy',
                        anime: data,
                        distance: {
                            x: x,
                            y: y
                        }
                    });
                },
                complete: function () {
                    o.onMoveByDone ({type: 'moveBy'});
                    if (onDone) { onDone ({type: 'moveBy'}) }
                },
            });
        }
    }
    o.moveTo = function (x, y) {
        d.x = x;
        d.y = y;
        d.dom.setAttributeNS (null, 'transform', 'translate(' + d.x + ', ' + d.y + ')');
    }
    o.rotateBy = function () {}
    o.rotateTo = function () {}
    o.scaleBy = function () {}
    o.scaleTo = function () {}
    o.onMoveBy = function () {}
    o.onMoveByDone = function () {}

    o.transformBy = function (x, y, rotation, duration, noAnimation, onDone) {
        var callback;

        callback = onDone;

        if (duration === undefined) {
            duration = 1000;
        }

        if (!x) {
            x = d.x;
        }
        else {
            x = d.x + x;
        }

        if (!y) {
            y = d.y;
        }
        else {
            y = d.y + y;
        }

        if (!rotation) {
            rotation = d.rotation;
        }
        else {
            rotation = rotation + d.rotation;
        }

        if (d.rotation === undefined) { d.rotation = 0 }

        if (noAnimation) {
            if (d.dom) {
                d.x = x;
                d.y = y;
                d.rotation = rotation
                d.dom.setAttributeNS (null, 'transform', 'translate(' + d.x + ', ' + d.y + ') rotate(' + d.rotation + ')');
            }
        }
        else {
            anime({
                targets: d,
                x: x,
                y: y,
                rotation: rotation,
                easing: 'linear',
                round: 1,
                duration: duration,
                update: function (data) {
                    var animRotation, percent;

                    if (d.dom) {
                        d.dom.setAttributeNS (null, 'transform', 'translate(' + d.x + ', ' + d.y + ') rotate(' + d.rotation + ' ' + (d.width / 2) + ' ' + (d.height /2) + ')');
                    }

                    o.onTransformBy ({
                        anime: data,
                        type: 'transformBy'
                    });
                },
                complete: function () {

                    if (d.rotation > 360 || d.rotation < 0) {
                        d.rotation /= Math.floor (d.rotation % 360);
                    }

                    o.onTransformByDone ({type: 'transformBy'});
                    if (callback) { callback ({type: 'transformBy'}) }
                },
            });
        }
    }

    o.onTransformBy = function () {}
    o.onTransformByDone = function () {}


    o.override ({
        add: function (original, child) {
            var childDom;

            original (child);
            childDom = child.getDom ();
            d.dom.appendChild (childDom);

            return o;
        }
    })
})
