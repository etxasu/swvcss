'use strict';
tm.add ('sim.timeline.axis.Snap', ['sim.timeline.Axis'], function (o, p, d) {
    o.override ({
        findXValue: function (original, x) {
            var item, key, list, nextItem, x;

            x = original (x);

            list = d.sectionList;
            for (key in list) {
                item = list [key];
                nextItem = list [Number (key) + 1];

                if (nextItem) {
                    if (nextItem.getPosition ().x > x) {
                        return item.findNearestTick (x);
                    }
                }
                else {
                    return item.findNearestTick (x);
                }
            }
        }
    })
})
