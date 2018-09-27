+'use strict'
/*
    Holds helper functions for making the y axis of a graph
*/
tm.add ('component.graph.y.Axis', [], function (o, p, d) {

    o.makeYAxis = function () {
        if (!d.headers.yAxis.left && !d.headers.yAxis.right) {
            d.headers.yAxis.left = d.headers.yAxis;
        }

        d.yAxisLabelList = {
            left: [],
            right: []
        }

        // Ensure the yAxis.left exists
        if (typeof d.headers.yAxis.label == 'string') {
            d.headers.yAxis.left = d.headers.yAxis
        }

        if (d.headers.yAxis.left) {
            o.makeYAxisUI ({
                side: 'left',
                padding: -7
            })
        }

        if (d.headers.yAxis.right) {
            o.makeYAxisUI ({
                side: 'right',
                padding: 7
            })
        }
    }

    o.makeYAxisUI = function (data) {
        var classString,increment, int, label, padding, side, value, valueList;

        side = data.side;
        padding = data.padding;
        min = d.headers.yAxis [ side ].minValue;
        max = d.headers.yAxis [ side ].maxValue;
        increment = max / d.segmentCount;

        if (min === undefined) { min = 0 }

        if (min !== 0) { increment = (max - min) / d.segmentCount }

        // Create the values for the left side labels
        valueList = []
        for (int = 0; int < d.segmentCount; int++) {
            value = increment * (int + 1) + min;
            valueList.unshift (value);
        }

        // Create labels for y axis
        for (int = 0; int < d.segmentCount; int++) {
            label = tm.new ('tm.svg.Text', {
                x: d.graphArea [ side ] + padding,
                y: d.graphArea.top + (d.graphArea.increment.x * int),
                text: valueList [int] + '',
                font: d.font,
                brush: {
                    color: '#bebbc1',
                    line: {
                        width: 0.5,
                        color: '#bebbc1'
                    }
                }
            })

            d.yAxisLabelList.left.push ({
                o: label,
                dom: label.getDom (),
                originalValue: valueList [int]
            })

            label.getDom ().classList.add ('y-axis', side,'label')

            o.makeUnselectable ( label.getDom () );
            d.masterGroup.add (label)
        }

        label = tm.new ('tm.svg.Text', {
            x: d.graphArea [ side ] + padding,
            y: d.graphArea.bottom,
            text: min + '',
            font: d.font,
            brush: {
                color: '#bebbc1',
                line: {
                    width: 1,
                    color: '#bebbc1'
                }
            }
        })

        d.yAxisLabelList.left.push ({
            o: label,
            dom: label.getDom (),
            originalValue: 0
        })

        label.getDom ().classList.add ('y-axis', side, 'label')

        d.masterGroup.add (label);
    }

    o.makeYAxisLabel = function () {
        d.yAxisLabel = {};

        if (d.headers.yAxis.left) {
            // Make sure this label has an X and Y set
            if (d.headers.yAxis.left.x === undefined) { d.headers.yAxis.left.x = -(d.graphArea.top + d.graphArea.distance.topToBottom/2) }
            if (d.headers.yAxis.left.y === undefined) { d.headers.yAxis.left.y = d.x - (d.font.padding * 2) }

            // Create the label
            d.yAxisLabel.left = o.makeLabel ({
                x: 0,
                y: 0,
                text: d.headers.yAxis.left.label,
                transform: 'rotate(-90deg) translate(' + d.headers.yAxis.left.x + 'px,' + d.headers.yAxis.left.y + 'px)'
            })
        }

        if (d.headers.yAxis.right) {
            // Make sure this label has an X and Y set
            if (d.headers.yAxis.right.x === undefined) { d.headers.yAxis.right.x = (d.graphArea.top + d.graphArea.distance.topToBottom/2) }
            if (d.headers.yAxis.right.y === undefined) { d.headers.yAxis.right.y = -(d.width + d.x + (d.font.padding * 2)) }

            // Create the label
            d.yAxisLabel.right = o.makeLabel ({
                x: 0,
                y: 0,
                text: d.headers.yAxis.right.label,
                transform: 'rotate(90deg) translate(' + d.headers.yAxis.right.x + 'px,' + d.headers.yAxis.right.y + 'px)'
            })
        }
    }

    o.makeLabel = function (data) {
        var label

        label = tm.new ('tm.svg.Text', {
            x: data.x,
            y: data.y,
            text: data.text,
            font: d.font,
            brush: {
                color: '#bebbc1',
                line: {
                    width: 1,
                    color: '#bebbc1'
                }
            },
        })

        label.getDom ().style.transform = data.transform;

        $ (label.getDom ()).css ({
            'text-anchor': 'middle'
        })

        o.makeUnselectable ( label.getDom () );
        d.masterGroup.add ( label );

        return label
    }
})
