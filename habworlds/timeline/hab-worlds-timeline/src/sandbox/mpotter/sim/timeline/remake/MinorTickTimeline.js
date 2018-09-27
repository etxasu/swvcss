tm.add ('app.sim.timeline.minor.Tick', ['app.sim.timeline.Event'], function (o, p, d) {
    o.setup = function (config) {
        var tick, line;
        d.$dom = $ (config.selector.container + ' svg');
        d.subTickCount = 5;

        d.svgNS = 'http://www.w3.org/2000/svg';

        // Create template for ticks
        tick = document.createElementNS (d.svgNS, 'g');
        tick.classList.add ('minor');

        line = document.createElementNS (d.svgNS, 'line');
        line.setAttribute ('y2', '7');
        line.setAttribute ('stroke', '#999');

        tick.append (line);

        d.tick = tick;
    }

    o.addMinorTick = function (group, increment) {
        var distance, increment, int, tick;

        for (int = 1; int < d.subTickCount; int++) {
            tick = d.tick.cloneNode (true)
            tick.setAttributeNS (null, 'transform', 'translate(' + increment * int + ',0)')
            group.append (tick);
        }
    }

    o.handleMinorTicks = function () {
        var distance, dom, firstTick, group, increment, secondTick, tickList;

        tickList = d.$dom.find ('g.tick');

        firstTick = tickList.get (0).getAttributeNS (null, 'transform');
        secondTick = tickList.get (1)

        secondTick = secondTick.getAttributeNS (null, 'transform');

        firstTick = firstTick.split (',') [0];
        firstTick = firstTick.split ('(') [1];
        firstTick = Number (firstTick);

        secondTick = secondTick.split (',') [0];
        secondTick = secondTick.split ('(') [1];
        secondTick = Number (secondTick);

        distance = Math.abs ( Math.abs (firstTick) - Math.abs (secondTick) );
        increment = distance / d.subTickCount;

        tickList.each (function (index, dom) {
            $ (dom).find ('g.subTicks').remove ();

            group = document.createElementNS (d.svgNS, 'g');
            group.classList.add ('subTicks');

            dom.append (group);

            if (tickList.get (index + 1)) {
                o.addMinorTick (group, increment)
            }
        })
    }

    o.override ({
        handleZoom: function (original) {
            if (d.$dom) {
                window.setTimeout (function () {
                    o.handleMinorTicks ();
                }, 50)
                window.setTimeout (function () {
                    o.handleMinorTicks ();
                }, 200)
                window.setTimeout (function () {
                    o.handleMinorTicks ();
                }, 500)
            }

            original ();
        }
    })
});
