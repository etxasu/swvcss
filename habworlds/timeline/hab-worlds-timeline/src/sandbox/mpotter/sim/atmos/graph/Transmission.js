tm.add ('app.sim.atmos.graph.Transmission', ['app.sim.atmos.graph.Spectra'], function (o, p, d) {
    o.setup = function (config) {
        if (!config.globalName) { config.globalName = 'transmissionGraph' }
        window [config.globalName] = o;
        d.percentType = 'Transmission Percent'
    }

    o.getClosestItem = function (data) {
        var end, int, item, lastItem, list, state, variance, value;

        state = 0; // 1 = entered key range, 2 = left key range
        end = data.end;
        int = data.start;
        variance = data.variance;
        lastItem = { transmission: 100 }
        list = data.list;

        // console.log (list)

        for (key in list) {
            value = Number (key);

            // console.log ((int + variance), '>', key, '>', (int - variance));
            // console.log ((int + variance) > key, key > (int - variance));

            if ((int + variance) >= value && value >= (int - variance)) {
                // Entered key
                if (state === 0) { state = 1; }

                // console.log ('Item found', key, list [key])

                if (list [key].transmission < lastItem.transmission) {
                    item = list [key];
                    lastItem = item;
                }
            }
            else {
                // Left key range
                if (state == 1) {
                    break;
                }
            }
        }

        return item
    }

    o.isolateNeededWavelengths = function (data, startPoint, endPoint) {
        var end, increment, int, item, key, lastKey, list, validData, value, variance;

        validData = [];
        increment = (d.lightEndValue - d.lightStartValue) / d.precisionLevel;
        end = d.lightStartValue;
        variance = 0.4 / (d.zoomPercent / 100)
        lastKey = 0
        int = d.lightEndValue;
        while (int > end) {
            item = o.getClosestItem ({
                list: data,
                start: int,
                variance: variance
            })

            if ( item ) {
                validData.push ({
                    wavelength: int,
                    transmission: item.transmission,
                    x: o.findXOfValue ( int )
                })
            }
            else {
                validData.push ({
                    wavelength: int,
                    transmission: 100,
                    x: o.findXOfValue ( int )
                })
            }

            int -= increment
        }

        return validData;
    }

    o.sampleData = function (data) {
        var end, list, start;

        start = d.lightStartValue;
        end = d.lightEndValue;

        list = o.isolateNeededWavelengths (data, start, end);

        return list;
    }

    o.replotData = function () {
        var item, key, list;

        // console.log ('Replotting data...')

        list = window.gasRepo;
        for (key in list) {
            item = list [key];

            if (d.dataLine [key] && d.dataLine [key].active) {
                // console.log ('Replotting data for', key)
                // console.log (d.dataLine [data.name])
                item.showData ();
                item.showMysteryData ();
            }
        }
    }

    o.plotMysteryData = function (data) {
        o.plotData ({
            owner: data.owner,
            dataPointList: data.dataPointList,
            name: data.name,
            displayName: 'mystery',
            color: 'white'
        })
    }

    o.configureData = function (data) {
        var end, increment, int, item, list, pointList, wavelength, width;

        pointList = []
        width = d.graphArea.right - d.graphArea.left;
        height = d.graphArea.bottom - d.graphArea.top;

        list = o.sampleData (data.dataPointList);

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


            // If there is no transmission for this wavelength, assume 100%
            if (!item) { item = { transmission: 100 } }

            // Make sure the item is allowed to be drawn on the graph
            if (item.x || item.x === 0) {

                pointList.push ({
                    wavelength: item.wavelength,
                    x: item.x,
                    y: ( height -  ( height * (item.transmission / 100) ) ),
                    base: d.graphArea.top
                })
            }
        }

        return pointList
    }

    o.override ({
        plotData: function (original, data) {
            var pointList = o.configureData (data);

            original ({
                dataPointList: pointList,
                owner: data.owner,
                name: data.name,
                displayName: data.displayName,
                color: data.color
            })
        },

        stopDrawingZoomBox: function (original) {
            original ();
            o.replotData ();
        }
    })
})
