'use strict'
// Creates the initial stage of a graph
tm.add ('app.sim.atmos.graph.Base', function (o, p, d) {
    o.setup = function (config) {
        // Set defaults
        if (config.precision === undefined) { config.precision = 50; }
        if (config.maxLightValue === undefined) { config.maxLightValue = 50}
        if (config.width === undefined) { config.width = 100}
        if (config.height === undefined) { config.height = 100}
        if (config.segmentCount === undefined) { config.segmentCount = 5 }
        if (!config.padding) {
            config.padding = {
                top: 20,
                left: 55,
                bottom: 80,
                right: 35,
            }
        }

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

        d.zoomBox = tm.new ('tm.svg.Box', {
            width: 50,
            height: config.height - config.padding.bottom - 20,
            x: 0,
            y: 0,
            brush: {
                color: 'rgba(125,125,125,0.5)'
            }
        })
        d.zoomBox.getDom ().classList.add ('hide')

        d.svg.add (d.zoomBox);

        d.svg.getDom ().onmousedown = o.startDrawingZoomBox

        d.svg.getDom ().onmouseup = o.stopDrawingZoomBox

        d.svg.getDom ().onmousemove = function (event) {
            if (d.drawingZoomBox) {
                o.drawZoomBox (event)
            }
        }

        // Store config settings
        d.width = config.width;
        d.height = config.height;
        d.name = config.name;
        d.titleDiv = $ (config.selector.title);
        d.selector = config.selector;
        d.container = $ (d.selector.container)
        d.segmentCount = config.segmentCount;
        d.padding = config.padding;
        d.dataLine = {};
        d.percentType = ''
        d.precisionLevel = config.precision;
        d.initialLightValue = 0;
        d.maxLightValue = config.maxLightValue;
        d.lightStartValue = 0;
        d.lightEndValue = d.maxLightValue

        // Draw the graph
        o.createGraph ();
        // o.calculateGraphData ();
    }

    o.createGraph = function () {
        var font, int;

        d.graphArea = {
            top: d.padding.top,
            bottom: d.height - d.padding.bottom,
            left: d.padding.left,
            right: d.width - d.padding.right,
        }

        d.graphArea.distance = {
            topToBottom: Math.abs ( d.graphArea.bottom - d.graphArea.top ),
            rightToLeft: Math.abs ( d.graphArea.left - d.graphArea.right ),
        }

        d.graphArea.increment = {
            x: Math.round (d.graphArea.distance.rightToLeft / d.segmentCount),
            y: Math.round (d.graphArea.distance.topToBottom / d.segmentCount),
            precisionX: Math.round (d.graphArea.distance.rightToLeft / d.precisionLevel),
            precisionY: Math.round (d.graphArea.distance.topToBottom / d.precisionLevel),
        }

        d.xAxisSegmentList = [];
        d.yAxisSegmentList = [];

        d.masterGroup = tm.new ('tm.svg.Group')

        font = {
            size: 12
        }

        d.background = tm.new ('tm.svg.Box', {
            x: d.graphArea.left,
            y: d.graphArea.top,
            height: d.graphArea.distance.topToBottom,
            width: d.graphArea.distance.rightToLeft,
            brush: {
                color: '#010101',
                line: {
                    width: 0.5,
                    color: '#bebbc1'
                }
            }
        })

        d.masterGroup.add (d.background)

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

        // Create x segments
        var percentArray;
        percentArray = [];
        // This is always measures a percentage from 0 to 100
        for (int = 0; int < d.segmentCount; int++) {
            var percent, percentLabel, percentPosition, segment;

            segment = tm.new ('tm.svg.Line', {
                start: {
                    x: d.graphArea.left,
                    y: d.graphArea.top + (d.graphArea.increment.x * int),
                },
                end: {
                    x: d.graphArea.right,
                    y: d.graphArea.top + (d.graphArea.increment.x * int),
                },
                brush: {
                    color: 'black',
                    line: {
                        width: 0.5,
                        color: '#bebbc1'
                    }
                }
            })

            percent = 100 / d.segmentCount;
            percent = percent * (int + 1);
            percentArray.unshift (percent);

            d.xAxisSegmentList.push (segment);
            d.masterGroup.add (segment)
        }

        // Create labels for y axis
        for (int = 0; int < d.segmentCount; int++) {
            var percentLabel;

            percentLabel = tm.new ('tm.svg.Text', {
                x: d.graphArea.left - 3,
                y: d.graphArea.top + (d.graphArea.increment.x * int),
                text: percentArray [int] + '%',
                font: font,
                brush: {
                    color: '#bebbc1',
                    line: {
                        width: 0.5,
                        color: '#bebbc1'
                    }
                }
            })

            percentLabel.getDom ().classList.add ('y-axis','label')
            o.makeUnselectable ( percentLabel.getDom () );
            d.masterGroup.add (percentLabel)
        }

        var percentLabel;
        percentLabel = tm.new ('tm.svg.Text', {
            x: d.graphArea.left - 3,
            y: d.graphArea.bottom,
            text: '0%',
            font: font,
            brush: {
                color: '#bebbc1',
                line: {
                    width: 1,
                    color: '#bebbc1'
                }
            }
        })

        percentLabel.getDom ().classList.add ('y-axis','label')
        d.masterGroup.add (percentLabel);
        d.xAxisLabelList = []

        // create y segments
        var maxLightValue = d.maxLightValue;
        for (int = 0; int < d.segmentCount; int++) {
            var lightLabel, lightLength, segment

            segment = tm.new ('tm.svg.Line', {
                start: {
                    x: d.graphArea.left + (d.graphArea.increment.y * int),
                    y: d.graphArea.bottom,
                },
                end: {
                    x: d.graphArea.left + (d.graphArea.increment.y * int),
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

            // Create x axis labels
            lightLength = maxLightValue / d.segmentCount;
            lightLength = lightLength * int;

            lightLabel = tm.new ('tm.svg.Text', {
                x: d.graphArea.left + (d.graphArea.increment.y * int),
                y: d.graphArea.bottom + 20,
                // text: Math.floor (lightLength) + ' (μm)',
                text: Math.floor (lightLength),
                font: font,
                brush: {
                    color: '#bebbc1',
                    line: {
                        width: 1,
                        color: '#bebbc1'
                    }
                }
            })

            lightLabel.getDom ().classList.add ('x-axis', 'label')
            o.makeUnselectable ( lightLabel.getDom () );

            d.masterGroup.add (segment);
            d.masterGroup.add (lightLabel);
            d.xAxisLabelList.push (lightLabel)
        }

        // Create right most label
        var lightLabel
        lightLabel = tm.new ('tm.svg.Text', {
            x: d.graphArea.right,
            y: d.graphArea.bottom + 20,
            text: maxLightValue,
            font: font,
            brush: {
                color: '#bebbc1',
                line: {
                    width: 1,
                    color: '#bebbc1'
                }
            }
        })

        lightLabel.getDom ().classList.add ('x-axis', 'label')
        o.makeUnselectable ( lightLabel.getDom () );
        d.xAxisLabelList.push (lightLabel)

        // Draw right most wall
        var segment
        segment = tm.new ('tm.svg.Line', {
            start: {
                x: d.graphArea.right,
                y: d.graphArea.bottom,
            },
            end: {
                x: d.graphArea.right,
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


        // Create x-axis title label
        var xAxisLabel
        xAxisLabel = tm.new ('tm.svg.Text', {
            x: d.graphArea.left/2 + d.graphArea.right/2 - 75,
            y: d.graphArea.bottom + 45,
            text: 'Wavelength of Light (nm)',
            font: font,
            brush: {
                color: '#bebbc1',
                line: {
                    width: 1,
                    color: '#bebbc1'
                }
            }
        })

        o.makeUnselectable ( xAxisLabel.getDom () );

        // Transmission and Absorbtion graphs will change this text as needed
        d.yAxisLabel = tm.new ('tm.svg.Text', {
            x: d.padding.top + 40,
            y: d.padding.left - 60,
            text: 'Absorb/Trans Percent',
            font: font,
            brush: {
                color: '#bebbc1',
                line: {
                    width: 1,
                    color: '#bebbc1'
                }
            },
        })

        o.makeUnselectable ( d.yAxisLabel.getDom () );
        d.yAxisLabel.getDom ().style.transform = 'rotate(-90deg) translate(-230px,12px)';

        d.masterGroup.add (d.yAxisLabel);
        d.masterGroup.add (xAxisLabel);
        d.masterGroup.add (lightLabel);
        d.masterGroup.add (segment);
        d.masterGroup.add (d.xAxis);
        d.masterGroup.add (d.yAxis);

        d.svg.add (d.masterGroup)

        // $ ( d.svg.getDom () ).css ('cursor', 'zoom-in')
    }

    o.findValueOfX = function (x) {
        var increment, trueX, valueOfX;
        // Take an X coordinate and find its value based on visible value range

        // Subtract the offset of the graph from the x coordinate
        trueX = x - d.graphArea.left
        // console.log (trueX);

        // make sure the x is not farther than the graph can draw
        if (trueX > d.graphArea.distance.rightToLeft) { return false }

        // find the value per pixel
        increment = (d.lightEndValue - d.lightStartValue) / d.graphArea.distance.rightToLeft;
        // console.log (increment);

        valueOfX = d.lightStartValue + (trueX * increment);
        // console.log (valueOfX)

        return valueOfX;
    }

    o.findXOfValue = function (value) {
        var increment, x;
        // Find the x coordinate for a given graph value (wavelength)

        // console.log (d.lightStartValue, d.lightEndValue, d.graphArea.distance.rightToLeft)

        // Find the value per pixel
        increment = (d.lightEndValue - d.lightStartValue) / d.graphArea.distance.rightToLeft;
        // Find the value of x
        x = (value - d.lightStartValue) / increment;

        // make sure the x is not farther than the graph can draw
        if (x > d.graphArea.distance.rightToLeft) { return false }

        // console.log (value, increment, x);

        return x;
    }

    o.getGraphArea = function () {return d.graphArea }
    o.getSvg = function () { return d.svg }

    o.makeUnselectable = function (dom) {
        dom.unselectable = 'on'
        // $ (dom).css ('cursor', 'default')
    }

    o.writeTitle = function () {
        d.titleDiv.html (d.name)
        d.yAxisLabel.getDom ().innerHTML = d.percentType;
    }

    o.resizeGraph = function () {
        var item, key, list, targetWidth, svgWidth;

        // Resize the graph to fill the new width of the svg
        svgWidth = $ (d.svg.getDom ()).width ();

        targetWidth = svgWidth - (d.padding.right + d.padding.left);
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

        list = d.xAxisLabelList;
        for (key in list) {
            item = list [key];

            if (item) {
                item.update ({
                    x: d.graphArea.left + (d.graphArea.increment.x * Number (key)),
                    y: d.graphArea.bottom + 20,
                })
            }
        }
    }
})
