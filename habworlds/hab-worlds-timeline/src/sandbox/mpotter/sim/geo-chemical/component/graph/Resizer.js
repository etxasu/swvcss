'use strict'
/*
    Holds helper functions for resizing graph
*/
tm.add ('component.graph.Resizer', [], function (o, p, d) {
    o.resizeGraph = function (width) {
        var item, key, list, targetWidth, svgWidth;

        // Resize the graph to fill the new width of the svg
        if (width === undefined) {
            width = $ (d.svg.getDom ()).width ();
        }

        targetWidth = width - (d.font.padding * 2);
        d.graphArea.distance.rightToLeft = targetWidth
        d.graphArea.right = targetWidth + d.graphArea.left
        d.width = targetWidth
        d.graphArea.increment = {
            x: Math.round (d.graphArea.distance.rightToLeft / d.segmentCount),
            y: Math.round (d.graphArea.distance.topToBottom / d.segmentCount),
            precisionX: Math.round (d.graphArea.distance.rightToLeft / d.precisionLevel),
            precisionY: Math.round (d.graphArea.distance.topToBottom / d.precisionLevel),
        }

        d.xAxis.update ({
            end: {
                x: targetWidth + d.graphArea.left,
                y: d.graphArea.bottom,
            }
        })

        d.background.update ({
            width: targetWidth
        })

        list = d.xAxisSegmentList
        for (key in list) {
            item = list [key];

            if (item) {
                item.update ({
                    end: {
                        x: d.graphArea.distance.rightToLeft + d.graphArea.left,
                        y: d.graphArea.top + (d.graphArea.increment.y * Number (key)),
                    },
                })
            }
        }

        list = d.yAxisSegmentList
        for (key in list) {
            item = list [key];

            if (item) {
                item.update ({
                    start: {
                        x: d.graphArea.left + (d.graphArea.increment.x * Number (key)),
                        y: d.graphArea.bottom,
                    },
                    end: {
                        x: d.graphArea.left + (d.graphArea.increment.x * Number (key)),
                        y: d.graphArea.top,
                    },
                })
            }
        }

        list = d.xAxisLabelList.bottom;
        for (key in list) {
            item = list [key];

            if (item) {
                item.update ({
                    x: d.graphArea.left + (d.graphArea.increment.x * Number (key)),
                    y: d.graphArea.bottom + 20,
                })
            }
        }

        if (d.yAxisLabel.right) {
            d.headers.yAxis.right.x = (d.graphArea.top + d.graphArea.distance.topToBottom/2)
            d.headers.yAxis.right.y = -(d.width + d.x + (d.font.padding * 2))
            d.yAxisLabel.right.getDom ().style.transform = 'rotate(90deg) translate(' + d.headers.yAxis.right.x + 'px,' + d.headers.yAxis.right.y + 'px)'
        }

        d.xAxisLabel.update ({
            x: d.width/2 + d.x
        })
    }
})
