'use strict'
/*
    Holds helper functions to scale a given graph automatically on the X or Y
    axis
*/
tm.add ('sim.greenhouse.graph.Autoscaler', [], function (o, p, d) {
    // o.setup = function (config) {
    //     console.log ('Setting up auto scale function')
    // }

    o.reduceLabelLength = function (value) {
        var expon, myVal, result;

        myVal = Math.round (value);
        // console.log (myVal)
        expon = 0;
        while (myVal.toFixed (0).length > 1) {
            myVal /= 10
            expon++
        }

        result = Math.round (myVal) + 'e' + expon
        return result
    }

    // Autoscale function needs to:
    /*
        For the Y-Axis
        - Take a Y coordinate marked as the highest
        - Determine the percentage difference between that and the top of the graph
        - Adjust all points in the given point list by that amount
    */

    o.scaleYAxis = function (data) {
        var base, difference, highestPoint, item, key, list, maxHeight, percent, pointList;

        percent = 1

        if (data.highestPoint < (data.base - data.maxHeight)) {
            base = data.base;
            highestPoint = data.highestPoint;
            maxHeight = data.maxHeight;
            difference = Math.abs ( maxHeight - highestPoint )
            percent = highestPoint / maxHeight;

            list = data.pointList
            for (key in list) {
                item = list [key];

                if (item.y !== undefined) { list [key].y = (base - (item.y / percent)) }
                if (item.y > base) { item.y = base }
                if (item.y === -Infinity) { item.y = 0 }
            }
        }

        if (percent && data.maxLabelValue && data.labelList) {
            o.updateYAxisLabels ({
                percent: percent,
                maxValue: data.maxLabelValue,
                labelList: data.labelList,
                hack: data.hack
            })
        }

        return data.pointList
    }

    o.updateYAxisLabels = function (data) {
        var item, key, list, maxValue, percent, result, value;

        maxValue = data.maxValue;
        percent = Math.abs (data.percent);
        result = maxValue * percent

        // if (percent < 1) { return }

        list = data.labelList;
        for (key in list) {
            item = list [key];

            if (item) {

                value = Math.round ( item.originalValue * percent );

                if (percent > 1) {
                    if (data.hack && data.hack.yAxis && d.hack.yAxis.maxLabelLength) {
                        if (value.toFixed (0).length > data.hack.yAxis.maxLabelLength) {
                            // reduce value until it falls under label length
                            value = o.reduceLabelLength (item.originalValue * percent)
                        }
                    }
                }
                else {
                    value = item.originalValue
                }

                item.dom.innerHTML = value;
            }
        }
    }
})
