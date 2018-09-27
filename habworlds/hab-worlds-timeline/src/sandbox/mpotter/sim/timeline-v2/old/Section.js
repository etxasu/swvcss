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
    //
    // // Shared methods.
    o.setup = function (config) {
        var axis, brush, dom, info, marker;

        d.axis = config.axis;
        d.min = config.min;
        d.max = config.max;
        d.tall = config.tall;
    //     d.offset = 0;
    //
    //     marker = config.marker;
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

        // info = d.marker.left.getPosition ();
        // info.start.x += 100;
        // info.end.x += 100;
        //
        // d.marker.right = tm.new ('tm.svg.Line', {
        //     start: info.start,
        //     end: info.end,
        //     brush: d.brushSet.mainTick,
        // })
        // o.add (d.marker.right);

        // info = d.marker.left.getPosition ();
        // d.marker.text = tm.new ('tm.svg.Text', {
        //     x: info.start.x + 3,
        //     y: info.start.y + 35 + d.offset,
        //     text: '1.5 ba',
        //     brush: d.brushSet.number,
        //     font: {
        //         size: 12,
        //     }
        // })
        // o.add (d.marker.text);
        p.addSubTick ();

        d.x = config.x;
        d.y = config.y;
        // o.moveBy (0, 0, null, true);
    }

    o.checkXBoundary = function (data) {
        var continueAnimation, remainingDistance, remainingTime;
        if (d.x >= d.max) {
            // Remove the current x position from the remaining distance
            if (data) {
                data.distance.x -= d.x;
            }
            // Prevent accidental over-stepping which causes a loop
            d.x = d.min + 1;

            d.dom.setAttributeNS (null, 'transform', 'translate(' + d.x + ', ' + d.y + ')');

            // Check if animation needs to continue
            if (data && data.anime && data.anime.progress < 100) {
                continueAnimation = true;
                // remainingDistance = data.distance.x - ((data.anime.progress / 100) * Math.abs (data.distance.x))
                // remainingDistance = (data.anime.progress / 100) * Math.abs (data.distance.x)
                remainingDistance = data.distance.x
                // remainingDistance = 100;
            }
            o.onXBoundaryCrossed ('end')
        }
        else if (d.x < d.min) {
            // Prevent accidental over-stepping which causes a loop
            d.x = d.max - 1;

            d.dom.setAttributeNS (null, 'transform', 'translate(' + d.x + ', ' + d.y + ')');

            // Check if animation needs to continue
            if (data && data.anime && data.anime.progress < 100) {
                continueAnimation = true;
                remainingDistance = data.distance.x
            }
            o.onXBoundaryCrossed ('start')
        }

        // Create a new animation that continues animation using remaining distance to cover
        if (continueAnimation) {
            data.anime.pause ();

            // console.log ('The distance to move by:', remainingDistance)

            // remainingDistance = Math.abs (data.distance.x) - ((data.anime.progress / 100) * Math.abs (data.distance.x))

            // Remove the time that has passed to get the time left for the new animation
            remainingTime = data.anime.duration - (data.anime.duration * (data.anime.progress / 100))

            // console.log ('Remaining time:', remainingTime)

            o.moveBy (remainingDistance, null, remainingTime)
        }
    }

    o.onXBoundaryCrossed = function (direction) {
        if (d.axis && d.axis.onXBoundaryCrossed) {
            d.axis.onXBoundaryCrossed ({
                item: o,
                direction: direction
            });
        }
    }

    o.getPosition = function () {
        return {
            x: d.x,
            y: d.y
        }
    }

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

    o.override ({
        onMoveBy: function (original, data) {
            o.checkXBoundary (data);
        },

        onMoveByDone: function (original, data) {
            o.checkXBoundary (data);
        }
    })
});
