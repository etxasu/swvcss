'use strict';
tm.add ('tm.input.mouse.Drag', function (o, p, d) {
    // Private methods.
    p.calculate = function () {
        if (d.end.x > d.start.x) {
            d.diff.x = (d.end.x - d.start.x) * 1;
        }
        else {
            d.diff.x = (d.start.x - d.end.x) * -1;
        }

        // d.diff.x = d.end.x - d.start.x;
        // d.diff.x = d.end.x - d.start.x;
        // d.diff.y = d.end.y - d.start.y;

        // console.log (d.end.x, d.start.x, d.diff.x);
    }
    p.start = function (evnt) {
        d.isDown = true;
        d.start.x = evnt.clientX;
        d.start.y = evnt.clientY;
        o.fire ('drag start', d.start);
    }
    p.end = function (evnt) {
        d.isDown = false;
        d.end.x = evnt.clientX;
        d.end.y = evnt.clientY;
        o.fire ('drag end', d.end);
        // p.calculate ();
        // o.fire ('mouse drag', d.diff);
    }
    p.drag = function (evnt) {
        if (d.isDown === true) {
            d.end.x = evnt.clientX;
            d.end.y = evnt.clientY;
            p.calculate ();
            o.fire ('drag', d.diff);
        }
    }

    // Shared methods.
    o.setup = function () {
        var dom;

        d.isDown = false;
        d.listener = {};

        d.start = {
            x: 0,
            y: 0,
        }
        d.end = {
            x: 0,
            y: 0,
        }
        d.diff = {
            x: 0,
            y: 0,
        }

        // Add listeners to the page body.
        dom = document.querySelector ('svg');
        dom.ondragstart = function() { return false; };

        dom.addEventListener ('mousedown', function (evnt) {
            p.start (evnt);
        })
        dom.addEventListener ('mouseup', function (evnt) {
            p.end (evnt);
        })
        dom.addEventListener ('mousemove', function (evnt) {
            p.drag (evnt);
        })
    }
    o.fire = function (name, data) {
        var end, i, item, key, list;

        list = d.listener [name];
        if (list) {
            end = list.length;
            for (i = 0; i < end; i++) {
                item = list [i];
                item.apply ({}, [data]);
            }
        }
    }
    o.on = function (name, callback) {
        if (!d.listener [name]) {
            d.listener [name] = [];
        }
        d.listener [name].push (callback);
    }
});
