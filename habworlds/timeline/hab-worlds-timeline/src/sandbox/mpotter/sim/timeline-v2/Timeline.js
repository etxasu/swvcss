'use strict';
tm.add ('sim.timeline.graph.Timeline', ['sim.timeline.axis.Snap'], function (o, p, d) {
    o.setup = function (config) {
        if (config.svg) {
            d.svg = config.svg;
            config.svg.getDom ().addEventListener ('mouseenter', function () { d.mouseHover = true; })
            config.svg.getDom ().addEventListener ('mouseleave', function () { d.mouseHover = false })
        }

        d.pinList = [];

        d.width = config.length;
        o.makeDraggableArea ();
    }

    o.getMouseHover = function () {
        return d.mouseHover
    }

    o.placeEventPin = function (pin, x) {
        var alreadyPinned, item, key, list, value;

        list = d.pinList
        for (key in list) {
            item = list [key];

            if (item && item === pin) {
                // Move the pin back to 0, 0
                pin.moveBy (-pin.getPosition ().x, -pin.getPosition ().y, 0, true)
                alreadyPinned = true;
                break;
            }
        }

        if (!alreadyPinned) {
            d.pinList.push (pin)
            // console.log (pin)
            o.add (pin);
        }

        x = x - $(d.svg.getDom ()).offset().left
        value = o.findXValue (x);

        // console.log ('moving pin to', value)

        pin.moveBy (value, 0, 0)
        pin.show ();

        return value;
    }

    o.makeDraggableArea = function () {
        // Create an invisible box for listening to click and drag events
        d.dragArea = tm.new ('sim.timeline.drag.Area', {
            x: 0,
            y: 0,
            width: d.width,
            height: 100,
            lock: {
                x: false,
                y: true
            },
            cursor: 'e-resize',
            brush: {
                color: 'transparent',
                line: {
                    width: 0,
                    color: 'none'
                }
            },
            callback: {
                onDrag: o.onDrag
            }
        })

        o.add (d.dragArea)
    }

    o.onDrag = function (data) {
        var mouse;

        mouse = data.mouse;
        // console.log (mouse)
        o.moveBy (mouse.movedBy.x, mouse.movedBy.y, 0, true);
    }
})
