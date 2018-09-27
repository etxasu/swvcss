'use strict';
tm.add ('sim.timeline.graph.Axis', function (o, p, d) {
    p.removeSelection = function () {
        // Remove any previous selections. Having other items selected messes with listeners
        if (window.getSelection) {
            if (window.getSelection().empty) {  // Chrome
                // console.log ('Remove any selections')
                window.getSelection().empty();
            }
            else if (window.getSelection().removeAllRanges) {  // Firefox
                // console.log ('Remove any selections')
                window.getSelection().removeAllRanges();
            }
        }
        else if (document.selection) {  // IE?
            // console.log ('Remove any selections')
            document.selection.empty();
        }
    }

    o.setup = function (config) {
        if (config.width === undefined) { config.width = 100 }
        if (config.height === undefined) { config.height = 100 }

        // Takes a tamed SVG object
        // creates own dom and appends it to svg object

        // Takes a number of ticks
        // Takes a start and end value
        // Takes a width

        d.svg = config.svg;
        d.width = config.width;
        d.height = config.height;
        d.x = config.x;
        d.y = config.y;
        d.sectionCount = config.sectionCount;

        o.makeAxis ();
        o.makeSectionList ();
        o.makeDraggableArea ();

        $('#move-left').on ('click', function () {
            o.traverseAxis ({
                amount: -100,
                duration: 300,
            })
        })
        $('#move-right').on ('click', function () {
            o.traverseAxis ({
                amount: 100,
                duration: 300,
            })
        })
    }

    o.alignSectionList = function () {
        var difference, end, item, i, increment, list, moveBy, nextItem, nextPos, pos;

        increment = d.sectionIncrement;
        list = d.sectionList;
        end = list.length
        // Iterate through sections and make sure their distance from each other is the same.
        for (i = 0; i < end; i++) {
            item = list [i];
            nextItem = list [i + 1]

            if (!nextItem) { nextItem = list [0] }

            pos = item.group.getPosition ();
            nextPos = nextItem.group.getPosition ();

            // Only care if the items position is greater than yours
            if (pos.x < nextPos.x) {
                // Get the distance between the two sections
                difference = Math.abs (pos.x - nextPos.x);

                // Check if the distance is correct
                if (difference !== increment) {
                    // Correct the position of this section
                    moveBy = difference - increment;
                    item.group.moveBy (moveBy, null, 0, true);
                }
            }
        }
    }

    o.makeAxis = function () {
        d.group = tm.new ('tm.svg.Group', {
            x: 0,
            y: 0
        })

        d.group.moveBy (2, d.y, 0, true)

        d.baseline = tm.new ('tm.svg.Line', {
            start: {
                x: 0,
                y: 0,
            },
            end: {
                x: d.width,
                y: 0
            },
            brush: {
                color: 'black',
                line: {
                    width: 2,
                    color: 'black',
                },
            }
        });

        d.startCap = tm.new ('tm.svg.Line', {
            start: {
                x: 0,
                y: 0,
            },
            end: {
                x: 0,
                y: 15
            },
            brush: {
                color: 'black',
                line: {
                    width: 2,
                    color: 'black',
                },
            }
        })

        d.endCap = tm.new ('tm.svg.Line', {
            start: {
                x: d.width,
                y: 0,
            },
            end: {
                x: d.width,
                y: 15
            },
            brush: {
                color: 'black',
                line: {
                    width: 2,
                    color: 'black',
                },
            }
        })

        d.group.add (d.startCap)
        d.group.add (d.endCap)
        d.group.add (d.baseline)

        d.svg.add (d.group)
    }

    o.makeDraggableArea = function () {
        // Create an invisible box for listening to click and drag events
        d.dragArea = tm.new ('tm.svg.Box', {
            x: 0,
            y: 0,
            width: d.width,
            height: d.height,
            brush: {
                color: 'transparent',
                line: {
                    width: 0,
                    color: 'none'
                }
            }
        })

        // Set the cursor to something different so the user knows they can click and drag
        d.dragArea.getDom ().style.cursor = 'e-resize';
        // Prevent the element itself from being highlighted
        d.dragArea.getDom ().draggable = false;
        d.dragArea.getDom ().onmousedown = function (event) {
            p.removeSelection ();

            d.draggingGraph = true
            if (!d.mouse) { d.mouse = { } }
            d.mouse.prevX = event.pageX;
            d.mouse.prevY = event.pageY;
        }

        document.addEventListener ('mousemove', function (event) {
            var end, i, item, list;

            p.removeSelection ();

            if (d.draggingGraph) {
                d.mouse.x = event.pageX;
                d.mouse.y = event.pageY;

                d.mouse.movedX = d.mouse.x - d.mouse.prevX;
                d.mouse.movedY = d.mouse.y - d.mouse.prevY;

                d.mouse.prevX = d.mouse.x;
                d.mouse.prevY = d.mouse.y;

                // console.log ('moving graph by', d.mouse.movedX)

                list = d.sectionList;
                end = list.length;
                // Intentionally blocking code to stop shakey behavior

                o.traverseAxis ({
                    amount: d.mouse.movedX,
                    duration: 0,
                    noAnimation: true
                })

                // Make sure the sections are equi-distant
                o.alignSectionList ();
            }
        })

        document.addEventListener ('mouseup', function () {
            d.draggingGraph = false
        })

        d.group.add (d.dragArea)
    }

    o.makeSectionList = function () {
        var height, incrementBy, int, offset, result, tall;

        d.sectionList = [];

        incrementBy = d.width / d.sectionCount;
        // Save the expected distance between sections for making sure sections stay equi-distant
        d.sectionIncrement = incrementBy;
        offset = (incrementBy / 1.5);
        tall = true;

        for (int = 0; int <  d.sectionCount; int++) {
            result = o.makeSection ({
                offset: offset,
                tall: tall,
                x: (incrementBy * int) + offset,
            });

            if (tall) { tall = false; }
            else if (!tall) { tall = true; }

            d.group.add (result.group)

            d.sectionList.push ({
                group: result.group,
                tick:  result.tick,
                label: result.label
            });
        }
    }

    o.makeSection = function (data) {
        var group, height, label, tick;

        group = tm.new ('sim.timeline.axis.Section', {
            x: 0,
            y: 0,
            min: d.x,
            max: (d.x + d.width),
            axis: o,
            tall: data.tall,
        })

        group.moveBy (data.x, 0, 0, true)

        if (data.tall) { height = 28; }
        else if (!data.tall) { height = 12; }

        label = tm.new ('tm.svg.Text', {
            x: 0,
            y: 12 + height,
            text: 'Temp',
            brush: {
                color: 'black',
                line: {
                    width: 1,
                    color: 'black'
                }
            }
        })

        label.getDom ().style ['text-anchor'] = 'middle'

        group.add (label)
        // group.add (tick)

        return {
            group: group,
            // tick: tick,
            label: label
        }
    }

    o.onXBoundaryCrossed = function () {}

    o.traverseAxis = function (data) {
        var end, i, item, key, list;

        o.alignSectionList ();

        list = d.sectionList;
        end = list.length;
        for (i = 0; i < end; i++) {
            item = list [i];
            item.group.moveBy (data.amount, null, data.duration, data.noAnimation);
            item.group.checkXBoundary ();
        }
    }
})
