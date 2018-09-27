'use strict';
tm.add ('sim.timeline.axis.Section', ['tm.svg.Group'], function (o, p, d) {
    // // Private methods.
    p.addSubTick = function () {
        var end, i, info, item, key, list, spacing, x;

        spacing = 10;
        end = 9;
        for (i = 0; i < end; i++) {
            info = d.marker.left.getPosition ();
            x = (spacing * (i + 1));
            info.start.x += x;
            info.end.x += x;
            info.end.y = 10; //-= 10 + d.offset;

            if (i == 4) {
                info.end.y += 6
            }

            item = tm.new ('tm.svg.Line', {
                start: info.start,
                end: info.end,
                brush: d.brushSet.subTick,
            })

            o.add (item);
        }
    }

    // // Shared methods.
    o.setup = function (config) {
        var axis, brush, dom, info, marker;

        d.min = config.min;
        d.max = config.max;
        d.tall = config.tall;

        d.marker = {
            subTickList: [],
        };
        d.brushSet = {
            mainTick: tm.new ('tm.svg.Brush', {
                line: {
                    width: 2,
                    // color: '#589f58',
                    color: 'black',
                },
            }),
            subTick: tm.new ('tm.svg.Brush', {
                line: {
                    width: 1,
                    color: '#4b6ea2',
                },
            }),
            number: tm.new ('tm.svg.Brush', {
                color: '#d2d2d2',
            }),
        }

        info = {
            start: {
                x: 0,
                y: 0,
            },
            end: {
                x: 0,
                y: 12,
            },
        }

        if (d.tall) {
            d.offset = 16;
            info.end.y += d.offset;
        }

        d.marker.left = tm.new ('tm.svg.Line', {
            start: info.start,
            end: info.end,
            brush: d.brushSet.mainTick,
        })
        o.add (d.marker.left);

        p.addSubTick ();

        d.x = config.x;
        d.y = config.y;
        // o.moveBy (0, 0, null, true);
    }

    o.getPosition = function () { return {x: d.x, y: d.y} }

    o.toggleTall = function () {
        if (d.tall) {
            d.marker.left.update ({
                end: {
                    x: 0,
                    y: 12
                }
            })
            d.tall = false;
        }
        else {
            d.marker.left.update ({
                end: {
                    x: 0,
                    y: 28
                }
            })
            d.tall = true;
        }

        return d.tall
    }
});
