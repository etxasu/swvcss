tm.start (function () {
    var path

    path = {
        base: '/src/tm',
        svg: '/src/tm/svg',
        atmos: '/src/sandbox/mpotter/sim/atmos',
        chamber: '/src/sandbox/mpotter/sim/atmos/chamber',
        photon: '/src/sandbox/mpotter/sim/atmos/photon',
        graph: '/src/sandbox/mpotter/sim/atmos/graph',
        gas: '/src/sandbox/mpotter/sim/atmos/data',
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

            // Bring in atmospheric sim files
            path.atmos + '/GasData.js',
            // path.atmos + '/Chamber.js',
            // path.atmos + '/DataGraph.js',
            // path.atmos + '/TransmissionGraph.js',
            // path.atmos + '/AbsorbtionGraph.js',
            path.atmos + '/Gas.js',
            path.atmos + '/GasButton.hbs',
            path.atmos + '/GasOption.hbs',
            path.atmos + '/Tooltip.js',
            path.atmos + '/Tooltip.hbs',
            // path.atmos + '/Photon.js',
            path.atmos + '/Particle.js',

            // Bring in the updated chamber files
            path.chamber + '/Base.js',
            path.chamber + '/Light.js',
            path.chamber + '/Particle.js',
            path.chamber + '/Photon.js',

            // Bring in the updated photon files
            path.photon + '/Base.js',
            path.photon + '/Color.js',
            path.photon + '/Mover.js',

            // Bring in updated graph files
            path.graph + '/Base.js',
            path.graph + '/Data.js',
            path.graph + '/Zoom.js',
            path.graph + '/Spectra.js',
            path.graph + '/Transmission.js',
            path.graph + '/Absorption.js',

            // Load in gas data files
            path.gas + '/Gas.js',
            path.gas + '/Ch4.js',
            path.gas + '/Co.js',
            path.gas + '/Co2.js',
            path.gas + '/H2o.js',
            path.gas + '/H2s.js',
            path.gas + '/N2o.js',
            path.gas + '/Nh3.js',
            path.gas + '/No.js',
            path.gas + '/No2.js',
            path.gas + '/O2.js',
            path.gas + '/O3.js',
            path.gas + '/So2.js',
        ],
        done: function () {
            var size;

            window.totalPressure = 0

            // tm.new ('app.sim.atmos.Chamber', {
            tm.new ('app.sim.atmos.chamber.Photon', {
                selector: {
                    container: '#chamber',
                    particleView: '#particle-view'
                }
            })

            var dimenson, hw, padding;

            // height/width. Graph needs to be a square to work...
            hw = 250;

            dimension = {
                height: hw,
                width: hw
            }

            // padding left + padding right needs to equal 100
            // same with padding top and bottom
            padding = {
                top: 20,
                left: 70,
                bottom: 80,
                right: 30,
            }

            var aGraph, tGraph;

            precision = 100;

            tGraph = tm.new ('app.sim.atmos.graph.Transmission', {
                selector: {
                    container: '#transmission-graph',
                    title: '#graph-name',
                },
                globalName: 'transmissionGraph',
                name: 'Transmission Data',
                width: dimension.width,
                height: dimension.height,
                padding: padding,
                segmentCount: 5,
                precision: precision,
                hack: {
                    xAxis: {
                        postCaluclationLabelModifier: 1000
                    }
                }
            })

            aGraph = tm.new ('app.sim.atmos.graph.Absorption', {
                selector: {
                    container: '#absorbtion-graph',
                    title: '#graph-name',
                },
                globalName: 'absorbtionGraph',
                name: 'Absorption Data',
                width: dimension.width,
                height: dimension.height,
                padding: padding,
                segmentCount: 5,
                precision: precision,
                hack: {
                    xAxis: {
                        postCaluclationLabelModifier: 1000
                    }
                }
            })

            tGraph.showWavelengthGuide ();
            aGraph.showWavelengthGuide ();

            tGraph.updateWavelengthGuide ();
            aGraph.updateWavelengthGuide ();

            tGraph.resetZoom ();
            aGraph.resetZoom ();

            $ ('#light-wavelength').on ('input', function () {
                if (!window.ignoreInputHack) {
                    tGraph.updateWavelengthGuide ();
                    aGraph.updateWavelengthGuide ();
                }
            })

            var offset;

            offset = {
                x: -80,
                y: -130
            }

            tm.new ('app.sim.atmos.Tooltip', {
                selector: {
                    container: '#transmission-tooltip',
                    target: '#transmission-graph > svg'
                },
                name: 'Transmission Data',
                type: 'transmission',
                width: 200,
                height: 200,
                offset: offset,
                graph: tGraph
            })

            tm.new ('app.sim.atmos.Tooltip', {
                selector: {
                    container: '#absorbtion-tooltip',
                    target: '#absorbtion-graph > svg'
                },
                name: 'Absorption Data',
                type: 'absorption',
                width: 200,
                height: 200,
                offset: offset,
                graph: aGraph
            })

            window.chamber.setLightColor (38);
            $ ('#light-wavelength') [0].value = 38;
            window.transmissionGraph.writeTitle ();

            window.transmissionGraph.resizeGraph ();
            window.absorbtionGraph.resizeGraph ();

            if (window.simcapi) {
                var namespace, ignoreChange, simModel;

                simModel = new simcapi.CapiAdapter.CapiModel({
                    // simMode: '?',
                    // simModeEnabled: true,

                    graphMode: 'Transmission',
                    graphModeEnabled: true,

                    gasDropdownMenuEnabled: true,
                    gasDropdownMenuVisible: true,
                    gasDropdownMenuOptions: ['nitrogen', 'nitrous oxide', 'nitric oxide', 'nitrogen dioxide', 'ammonia', 'oxygen', 'ozone', 'water', 'carbon monoxide', 'carbon dioxide', 'methane', 'hydrogen sulfide', 'sulfur dioxide', 'hydrogen', 'helium', 'neon', 'argon', 'krypton', 'xenon'],

                    gasButtonMenuEnabled: true,
                    gasButtonMenuVisible: true,
                    gasButtonMenuOptions: ' - ',

                    zoomCoords: [0,50], // Min max value?
                    zoomMin: 0,
                    zoomMax: 50,
                    zoomEnabled: true,
                    zoomReset: false,
                    zoomPanEnabled: false,

                    gasesReset: false,
                    gasSelectName: ' - ',
                    gasSelectedIndex: 0,
                    gasSelectEnabled: true,
                    gasSelectVisible: true,

                    wavelengthSliderValue: 0.75,
                    wavelengthSliderEnabled: true,
                    wavelengthSliderVisible: true,

                    pressureSliderValue: 3.721e-7,
                    pressureSliderEnabled: true,
                    pressureSliderVisible: true,
                });

                gasNameRepo = {
                    'nitrogen': 'N₂',
                    'nitrous oxide': 'N₂O',
                    'nitric oxide': 'NO',
                    'nitrogen dioxide': 'NO₂',
                    'ammonia': 'NH₃',
                    'oxygen': 'O₂',
                    'ozone': 'O₃',
                    'water': 'H₂O',
                    'carbon monoxide': 'CO',
                    'carbon dioxide': 'CO₂',
                    'methane': 'CH₄',
                    'hydrogen sulfide': 'H₂S',
                    'sulfur dioxide': 'SO₂',
                    'hydrogen': 'H₂',
                    'helium': 'He',
                    'neon': 'Ne',
                    'argon': 'Ar',
                    'krypton': 'Kr',
                    'xenon': 'Xe'
                }

                // namespace = 'AtmosphericChamber';
                // simcapi.CapiAdapter.expose('simMode', simModel, {
                //     alias: namespace + '.Mode'
                // });
                // simcapi.CapiAdapter.expose('simModeEnabled', simModel, {
                //     alias: namespace + '.ModeEnabled'
                // });

                namespace = 'AtmosphericChamber.Graph';
                simcapi.CapiAdapter.expose('graphMode', simModel, {
                    alias: namespace + '.Mode',
                    allowedValues: ['Transmission', 'Absorption']
                });
                simcapi.CapiAdapter.expose('graphModeEnabled', simModel, {
                    alias: namespace + '.ModeEnabled'
                });

                simModel.on ('change:graphMode', function (model, value) {
                    if (value == 'Transmission') {
                        $ ('#transmission-button').click ()
                    }
                    else if (value == 'Absorption') {
                        $ ('#absorbtion-button').click ()
                    }
                })

                simModel.on ('change:graphModeEnabled', function (model, value) {
                    if (value) {
                        $ ('#transmission-button').removeClass ('disabled')
                        $ ('#absorbtion-button').removeClass ('disabled')
                    }
                    else {
                        $ ('#transmission-button').addClass ('disabled')
                        $ ('#absorbtion-button').addClass ('disabled')
                    }
                })

                namespace = 'AtmosphericChamber.Menu'
                simcapi.CapiAdapter.expose('gasDropdownMenuEnabled', simModel, {
                    alias: namespace + '.GasDropdown.Enabled'
                });
                simcapi.CapiAdapter.expose('gasDropdownMenuVisible', simModel, {
                    alias: namespace + '.GasDropdown.Visible'
                });
                simcapi.CapiAdapter.expose('gasDropdownMenuOptions', simModel, {
                    alias: namespace + '.GasDropdown.Options'
                });

                simModel.on ('change:gasDropdownMenuEnabled', function (model, value) {
                    if (value) {
                        $ ('div.ui.dropdown.selection').removeClass ('disabled')
                    }
                    else {
                        $ ('div.ui.dropdown.selection').addClass ('disabled')
                    }
                })
                simModel.on ('change:gasDropdownMenuVisible', function (model, value) {
                    if (value) {
                        $ ('div.ui.dropdown.selection').removeClass ('hide')
                    }
                    else {
                        $ ('div.ui.dropdown.selection').addClass ('hide')
                    }
                })
                simModel.on ('change:gasDropdownMenuOptions', function (model, value) {
                    var item, key, list, selection;
                    $ ('div.menu.transition.visible > div.item').addClass ('hide');
                    $ ('#gas-button-menu > div > div.button').addClass ('hide');

                    list = value
                    for (key in list) {
                        item = list [key];

                        selection = gasNameRepo [item]
                        $ ('div[data-value="' + selection + '-option"]').removeClass ('hide')
                        $ ('#' + selection + '-button').removeClass ('hide')
                    }
                })

                simcapi.CapiAdapter.expose('gasButtonMenuEnabled', simModel, {
                    alias: namespace + '.GasButtonMenu.Enabled'
                });
                simcapi.CapiAdapter.expose('gasButtonMenuVisible', simModel, {
                    alias: namespace + '.GasButtonMenu.Visible'
                });

                simModel.on ('change:gasButtonMenuEnabled', function (model, value) {
                    if (value) {
                        $ ('#gas-button-menu > div > .button').removeClass ('disabled')
                    }
                    else {
                        $ ('#gas-button-menu > div > .button').addClass ('disabled')
                    }
                })
                simModel.on ('change:gasButtonMenuVisible', function (model, value) {
                    if (value) {
                        $ ('#gas-button-menu').removeClass ('hide')
                        $ ('#gas-button-menu-header').removeClass ('hide')
                    }
                    else {
                        $ ('#gas-button-menu').addClass ('hide')
                        $ ('#gas-button-menu-header').addClass ('hide')
                    }
                })

                // CAPI controls for handling zooming on graphs
                namespace = 'AtmosphericChamber.Graph.Zoom';
                simcapi.CapiAdapter.expose('zoomCoords', simModel, {
                    alias: namespace + '.Coords'
                });
                simcapi.CapiAdapter.expose('zoomMin', simModel, {
                    alias: namespace + '.Min'
                });
                simcapi.CapiAdapter.expose('zoomMax', simModel, {
                    alias: namespace + '.Max'
                });
                simcapi.CapiAdapter.expose('zoomEnabled', simModel, {
                    alias: namespace + '.Enabled'
                });
                simcapi.CapiAdapter.expose('zoomReset', simModel, {
                    alias: namespace + '.Reset'
                });
                // simcapi.CapiAdapter.expose('zoomPanEnabled', simModel, {
                //     alias: namespace + '.PanEnabled'
                // });
                simModel.on ('change:zoomCoords', function (model, value) {
                    if (!ignoreChange) {
                        ignoreChange = true;
                        simModel.set ('zoomMin', value [0])
                        ignoreChange = true;
                        simModel.set ('zoomMax', value [1])
                        ignoreChange = false;
                    }
                    else {
                        ignoreChange = false;
                    }
                })
                simModel.on ('change:zoomMin', function (model, value) {
                    var current, light;

                    light = window.transmissionGraph.getLightValues ();

                    value = Number (value);

                    // console.log ('Setting zoom min to', value, '. The min allowed value is', light.min)

                    if (value < light.min) { value = light.min }
                    else if (value > light.current.max) { return; }

                    window.transmissionGraph.updateLabelList (value, light.current.max)
                    window.absorbtionGraph.updateLabelList (value, light.current.max)

                    if (!ignoreChange) {
                        ignoreChange = true
                        current = simModel.get ('zoomCoords');
                        simModel.set ('zoomCoords', [value, current [1]])
                    }
                    else {
                        ignoreChange = false
                    }
                })
                simModel.on ('change:zoomMax', function (model, value) {
                    var current, light;

                    light = window.transmissionGraph.getLightValues ();

                    value = Number (value);

                    // console.log ('Setting zoom max to', value, '. The max allowed value is', light.max)

                    if (value > light.max) { value = light.max }
                    else if (value < light.current.min) { return; }

                    window.transmissionGraph.updateLabelList (light.current.min, value)
                    window.absorbtionGraph.updateLabelList (light.current.min, value)

                    if (!ignoreChange) {
                        ignoreChange = true
                        current = simModel.get ('zoomCoords');
                        simModel.set ('zoomCoords', [current [0], value])
                    }
                    else {
                        ignoreChange = false
                    }
                })
                simModel.on ('change:zoomReset', function (model, value) {
                    var light;

                    if (value) {
                        light = window.transmissionGraph.getLightValues ();

                        window.transmissionGraph.updateLabelList (light.min, light.max)
                        window.absorbtionGraph.updateLabelList (light.min, light.max)
                        simModel.set ('zoomReset', false);
                    }
                })
                simModel.on ('change:zoomEnabled', function (model, value) {
                    var disabled
                    if (value) { disabled = false }
                    else { disabled = true }
                    window.transmissionGraph.setZoomDisabled (disabled)
                    window.absorbtionGraph.setZoomDisabled (disabled)
                })
                // End of CAPI controls for handling zooming on graphs

                // CAPI controls for changing light wavelength
                namespace = 'AtmosphericChamber.Wavelength.Slider';
                simcapi.CapiAdapter.expose('wavelengthSliderValue', simModel, {
                    alias: namespace +'.Value'
                });
                simcapi.CapiAdapter.expose('wavelengthSliderEnabled', simModel, {
                    alias: namespace +'.Enabled'
                });
                simcapi.CapiAdapter.expose('wavelengthSliderVisible', simModel, {
                    alias: namespace +'.Visible'
                });
                simModel.on ('change:wavelengthSliderValue', function (model, value) {
                    var percent;
                    percent = window.chamber.convertNanometersToPercent (value);
                    window.chamber.setLightColor (percent)
                    window.chamber.setWavelength (percent);
                })
                simModel.on ('change:wavelengthSliderVisible', function (model, value) {
                    var setClass;

                    if (!value) { setClass = 'addClass' }
                    else { setClass = 'removeClass' }

                    $ ('#light-settings > div.segments') [setClass] ('hide');
                    $ ('#light-settings > div:nth-child(1)') [setClass] ('hide');
                })
                simModel.on ('change:wavelengthSliderEnabled', function (model, value) {
                    $ ('#light-wavelength').attr ({
                        'disabled': !value,
                        'pointer-events': 'none'
                    });
                })
                // End of capi controls for changing light wavelength

                // CAPI controls for pressure
                namespace = 'AtmosphericChamber.Pressure.Slider';
                simcapi.CapiAdapter.expose('pressureSliderValue', simModel, {
                    alias: namespace + '.Value'
                });
                simcapi.CapiAdapter.expose('pressureSliderVisible', simModel, {
                    alias: namespace + '.Visible'
                });
                simcapi.CapiAdapter.expose('pressureSliderEnabled', simModel, {
                    alias: namespace + '.Enabled'
                });

                simModel.on ('change:pressureSliderValue', function (model, value) {
                    var percent

                    percent = (value / 3.721) * 100;

                    window.gasRepo [window.currentGas].setCurrentPressure (percent)
                    window.gasRepo [window.currentGas].updateGraphData ();
                })
                simModel.on ('change:pressureSliderVisible', function (model, value) {
                    var setClass;

                    if (!value) { setClass = 'addClass' }
                    else { setClass = 'removeClass' }

                    $ ('#part-pressure-control') [setClass] ('hide');
                    $ ('#gas-control > div:nth-child(1)') [setClass] ('hide');
                })
                simModel.on ('change:pressureSliderEnabled', function (model, value) {
                    $ ('#part-pressure').attr ({
                        'disabled': !value,
                        'pointer-events': 'none'
                    });
                })
                // End of CAPI controls for pressure

                // CAPI controls for Gases
                namespace = 'AtmosphericChamber.Gas';
                simcapi.CapiAdapter.expose('gasesReset', simModel, {
                    alias: namespace + '.Reset'
                });
                simcapi.CapiAdapter.expose('gasSelectName', simModel, {
                    alias: namespace + '.Name',
                    allowedValues: ['Select Gas', 'nitrogen', 'nitrous oxide', 'nitric oxide', 'nitrogen dioxide', 'ammonia', 'oxygen', 'ozone', 'water', 'carbon monoxide', 'carbon dioxide', 'methane', 'hydrogen sulfide', 'sulfur dioxide', 'hydrogen', 'helium', 'neon', 'argon', 'krypton', 'xenon']
                });
                simcapi.CapiAdapter.expose('gasSelectIndex', simModel, {
                    alias: namespace + '.Index'
                });
                simcapi.CapiAdapter.expose('gasSelectEnabled', simModel, {
                    alias: namespace + '.Enabled'
                });
                simcapi.CapiAdapter.expose('gasSelectVisible', simModel, {
                    alias: namespace + '.Visible'
                });


                simModel.on('change:gasesReset', function(model, value) {
                    if (value) {
                        $ ('#reset-button').click ()
                        simModel.set ('gasesReset', false);
                    }
                });
                simModel.on ('change:gasSelectName', function (model, value) {
                    var gasNameRepo, selection

                    if (value != 'Select Gas') {
                        selection = gasNameRepo [value]
                        $ ('div[data-value="' + selection + '-option"]').click ()
                    }
                })
                simModel.on('change:gasSelectEnabled', function(model, value){
                    var setClass;

                    if (!value) { setClass = 'addClass' }
                    else { setClass = 'removeClass' }

                    $ ('#gas-settings > div.dropdown') [setClass] ('disabled');
                });
                simModel.on('change:gasSelectVisible', function(model, value){
                    var setClass;

                    if (!value) { setClass = 'addClass' }
                    else { setClass = 'removeClass' }

                    $ ('#gas-settings > div.dropdown') [setClass] ('hide');
                });
                // End of Capi controls for gases

                simcapi.Transporter.notifyOnReady();
            }

            tm.new ('app.sim.atmos.GasData', {
                metaSimModel: simModel
            })
            window.updateTotalParticle ();
        }
    })
})
