'use strict';
tm.add ('sim.timeline.drag.Area', ['tm.svg.Box'], function (o, p, d) {
    p.removeSelection = function () {
        // Remove any previous selections. Having other items selected messes with listeners
        if (window.getSelection) {
            if (window.getSelection().empty) {  // Chrome
                window.getSelection().empty();
            }
            else if (window.getSelection().removeAllRanges) {  // Firefox
                window.getSelection().removeAllRanges();
            }
        }
        else if (document.selection) {  // IE?
            document.selection.empty();
        }
    }

    o.setup = function (config) {
        // Config Defaults
        if (config.lock === undefined) { config.lock = { x: false, y: false } }
        if (config.cursor == undefined) { config.cursor = 'move' }
        if (!config.callback) { config.callback = {} }
        if (!config.callback.onDragStart) { config.callback.onDragStart = function () {} }
        if (!config.callback.onDrag) { config.callback.onDrag = function () {} }
        if (!config.callback.onDragEnd) { config.callback.onDragEnd = function () {} }

        // Assign config Values
        d.lock = config.lock;
        d.selector = config.selector;
        d.callback = config.callback;
        d.mouse = {}

        if (d.selector) {
            d.container = $ (d.selector);
            d.offset = {
                x: d.container.offset ().left,
                y: d.container.offset ().top,
            }
        }
        else {
            d.offset = {x: 0, y: 0}
        }

        // Set the cursor to something different so the user knows they can click and drag
        d.dom.style.cursor = config.cursor;
        // Prevent the element itself from being highlighted
        d.dom.draggable = false;

        d.dom.addEventListener ('mousedown', function (event) { o.dragStart (event); })
        document.addEventListener ('mousemove', function (event) { o.drag (event); })
        document.addEventListener ('mouseup', function (event) { o.dragEnd (event); })
    }

    o.dragStart = function (event) {
        p.removeSelection ();

        d.dragging = true

        d.mouse.prevX = event.pageX;
        d.mouse.prevY = event.pageY;

        d.callback.onDragStart ({
            event: event,
            mouse: o.getMouseData ()
        })
    }

    o.drag = function (event) {
        var mouse;

        d.mouse.x = event.pageX;
        d.mouse.y = event.pageY;

        d.mouse.movedX = d.mouse.x - d.mouse.prevX;
        d.mouse.movedY = d.mouse.y - d.mouse.prevY;

        d.mouse.prevX = d.mouse.x;
        d.mouse.prevY = d.mouse.y;

        if (d.dragging) {
            p.removeSelection ();

            mouse = o.getMouseData ();

            d.callback.onDrag ({
                event: event,
                mouse: mouse
            });
        }
    }

    o.dragEnd = function (event) {
        if (d.dragging) {
            d.dragging = false

            d.callback.onDragEnd ({
                event: event,
                mouse: o.getMouseData ()
            })
        }
    }

    o.getMouseData = function () {
        var mouse

        mouse = {
            x: d.mouse.x,
            y: d.mouse.y,
            local: {
                x: d.mouse.x - d.offset.x,
                y: d.mouse.y - d.offset.y,
            },
            last: {
                x: d.mouse.x - d.mouse.movedX,
                x: d.mouse.y - d.mouse.movedY,
                local: {
                    x: d.mouse.x - d.offset.x - d.mouse.movedX,
                    y: d.mouse.y - d.offset.y - d.mouse.movedY,
                },
            },
            movedBy: {
                x: d.mouse.movedX,
                y: d.mouse.movedY
            }
        }

        if (d.lock.x) { mouse.movedBy.x = 0 }
        if (d.lock.y) { mouse.movedBy.y = 0 }

        return mouse
    }
})
