tm.add ('app.sim.timeline.minimap.Pinned', ['app.sim.timeline.Minimap'], function (o, p, d) {
    o.setup = function (config) {
        d.uid = 0;
        d.pinList = []
    }

    o.addPin = function (xPos, color) {
        var pin

        // create pin
        pin = o.createPinSvg (xPos, color);
        d.pinList.push (pin)

        // return new pin
        return pin
    }

    o.clearMinimap = function () {
        var item, key, list;

        list = d.pinList;
        for (key in list) {
            item = list [key];

            item.attr ('class', 'hide')
        }
    }

    o.hidePin = function (pin) {
        // hide the pin related to the given uid
        pin.attr ('class', 'hide')
    }

    o.showPin = function (pin) {
        pin.attr ('class', '')
    }

    o.updatePin = function (pin, xPos) {
        var x;
        // Set scale of number to match pixels in our svg
        x = d.xScale2 (xPos)
        // Undo offset caused by left margin
        x += d.margin.left;

        // move an existing spin
        pin.attr ('x', x)
    }

    o.createPinSvg = function (xPos, color) {
        var pinSvg, x;

        // Set scale of number to match pixels in our svg
        x = d.xScale2 (xPos)
        // Undo offset caused by left margin
        x += 10

        // console.log (x)

        // create pin's svg
        pinSvg = d3.select (d.selector.container + ' > svg')
            .append ('g')
                .attr ('id', 'minimapPin' + d.uid )
                .attr ('class', 'timeline pin')
                .append ('rect')
                    .attr ('x', x)
                    .attr ('y', 18)
                    .attr ('width', 5)
                    .attr ('height', 5)
                    .attr ('fill', color)
                    .attr ('stroke', 'black')
                    .attr ('stroke-width', '1')

        d.uid++

        return pinSvg;
    }
})
