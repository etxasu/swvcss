'use strict'
tm.add ('sim.greenhouse.control.graph.Planet', ['sim.greenhouse.control.graph.Base'], function (o, p, d) {
    o.setup = function (config) {
        var dimension, height, padding;

        height = 300;

        dimension = {
            height: height,
            width: height
        }

        // padding left + padding right needs to equal 100
        // same with padding top and bottom
        padding = {
            top: 20,
            left: 70,
            bottom: 80,
            right: 30,
        }

        d.graph = tm.new ('sim.greenhouse.graph.Zoom', {
            selector: {
                container: 'body',
            },
            name: '',
            width: dimension.width,
            height: dimension.height,
            padding: padding,
            segmentCount: 5,
            xAxis: {
                label: 'Wavelength of Light (μm)',
                maxValue: 3
            },
            yAxis: {
                label: 'Spectral Radiance',
                maxValue: 5
            },
            onZoom: o.onZoom
        })

        d.graph.resetZoom ();

        d.gasRepo = {
            'CH₄': tm.new ('app.sim.atmos.data.gas.Ch4', { color: '#e6c35c' }),
            'CO': tm.new ('app.sim.atmos.data.gas.Co', { color: '#dba93a' }),
            'CO₂': tm.new ('app.sim.atmos.data.gas.Co2', { color: '#e09b49' }),
            'H₂': tm.new ('app.sim.atmos.data.gas.H2', { color: '#61cff2' }),
            'H₂O': tm.new ('app.sim.atmos.data.gas.H2o', { color: '#61b1f2' }),
            'H₂S': tm.new ('app.sim.atmos.data.gas.H2s', { color: '#6181f2' }),
            'N₂': tm.new ('app.sim.atmos.data.gas.N2', { color: '#f2616e' }),
            'N₂O': tm.new ('app.sim.atmos.data.gas.N2o', { color: '#d94d88' }),
            'NH₃': tm.new ('app.sim.atmos.data.gas.Nh3', { color: '#f261a7' }),
            'NO': tm.new ('app.sim.atmos.data.gas.No', { color: '#c13057' }),
            'NO₂': tm.new ('app.sim.atmos.data.gas.No2', { color: '#c72752' }),
            'O₂': tm.new ('app.sim.atmos.data.gas.O2', { color: '#c2d3e0' }),
            'O₃': tm.new ('app.sim.atmos.data.gas.O3', { color: '#aab3b3' }),
            'SO₂': tm.new ('app.sim.atmos.data.gas.So2', { color: '#4bb05b' }),

            // Noble Gases
            'He': tm.new ('app.sim.atmos.data.Gas', { name: 'Helium', molecule: 'He' }),
            'Ne': tm.new ('app.sim.atmos.data.Gas', { name: 'Neon', molecule: 'Ne' }),
            'Ar': tm.new ('app.sim.atmos.data.Gas', { name: 'Argon', molecule: 'Ar' }),
            'Kr': tm.new ('app.sim.atmos.data.Gas', { name: 'Krypton', molecule: 'Kr' }),
            'Xe': tm.new ('app.sim.atmos.data.Gas', { name: 'Xenon', molecule: 'Xe' }),
        }

        d.gasRepo ['He'].generateGasData ();
        d.gasRepo ['Ne'].generateGasData ();
        d.gasRepo ['Ar'].generateGasData ();
        d.gasRepo ['Kr'].generateGasData ();
        d.gasRepo ['Xe'].generateGasData ();

        d.activeGasRepo = {};

        d.dom = $ (document.createElement ('div'));
        d.dom.append (d.graph.getDom ());

        d.resetZoom = $ ( document.createElement ('button') )
        d.resetZoom.html ('Reset Zoom')
        d.resetZoom.addClass ('ui button')
        d.resetZoom.click (d.graph.resetZoom)

        d.dom.append (d.resetZoom);
    }

    o.removeData = function (data) {
        d.activeGasRepo [data.name] = false;
        d.gasRepo [data.name].setActive (false);
        d.graph.removeData (data)
    }

    o.plotGasData = function (data) {
        var end, height, increment, int, item, key, list, kelvin, modified, name, nextItem, pointList, precision, pressure, start, transmission, y;

        d.peakWavelength = { frequency: 0, height: 200 }

        kelvin = d.kelvin;
        pointList = [];
        name = data.name;
        end = d.graph.getEndValue ();
        int = d.graph.getStartValue ();
        start = int;
        precision = 100
        pressure = data.pressure;

        if (pressure !== undefined) {
            if (pressure != 0) {
                pressure = 1.01 - (1 * (pressure / 3.721))
            }
            d.gasRepo [name].setPressure (pressure)
            d.gasRepo [name].setActive (true)
        }
        else {
            pressure = d.gasRepo [name].getPressure ()
        }


        // Generate a set number of points of data across the graph
        while (int < end) {
            modified = false;

            transmission = o.sampleData (name, int, ((end - start) / precision))

            if (pressure === 0) {
                transmission = 100
            }
            else if (transmission !== 100) { transmission *= pressure }

            y = o.planck (kelvin, int)

            // Make sure the y value received is usable

            if (isNaN (y)) { y = 0 }
            y = 200 - y
            if (y < 0) { y = 0}

            var possibleY;

            possibleY = 200 - (200 * (transmission / 100))

            // Point has been modified by the existing gas.
            if (possibleY > y) {
                y = possibleY;
                modified = true;
            }

            if (y < d.peakWavelength.height) {
                d.peakWavelength.frequency = int;
                d.peakWavelength.height = y;
            }

            if (y > 200) { y = 200 }

            pointList.push ({
                base: 200,
                y: y,
                x: d.graph.findXOfValue (int),
                modified: modified
            })

            int += (end - start) / precision
        }

        // Iterate over list again, injecting points after a modified point
        // so the planck function curve is more apparent
        // list = pointList;
        // pointList = [];
        // for (key in list) {
        //     item = list [key];
        //     nextItem = list [Number (key) + 1]
        //
        //     pointList.push (item);
        //
        //     if (item.modified && nextItem) {
        //         // Get the space between this point and the next
        //         increment = (nextItem.x - item.x) / 2 + item.x
        //
        //         y = o.planck (kelvin, d.graph.findValueOfX (increment))
        //
        //         // Make sure the y value received is usable
        //         if (isNaN (y)) { y = 0 }
        //         y = 200 - y
        //         if (y < 0) { y = 0}
        //
        //         pointList.push ({
        //             base: 200,
        //             x: increment,
        //             y: y
        //         })
        //     }
        // }

        d.activeGasRepo [name] = true;

        d.graph.plotData ({
            dataPointList: pointList,
            owner: o,
            name: name,
            displayName: name,
            color: d.gasRepo [name].getColor (),
            connectLines: true
        })

        o.calculatePeakWavelength (kelvin)
    }

    o.sampleData = function (gasName, wavelength, marginOfError) {
        var item, key, list, maginOfError;

        list = d.gasRepo [gasName].getGasData ();
        for (key in list) {
            item = list [key];
            key = Number (key);

            if (key >= wavelength - marginOfError && key <= wavelength + marginOfError) {
                return item.transmission;
            }
        }

        return 100;
    }

    o.setKelvin = function (kelvin) { d.kelvin = kelvin }

    o.override ({
        plotData: function (original, data) {
            var info, item, key, list;

            original (data)

            if (!data.name) {
                // replot all active gases
                list = d.activeGasRepo
                for (key in list) {
                    item = list [key];

                    if (item === true) {
                        info = Object.assign ({}, data);
                        info.name = key

                        o.plotGasData (info)
                    }
                }
            }
            else {
                // plot named gas
                o.plotGasData (data)
            }
        },

        planck: function (original, kelvin, wavelength) {
            var boltzmannConst, denominator, exponent, frequency, jules, numerator, pi, planckConst, result, speedOfLight, temperature;
            // Black body radiation is informed by frequency and temperature
            // The planck function gets its curve from plugging in the different
            // frequencies at a given temperature

            // Set up constants and passed-in values
            planckConst = 6.626068 * Math.pow (10, -34);
            boltzmannConst = 1.38066 * Math.pow (10, -23);
            speedOfLight = 2.997925 * Math.pow (10, 8);
            // Adjust given kelvin temp for a better looking curve
            temperature = kelvin * 1.7
            // Convert wavelength to its actual length in meters
            frequency = wavelength * Math.pow (10, -5)

            // Breaking the planck function up into steps:

            // Solve the denominators exponent
            exponent = ( (planckConst * speedOfLight) / (boltzmannConst * frequency * temperature) )
            // Solve the denominator
            denominator = 1 * Math.exp (exponent) - 1
            // Solve the numerator
            numerator = 2 * ( planckConst * Math.pow (speedOfLight, 2) * Math.pow (frequency, -5) )
            // Resolve equation
            result = numerator / denominator

            // Reduce result to a graphable coordinate
            result /= 750000

            // Return result
            return result;
        }
    })
});
