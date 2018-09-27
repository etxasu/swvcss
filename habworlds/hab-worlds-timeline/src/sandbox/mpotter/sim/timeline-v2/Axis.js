'use strict';
tm.add ('sim.timeline.Axis', ['tm.svg.Group'], function (o, p, d) {
    o.setup = function (config) {
        var position;

        if (config.length === undefined) { config.length = 1000 }
        if (config.sectionType === undefined) { config.sectionType = 'sim.timeline.axis.Section' }

        d.sectionType = config.sectionType;
        d.sectionList = [];
        o.createSectionList (config.length);

        o.moveBy (config.x, config.y, 0);

        $ ('#move-left').click (function () { o.moveBy (-300, 0, 300) })
        $ ('#move-right').click (function () { o.moveBy (300, 0, 300) })
        $ ('#zoom-in').click (function () { o.zoomBy (10) })
        $ ('#zoom-out').click (function () { o.zoomBy (-10) })
    }

    o.createSectionList = function (length) {
        var end, int, label, section, sectionLength, tall;

        sectionLength = 100;
        tall = true;
        end = Math.ceil (length / sectionLength);
        for (int = 0; int < end; int++) {

            // console.log ('creating section at', 100 * int);

            section = tm.new (d.sectionType, {
                x: 0,
                y: 0,
                tall: tall
            })

            label = tm.new ('tm.svg.Text', { text: int * sectionLength });

            section.moveBy (sectionLength * int, 0, 0);

            if (tall) {
                tall = false;
                label.moveBy (0, 40, 0);
            }
            else {
                tall = true;
                label.moveBy (0, 25, 0);
            }

            section.add (label);
            d.sectionList.push (section);

            o.add (section);
        }
    }

    o.findXValue = function (x) {
        return Math.ceil (x - d.x);
    }

    o.zoomBy = function (amount) {
        console.log ('Adjust visible values by a factor of', amount);

        // I may need to create additional sections to compensate for this...?
    }
})
