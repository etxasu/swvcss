'use strict';
tm.add ('sim.timeline.axis.section.Snap', ['sim.timeline.axis.Section'], function (o, p, d) {
    o.findNearestTick = function (x) {
        var item, itemX, key, list, nextItem, nextItemX;

        list = d.child.list;
        for (key in list) {
            item = list [key];
            nextItem = list [Number (key) +  1]

            if (item.getPosition) {
                itemX = d.x + item.getPosition ().start.x;

                // console.log (itemX, ':', x)

                if (nextItem.getPosition) {
                    nextItemX = d.x + nextItem.getPosition ().start.x;

                    if (itemX <= x && nextItemX > x) {
                        return itemX
                    }
                }
                else if (!nextItem || !nextItem.getPosition) {
                    return itemX
                }
            }
        }

    }
})
