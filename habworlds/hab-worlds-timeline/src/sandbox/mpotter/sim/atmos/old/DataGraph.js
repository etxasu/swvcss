tm.add ('app.sim.atmos.data.Graph', function (o, p, d) {
    o.setup = function (config) {
        // Set defaults
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
                    color: 'black',
                }
            },
        })

        d.zoomBox = tm.new ('tm.svg.Box', {
            width: 50,
            height: 300,
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
        d.segmentCount = config.segmentCount;
        d.padding = config.padding;
        d.dataLine = {};
        d.percentType = ''
        d.precisionLevel = 50;
        d.maxLightValue = config.maxLightValue;
        d.lightStartValue = 1;
        d.lightEndValue = d.maxLightValue

        // Draw the graph
        o.createGraph ();
        // o.calculateGraphData ();
    }

    o.createGraph = function () {
        var int;

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
                color: 'black',
                line: {
                    width: 3,
                    color: 'black'
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
                    width: 3,
                    color: 'black'
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
                        width: 1,
                        color: 'black'
                    }
                }
            })

            percent = 100 / d.segmentCount;
            percent = percent * (int + 1);
            percentArray.unshift (percent);


            d.svg.add (segment)
        }

        // Create labels for y axis
        for (int = 0; int < d.segmentCount; int++) {
            var percentLabel;

            percentLabel = tm.new ('tm.svg.Text', {
                x: d.graphArea.left - 40,
                y: d.graphArea.top + (d.graphArea.increment.x * int),
                text: percentArray [int] + '%',
                brush: {
                    color: 'black',
                    line: {
                        width: 1,
                        color: 'black'
                    }
                }
            })

            d.svg.add (percentLabel)
        }

        var percentLabel;
        percentLabel = tm.new ('tm.svg.Text', {
            x: d.graphArea.left - 40,
            y: d.graphArea.bottom,
            text: '0%',
            brush: {
                color: 'black',
                line: {
                    width: 1,
                    color: 'black'
                }
            }
        })

        d.svg.add (percentLabel);
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
                    color: 'black',
                    line: {
                        width: 1,
                        color: 'black'
                    }
                }
            })

            // Create x axis labels
            lightLength = maxLightValue / d.segmentCount;
            lightLength = lightLength * int;

            lightLabel = tm.new ('tm.svg.Text', {
                x: d.graphArea.left + (d.graphArea.increment.y * int),
                y: d.graphArea.bottom + 20,
                text: Math.floor (lightLength) + ' (μm)',
                brush: {
                    color: 'black',
                    line: {
                        width: 1,
                        color: 'black'
                    }
                }
            })

            d.svg.add (segment);
            d.svg.add (lightLabel);
            d.xAxisLabelList.push (lightLabel)
        }

        // Create right most label
        var lightLabel
        lightLabel = tm.new ('tm.svg.Text', {
            x: d.graphArea.right,
            y: d.graphArea.bottom + 20,
            text: maxLightValue + '(μm)',
            brush: {
                color: 'black',
                line: {
                    width: 1,
                    color: 'black'
                }
            }
        })

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
                color: 'black',
                line: {
                    width: 1,
                    color: 'black'
                }
            }
        })

        // Create x-axis title label
        xAxisLabel = tm.new ('tm.svg.Text', {
            x: d.graphArea.left/2 + d.graphArea.right/2 - 115,
            y: d.graphArea.bottom + 45,
            text: 'Wavelength of Light (μm)',
            brush: {
                color: 'black',
                line: {
                    width: 1,
                    color: 'black'
                }
            }
        })

        // Transmission and Absorbtion graphs will change this text as needed
        d.yAxisLabel = tm.new ('tm.svg.Text', {
            x: 0,
            y: 0,
            text: 'Absorb/Trans Percent',
            brush: {
                color: 'black',
                line: {
                    width: 1,
                    color: 'black'
                }
            },
        })

        d.yAxisLabel.getDom ().style.transform = 'rotate(-90deg) translate(-230px,12px)';

        d.svg.add (d.yAxisLabel)
        d.svg.add (xAxisLabel)
        d.svg.add (lightLabel)
        d.svg.add (segment)
        d.svg.add (d.xAxis)
        d.svg.add (d.yAxis)
    }

    o.startDrawingZoomBox = function (event) {
       var area, parent, x;
       d.drawingZoomBox = true;

       x = event.pageX - $ (d.svg.getDom ()).offset ().left;

       if (x < d.graphArea.left) { x = d.graphArea.left }
       else if (x > d.graphArea.right) { x = d.graphArea.right }

       d.zoomBoxOriginX = x
       d.zoomBox.update ({
           width: 0
       })
       d.zoomBox.moveTo (d.zoomBoxOriginX, d.graphArea.top)
       d.zoomBox.getDom ().classList.remove ('hide')
   }

   o.stopDrawingZoomBox = function () {
       var currentZoom, defaultZoomIncrement, defaultZoomMaxValue, newBaseValue, newMaxValue, zoomOffset, zoomLevel;

       d.drawingZoomBox = false

       defaultZoomMaxValue = 50;
       defaultZoomIncrement = defaultZoomMaxValue / d.xAxisLabelList.length;
       zoomOffset = d.zoomBox.getPosition ().x - d.graphArea.left;

       // The smaller d.zoomAmount is, the more intense the zoom
       // console.log ('Zooming in by:', d.zoomAmount, 'with an offset of', zoomOffset);

       newBaseValue = Math.round ( (defaultZoomMaxValue * (zoomOffset / d.graphArea.distance.rightToLeft)) * 100 ) / 100;
       // Find the value of our new starting X
       // First, find the value for where ever the left side of the box is:
       // console.log ('The new base value:', newBaseValue);

       // Find the right side of the box
       newMaxValue = Math.round ( defaultZoomMaxValue * ((zoomOffset + d.zoomAmount) / d.graphArea.distance.rightToLeft) * 100 ) / 100;

       // console.log ('The new max value:', newMaxValue)
       o.updateLabelList (newBaseValue, newMaxValue)

       d.zoomBox.getDom ().classList.add ('hide')
   }

    o.drawZoomBox = function (event) {
        var area, x, width;

        // Prevent highlighting elements while drawing box
        if (window.getSelection) {
            if (window.getSelection().empty) {  // Chrome
                window.getSelection().empty();
            }
            else if (window.getSelection().removeAllRanges) {  // Firefox
                window.getSelection().removeAllRanges();
            }
        }
        else if (document.selection) {  // IE?
            document.selection.empty();
        }

        area = d.svg.getDom ().getBoundingClientRect ();
        x = event.pageX - $ (d.svg.getDom ()).offset ().left;

        width = x - d.zoomBoxOriginX;

        if (width >= 0) {
            // prevent from selecting an area wider than the graph
            if (width + d.zoomBoxOriginX > d.graphArea.right) {
                width = d.graphArea.right - d.zoomBoxOriginX
            }

            d.zoomBox.update ({
                width: width
            })

            d.zoomAmount = width
        }
        else {
            // Prevent from selecting an area before the begining of the graph
            if (d.zoomBoxOriginX + width < d.graphArea.left) {
                width = (d.zoomBoxOriginX - d.graphArea.left) * -1
            }

            d.zoomBox.moveTo (
                d.zoomBoxOriginX + width,
                d.graphArea.top
            )

            d.zoomBox.update ({
                width: Math.abs (width)
            })

            d.zoomAmount = Math.abs (width)
        }

        //  keep zoom box on top
        parent = d.zoomBox.getDom ().parentNode;
        parent.removeChild (d.zoomBox.getDom ());
        parent.append (d.zoomBox.getDom ());
    }

    o.updateLabelList = function (startValue, endValue) {
        var increment, item, key, list;

        // console.log ('start value:', startValue)
        // console.log ('end value:', endValue)

        list = d.xAxisLabelList;
        increment = (endValue - startValue) / (list.length - 1);
        for (key in list) {
            item = list [key];

            item.update ({
                text: Math.round ( (startValue + (increment * Number (key)) ) * 100 ) / 100
            })
        }

        d.lightStartValue = startValue;
        d.lightEndValue = endValue

        // refresh the graphs
        list = d.dataLine
        for (key in list) {
            item = list [key];

            console.log (item.segmentList)
            if (item && item.segmentList.length) {
                window.gasRepo [key].showData ();
            }
        }
    }

    o.highlightData = function (name) {
        var item, key, list, parent;

        list = d.dataLine
        for (key in list) {
            item = list [key]

            if (key != name) {
                var subItem, subKey, subList;
                subList = item.segmentList
                for (subKey in subList) {
                    subItem = subList [subKey]

                    subItem.getDom ().style.fill = 'grey'
                    subItem.getDom ().style.stroke = 'grey'
                }
                subList = item.circleList
                for (subKey in subList) {
                    subItem = subList [subKey]

                    subItem.getDom ().style.fill = 'grey'
                    subItem.getDom ().style.stroke = 'grey'
                }
            }
            else if (key == name) {
                var subItem, subKey, subList;
                subList = item.segmentList
                for (subKey in subList) {
                    subItem = subList [subKey]

                    // Move data to front
                    parent = subItem.getDom ().parentNode
                    parent.removeChild (subItem.getDom ())
                    parent.append (subItem.getDom ())
                }

                subList = item.circleList
                for (subKey in subList) {
                    subItem = subList [subKey]

                    // Move data to front
                    parent = subItem.getDom ().parentNode
                    parent.removeChild (subItem.getDom ())
                    parent.append (subItem.getDom ())
                }
            }
        }
    }

    o.unhighlightData = function () {
        var item, key, list;

        list = d.dataLine
        for (key in list) {
            item = list [key]

            if (key != name) {
                var subItem, subKey, subList;
                subList = item.segmentList
                for (subKey in subList) {
                    subItem = subList [subKey]

                    subItem.getDom ().style.fill = window.gasRepo [key].getColor ();
                    subItem.getDom ().style.stroke = window.gasRepo [key].getColor ();
                }

                subList = item.circleList
                for (subKey in subList) {
                    subItem = subList [subKey]

                    subItem.getDom ().style.fill = window.gasRepo [key].getColor ();
                    subItem.getDom ().style.stroke = window.gasRepo [key].getColor ();
                }
            }
        }
    }

    o.plotData = function (data) {
        var circle, item, key, list, nextItem, segment;

        if (!document.querySelector ( d.selector.container ).classList.contains ('hide')) {
            if (!data.name) { data.name = ' ' }
            if (!data.color) { data.color = 'lightblue' }
            if (!d.dataLine [data.name]) {
                d.dataLine [data.name] = {
                    segmentList: [],
                    circleList: []
                }
            }

            if (d.dataLine [data.name].segmentList.length) {
                // console.log (d.dataLine [data.name])
                o.removeData (data);
            }

            // console.log ('Plotting:', data)

            list = data.dataPointList;
            // list = d.dataPointList
            for (key in list) {
                key = Number (key);
                item = list [key];
                nextItem = list [key + 1]

                if (!nextItem) { nextItem = item}

                // console.log ('plotting', item)

                // Use current corrdinate and next coordiante to draw a line
                segment = tm.new ('tm.svg.Line', {
                    start: {
                        x: item.x + d.graphArea.left,
                        y: item.y + d.graphArea.top,
                    },
                    end: {
                        x: nextItem.x + d.graphArea.left,
                        y: nextItem.y + d.graphArea.top,
                    },
                    brush: {
                        color: data.color,
                        line: {
                            width: 6,
                            color: data.color
                        }
                    }
                })

                circle = tm.new ('tm.svg.Circle', {
                    x: item.x + d.graphArea.left,
                    y: item.y + d.graphArea.top,
                    radius: 7,
                    brush: {
                        color: data.color,
                        line: {
                            width: 2,
                            color: data.color
                        }
                    }
                })

                circle.getDom ().name = data.name;
                circle.getDom () ['data-pos'] = item.y;

                // Add a mouseover listener
                circle.getDom ().onmouseover = function (event) {
                    var name, percent, target;

                    target = d.svg.getDom ().getBoundingClientRect ();
                    name = data.name;

                    // percent = (target.top - event.clientY) + (d.graphArea.distance.topToBottom + d.padding.top);
                    percent = d.graphArea.distance.topToBottom - this ['data-pos'];
                    percent = Math.round (percent);
                    percent = percent / d.graphArea.distance.topToBottom;
                    percent = percent * 10000
                    percent = Math.round (percent) / 100;

                    window.selectedData = name + ' ' + percent + '%'

                    this.style.stroke = 'black'

                    o.highlightData (this.name);
                }

                // Add a mouseover listener
                circle.getDom ().onmouseleave = function (event) {
                    o.unhighlightData (this.name);
                }

                // Add it to the dataLine list
                d.dataLine [data.name].segmentList.push (segment)
                d.dataLine [data.name].circleList.push (circle)

                // Add line to svg
                d.svg.add (segment)
                d.svg.add (circle)
            }
        }
    }

    o.removeData = function (data) {
        var item, key, list;

        // console.log (data);
        // console.log (d.dataLine);
        // console.log (d.dataLine [data.name]);

        // Making sure this graph has even gotten this data in the first place
        if (d.dataLine && d.dataLine [data.name]) {
            list = d.dataLine [data.name].segmentList;
            for (key in list) {
                item = list [key];

                item.getDom ().parentNode.removeChild (item.getDom ())

                for (subKey in item) {
                    delete item [subKey]
                }

                delete d.dataLine [data.name].segmentList [key]
            }

            list = d.dataLine [data.name].circleList;
            for (key in list) {
                item = list [key];

                item.getDom ().parentNode.removeChild (item.getDom ())

                for (subKey in item) {
                    delete item [subKey]
                }

                delete d.dataLine [data.name].circleList [key]
            }

            d.dataLine [data.name] = {
                circleList: [],
                segmentList: []
            }
        }
    }

    o.update = function () {
        var item, key, list;

        list = window.gasRepo;
        for (key in list) {
            item = list [key];

            if (item && item.getActive () === true) {
                item.showData ();
            }
        }
    }

    o.writeTitle = function () {
        d.titleDiv.html (d.name)
        d.yAxisLabel.getDom ().innerHTML = d.percentType;
    }
})
