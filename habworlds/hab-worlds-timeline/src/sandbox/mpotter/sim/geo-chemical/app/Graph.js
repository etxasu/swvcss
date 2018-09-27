/*
    Sets up and maintains graphs
*/
'use strict'
tm.add ('sim.geo.chemical.app.Graph', ['sim.geo.chemical.app.Carbon', 'sim.geo.chemical.app.Tabber'], function (o, p, d) {
    o.setup = function (config) {
        var item, key, list;

        d.timeIndex = 0;
        d.atmosCarbon = 50;
        d.rainCarbon = 50;
        d.maxPoint = 9;
        d.dataPointRepo = {
            atmosCarbon: [],
            temperature: []
        }

        d.totalCarbon = 0;

        list = d.binRepo
        for (key in list) {
            item = list [key];

            d.totalCarbon += item.getCarbonData ().current
        }

        o.updateReadoutLabels ();
        o.updateCarbonBarGraph ();
    }

    o.updateReadoutLabels = function () {
        if (d.surfaceTempLabel) {
            var decimal, value;

            decimal = 1

            d.co2Greenhouse = d.atmosCarbon / 2;
            value = d.co2Greenhouse.toFixed (decimal)
            d.co2Label.setValue ( value )

            d.h2oGreenhouse = d.rainCarbon / 2;
            value = d.h2oGreenhouse.toFixed (decimal)
            d.h2oLabel.setValue ( value )

            value = d.temperature + d.h2oGreenhouse + d.co2Greenhouse
            value = value.toFixed (decimal)
            d.surfaceTempLabel.setValue ( value )
        }
    }

    o.configureAtmosCarbonPoints = function () {
        var height, item, key, list, pointList;

        pointList = [];
        height = d.carbonGraph.getHeight ();

        list = d.dataPointRepo.atmosCarbon;
        for (key in list) {
            item = list [key];

            pointList.push ({
                x: d.carbonGraph.findXOfValue (item.timeIndex),
                y: height - ( height * ( item.carbon / 100 ) ),
                base: height,
            })
        }

        return pointList
    }

    o.configureTemperaturePoints = function () {
        var height, item, key, list, percent, pointList;

        pointList = [];
        height = d.carbonGraph.getHeight ();

        list = d.dataPointRepo.temperature;
        for (key in list) {
            item = list [key];

            percent = ( (item.temperature - d.graphData.temperature.start - 100)  + item.carbon ) / (d.graphData.temperature.end - d.graphData.temperature.start)

            pointList.push ({
                x: d.carbonGraph.findXOfValue (item.timeIndex),
                y: height - ( height * percent ),
                base: height,
            })
        }

        return pointList
    }

    o.plotData = function () {
        var pointList, x, y;

        pointList = o.configureAtmosCarbonPoints ();

        d.carbonGraph.plotData ({
            name: 'Atmos Carbon',
            dataPointList: pointList,
            connectLines: true,
            color: 'white',
            owner: o
        })

        pointList = o.configureTemperaturePoints ();

        d.carbonGraph.plotData ({
            name: 'Temperature',
            dataPointList: pointList,
            connectLines: true,
            color: 'rgb(222, 101, 236)',
            owner: o
        })
    }

    o.updateCarbonBarGraph = function () {
        var dataPointList, int, item, key, list, percent, x, y;

        dataPointList = [];
        int = 0

        list = d.binRepo
        for (key in list) {
            item = list [key];

            percent = ( item.getCarbonData ().current / d.totalCarbon );

            y = 200 - (200 * percent);
            x = 8 + (int * (200 / 8));

            dataPointList.push ({
                x: x,
                y: y,
                base: 220
            })

            int++
        }

        d.carbonBarGraph.plotData ({
            dataPointList: dataPointList,
            color: 'white',
            name: 'carbon percent',
            width: 6
        })
    }

    o.override ({
        onCarbonChange: function (original, data) {
            if (data.title === 'Air') {
                d.atmosCarbon = data.carbon;
            }
            else if (data.title == 'Rain') {
                d.rainCarbon = data.carbon;
            }

            o.updateCarbonBarGraph ();
        },

        onSliderChange: function (original, data) {
            d.temperature = data.value
            o.updateReadoutLabels ();
        },

        timeEvent: function (original) {
            original ();

            // Plot two lines of data
            // Temperature and CO2 in atmosphere
            // As CO2 in atmosphere increases, so does temperature

            // For now, just plot how much carbon is in the atmosphere

            // Start incrementing graph
            if (d.timeIndex > d.maxPoint) {
                d.carbonGraph.updateXAxis (
                    d.graphData.start - d.maxPoint + d.timeIndex,
                    d.graphData.end - d.maxPoint + d.timeIndex
                )
            }
            else {
                d.carbonGraph.updateXAxis ( d.graphData.start, d.graphData.end )
            }

            d.dataPointRepo.atmosCarbon.push ({
                timeIndex: d.timeIndex,
                carbon: d.atmosCarbon
            })

            d.dataPointRepo.temperature.push ({
                timeIndex: d.timeIndex,
                temperature: d.temperature + d.h2oGreenhouse + d.co2Greenhouse + d.atmosCarbon,
                carbon: d.atmosCarbon
            })

            o.plotData ();

            d.timeIndex++

            if (d.dataPointRepo.atmosCarbon.length > d.maxPoint) {
                d.dataPointRepo.atmosCarbon.shift ();
            }

            if (d.dataPointRepo.temperature.length > d.maxPoint) {
                d.dataPointRepo.temperature.shift ();
            }

            o.updateReadoutLabels ()
        }
    })
})
