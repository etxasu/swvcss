tm.add ('app.sim.atmos.absorbtion.Graph', ['app.sim.atmos.data.Graph'], function (o, p, d) {
    o.setup = function (config) {
        window.absorbtionGraph = o;
        d.percentType = 'Absorption Percent'
    }

    o.override ({
        plotData: function (original, data) {
            var end, int, item, list, pointList, width;

            pointList = []
            width = d.graphArea.right - d.graphArea.left;
            height = d.graphArea.bottom - d.graphArea.top;

            list = data.dataPointList;
            // end = 1
            // for (int = 0.01; int < end; int += 0.01) {
            //     // prevent a decimal longer than we care about
            //     int = Math.round (int * 100) / 100
            //     item = list [int];
            //
            //     // console.log ('Wavelength:', int)
            //
            //     // If there is no transmission for this wavelength, assume 100%
            //     if (!item) { item = { transmission: 100 } }
            //
            //     // console.log ('Transmission:', item.transmission, '%')
            //
            //     pointList.push ({
            //         x: ( width * (int / d.maxLightValue) ),
            //         y: ( ( height * (item.transmission / 100) ) )
            //     })
            // }

            end = d.maxLightValue
            for (int = 1; int < end; int++) {
                item = list [int];

                // If there is no transmission for this wavelength, assume 100%
                if (!item) { item = { transmission: 100 } }

                // console.log ('Transmission:', item.transmission, '%')

                pointList.push ({
                    x: ( width * (int / d.maxLightValue) ),
                    y: ( ( height * (item.transmission / 100) ) )
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
