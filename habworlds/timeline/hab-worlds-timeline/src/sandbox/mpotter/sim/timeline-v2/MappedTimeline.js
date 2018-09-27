'use strict';
tm.add ('sim.timeline.graph.timeline.Mapped', ['sim.timeline.graph.Timeline'], function (o, p, d) {
    o.setup = function (config) {
        d.minimap = tm.new ('sim.timeline.Minimap', {
            selector: {
                container: '#minimap-area',
                target: '#timeline',
            }
        })

        d.minimap.synchronize ();
    }
})
