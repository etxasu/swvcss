tm.start (function () {
    var base, component, path;

    base = '/src/sandbox/mpotter/sim/geo-chemical';
    component = base + '/component';

    path = {
        // Base objects
        base: '/src/tm',
        svg: '/src/tm/svg',

        // Specific to this sim
        app: base + '/app',
        control: base + '/control',
        bin: base + '/bin',
        molecule: base + '/bin/molecule',
        appScene: base + '/scene',

        // Component library
        property: component + '/property',
        group: component + '/group',
        toggle: component + '/property/toggle',
        tabber: component + '/tabber',
        tab: component + '/tabber/tab',
        graph: component + '/graph',
        scene: component + '/scene',
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

            // Bring in extended dom objects
            path.tabber + '/Base.js',
            path.tabber + '/Base.hbs',
            path.tab + '/Header.hbs',
            path.tab + '/Content.hbs',

            // bring in property managers
            path.property + '/Unit.js',
            path.property + '/InputSlider.js',
            path.property + '/InputSlider.hbs',
            path.property + '/Label.js',
            path.property + '/Label.hbs',

            // bring the toggle component
            path.toggle + '/Base.js',
            path.toggle + '/Base.hbs',
            path.toggle + '/Group.js',

            // bring in named group
            path.group + '/Base.js',
            path.group + '/Base.hbs',

            // bring in the graph
            path.graph + '/Base.js',
            path.graph + '/Resizer.js',
            path.graph + '/xAxis.js',
            path.graph + '/yAxis.js',
            path.graph + '/Data.js',
            path.graph + '/Zoom.js',
            path.graph + '/Autoscaler.js',

            // bring in 3d elements
            path.scene + '/Entity.js',

            // Bring in the App
            path.app + '/Base.js',
            path.app + '/Bin.js',
            path.app + '/Carbon.js',
            path.app + '/Tabber.js',
            path.app + '/Graph.js',

            // Bring in the bin objects
            path.bin + '/Base.js',
            path.bin + '/Connector.js',
            path.bin + '/Line.js',
            path.bin + '/Polygon.js',
            path.bin + '/Ui.js',
            path.bin + '/Carbon.js',
            path.bin + '/Animation.js',

            path.molecule + '/Base.js',
            path.appScene + '/Base.js',
        ],
        done: function () {

            // Settings for side bars
            $ ('.ui.sidebar')
                .sidebar ({ context: $('#app') })
                .sidebar ('setting', 'dimPage', false)
                .sidebar ('setting', 'closable', false)
                .sidebar ('setting', 'transition', 'overlay')

            $ ('#left-sidebar-button, #left-sidebar-chevron').click (function () {
                $ ('#left-sidebar-button').toggleClass ('active')
                $ ('#left-sidebar-button > i.double').toggleClass ('invisible')
                $ ('#left-sidebar-chevron > i').toggleClass ('invisible')
                $ ('#left-sidebar')
                    .sidebar ('toggle');
            })
            $ ('#right-sidebar-button, #right-sidebar-chevron').click (function () {
                $ ('#right-sidebar-button').toggleClass ('active')
                $ ('#right-sidebar-button > i.double').toggleClass ('invisible')
                $ ('#right-sidebar-chevron > i').toggleClass ('invisible')
                $ ('#right-sidebar')
                    .sidebar ('toggle');
            })

            // Create the app
            tm.new ('sim.geo.chemical.app.Graph', {
                binType:  'sim.geo.chemical.bin.Animation',
                selector: {
                    sidebar: {
                        left: '#left-sidebar-body',
                        right: '#right-sidebar-body'
                    },
                    scene: '#stage',
                    header: '#header-bar'
                }
            });
        }
    })
})
