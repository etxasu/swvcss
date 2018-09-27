tm.start (function () {
    var path

    path = {
        base: '/src/tm',
        svg: '/src/tm/svg',
        greenhouse: '/src/sandbox/mpotter/sim/greenhouse',
        app: '/src/sandbox/mpotter/sim/greenhouse/app',
        tab: '/src/sandbox/mpotter/sim/greenhouse/tab',
        property: '/src/sandbox/mpotter/sim/greenhouse/property',
        toggle: '/src/sandbox/mpotter/sim/greenhouse/property/toggle',
        named: '/src/sandbox/mpotter/sim/greenhouse/named',
        control: '/src/sandbox/mpotter/sim/greenhouse/control',
        graph: '/src/sandbox/mpotter/sim/greenhouse/graph',
        controlGraph: '/src/sandbox/mpotter/sim/greenhouse/control/graph',
        data: '/src/sandbox/mpotter/sim/greenhouse/data',
        molecule: '/src/sandbox/mpotter/sim/greenhouse/molecule',
        photon: '/src/sandbox/mpotter/sim/greenhouse/photon',
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

            // Bring in extended dom objects
            path.greenhouse + '/Tabber.js',
            path.greenhouse + '/Tabber.hbs',
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
            path.named + '/Group.js',
            path.named + '/Group.hbs',

            // bring in the graph
            path.graph + '/Base.js',
            path.graph + '/Data.js',
            path.graph + '/Zoom.js',
            path.graph + '/Wavelength.js',
            path.graph + '/Autoscaler.js',

            // Bring in the App
            path.app + '/Base.js',
            path.app + '/Scene.js',
            path.app + '/Graph.js',
            path.app + '/Micro.js',
            path.app + '/Rays.js',
            path.app + '/Capi.js',

            // Bring in the various controls for the app
            path.control + '/Base.js',
            path.control + '/Star.js',
            path.control + '/Planet.js',
            path.control + '/Atmosphere.js',
            path.control + '/AtmosCapi.js',
            path.control + '/Rays.js',

            path.controlGraph + '/Base.js',
            path.controlGraph + '/Star.js',
            path.controlGraph + '/Planet.js',
            path.controlGraph + '/CapiPlanet.js',

            // Bring in gas data
            path.data + '/Gas.js',
            path.data + '/Ch4.js',
            path.data + '/Co.js',
            path.data + '/Co2.js',
            path.data + '/H2.js',
            path.data + '/H2o.js',
            path.data + '/H2s.js',
            path.data + '/N2.js',
            path.data + '/N2o.js',
            path.data + '/Nh3.js',
            path.data + '/No.js',
            path.data + '/No2.js',
            path.data + '/O2.js',
            path.data + '/O3.js',
            path.data + '/So2.js',

            // Bring in stuff for molecular view
            path.molecule + '/render/Base.js',
            path.molecule + '/render/Photon.js',
            path.molecule + '/render/Scene.js',
            path.molecule + '/Gas.js',
            path.molecule + '/Dom.js',

            // Bring in photon objects
            path.photon + '/Base.js',
            path.photon + '/Color.js',
            path.photon + '/Mover.js',
        ],
        done: function () {
            var app, atmos, controlRepo, gasButtonManager, limit;

            // Create the app
            app = tm.new ('sim.greenhouse.app.Capi', {
                selector: {
                    sidebar: {
                        left: '#left-sidebar-body',
                        right: '#right-sidebar-body'
                    },
                    scene: '#stage',
                    header: '#header-bar'
                }
            });

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
                    .sidebar ('toggle')
            })

            $ ('#right-sidebar-button, #right-sidebar-chevron').click (function () {
                $ ('#right-sidebar-button').toggleClass ('active')
                $ ('#right-sidebar-button > i.double').toggleClass ('invisible')
                $ ('#right-sidebar-chevron > i').toggleClass ('invisible')
                $ ('#right-sidebar')
                    .sidebar ('toggle')

                app.onSidebarOut ()
            })


            // Set up defaults
            controlRepo = app.getControls ();
            controlRepo.planetControl.setAlbedo (0.3)
            controlRepo.planetControl.setDistance (1)
            controlRepo.starControl.setLuminosity (1)

            app.getObjectSettings ().tabber.changeTab (0)

            // Hack for having the header bar label show the temperature on startup.
            $ ('#other-planet-temperature-label-value').html (277.6)

            // console.log (
            //     controlRepo.planetGraphControl.calculateTotalTransmission ()
            // )

            // Set up CAPI
            app.notifyCapiReady ();
        }
    })
})
