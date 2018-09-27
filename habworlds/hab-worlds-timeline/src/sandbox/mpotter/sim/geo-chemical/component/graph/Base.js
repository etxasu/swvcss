'use strict'
// Creates the initial stage of a graph
tm.add ('component.graph.Base', ['tm.svg.Dom', 'component.graph.y.Axis', 'component.graph.x.Axis', 'component.graph.Resizer'], function (o, p, d) {
    o.setup = function (config) {
        // Set defaults
        if (config.x === undefined) { config.x = 30; }
        if (config.y === undefined) { config.y = 30; }
        if (config.precision === undefined) { config.precision = 50 }
        if (config.width === undefined) { config.width = 100 }
        if (config.height === undefined) { config.height = 100 }
        if (config.segmentCount === undefined) { config.segmentCount = 5 }
        if (config.fontPadding === undefined) { config.fontPadding = 20 }

        if (!config.xAxis) { config.xAxis = {} }
        if (!config.yAxis) { config.yAxis = {} }

        d.headers = {
            xAxis: config.xAxis,
            yAxis: config.yAxis,
        }

        d.maxXValue = d.headers.xAxis.maxValue;

        // Create SVG area
        d.svg = tm.new ('tm.svg.Svg', {
            appendTo: config.selector.container,
            // Changing the width seems to not do anything?
            width: config.width,
            height: config.height,
            brush: {
                color: 'white',
                line: {
                    width: 1,
                    color: 'white',
                }
            },
        })

        // Store config settings
        d.x = config.x;
        d.y = config.y;
        d.width = config.width;
        d.height = config.height;
        d.name = config.name;
        d.selector = config.selector;
        d.segmentCount = config.segmentCount;
        d.padding = config.padding;
        d.dataLine = {};
        d.percentType = ''
        d.precisionLevel = config.precision;
        d.initialXValue = 0;
        d.xStartValue = d.initialXValue;
        d.xEndValue = d.maxXValue
        d.font = { size: 12, padding: config.fontPadding }

        $ ( d.svg.getDom () ).height (d.height + d.y + (d.font.padding*2) + 50)

        // Draw the graph
        o.createGraph ();
        d.dom = $ (d.svg.getDom ());
    }

    o.createGraph = function () {
        var font, int;

        d.graphArea = {
            top: d.y,
            bottom: d.height + d.y,
            left: d.x,
            right: d.width + d.x,
            distance: {
                topToBottom: d.height,
                leftToRight: d.width,
            }
        }

        d.graphArea.increment = {
            x: d.width / d.segmentCount,
            y: d.height / d.segmentCount,
            precisionX: d.x / d.precisionLevel,
            precisionY: d.y / d.precisionLevel,
        }

        d.masterGroup = tm.new ('tm.svg.Group')

        d.background = tm.new ('tm.svg.Box', {
            x: d.x,
            y: d.y,
            height: d.height,
            width: d.width,
            brush: {
                color: '#010101',
                line: {
                    width: 0.5,
                    color: '#bebbc1'
                }
            }
        })

        d.masterGroup.add (d.background)

        o.createGraphArea ();

        o.makeYAxis ();
        o.makeXAxis ();

        o.makeYAxisLabel ();
        o.makeXAxisLabel ();

        d.masterGroup.add (d.xAxis);
        d.masterGroup.add (d.yAxis);

        d.svg.add (d.masterGroup)
        // $ ( d.svg.getDom () ).css ('cursor', 'zoom-in')
    }

    o.createGraphArea = function () {
        var int, modifier, segment, x, y;

        d.xAxisSegmentList = [];
        d.yAxisSegmentList = [];

        d.xAxis = tm.new ('tm.svg.Line', {
            start: {
                x: d.graphArea.left,
                y: d.graphArea.bottom,
            },
            end: {
                x: d.graphArea.right,
                y: d.graphArea.bottom,
            },
            brush: {
                color: '#1b1a20',
                line: {
                    width: 0.5,
                    color: '#bebbc1'
                }
            }
        })

        d.yAxis = tm.new ('tm.svg.Line', {
            start: {
                x: d.graphArea.left,
                y: d.graphArea.bottom,
            },
            end: {
                x: d.graphArea.left,
                y: d.graphArea.top,
            },
            brush: {
                color: 'black',
                line: {
                    width: 0.5,
                    color: '#bebbc1'
                }
            }
        })

        // Create horizontal segments
        for (int = 0; int <= d.segmentCount; int++) {
            modifier = d.graphArea.increment.y * int
            y = d.graphArea.top + modifier

            segment = tm.new ('tm.svg.Line', {
                start: {
                    x: d.graphArea.left,
                    y: y,
                },
                end: {
                    x: d.graphArea.right,
                    y: y,
                },
                brush: {
                    color: 'black',
                    line: {
                        width: 0.5,
                        color: '#bebbc1'
                    }
                }
            })

            d.xAxisSegmentList.push (segment);
            d.masterGroup.add (segment)
        }

        // Create the vertical segments
        for (int = 0; int <= d.segmentCount; int++) {
            modifier = d.graphArea.increment.x * int
            x = d.graphArea.left + modifier

            segment = tm.new ('tm.svg.Line', {
                start: {
                    x: x,
                    y: d.graphArea.bottom,
                },
                end: {
                    x: x,
                    y: d.graphArea.top,
                },
                brush: {
                    color: '#bebbc1',
                    line: {
                        width: 0.5,
                        color: '#bebbc1'
                    }
                }
            })

            d.yAxisSegmentList.push (segment);

            d.masterGroup.add (segment);
        }
    }

    o.getGraphArea = function () { return d.graphArea }
    o.getHeight = function () { return d.height }

    o.makeUnselectable = function (dom) { dom.unselectable = 'on' }
})
