'use strict';
tm.add ('sim.timeline.graph.Timeline', ['sim.timeline.graph.Axis'], function (o, p, d) {
    o.setup = function (config) {
        var result, offset;

        if (!config.range) { config.range = {} }
        if (config.range.start === undefined) { config.range.start = 0 }
        if (config.range.end === undefined) { config.range.end = 0 }
        // Why do I over-complicate things?
        d.sectionCount -= 1;
        // timeline needs to take a range for the start and end date
        // needs to track which years are currently visible
        d.range = config.range;
        d.viewableRange = {
            start: d.range.start,
            end: d.range.end
        };
        d.viewableRange.currentOffset = 0;
        d.rangeIncrement = ( Math.abs (d.range.start - d.range.end) ) / d.sectionCount
        d.traversal = {
            left: true,
            right: true
        }

        // console.log ('The distance between the start and end', Math.abs (d.range.start - d.range.end));
        // console.log ('The amount of sections', d.sectionCount);
        // console.log ('Section count * the range increment equals:', d.rangeIncrement * d.sectionCount);

        d.zoom = 1;
        d.evenSections = (d.sectionList.length % 2) == 0

        d.eventList = []

        // console.log ('Is there an even number of sections?', d.evenSections)

        $('#zoom-in').on ('click', function () {
            o.zoomIn ();
        })
        $('#zoom-out').on ('click', function () {
            o.zoomOut ();
        })
        $('#zoom-reset').on ('click', function () {
            o.zoomReset ();
        })

        // NOTE: This is temporary, remove this when it is time to drop and drag actual events
        // d.svg.getDom ().addEventListener ('mousedown', o.placeEvent)
        d.svg.getDom ().addEventListener ('mouseenter', function () { d.mouseHover = true; })
        d.svg.getDom ().addEventListener ('mouseleave', function () { d.mouseHover = false })

        // Write the label values
        o.updateLabelList ();

        window.timeline = o;
    }

    o.calculateViewableRange = function () {
        d.viewableRange.start = (d.range.start / d.zoom) + ((d.rangeIncrement / d.zoom) * d.viewableRange.currentOffset)
        d.viewableRange.end = (d.range.end / d.zoom) + ((d.rangeIncrement / d.zoom) * d.viewableRange.currentOffset)

        if (d.range.min !== undefined) {
            if (d.viewableRange.start <= d.range.min) {
                d.traversal.left = false;
            }
            else {
                d.traversal.left = true;
            }
        }

        if (d.range.max !== undefined) {
            if (d.viewableRange.end >= d.range.max) {
                d.traversal.right = false;
            }
            else {
                d.traversal.right = true;
            }
        }
    }

    o.convertXToRangeValue = function (x) {
        var distance, percent, rangeBase, rangeValue, xLeft, xRight, xValue;

        // The viewableRange start should equal 0 on the x axis in terms of mouse coordinates,
        //      so I should be able to create a percentage of where the mouse is comapred to the width of the timeline
        //      then multiple the viewableRange end by that percentage to get where on the timeline the mouse is located

        // Get a clean percentage of where the mouse is along the graph
        xLeft = o.findLeftMostSection ().group.getPosition ().x
        // console.log (xLeft)
        xRight = o.findRightMostSection ().group.getPosition ().x
        distance = Math.abs (xRight - xLeft);

        // console.log ('The distance between the first and last sections:', distance)

        percent = Math.floor ( ((x - (xLeft - 2)) / ( distance )) * 100 ) / 100;

        // console.log ('The percent of x', percent)

        rangeValue = Math.abs (d.viewableRange.start - d.viewableRange.end)

        xValue = (rangeValue * percent) + d.viewableRange.start

        // console.log ('The x coordinate', x)
        return Math.floor (xValue)
    }

    o.convertRangeValueToX = function (rangeValue) {
        var distance, leftX, newX, percent, rightX, totalRange;
        // takes a value on the timeline and converts it to a x coordinate.

        // So, I have the range value of an item, the current viewable range

        // I need to compare the range value being passed in against the viewable range,
        //  Lets assume that the passed-in value falls within the viewable range...
        //  So, my range value is 5000, which is located at x: 367 - 70... = so ~300
        //  Presuming, that viewable range start is at x: 0 and viewable range end is at x: 400
        //  So, that means 5000 is 75% of the way to the viewable end, so 5000 / 20,000 = 25, subtract that from 100 to get our percent
        // Knowing that, I can take the location of the right most section and multiply its x - the x position of the left section

        // So, if 10,000 is our right most section and we multiply

        // distance = Math.abs (d.viewableRange.start - d.viewableRange.end);
        // distance = Math.abs (d.viewableRange.start) + Math.abs (d.viewableRange.end);
        // // console.log ('The variables:', distance, rangeValue);
        // percent = ( 100 - Math.floor ( (rangeValue / distance) * 100 ) ) / 100;
        // // console.log ('The distance:', distance);
        // // console.log ('The percent:', percent);
        // leftX = o.findLeftMostSection ().group.getPosition ().x;
        // rightX = o.findRightMostSection ().group.getPosition ().x;
        //
        // console.log ('The true position of the last section:', rightX - leftX)
        //
        // // newX = Math.abs (leftX - rightX) * percent;
        // newX = ((rightX - leftX) * percent);
        //
        // console.log ('New x position based on range value:', newX);
        // console.log ('Does it translate to the same value?:', o.convertXToRangeValue (newX));

        // I got it, I need to compare either the start or end to the value passed in and that will give me
        // a range, with that range I can create a section and find the x of the location

        // So, once again, assuming our rangeValue falls within the viewable range
        // 5000 is passed in
        // The distance between -10,000 and 5,000 is 15,000
        // I now have a new faux viewableRange
        // -10,000 is located at 0px and 10,000 is located at 400px
        // 15,000 / 20,000 = 0.75 and 400 * 0.75 = 300

        distance = Math.abs (d.viewableRange.start - rangeValue);
        totalRange = Math.abs (d.viewableRange.start) + Math.abs (d.viewableRange.end);
        percent = distance / totalRange
        leftX = o.findLeftMostSection ().group.getPosition ().x;
        rightX = o.findRightMostSection ().group.getPosition ().x - leftX;
        // newX = rightX * percent
        newX = (rightX * percent) + leftX

        // console.log (rangeValue, 'should be at', newX);
        // console.log ('Does the new x translate to the same number?', o.convertXToRangeValue (newX))
        return newX
    }

    o.findLeftMostSection = function () {
        var item, itemPos, key, list, lowestItem, lowestX;

        list = d.sectionList
        for (key in list) {
            item = list [key];

            itemPos = item.group.getPosition ().x

            if (lowestX === undefined) {
                lowestX = itemPos
                lowestItem = item
            }
            else {
                if (lowestX > itemPos) {
                    lowestX = itemPos
                    lowestItem = item
                }
            }
        }

        return lowestItem
    }

    o.findRightMostSection = function () {
        var item, itemPos, key, list, highestItem, highestX;

        list = d.sectionList
        for (key in list) {
            item = list [key];

            itemPos = item.group.getPosition ().x

            if (highestX === undefined) {
                highestX = itemPos
                highestItem = item
            }
            else {
                if (highestX < itemPos) {
                    highestX = itemPos
                    highestItem = item
                }
            }
        }

        return highestItem
    }

    o.getMouseHover = function () {
        return d.mouseHover;
    }

    o.placeEvent = function (event) {
        var timeEvent, eventLocation, mouseX;

        mouseX = event.pageX - $ (d.svg.getDom ()).offset ().left - d.x;
        eventLocation = o.convertXToRangeValue (mouseX);

        // console.log ('Placing an event with a value of', eventLocation)

        // temporary way to show an event being placed
        timeEvent = tm.new ('tm.svg.Line', {
            start: {
                x: 0,
                y: -30,
            },
            end: {
                x: 0,
                y: 10,
            },
            brush: {
                color: 'red',
                line: {
                    width: 1,
                    color: 'red'
                }
            }
        })

        timeEvent.moveBy (mouseX, null, 0)

        d.eventList.push ({
            timeEvent: timeEvent,
            location: eventLocation,
            x: mouseX
        })

        d.group.add (timeEvent)
    }

    o.updateLabelList = function () {
        var end, increment, int, item, key, list, start, total, value;

        // Create an increment amount for the viewableRange

        // list = d.sectionList
        // for (key in list) {
        //     key = Number (key);
        //     item = list [key];
        //
        //     value = Math.round ( d.viewableRange.start + ( (d.rangeIncrement / d.zoom) * key) );
        //
        //     item.label.update ({
        //         text: value
        //     });
        // }

        end = d.sectionList.length
        for (int = 0; int < end; int++) {
            item = d.sectionList [int];

            value = Math.round ( d.viewableRange.start + ( (d.rangeIncrement / d.zoom) * (int)) );
            // console.log ('Value for section', int, ':', value)
            // console.log ('Total Value for section', int, ':', (d.rangeIncrement / d.zoom) * int)

            item.label.update ({
                text: value
            });
        }
    }

    o.zoomIn = function () {
        d.zoom++
        o.calculateViewableRange ();
        o.updateLabelList ();
    }

    o.zoomOut = function () {
        d.zoom--

        if (d.zoom < 1) { d.zoom = 1 }

        o.calculateViewableRange ();
        o.updateLabelList ();
    }

    o.zoomReset = function () {
        d.zoom = 1
        o.calculateViewableRange ();
        o.updateLabelList ();
    }

    o.override ({
        onXBoundaryCrossed: function (original, data) {
            var item, key, list, tall;

            // find the section that crossed the boundary
            list = d.sectionList
            for (key in list) {
                item = list [key];

                if (item.group == data.item) {

                    if (data.direction == 'start') {
                        d.viewableRange.currentOffset++;

                        o.calculateViewableRange ();

                        item.label.update ({
                            text: Math.round (d.viewableRange.end)
                        })
                    }
                    else {
                        d.viewableRange.currentOffset--;

                        o.calculateViewableRange ();

                        item.label.update ({
                            text: Math.round (d.viewableRange.start)
                        })
                    }

                    if (!d.evenSections) {
                        tall = item.group.toggleTall ();

                        if (tall) {
                            item.label.update ({
                                y: 12 + 28
                            })
                        }
                        else {
                            item.label.update ({
                                y: 12 + 12
                            })
                        }
                    }

                    break;
                }
            }
        },

        traverseAxis: function (original, data) {
            var canMove, item, key, list, newX;

            // The graph is not allowed to move left, but it is trying to traverse to the left
            // console.log ('Moving by', data.amount);
            // console.log ('Can move left? ', d.traversal.left, 'by', data.amount);
            // console.log ('Can move right? ', d.traversal.right, 'by', data.amount);
            if (d.traversal.left === true && data.amount > 0) {
                canMove = true;
            }

            if (d.traversal.right === true && data.amount < 0) {
                canMove = true;
            }

            if (canMove) {
                original (data);

                // Manipulate any timeline events
                list = d.eventList;
                for (key in list) {
                    item = list [key];

                    // This prevents pins from falling out of place as the timeline is moved
                    item.timeEvent.moveBy (-item.x, null, data.duration, data.noAnimation);

                    newX = o.convertRangeValueToX (item.location);
                    item.x = newX

                    item.timeEvent.moveBy (item.x, null, data.duration, data.noAnimation)
                }
            }
        }
    })
})
