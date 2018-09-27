'use strict';
tm.add ('sim.timeline.resize.Box', ['sim.timeline.drag.Area'], function (o, p, d) {
    o.setup = function (config) {
        if (!config.callback.resizeWidth) { config.callback.resizeWidth = function () {} }
        if (!config.callback.resizeHeight) { config.callback.resizeHeight = function () {} }

        d.moveCursor = 'move';
        d.resizeCursor = 'e-resize';
        d.resize = {
            from: 'top',
            x: false,
            y: false
        }

        o.update ({
            brush: {
                color: 'rgba(120,120,120,0.5)',
                line: {
                    color:'rgba(0,0,0,0.5)',
                    width: 1
                }
            }
        })

        d.dom.addEventListener ('mouseenter', function (event) {
            d.mouse.prevX = event.pageX;
            d.mouse.prevY = event.pageY;
        });

        // d.dom.addEventListener ('mousemove', o.checkForResize);
    }

    o.checkForResize = function (event, original) {
        var dragState, mouse, prev, resizeX, resizeY, x, y;

        dragState = d.dragging;
        d.dragging = false;
        prev = {
            x: d.mouse.prevX,
            y: d.mouse.prevY,
        }

        original (event);

        d.dragging = dragState;
        d.mouse.prevX = prev.x;
        d.mouse.prevY = prev.y;

        mouse = o.getMouseData ();
        d.resize.x = false;
        d.resize.y = false;

        if (!d.dragging) {
            if (!d.lock.x) {
                x = mouse.local.x - d.x

                if (d.parent.list [0]) {
                    x -= d.parent.list [0].getPosition ().x;
                }

                if (x > d.width - 10 && x < d.width + 10) {
                    d.resize.x = true
                    d.resize.from = 'right'
                }
                if (x > -10 && x < 10) {
                    d.resize.x = true
                    d.resize.from = 'left'
                }
            }

            if (!d.lock.y) {
                y = mouse.local.y - d.y - 90 // Not sure where the 90 pixel offset is coming from...

                if (d.parent.list [0]) {
                    y -= d.parent.list [0].getPosition ().y;
                }

                if (y > d.height - 10 && y < d.height + 10) {
                    d.resize.y = true
                    d.resize.from = 'bottom'
                }
                if (y > -10 && y < 10) {
                    d.resize.y = true
                    d.resize.from = 'top'
                }
            }
        }
    }

    o.resize = function () {
        var mouse

        p.removeSelection ();
        mouse = o.getMouseData ();

        switch (d.resize.from) {
            case 'top':
                if (mouse.movedBy.y !== 0) {
                    o.moveBy (0, mouse.movedBy.y, 0, true)
                    o.update({
                        height: d.height - mouse.movedBy.y
                    })
                }
                d.callback.resizeHeight ();
                break;
            case 'bottom':
                if (mouse.movedBy.y !== 0) {
                    o.update({
                        height: d.height + mouse.movedBy.y
                    })
                }
                d.callback.resizeHeight ();
                break;
            case 'right':
                if (mouse.movedBy.x !== 0) {
                    o.update({
                        width: d.width + mouse.movedBy.x
                    })
                }
                d.callback.resizeWidth ();
                break;
            case 'left':
                if (mouse.movedBy.x !== 0) {
                    o.moveBy (mouse.movedBy.x, 0, 0, true)
                    o.update({
                        width: d.width - mouse.movedBy.x
                    })
                }
                d.callback.resizeWidth ();
                break;
        }
    }

    o.override ({
        dragStart: function (original, event) {
            if (d.resize.x || d.resize.y) {
                d.dragType = 'resize'
            }
            else {
                d.dragType = 'normal'
            }

            original (event)
        },

        drag: function (original, event) {
            var prev;

            o.checkForResize (event, original);

            if (d.resize.x) {
                d.dom.style.cursor = 'e-resize';
            }
            else if (d.resize.y) {
                d.dom.style.cursor = 'n-resize';
            }
            else if (d.resize.x && d.resize.y) {
                d.dom.style.cursor = 'ne-resize';
            }
            else {
                d.dom.style.cursor = 'move';
            }

            if (d.dragging && d.dragType == 'resize') {
                o.resize ();

                d.mouse.prevX = d.mouse.x;
                d.mouse.prevY = d.mouse.y;
            }
            else {
                original (event);
            }

        }
    })
})
