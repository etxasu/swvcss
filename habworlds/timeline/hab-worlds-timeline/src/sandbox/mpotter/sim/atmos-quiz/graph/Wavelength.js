'use strict'
// Responsible for plotting and managing data
tm.add ('sim.greenhouse.graph.Wavelength', ['sim.greenhouse.graph.Zoom'], function (o, p, d) {
    o.setup = function (config) {
        d.highestPoint = 1000

        var alpha, height;

        alpha = {
            veryLow: 0.3,
            low: 0.3,
            mid: 0.3,
            high: 0.3
        }

        height = d.graphArea.distance.topToBottom;

        d.wavelengthRepo = {
            'uv': {
                start: -10,
                end: 0.40,
                box: tm.new ('tm.svg.Box', {
                    x: 10, y: d.graphArea.top,
                    width: 10, height: height,
                    brush: {
                        color: 'rgba(145, 0, 113, ' + alpha.veryLow + ')',
                        line: {
                            color: 'rgba(238, 88, 207, ' + alpha.low + ')',
                            width: 1
                        }
                    }
                })
            },
            'violet': {
                start: 0.40,
                end: 0.45,
                box: tm.new ('tm.svg.Box', {
                    x: 10, y: d.graphArea.top,
                    width: 10, height: height,
                    brush: {
                        color: 'rgba(90, 0, 145, ' + alpha.mid + ')',
                        line: {
                            color: 'rgba(157, 60, 217, ' + alpha.high + ')',
                            width: 1
                        }
                    }
                })
            },
            'blue': {
                start: 0.45,
                end: 0.50,
                box: tm.new ('tm.svg.Box', {
                    x: 10, y: d.graphArea.top,
                    width: 10, height: height,
                    brush: {
                        color: 'rgba(0, 97, 145,  ' + alpha.mid + ')',
                        line: {
                            color: 'rgba(79, 176, 223,  ' + alpha.high + ')',
                            width: 1
                        }
                    }
                })
            },
            'green': {
                start: 0.50,
                end: 0.55,
                box: tm.new ('tm.svg.Box', {
                    x: 10, y: d.graphArea.top,
                    width: 10, height: height,
                    brush: {
                        color: 'rgba(0, 145, 1,  ' + alpha.mid + ')',
                        line: {
                            color: 'rgba(91, 233, 92,  ' + alpha.high + ')',
                            width: 1
                        }
                    }
                })
            },
            'yellow': {
                start: 0.55,
                end: 0.60,
                box: tm.new ('tm.svg.Box', {
                    x: 10, y: d.graphArea.top,
                    width: 10, height: height,
                    brush: {
                        color: 'rgba(145, 131, 0,  ' + alpha.mid + ')',
                        line: {
                            color: 'rgba(250, 235, 95,  ' + alpha.high + ')',
                            width: 1
                        }
                    }
                })
            },
            'orange': {
                start: 0.60,
                end: 0.65,
                box: tm.new ('tm.svg.Box', {
                    x: 10, y: d.graphArea.top,
                    width: 10, height: height,
                    brush: {
                        color: 'rgba(145, 57, 0,  ' + alpha.mid + ')',
                        line: {
                            color: 'rgba(252, 161, 101,  ' + alpha.high + ')',
                            width: 1
                        }
                    }
                })
            },
            'red': {
                start: 0.65,
                end: 0.70,
                box: tm.new ('tm.svg.Box', {
                    x: 10, y: d.graphArea.top,
                    width: 10, height: height,
                    brush: {
                        color: 'rgba(145, 0, 0,  ' + alpha.mid + ')',
                        line: {
                            color: 'rgba(245, 109, 109,  ' + alpha.high + ')',
                            width: 1
                        }
                    }
                })
            },
            'infrared': {
                start: 0.70,
                end: 1.50,
                box: tm.new ('tm.svg.Box', {
                    x: 10, y: d.graphArea.top,
                    width: 10, height: height,
                    brush: {
                        color: 'rgba(145, 0, 35, ' + alpha.veryLow + ')',
                        line: {
                            color: 'rgba(246, 90, 128, ' + alpha.low + ')',
                            width: 1
                        }
                    }
                })
            },
        }

        var item, key, list;
        list = d.wavelengthRepo
        for (key in list) {
            item = list [key];

            d.svg.add (item.box)
        }

        o.plotSpectra ();
        // o.resetZoom ();
    }

    o.configureData = function (data) {
        var base, end, height, increment, int, item, list, max, min, pointList, wavelength, width;

        base = data.base;
        pointList = [];
        width = d.graphArea.right - d.graphArea.left;
        height = d.graphArea.bottom - d.graphArea.top;

        min = d.lightStartValue;
        max = d.lightEndValue;

        list = o.isolateNeededWavelengths (data, min, max)

        if (base === undefined && d.lastBase === undefined) { base = d.graphArea.top }
        else if (base === undefined && d.lastBase !== undefined) { base = d.lastBase; }
        else if (base !== undefined) { d.lastBase = base }

        // Plot 50 points on the graph.
        // Each point can be inbetween the current visible values
        // increment = d.lightEndValue / d.precisionLevel;

        // end = d.precisionLevel + 2; // For catching the 2 extra points at the start and end
        end = list.length;
        for (int = 0; int < end; int++) {

            wavelength = increment * int;
            // console.log (wavelength)

            // item = list [wavelength];
            item = list [int];

            // Make sure the item is allowed to be drawn on the graph
            if (item && (item.x || item.x === 0)) {

                pointList.push ({
                    x: item.x,
                    y: item.y,
                    base: base,
                })
            }
        }

        return pointList
    }

    o.getClosestItem = function (data) {
        var end, int, item, key, lastItem, list, state, variance, value;

        state = 0; // 1 = entered key range
        end = data.end;
        int = data.start;
        variance = data.variance;
        lastItem = { transmission: 100 }

        list = data.repo [data.gas].getGasData ();
        for (key in list) {
            value = Number (key);

            // console.log ((int + variance), '>', key, '>', (int - variance));
            // console.log ((int + variance) > key, key > (int - variance));

            if ((int + variance) >= value && value >= (int - variance) && value !== 0.001) {
                // Entered key range
                if (state === 0) { state = 1; }

                if (!lastItem || list [key].transmission < lastItem.transmission) {
                    item = {
                        wavelength: value,
                        transmission: list [key].transmission
                    }
                    lastItem = item;
                }
            }
            else {
                // Left key range
                if (state == 1 && value !== 0.001) {
                    break;
                }
            }
        }

        if (!item) {
            item = {
                // wavelength: data.wavelength,
                transmission: 100,
            }
        }
        else {
            var maxPressure, value;

            maxPressure = 3.721
            value = item.transmission / (data.pressure / maxPressure)
            value = value - 100;

            if (value < 0) { value = 0 }
            else if (value > 100) { value = 100 }

            item = {
                wavelength: item.wavelength,
                transmission: value,
            }
        }

        return item
    }

    o.isolateNeededWavelengths = function (data, startPoint, endPoint) {
        var end, increment, index, int, height, item, key, lastKey, lastResult, list, max, planckValue, pointList, pressure, result, transmissionValue, validData, value, variance, xPos, yPos;


        validData = [];
        increment = (d.lightEndValue - d.lightStartValue) / d.precisionLevel;
        end = d.lightStartValue;
        variance = increment / 10
        // if (variance < 0.003) { variance = 0.003 }

        index = 0
        lastKey = 0
        height = d.graphArea.distance.topToBottom

        pointList = data.dataPointList;
        if (!pointList) { pointList = [] }

        int = d.lightEndValue;
        while (int > end) {

            lastResult = null;
            xPos = o.findXOfValue ( int )

            if (data.gasRepo) {
                var list = data.gasRepo
                for (key in list) {
                    item = list [key];

                    if (item.getActive ()) {
                        pressure = item.getPressure ()

                        result = o.getClosestItem ({
                            gas: key,
                            repo: list,
                            start: int,
                            wavelength: int,
                            kelvin: data.kelvin,
                            pressure: pressure,
                            variance: variance
                        })

                        yPos = height - ( height * (result.transmission / 100) );

                        if (yPos > height) { yPos = height }
                        else if (yPos < 3) { yPos = 3 }

                        if (item.wavelength) { xPos = o.findXOfValue ( result.wavelength ) }

                        result.x = xPos;
                        result.y = yPos;

                        if (!validData [index]) {
                            validData.push ( result )
                        }
                        else if (result.y > validData [index].y) {
                            validData [index] = result
                        }
                    }
                }
            }

            if (!item) {
                yPos = 3;

                validData.push ({
                    wavelength: int,
                    transmission: 100,
                    x: xPos,
                    y: yPos
                })
            }

            if (yPos < d.highestPoint) {
                d.highestPoint = yPos
            }

            index++
            int -= increment
        }

        // console.log ('Highest point: ', d.highestPoint)

        return validData;
    }

    // o.planck = function (kelvin, wavelength) {
    //     var boltzmannConst, denominator, exponent, frequency, jules, numerator, pi, planckConst, result, speedOfLight, temperature;
    //     // Black body radiation is informed by frequency and temperature
    //     // The planck function gets its curve from plugging in the different
    //     // frequencies at a given temperature
    //
    //     // Set up constants and passed-in values
    //     planckConst = 6.626068 * Math.pow (10, -34);
    //     boltzmannConst = 1.38066 * Math.pow (10, -23);
    //     speedOfLight = 2.997925 * Math.pow (10, 8);
    //     temperature = kelvin
    //     // Convert wavelength to its actual length in meters
    //     frequency = wavelength * Math.pow (10, -5)
    //
    //     // Breaking the planck function up into steps:
    //
    //     // Solve the denominators exponent
    //     exponent = ( (planckConst * speedOfLight) / (boltzmannConst * frequency * temperature) )
    //     // Solve the denominator
    //     denominator = 1 * Math.exp (exponent) - 1
    //     // Solve the numerator
    //     numerator = 2 * ( planckConst * Math.pow (speedOfLight, 2) * Math.pow (frequency, -5) )
    //     // Resolve equation
    //     result = numerator / denominator
    //
    //     // Reduce result to a graphable coordinate
    //     result /= 100000
    //
    //     // Return result
    //     return result;
    // }

    o.plotSpectra = function () {
        var end, endX, item, key, list, start, startX;

        startX = Math.round ( o.findXOfValue (d.lightStartValue) );
        endX = Math.round ( o.findXOfValue (d.lightEndValue) );

        list = d.wavelengthRepo;
        for (key in list) {
            item = list [key];

            start = o.findXOfValue (item.start)
            end = o.findXOfValue (item.end)

            // console.log (key, start, end)

            // Check to see if the box is visible
            // but falls out of bounds
            if (
                (start < 0 && end < 0) ||
                (start == false && end == false)
            ) {
                item.box.getDom ().classList.add ('hide')
            }
            else {
                item.box.getDom ().classList.remove ('hide')

                if (start < 0) { start = 0 }
                if (end === false) { end = endX }

                item.box.update ({
                    x: Math.round ( start + d.graphArea.left ),
                    width: Math.round ( end - start)
                })
            }

        }
    }

    o.override ({
        plotData: function (original, data) {
            var pointList, type;

            pointList = o.configureData (data);

            // Make sure there are points and that they can even be plotted.
            if (pointList && pointList.length && pointList [0].y !== undefined && !isNaN (pointList [0].y) ) {

                original ({
                    dataPointList: pointList,
                    owner: data.owner,
                    name: data.name,
                    color: data.color,
                    connectLines: data.connectLines,
                })
            }
        },

        updateLabelList: function (original, startValue, endValue) {
            var newStart, newEnd;

            newStart = startValue;
            newEnd = endValue;

            if (startValue > endValue) {
                newEnd = startValue;
                newStart = endValue;
            }

            original (newStart, newEnd);

            o.plotSpectra ();
        }
    })
})
