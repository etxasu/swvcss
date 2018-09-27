'use strict'
/*
    Holds helper functions to scale a given graph automatically on the X or Y
    axis
*/
tm.add ('component.graph.Autoscaler', [], function (o, p, d) {
    // o.setup = function (config) {
    //     console.log ('Setting up auto scale function')
    // }

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
                labelList: data.labelList
            })
        }

        return data.pointList
    }

    o.updateYAxisLabels = function (data) {
        var item, key, list, maxValue, percent, result, value;

        maxValue = data.maxValue;
        percent = Math.abs (data.percent);
        result = maxValue * percent

        if (percent < 1) { return }

        // console.log ('Max Value:', maxValue, '* Percent:', percent, '=', result)

        list = data.labelList;
        for (key in list) {
            item = list [key];

            if (item) {
                item.dom.innerHTML = Math.round (item.originalValue * percent);
            }
        }
    }
})
