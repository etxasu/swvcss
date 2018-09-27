tm.add ('app.sim.atmos.graph.Absorption', ['app.sim.atmos.graph.Wavelength'], function (o, p, d) {
    o.setup = function (config) {
        if (!config.globalName) { config.globalName = 'absorbtionGraph' }
        window [config.globalName] = o;
        d.percentType = 'Absorption Percent'
    }

    o.isolateNeededWavelengths = function (data, startPoint, endPoint) {
        var end, increment, int, item, key, list, validData, value;

        validData = [];
        increment = (d.lightEndValue - d.lightStartValue) / d.precisionLevel;
        end = d.precisionLevel;

        // Do a one-time check if there are 50 or less points between viewed wavelengths

        list = data;
        for (key in list) {
            item = list [key];

            if (Number (key) >= d.lightStartValue && Number (key) <= d.lightEndValue) {
                // console.log (Number (key))
                validData.push ({
                    wavelength: Number (key),
                    absorption: 100 - item.transmission
                })
            }
        }

        // Data has been pre-sorted for compatibility with chrome.
        // // Make sure the array is sorted correctly
        // validData.sort(function(a, b){
        //     return a.wavelength - b.wavelength
        // });

        return validData;
    }

    o.sampleData = function (data) {
        var end, key, increment, item, list, sampleCount, start;

        sampleCount = d.precisionLevel;
        increment = d.lightEndValue / d.precisionLevel;
        start = d.lightStartValue;
        end = d.lightEndValue;

        list = o.isolateNeededWavelengths (data, start, end);
        for (key in list) {
            item = list [key];

            // Now that we have valid data, make sure that the position of the data matches the label it would go to
            item.x = o.findXOfValue (Number (item.wavelength));
        }

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
            if (!item) { item = { absorption: 0 } }

            // Make sure the item is allowed to be drawn on the graph
            if (item.x || item.x === 0) {

                pointList.push ({
                    wavelength: item.wavelength,
                    x: item.x,
                    y: height * (item.absorption / 100),
                    base: d.graphArea.bottom
                })
            }
        }

        return pointList
    }

    o.override ({
        plotData: function (original, data) {
            if (!data.ignoreConfig) {
                var pointList = o.configureData (data);
            }

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
