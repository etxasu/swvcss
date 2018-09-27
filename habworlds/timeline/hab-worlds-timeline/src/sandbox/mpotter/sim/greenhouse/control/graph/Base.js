'use strict'
tm.add ('sim.greenhouse.control.graph.Base', ['sim.greenhouse.control.Base'], function (o, p, d) {
    o.setup = function (config) {
        d.peakWavelength = {
            frequency: 0,
            height: 0
        }

        if (config.onZoom) { d.onZoom = config.onZoom }

        d.gasKeyRepo = {
            'Methane': 'CH₄',
            'Carbon Monoxide': 'CO',
            'Carbon Dioxide': 'CO₂',
            'Hydrogen': 'H₂',
            'Water': 'H₂O',
            'Hydrogen Sulfide': 'H₂S',
            'Nitrogen': 'N₂',
            'Nitrous Oxide': 'N₂O',
            'Ammonia': 'NH₃',
            'Nitric Oxide': 'NO',
            'Nitrogen Dioxide': 'NO₂',
            'Oxygen': 'O₂',
            'Ozone': 'O₃',
            'Sulfur Dioxide': 'SO₂',

            // Noble Gases
            'Helium': 'He',
            'Neon': 'Ne',
            'Argon': 'Ar',
            'Krypton': 'Kr',
            'Xenon': 'Xe',
        }
    }

    o.calculatePeakWavelength = function (luminosity) {
        var end, increment, int, lastPeak, peak, precision;

        // d.peakWavelength = { frequency: 0, height: 0 }
        //
        // lastPeak = 0;
        // end = 3;
        // precision = 1000;
        // int = 0;
        // increment = end / precision
        // while (int <= end) {
        //     peak = o.planck (luminosity, int) * 1e10
        //
        //     if (peak > lastPeak) {
        //         d.peakWavelength = {
        //             frequency: int.toFixed (3),
        //             height: peak
        //         }
        //     }
        //
        //     lastPeak = peak
        //
        //     int += increment;
        // }
        //
        // return d.peakWavelength
        d.peakWavelength = { frequency: ( (2897768.5 / d.kelvin) / 1000 ).toFixed (3) }
        return d.peakWavelength
    }

    o.getGraph = function () { return d.graph }
    o.getPeakWavelength = function () { return d.peakWavelength; }

    o.onZoom = function () {
        if (typeof d.onZoom == 'function') { d.onZoom () }
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
    //     // Adjust given kelvin temp for a better looking curve
    //     temperature = kelvin / 11.5
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
    //     // result /= 750000
    //
    //     // Return result
    //     return result;
    // }

    o.plotData = function (data) {
        var kelvin;

        kelvin = data.kelvin;

        if (typeof kelvin == 'number') { d.kelvin = kelvin }
    }

    o.resetZoom =  function () {
        d.graph.resetZoom ()
    }

    o.setStartAndEnd = function (start, end) {
        d.graph.updateLabelList (start, end)
    }
})
