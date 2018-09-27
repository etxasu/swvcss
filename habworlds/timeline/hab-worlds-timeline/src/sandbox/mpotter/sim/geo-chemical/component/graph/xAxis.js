'use strict'
/*
    Holds helper functions for making the x axis of a graph
*/
tm.add ('component.graph.x.Axis', [], function (o, p, d) {

    o.makeXAxis = function () {

        d.xAxisLabelList = { bottom: [] }

        if (!d.headers.xAxis.labelList) {
            o.createUsingValue ()
        }
        else {
            o.createUsingLabelList ();
        }

    }

    o.createUsingLabelList = function () {
        var dom, increment, int, item, label, list, modifier, padding, x, y;

        list = d.headers.xAxis.labelList;
        increment = d.width / list.length;
        padding = 7

        d.xAxisLabelList.bottom = []

        for (int = 0; int < list.length; int++) {
            item = list [int];

            modifier = increment * int;
            x = d.graphArea.left + modifier + padding;
            y = d.graphArea.bottom + 20;

            label = tm.new ('tm.svg.Text', {
                x: 0,
                y: 0,
                text: item,
                font: d.font,
                brush: {
                    color: '#bebbc1',
                    line: {
                        width: 1,
                        color: '#bebbc1'
                    }
                }
            })

            dom = $ (label.getDom ())

            dom.css ({
                'transform': 'translate(' + x + 'px, ' + y + 'px) rotate(30deg)'
            })

            o.makeUnselectable (dom);
            d.masterGroup.add ( label );
        }
    }

    o.createUsingValue = function () {
        var int, label, maxXValue, modifier, value, valueList, x;

        if (d.headers.xAxis.maxXValue === undefined) {
            d.headers.xAxis.maxXValue = 100
        }

        maxXValue = d.headers.xAxis.maxXValue;

        for (int = 0; int <= d.segmentCount; int++) {
            modifier = d.graphArea.increment.x * int
            x = d.graphArea.left + modifier

            // Create x axis labels
            value = maxXValue / d.segmentCount;
            value = value * int;

            label = tm.new ('tm.svg.Text', {
                x: x,
                y: d.graphArea.bottom + 20,
                text: Math.floor (value),
                font: d.font,
                brush: {
                    color: '#bebbc1',
                    line: {
                        width: 1,
                        color: '#bebbc1'
                    }
                }
            })

            label.getDom ().classList.add ('x-axis', 'label')
            o.makeUnselectable ( label.getDom () );

            d.masterGroup.add ( label );
            d.xAxisLabelList.bottom.push ( label )
        }
    }

    o.makeXAxisLabel = function () {
        // Create x-axis title label
        var xAxisLabel
        xAxisLabel = tm.new ('tm.svg.Text', {
            x: d.width/2 + d.x,
            y: d.graphArea.bottom + 45,
            text: d.headers.xAxis.label,
            font: d.font,
            brush: {
                color: '#bebbc1',
                line: {
                    width: 1,
                    color: '#bebbc1'
                }
            }
        })

        $ (xAxisLabel.getDom ()).css ({
            'text-anchor': 'middle'
        })

        d.xAxisLabel = xAxisLabel

        o.makeUnselectable ( xAxisLabel.getDom () );
        d.masterGroup.add (xAxisLabel);
    }

    o.findValueOfX = function (x) {
        var increment, trueX, valueOfX;
        // Take an X coordinate and find its value based on visible value range

        // Subtract the offset of the graph from the x coordinate
        trueX = x - d.graphArea.left
        // console.log ('True X:', trueX);

        // find the value per pixel
        increment = (d.xEndValue - d.xStartValue) / d.graphArea.distance.leftToRight;
        // console.log ('Increment:',increment);

        valueOfX = d.xStartValue + (trueX * increment);
        // console.log ('Value of X:', valueOfX)

        return valueOfX;
    }

    o.findXOfValue = function (value) {
        var increment, x;
        // Find the x coordinate for a given graph value (wavelength)

        // console.log (d.xStartValue, d.xEndValue, d.graphArea.distance.rightToLeft)

        // Find the value per pixel
        increment = (d.xEndValue - d.xStartValue) / d.graphArea.distance.leftToRight;
        // Find the value of x
        x = (value - d.xStartValue) / increment;

        // console.log (value, increment, x);

        return x;
    }
})
