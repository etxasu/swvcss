'use strict'
// Handles zooming in and out
tm.add ('component.graph.Zoom', ['component.graph.Data', 'component.graph.Autoscaler'], function (o, p, d) {
    o.setup = function (config) {

        if (config.zoom === undefined) { config.zoom = {} }
        if (config.zoom.disabled === undefined) { config.zoom.disabled = false; }
        if (config.zoom.label === undefined) { config.zoom.label = {} }
        if (config.zoom.label.x === undefined) { config.zoom.label.x = 20 }
        if (config.zoom.label.y === undefined) { config.zoom.label.y = d.height + 50 }

        // Add label for telling the user the current zoom level on the graph
        d.zoomLabel = tm.new ('tm.svg.Text', {
            x: config.zoom.label.x,
            y: config.zoom.label.y,
            text: 'Zoom: 100%',
            font: {
                size: 12
            },
            brush: {
                color: '#bebbc1',
                line: {
                    width: 1,
                    color: '#bebbc1'
                }
            }
        })

        if (config.zoom.label.hidden) {
            d.zoomLabel.getDom ().classList.add ('hide')
        }

        d.zoomDisabled = config.zoom.disabled;

        d.zoomBox = tm.new ('tm.svg.Box', {
            width: 50,
            height: d.height,
            x: 0,
            y: 0,
            brush: {
                color: 'rgba(125,125,125,0.5)'
            }
        })

        d.zoomBox.getDom ().classList.add ('hide')

        d.svg.add (d.zoomBox);
        d.svg.add (d.zoomLabel)

        d.svg.getDom ().onmousedown = function (event) {
            if (!d.zoomDisabled) {
                o.startDrawingZoomBox (event)
            }
        }

        d.svg.getDom ().onmousemove = function (event) {
            // NOTE: This is a shim I found
            // Prevent SVG text from being selected
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

            if (d.drawingZoomBox && !d.zoomDisabled) {
                o.drawZoomBox (event)
            }
        }

        d.svg.getDom ().onmouseup = function (event) {
            if (!d.zoomDisabled) {
                o.stopDrawingZoomBox (event);
            }
        }

        d.onZoom = config.zoom.onZoom;
    }

    o.drawZoomBox = function (event) {
        var area, x, width;

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

    o.getValues = function () {
        return {
            max: d.maxXValue,
            min: d.initialXValue,
            current: {
                min: d.xStartValue,
                max: d.xEndValue
            }
        }
    }

    o.getZoomPercent = function () { return d.zoomPercent }

    o.resetZoom = function () {
        o.updateLabelList (d.initialXValue, d.maxXValue)
        if (typeof d.onZoom == 'function') { d.onZoom () }
    }

    o.setZoomDisabled = function (value) {
        d.zoomDisabled = value;
    }

    o.setZoom = function (start, end) {
        o.updateLabelList (start, end);

        if (typeof d.onZoom == 'function') { d.onZoom () }
    }

    o.startDrawingZoomBox = function (event) {
        if (!d.zoomDisabled) {
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
    }

   o.stopDrawingZoomBox = function () {
       var currentZoom, defaultZoomIncrement, defaultZoomMaxValue, endX, maxDetail, newBaseValue, newMaxValue, startX, zoomOffset, zoomLevel;

       d.drawingZoomBox = false

       d.zoomBox.getDom ().classList.add ('hide')

       defaultZoomMaxValue = d.xEndValue;
       defaultZoomIncrement = defaultZoomMaxValue / d.xAxisLabelList.length;
       zoomOffset = d.zoomBox.getPosition ().x - d.graphArea.left;

       // The smaller d.zoomAmount is, the more intense the zoom
       // console.log ('Zooming in by:', d.zoomAmount, 'with an offset of', zoomOffset);
       startX = d.zoomBox.getPosition ().x;
       endX = d.zoomAmount + startX;

       // console.log ('Zooming. Start:', startX, '. End:', endX)

       // Prevent zooming in when the box is too small
       if (endX - startX > 3) {
           newBaseValue = o.findValueOfX (startX);
           // newBaseValue = Math.abs (newBaseValue - d.lightStartValue);
           // newBaseValue += Math.round ( (defaultZoomMaxValue * (zoomOffset / d.graphArea.distance.rightToLeft)) * 100 ) / 100;
           // Find the value of our new starting X
           // First, find the value for where ever the left side of the box is:
           // console.log ('The new base value:', newBaseValue);

           // Find the right side of the box
           newMaxValue = o.findValueOfX (endX);
           // console.log ('The new max value:', newMaxValue);
           // newMaxValue = Math.abs (newBaseValue - d.lightStartValue);
           // newMaxValue = Math.round ( defaultZoomMaxValue * ((zoomOffset + d.zoomAmount) / d.graphArea.distance.rightToLeft) * 100 ) / 100;

           if ( isNaN (newBaseValue) || isNaN (newMaxValue) ) { return }

           maxDetail = 10000;

           // Prevent zooming in to infinity
           if (Math.ceil (newBaseValue * maxDetail) !== Math.ceil (newMaxValue * maxDetail)) {
               d.newBaseValue = newBaseValue;
               // console.log ('The new max value:', newMaxValue)
               // o.updateLabelList (newBaseValue, newMaxValue)
               o.setZoom (newBaseValue, newMaxValue)
           }
       }
    }

   o.updateCurrentZoom = function () {
       var currentZoom, maxZoom, zoomPercent;

       maxZoom = Math.abs (d.maxXValue - d.initialXValue);
       currentZoom = Math.abs (d.xEndValue - d.xStartValue);

       zoomPercent = (maxZoom / currentZoom) * 100;
       zoomPercent *= 100;
       zoomPercent = Math.round (zoomPercent);
       zoomPercent /= 100;

       d.zoomPercent = zoomPercent / 100;

       if (d.zoomLabel) {
           d.zoomLabel.update ({
               text: 'Zoom: ' + zoomPercent + '%'
           })
       }
   }

   // Sensible alias for updateLabelList
   o.updateXAxis = function (start, end) { o.updateLabelList (start, end) }

   o.updateLabelList = function (startValue, endValue) {
        var increment, item, key, list, value;

        // console.log ('start value:', startValue)
        // console.log ('end value:', endValue)

        // !!!
        // limit the start and end values

        list = d.xAxisLabelList.bottom;
        increment = (endValue - startValue) / (list.length - 1);
        for (key in list) {
            item = list [key];


            value = startValue + (increment * Number (key));
            value *= 100;
            value = Math.round (value);
            value /= 100

            item.update ({
                text: value
            })
        }

        d.old = {
            startValue: d.xStartValue,
            endValue: d.xEndValue
        }

        d.xStartValue = startValue;
        d.xEndValue = endValue

        // refresh the graphs
        list = d.dataLine
        for (key in list) {
            item = list [key];

            // console.log (item.segmentList)
            if (item && item.segmentList.length) {
                // console.log (item)
                if (item.name.indexOf ('mystery') > -1) {
                    item.owner.showMysteryData ();
                }
                else {
                    item.owner.plotData (item);
                }
            }
        }

        o.updateCurrentZoom ();
    }
})
