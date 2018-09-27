tm.add ('app.sim.atmos.transmission.Graph', ['app.sim.atmos.data.Graph'], function (o, p, d) {
    o.setup = function (config) {
        window.transmissionGraph = o;
        d.percentType = 'Transmission Percent'
    }

    o.override ({
        plotData: function (original, data) {
            var end, increment, int, item, list, pointList, wavelength, width;

            pointList = []
            width = d.graphArea.right - d.graphArea.left;
            height = d.graphArea.bottom - d.graphArea.top;

            list = data.dataPointList;

            // Plot 50 points on the graph.
            // Each point can be inbetween the current visible values
            increment = d.lightEndValue / d.precisionLevel;

            end = d.precisionLevel
            for (int = 0; int < end; int++) {

                wavelength = increment * int;
                // console.log (wavelength)

                item = list [wavelength];


                // If there is no transmission for this wavelength, assume 100%
                if (!item) { item = { transmission: 100 } }

                // console.log ('Transmission:', item.transmission, '%')

                pointList.push ({
                    x: ( width * (int / d.maxLightValue) ),
                    y: ( height -  ( height * (item.transmission / 100) ) )
                })
            }

            original ({
                dataPointList: pointList,
                name: data.name,
                color: data.color
            })
        }
    })
})
