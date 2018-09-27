// Handles setting the light wavelength and storing the current color
tm.add ('app.sim.atmos.chamber.Light', ['app.sim.atmos.chamber.Base'], function (o, p, d) {
    o.getColor = function () {
        return d.color;
    }

    o.getWavelength = function () {
        return d.wavelength;
    }

    o.calculateRemainingLight = function () {
        var gasPressure, item, key, list, transmission, totalTransmission, wavelength;

        wavelength = d.wavelength;

        if (window.currentGas) {
            window.gasRepo [window.currentGas].calculateLightPassingThroughChamber (wavelength);
        }

        // list = window.gasRepo;
        // totalTransmission = 100;
        //
        // for (key in list) {
        //     item = list [key];
        //
        //     if (item) {
        //         // console.log ('Current particles', item.getParticleCount ())
        //         // console.log ('Max particles', item.getMaxParticleCount ())
        //         gasPressure = item.getParticleCount () / item.getMaxParticleCount ();
        //         // console.log ('Gas pressure', gasPressure)
        //         if (isNaN (gasPressure)) { gasPressure = 0 }
        //
        //         transmission = item.getWavelengthTransmission [wavelength];
        //
        //         if (transmission === undefined) { transmission = 1 }
        //         else { transmission = transmission.transmission }
        //
        //         totalTransmission -= (transmission * gasPressure)
        //     }
        // }

        // Get the current wavelength
        // Iterate through gas repo
        // For each gas:
            // Get the transmission percent for the current wavelength

        // console.log (totalTransmission)
        // $ ('#light-passing-through').html (totalTransmission + '%')
    }

    o.setLightColor = function (value) {
        var  hue, item, key, list, particleSpaceDom, percent, maxLength, minLength, sunDom;

        o.setWavelength (value);

        // console.log (value)

        // visible spectrum, if the wavelength is outside of this range, no calculations are needed
        maxValue = 0.9;
        minValue = 0.3;

        if (d.wavelength > maxValue) {
            hue = 360
        }
        else if (d.wavelength < minValue) {
            hue = 288
        }
        else {
            percent = (d.wavelength - minValue) / (maxValue - minValue);

            if (percent > 0.9) {
                hue = 0
            }
            else if (percent < 0.1) {
                hue = 288
            }
            else {
                hue = percent * 360
                hue = Math.abs (hue - 330)
            }

            // console.log (hue)
        }

        d.color = 'hsl(' + hue + ', 100%, 50%)';

        sunDom = d.chamberLight.getDom ();
        sunDom.setAttributeNS (null, 'fill', d.color);
        sunDom.style.fill = d.color;

        // particleSpaceDom = d.particleSpace.getDom ();
        // particleSpaceDom.style.fill = 'hsl(' + hue + ', 50%, 25%)';

        list = d.photonList
        for (key in list) {
            item = list [key];

            item.setColor ( d.color );
        }
    }

    o.convertNanometersToPercent = function (value) {
        var percent;
        if (value < 1) {
            percent = (value * 50) + 1;
            percent *= 100
            percent /= 100
            if (percent > 25) { percent -= 0.25 }
            return percent
        }
        else {
            return (value / 50) * 50 + 50
        }
    }

    o.convertPercentToNanometers = function (value) {
        var minLength, maxLength, minValue, maxValue, nanometers, percent;

        minValue = Math.abs ( Number ( $ ('#light-wavelength').attr ('min') ) );
        maxValue = Math.abs ( Number ($ ('#light-wavelength').attr ('max') ) );

        // console.log ('Min value', minValue, '. Max value', maxValue);

        value = Math.abs (value)
        // console.log ('The passed-in value', value);

        // distance = maxValue + minValue;
        // console.log ('Distance between the max and min values', distance);

        percent = (value - minValue) / (maxValue - minValue);
        // console.log ('Calculated percentaged', percent);
        if (percent <= 0.5) {
            percent *= 2;
            minLength = 0.1; // nano meters
            maxLength = 1000; // nano meters

        }
        else {
            // 0.6 to become the remainder 0.4 * 2 0.8
            percent -= 0.5;
            percent *= 2;
            minLength = 1000; // nano meters
            maxLength = 50000; // nano meters
        }

        nanometers = ((maxLength - minLength) * percent ) + minLength;

        return nanometers;
    }

    o.convertNanometersToPercent = function (value) {
        var percent;

        if (value < 1) {
            percent = (value / 1) / 2
        }
        else (
            percent = (value / 50) / 2 + 0.5
        )

        return percent
    }

    o.setWavelength = function (value) {
        var nanometers;

        nanometers = o.convertPercentToNanometers (value);

        d.wavelength =  (nanometers / 1000).toFixed (2);
        if (d.wavelength < 0.01) { d.wavelength = 0.01 }
        // console.log ('Light wavelength in μm', nanometers / 1000)
        $ ('#light-wavelength-value').val (d.wavelength * 1000)
    }
})
