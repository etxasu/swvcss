/*
    Creates stores of carbon for each of its bins
*/
'use strict'
tm.add ('sim.geo.chemical.app.Carbon', ['sim.geo.chemical.app.Bin'], function (o, p, d) {
    o.setup = function (config) {
        if (config.timeRate === undefined) { config.timeRate = 30 }

        d.timeRate = config.timeRate;
        d.currentTime = 0;
        // 1 = seconds, 2 = minutes, 3 = hours etc... up to 9
        d.timeEventType = 0;
        d.maxTimeEventTypes = 9;

        d.animateEventList.push (function () { o.checkForTimeEvent (); })
    }

    o.checkForTimeEvent = function () {
        d.currentTime++;

        if (d.currentTime > d.timeRate) {
            o.timeEvent ();
        }
    }

    o.timeEvent = function () {
        d.currentTime = 0;
        d.timeEventType++;

        if (d.timeEventType > d.maxTimeEventTypes) {
            d.timeEventType = 1;
        }

        // Iterate through available connections and send carbon out
        var item, key, list;
        list = d.binRepo;
        for (key in list) {
            item = list [key];

            if (item) { item.onTimeEvent (); }
        }
    }
})
