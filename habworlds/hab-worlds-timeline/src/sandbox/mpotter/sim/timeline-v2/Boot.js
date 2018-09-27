tm.start (function () {
    var path

    path = {
        base: '/src/tm',
        svg: '/src/tm/svg',
        sim: '/src/sandbox/mpotter/sim/timeline-v2',
        event: '/src/sandbox/mpotter/sim/timeline-v2/event',
        snap: '/src/sandbox/mpotter/sim/timeline-v2/snap',
    }

    tm.load ({
        list: [
            // Bring in tm base
            path.base + '/Base.js',

            // Bring in the Tamed SVG.
            path.svg + '/dom/Attr.js',
            path.svg + '/Box.js',
            path.svg + '/Brush.js',
            path.svg + '/Circle.js',
            path.svg + '/Dom.js',
            path.svg + '/Group.js',
            path.svg + '/Line.js',
            path.svg + '/Svg.js',
            path.svg + '/Text.js',
            path.svg + '/Image.js',
            path.svg + '/Polygon.js',

            // Bring in sim objects
            path.sim + '/Axis.js',
            path.snap + '/Axis.js',
            path.sim + '/Section.js',
            path.snap + '/Section.js',
            path.sim + '/Timeline.js',
            path.sim + '/DragArea.js',
            path.sim + '/Minimap.js',
            path.sim + '/ResizeBox.js',
            path.sim + '/MappedTimeline.js',
            path.event + '/Data.js',
            path.event + '/Manager.js',
            path.event + '/Card.js',
            path.event + '/Card.hbs',
            path.event + '/Pin.js',
            path.event + '/Pin.hbs',
        ],
        done: function () {
            var dom, minimap, svg, timeline;

            svg = tm.new ('tm.svg.Svg', {
                x: 0,
                y: 0,
                width: 300,
                height: 400
            })

            dom = $ ('#timeline')

            dom.append (svg.getDom ());

            timeline = tm.new ('sim.timeline.graph.timeline.Mapped', {
                offset: {
                    x: 0,
                    y: 100
                },
                x: 10,
                y: 200,
                sectionType: 'sim.timeline.axis.section.Snap',
                svg: svg
            });

            svg.add (timeline);
            // svg.add (minimap);

            // timeline.moveBy (100, 0, 0)

            tm.new ('app.sim.timeline.Data', {timeline: timeline});
        }
    })
})
