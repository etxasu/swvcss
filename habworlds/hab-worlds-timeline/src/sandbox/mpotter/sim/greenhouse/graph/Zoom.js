'use strict'
// Handles zooming in and out
tm.add ('sim.greenhouse.graph.Zoom', ['sim.greenhouse.graph.Data', 'sim.greenhouse.graph.Autoscaler'], function (o, p, d) {
    o.setup = function (config) {
        // Add label for telling the user the current zoom level on the graph
        d.zoomLabel = tm.new ('tm.svg.Text', {
            x: 10,
            y: d.height - 10,
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

        d.zoomDisabled = false;

        d.svg.add (d.zoomLabel)

        $ (d.svg.getDom ()).on ('mouseleave', function () {
            if (d.drawingZoomBox) {
                o.stopDrawingZoomBox ()
            }
        })

        if (config.onZoom) {
            d.onZoom = config.onZoom;
        }

        d.hack = config.hack
    }

    o.drawZoomBox = function (event) {
        var area, x, width;

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
            max: d.maxLightValue,
            min: d.initialLightValue,
            current: {
                min: d.lightStartValue,
                max: d.lightEndValue
            }
        }
    }

    o.getZoomPercent = function () { return d.zoomPercent }

    o.resetZoom = function () {
        o.updateLabelList (d.initialLightValue, d.maxLightValue)
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

       defaultZoomMaxValue = d.lightEndValue;
       defaultZoomIncrement = defaultZoomMaxValue / d.xAxisLabelList.length;
       zoomOffset = d.zoomBox.getPosition ().x - d.graphArea.left;

       // The smaller d.zoomAmount is, the more intense the zoom
       // console.log ('Zooming in by:', d.zoomAmount, 'with an offset of', zoomOffset);
       startX = d.zoomBox.getPosition ().x;
       endX = d.zoomAmount + startX;

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
           // newMaxValue = Math.abs (newBaseValue - d.lightStartValue);
           // newMaxValue = Math.round ( defaultZoomMaxValue * ((zoomOffset + d.zoomAmount) / d.graphArea.distance.rightToLeft) * 100 ) / 100;

           if (isNaN (newBaseValue) || isNaN (newMaxValue)) { return }

           maxDetail = 10000;

           // Prevent zooming in to infinity
           if (Math.ceil (newBaseValue * maxDetail) !== Math.ceil (newMaxValue * maxDetail)) {
               d.newBaseValue = newBaseValue;
               // console.log ('The new max value:', newMaxValue)
               // o.updateLabelList (newBaseValue, newMaxValue)
               o.setZoom (newBaseValue, newMaxValue)
           }
       }

       d.zoomBox.getDom ().classList.add ('hide')
    }

   o.updateCurrentZoom = function () {
       var currentZoom, maxZoom, zoomPercent;

       maxZoom = Math.abs (d.maxLightValue - d.initialLightValue);
       currentZoom = Math.abs (d.lightEndValue - d.lightStartValue);

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

    o.updateLabelList = function (startValue, endValue) {
        var increment, item, key, list, value;

        // console.log ('start value:', startValue)
        // console.log ('end value:', endValue)

        // !!!
        // limit the start and end values

        list = d.xAxisLabelList;
        increment = (endValue - startValue) / (list.length - 1);
        for (key in list) {
            item = list [key];


            value = startValue + (increment * Number (key));
            value *= 100;
            value = Math.round (value);
            value /= 100

            if (d.hack) {
                if (d.hack.xAxis && d.hack.xAxis.postCaluclationLabelModifier) {
                    value *= d.hack.xAxis.postCaluclationLabelModifier
                }
            }

            item.update ({
                text: value
            })
        }

        d.old = {
            startValue: d.lightStartValue,
            endValue: d.lightEndValue
        }

        d.lightStartValue = startValue;
        d.lightEndValue = endValue

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
