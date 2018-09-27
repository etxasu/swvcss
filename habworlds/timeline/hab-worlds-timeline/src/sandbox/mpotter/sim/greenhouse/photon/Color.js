'use strict'
// Handles photon opacity, and color
tm.add ('sim.greenhouse.photon.Color', ['sim.greenhouse.photon.Base'], function (o, p, d) {
    o.setup = function () {
        d.maxCircleDist = Math.abs ( d.circleList [0].getPosition ().x - d.circleList [1].getPosition ().x );
    }

    o.adjustSizeToWavelength = function (wavelength) {
        var item, key, list, max, min, newX;
        // Get current wavelength
        // The smaller the wavelength, the shorter the photon
        // Adjust x position of each circle

        if (!wavelength) { wavelength = 0.75 }

        min = 0.8;
        max = 50;
        if (wavelength > 1) {
            newX = d.maxCircleDist + min
        }
        else {
            newX = (d.maxCircleDist * wavelength) + min
        }

        list = d.circleList;
        for (key in list) {
            item = list [key];

            item.update ({
                x: newX * Number (key) // Small minimum offset to prevent photons from appearing as a line
            })
        }

        d.wavelength = wavelength;
    }

    o.correctChildOpacity = function () {
        var alpha, circle, end, int;

        end = d.circleList.length - 1;
        for (int = 0; int < end; int++) {
            // As the int increases, so does the alpha
            alpha =  int / end

            if (isNaN (alpha)) { alpha = 0 }

            circle = d.circleList [int]

            circle.getDom ().style ['fill-opacity'] = alpha
        }
    }

    o.fadeIn = function (duration, callback) {
        var alpha, circle, end, int, onFinish;

        d.fadingIn = true;

        anime ({
            targets: d.dom,
            'fill-opacity': 0,
            'stroke-opacity': 0,
            easing: 'linear',
            duration: 0
        })

        anime ({
            targets: d.dom.childNodes,
            'fill-opacity': 0,
            'stroke-opacity': 0,
            easing: 'linear',
            duration: 0
        })

        end = d.circleList.length - 1;
        for (int = 0; int < end; int++) {
            circle = d.circleList [int]

            if (int === end - 1) { onFinish = callback }
            o.fadeDomIn (circle.getDom (), circle.maxAlpha, duration, onFinish)
            // circle.getDom ().style ['fill-opacity'] = alpha
        }
    }

    o.fadeDomIn = function (dom, alpha, duration, callback) {
        anime ({
            targets: dom,
            'fill-opacity': alpha,
            'stroke-opacity': alpha,
            easing: 'linear',
            duration: duration,
            complete: function () { if (callback) {callback (); d.fadingIn = false; }}
        })
    }

    o.setColor = function (color) {
        var item, key, list;

        list = d.circleList;
        for (key in list) {
            item = list [key];

            item.getDom ().style.fill = color
        }

        // Determine length of photon based on color
        o.adjustSizeToWavelength ();
    }
})
