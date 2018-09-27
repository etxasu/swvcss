// Adds a wrapper around everything for CAPI integration
'use strict'
tm.add ('sim.greenhouse.app.Capi', ['sim.greenhouse.app.Rays'], function (o, p, d) {
    o.setup = function (config) {
        var namespace, simModel;

        // Check for existence of CAPI.
        if (window && window.simcapi) {
            // Create CAPI variables and listeners
            d.capi = {
                default: {
                    // Photon controls
                    photons: 'both',

                    // Star controls
                    mass: 1,
                    massVisible: true,
                    luminosity: 5800,
                    temp: 5800,
                    tempVisible: true,
                    starPeakWavelength: 1,
                    starPeakWavelengthVisible: true,
                    sliderMode: 'mass',
                    sliderVisible: true,
                    sliderEnabled: true,

                    // Planet controls
                    distance: 1,
                    albedo: 0.3,
                    flux: 1,
                    tempEquil: 277.6,
                    tempEquilVisible: true,
                    planetPeakWavelength: 1,
                    planetPeakWavelengthVisible: true,
                    distanceSliderVisible: true,
                    distanceSliderEnabled: true,
                    albedoSliderVisible: true,
                    albedoSliderEnabled: true,

                    // Graph controls
                    graphMode: 'both',
                    graphModeEnabled: true,
                    zoomCoords: [0, 3],
                    zoomMin: 0,
                    zoomMax: 3,
                    zoomEnabled: true,
                    zoomReset: false,

                    // Settings panel capi
                    settingsPanelEnabled: true,
                    settingsPanelVisible: true,
                    settingsPanelOpen: false,
                    starTabEnabled: true,
                    starTabVisible: true,
                    starTabActive: true,
                    planetTabEnabled: true,
                    planetTabVisible: true,
                    planetTabActive: false,
                    atmosTabEnabled: true,
                    atmosTabVisible: true,
                    atmosTabActive: false,

                    // Graph panel capi
                    graphPanelEnabled: true,
                    graphPanelVisible: true,
                    graphPanelOpen: false,
                    starGraphTabEnabled: true,
                    starGraphTabVisible: true,
                    starGraphTabActive: true,
                    planetGraphTabEnabled: true,
                    planetGraphTabVisible: true,
                    planetGraphTabActive: false,

                    // Read-out data
                    totalPressure: 1,
                    starAbsorption: 50,
                    starTransmission: 50,
                    planetAbsorption: 50,
                    planetTransmission: 50,
                    gasesPresent: '',
                    planet: {},
                    observerMode: false,
                }
            }

            // NOTE: CAPI setup for Gas controls are located in /data/Gas.js
            simModel = new simcapi.CapiAdapter.CapiModel (d.capi.default)

            d.simModel = simModel

            o.exposeData (simModel);
            o.createCapiListeners (simModel);
        }
    }

    o.notifyCapiReady = function () {
        if (window.simcapi) {
            simcapi.Transporter.notifyOnReady ();
        }
        d.capiReady = true;
    }

    o.createCapiListeners = function (simModel) {
        var item, key, list;

        list = d.capi.default
        for (key in list) {
            o.createListener (key);
        }
    }

    o.createListener = function (name) {
        d.simModel.on ('change:' + name, function (simModel, value) {
            try { o.onCapiChange (name, value) }
            catch (error) { console.log (error) }
        })
    }

    o.exposeData = function (simModel) {
        var namespace

        namespace = ''
        // simcapi.CapiAdapter.expose ('photons', simModel, {
        //     alias: 'Photons',
        //     allowedValues: ['both', 'none', 'inbound', 'outbound']
        // })

        namespace = 'Star'
        simcapi.CapiAdapter.expose ('mass', simModel, {
            alias: namespace + '.Mass (Solar Masses)',
        })
        simcapi.CapiAdapter.expose ('massVisible', simModel, {
            alias: namespace + '.MassVisible',
        })
        simcapi.CapiAdapter.expose ('luminosity', simModel, {
            alias: namespace + '.Luminosity',
        })
        simcapi.CapiAdapter.expose ('temp', simModel, {
            alias: namespace + '.Temp',
        })
        simcapi.CapiAdapter.expose ('tempVisible', simModel, {
            alias: namespace + '.TempVisible',
        })
        // simcapi.CapiAdapter.expose ('tempEnabled', simModel, {
        //     alias: namespace + '.TempEnabled',
        // })
        simcapi.CapiAdapter.expose ('starPeakWavelength', simModel, {
            alias: namespace + '.PeakWavelength',
        })
        simcapi.CapiAdapter.expose ('starPeakWavelengthVisible', simModel, {
            alias: namespace + '.PeakWavelengthVisible',
        })

        namespace = 'Star.Slider'
        // simcapi.CapiAdapter.expose ('sliderMode', simModel, {
        //     alias: namespace + '.Mode',
        //     allowedValues: ['mass', 'lum']
        // })
        simcapi.CapiAdapter.expose ('sliderVisible', simModel, {
            alias: namespace + '.Visible',
        })
        simcapi.CapiAdapter.expose ('sliderEnabled', simModel, {
            alias: namespace + '.Enabled',
        })

        namespace = 'Planet'
        simcapi.CapiAdapter.expose ('distance', simModel, {
            alias: namespace + '.Distance',
        })
        simcapi.CapiAdapter.expose ('albedo', simModel, {
            alias: namespace + '.Albedo',
        })
        // simcapi.CapiAdapter.expose ('flux', simModel, {
        //     alias: namespace + '.Flux',
        // })
        simcapi.CapiAdapter.expose ('tempEquil', simModel, {
            alias: namespace + '.TempEquil',
        })
        simcapi.CapiAdapter.expose ('tempEquilVisible', simModel, {
            alias: namespace + '.TempEquilVisible',
        })
        simcapi.CapiAdapter.expose ('planetPeakWavelength', simModel, {
            alias: namespace + '.peakWavelength',
        })
        simcapi.CapiAdapter.expose ('planetPeakWavelengthVisible', simModel, {
            alias: namespace + '.peakWavelengthVisible',
        })


        namespace = 'Planet.Slider.Distance'
        simcapi.CapiAdapter.expose ('distanceSliderVisible', simModel, {
            alias: namespace + '.distanceSliderVisible',
        })
        simcapi.CapiAdapter.expose ('distanceSliderEnabled', simModel, {
            alias: namespace + '.distanceSliderEnabled',
        })

        namespace = 'Planet.Slider.Albedo'
        simcapi.CapiAdapter.expose ('albedoSliderVisible', simModel, {
            alias: namespace + '.albedoSliderVisible',
        })
        simcapi.CapiAdapter.expose ('albedoSliderEnabled', simModel, {
            alias: namespace + '.albedoSliderEnabled',
        })

        namespace = 'Graph'
        simcapi.CapiAdapter.expose ('graphMode', simModel, {
            alias: namespace + '.mode',
            allowedValues: ['star', 'planet', 'both']
        })
        // simcapi.CapiAdapter.expose ('graphModeEnabled', simModel, {
        //     alias: namespace + '.modeEnabled',
        // })

        namespace = 'Graph.Zoom'
        simcapi.CapiAdapter.expose ('zoomCoords', simModel, {
            alias: namespace + '.Coords',
        })
        // simcapi.CapiAdapter.expose ('zoomMin', simModel, {
        //     alias: namespace + '.min',
        // })
        // simcapi.CapiAdapter.expose ('zoomMax', simModel, {
        //     alias: namespace + '.max',
        // })
        simcapi.CapiAdapter.expose ('zoomEnabled', simModel, {
            alias: namespace + '.enabled',
        })
        simcapi.CapiAdapter.expose ('zoomReset', simModel, {
            alias: namespace + '.reset',
        })

        namespace = 'Panel.Settings';
        simcapi.CapiAdapter.expose ('settingsPanelEnabled', simModel, {
            alias: namespace + '.enabled',
        })
        simcapi.CapiAdapter.expose ('settingsPanelVisible', simModel, {
            alias: namespace + '.visible',
        })
        simcapi.CapiAdapter.expose ('settingsPanelOpen', simModel, {
            alias: namespace + '.open',
        })

        namespace = 'Panel.Settings.Tab.Star';
        simcapi.CapiAdapter.expose ('starTabEnabled', simModel, {
            alias: namespace + '.enabled',
        })
        simcapi.CapiAdapter.expose ('starTabVisible', simModel, {
            alias: namespace + '.visible',
        })
        simcapi.CapiAdapter.expose ('starTabActive', simModel, {
            alias: namespace + '.active',
        })

        namespace = 'Panel.Settings.Tab.Planet';
        simcapi.CapiAdapter.expose ('planetTabEnabled', simModel, {
            alias: namespace + '.enabled',
        })
        simcapi.CapiAdapter.expose ('planetTabVisible', simModel, {
            alias: namespace + '.visible',
        })
        simcapi.CapiAdapter.expose ('planetTabActive', simModel, {
            alias: namespace + '.active',
        })

        namespace = 'Panel.Settings.Tab.Atmosphere';
        simcapi.CapiAdapter.expose ('atmosTabEnabled', simModel, {
            alias: namespace + '.enabled',
        })
        simcapi.CapiAdapter.expose ('atmosTabVisible', simModel, {
            alias: namespace + '.visible',
        })
        simcapi.CapiAdapter.expose ('atmosTabActive', simModel, {
            alias: namespace + '.active',
        })

        namespace = 'Panel.Graph';
        simcapi.CapiAdapter.expose ('graphPanelEnabled', simModel, {
            alias: namespace + '.enabled',
        })
        simcapi.CapiAdapter.expose ('graphPanelVisible', simModel, {
            alias: namespace + '.visible',
        })
        simcapi.CapiAdapter.expose ('graphPanelOpen', simModel, {
            alias: namespace + '.open',
        })

        namespace = 'Panel.Graph.Tab.Star';
        simcapi.CapiAdapter.expose ('starGraphTabEnabled', simModel, {
            alias: namespace + '.enabled',
        })
        simcapi.CapiAdapter.expose ('starGraphTabVisible', simModel, {
            alias: namespace + '.visible',
        })
        simcapi.CapiAdapter.expose ('starGraphTabActive', simModel, {
            alias: namespace + '.active',
        })

        namespace = 'Panel.Graph.Tab.Planet';
        simcapi.CapiAdapter.expose ('planetGraphTabEnabled', simModel, {
            alias: namespace + '.enabled',
        })
        simcapi.CapiAdapter.expose ('planetGraphTabVisible', simModel, {
            alias: namespace + '.visible',
        })
        simcapi.CapiAdapter.expose ('planetGraphTabActive', simModel, {
            alias: namespace + '.active',
        })

        namespace = 'Data'
        simcapi.CapiAdapter.expose ('totalPressure', simModel, {
            alias: namespace + '.totalPressure',
            readonly: true
        })
        // simcapi.CapiAdapter.expose ('starAbsorption', simModel, {
        //     alias: namespace + '.starAbsorption',
        // })
        // simcapi.CapiAdapter.expose ('starTransmission', simModel, {
        //     alias: namespace + '.starTransmission',
        // })
        simcapi.CapiAdapter.expose ('planetAbsorption', simModel, {
            alias: namespace + '.planetAbsorption',
        })
        simcapi.CapiAdapter.expose ('planetTransmission', simModel, {
            alias: namespace + '.planetTransmission',
        })
        simcapi.CapiAdapter.expose ('gasesPresent', simModel, {
            alias: namespace + '.gasPresent',
        })
        simcapi.CapiAdapter.expose ('planet', simModel, {
            alias: namespace + '.planet',
            allowedValues: ['none', 'earth', 'venus', 'mars']
        })
        simcapi.CapiAdapter.expose ('observerMode', simModel, {
            alias: namespace + '.observerMode',
        })
    }

    o.onCapiChange = function (name, value) {
        var target;

        if (d.ignoreChange) { return; }

        switch (name) {
            // Micro View
            case 'photons':
                target = d.molecularView;

                // Changing types of photons allowed in microview
                if (value == 'none') { target.hide (); }
                else {
                    target.show ();

                    if (value == 'inbound') { target.setReflectChance (0) }
                    else if (value == 'outbound') { target.setReflectChance (100) }
                    else if (value == 'both') { target.setReflectChance (50) }
                }
                break;

            // Star Properties
            case 'mass':
                d.starControl.setMass (value)
                break;
            case 'massVisible':
                d.starControl.setComponentVisible ('massLabel', value)
                break;
            case 'luminosity':
                d.starControl.setMass (value)
                break;
            // case 'temp':
            //     break;
            case 'tempVisible':
                d.starControl.setComponentVisible ('temperatureLabel', value)
                break;
            // case 'tempEnabled':
            //     break;
            // case 'peakWavelength':
            //     break;
            case 'starPeakWavelengthVisible':
                d.starControl.setComponentVisible ('peakLabel', value)
                break;
            case 'sliderMode':
                break;
            case 'sliderVisible':
                d.starControl.setComponentVisible ('luminositySlider', value)
                break;
            case 'sliderEnabled':
                d.starControl.setComponentEnabled ('luminositySlider', value)
                break;

            // Planet Properties
            case 'distance':
                d.planetControl.setDistance (value);
                d.planetControl.onDistanceChange ({ coreValue: value });
                break;
            case 'albedo':
                d.planetControl.setAlbedo (value);
                d.planetControl.onAlbedoChange ({ coreValue: value });
                break;
            // case 'flux':
            //     break;
            // case 'tempEquil':
            //     break;
            case 'tempEquilVisible':
                d.planetControl.setComponentVisible ('temperatureLabel', value)
                break;
            case 'planetPeakWavelengthVisible':
                d.planetControl.setComponentVisible ('peakLabel', value)
                break;
            case 'distanceSliderVisible':
                d.planetControl.setComponentVisible ('distanceSlider', value)
                break;
            case 'distanceSliderEnabled':
                d.planetControl.setComponentEnabled ('distanceSlider', value)
                break;
            case 'albedoSliderVisible':
                d.planetControl.setComponentVisible ('albedoSlider', value)
                break;
            case 'albedoSliderEnabled':
                d.planetControl.setComponentEnabled ('albedoSlider', value)
                break;

            // Graph Properties
            case 'graphMode':
                break;
            // case 'graphModeEnabled':
            //     break;
            case 'zoomCoords':
                var end, start;

                start = Number (value [0]);
                end = Number (value [1]);

                d.planetGraphControl.setStartAndEnd (start, end);
                d.starGraphControl.setStartAndEnd (start, end);
                break;
            // case 'zoomMin':
            //     break;
            // case 'zoomMax':
            //     break;
            case 'zoomEnabled':
                break;
            case 'zoomReset':
                if (value) {
                    d.planetGraphControl.resetZoom ();
                    d.starGraphControl.resetZoom ();
                    d.simModel.set ({
                        zoomReset: false
                    })
                }
                break;
            // Settings panel
            case 'settingsPanelOpen':
                $ ('#left-sidebar-button').click ()
                break;
            case 'settingsPanelEnabled':
                if (!value) {
                    $ ('#left-sidebar-button').addClass ('disabled')
                    $ ('#left-sidebar-chevron').addClass ('disabled')
                }
                else {
                    $ ('#left-sidebar-button').removeClass ('disabled')
                    $ ('#left-sidebar-chevron').removeClass ('disabled')
                }
                break;
            case 'settingsPanelVisible':
                if (!value) {
                    $ ('#left-sidebar').addClass ('hide')
                    $ ('#left-sidebar-button').addClass ('hide')
                }
                else {
                    $ ('#left-sidebar').removeClass ('hide')
                    $ ('#left-sidebar-button').removeClass ('hide')
                }
                break;
            case 'starTabVisible':
                d.objectSettings.tabber.setTabVisible (0, value)
                break;
            case 'starTabEnabled':
                d.objectSettings.tabber.setTabEnabled (0, value)
                break;
            case 'starTabActive':
                if (value) {
                    d.objectSettings.tabber.changeTab (0);
                    d.simModel.set ({
                        planetTabActive: false,
                        atmosTabActive: false
                    });
                }
                break;

            case 'planetTabActive':
                if (value) {
                    d.objectSettings.tabber.changeTab (1);
                    d.simModel.set ({
                        starTabActive: false,
                        atmosTabActive: false
                    });
                }
                break;
            case 'planetTabVisible':
                d.objectSettings.tabber.setTabVisible (1, value)
                break;
            case 'planetTabEnabled':
                d.objectSettings.tabber.setTabEnabled (1, value)
                break;

            case 'atmosTabActive':
                if (value) {
                    d.objectSettings.tabber.changeTab (2);
                    d.simModel.set ({
                        planetTabActive: false,
                        starTabActive: false
                    });
                }
                break;
            case 'atmosTabVisible':
                d.objectSettings.tabber.setTabVisible (2, value)
                break;
            case 'atmosTabEnabled':
                d.objectSettings.tabber.setTabEnabled (2, value)
                break;
            // Graph Panel
            case 'graphPanelOpen':
                $ ('#right-sidebar-button').click ()
                break;
            case 'graphPanelEnabled':
                if (!value) {
                    $ ('#right-sidebar-button').addClass ('disabled')
                    $ ('#right-sidebar-chevron').addClass ('disabled')
                }
                else {
                    $ ('#right-sidebar-button').removeClass ('disabled')
                    $ ('#right-sidebar-chevron').removeClass ('disabled')
                }
                break;
            case 'graphPanelVisible':
                if (!value) {
                    $ ('#right-sidebar').addClass ('hide')
                    $ ('#right-sidebar-button').addClass ('hide')
                }
                else {
                    $ ('#right-sidebar').removeClass ('hide')
                    $ ('#right-sidebar-button').removeClass ('hide')
                }
                break;
            case 'planetGraphTabActive':
                if (value) {
                    d.graph.tabber.changeTab (1);
                    d.simModel.set ({
                        starGraphTabActive: false,
                    });
                }
                break;
            case 'planetGraphTabVisible':
                d.graph.tabber.setTabVisible (1, value)
                break;
            case 'planetGraphTabEnabled':
                d.graph.tabber.setTabEnabled (1, value)
                break;

            case 'starGraphTabActive':
                if (value) {
                    d.graph.tabber.changeTab (0);
                    d.simModel.set ({
                        planetGraphTabActive: false,
                    });
                }
                break;
            case 'starGraphTabVisible':
                d.graph.tabber.setTabVisible (0, value)
                break;
            case 'starGraphTabEnabled':
                d.graph.tabber.setTabEnabled (0, value)
                break;
            case 'planet':
                if (value == 'none') {
                    console.log ('removing all gases')
                    o.setupPlanet ({})
                }
                else if (value == 'earth') {
                    // ₂ ₃ ₄
                    o.setupPlanet ({
                        'N₂': 1,
                        'O₂': 1,
                        'Ar': 1,
                        'H₂O': 1,
                        'CO₂': 1,
                        'Ne': 1,
                        'He': 1,
                        'CH₄': 1,
                        'Kr': 1,
                        'N₂O': 1,
                        'CO': 1,
                        'Xe': 1,
                        'O₃': 1,
                    })
                }
                else if (value == 'venus') {
                    o.setupPlanet ({
                        'N₂': 1,
                        'Ar': 1,
                        'H₂O': 1,
                        'CO₂': 1,
                        'Ne': 1,
                        'He': 1,
                        'CO': 1,
                    })
                }
                else if (value == 'mars') {
                    console.log ('setting up mars atmosphere')
                    o.setupPlanet ({
                        'CO₂': 1,
                        'N₂': 1,
                        'Ar': 1,
                        'O₂': 1,
                        'H₂O': 1,
                        'CO': 1,
                        'NO': 1,
                    })
                }
                break;
            case 'observerMode':
                if (value) {
                    $ ('#atmos-named-group-gas-control').addClass ('disabled')
                }
                else {
                    $ ('#atmos-named-group-gas-control').removeClass ('disabled')
                }
                break;
            default:
                console.log (name, value)
                break;
        }
    }

    o.setupPlanet = function (data) {
        var item, key, list, repo;

        repo = d.planetGraphControl.getGasRepo ()

        // Set all gases to inactive
        list = repo
        for (key in list) {
            item = list [key];

            item.setActive (false)
            repo [key].setPressure (0)
        }

        // Activate only the gases we need
        list = data
        for (key in list) {
            item = list [key];

            repo [key].setActive (true)
            repo [key].setPressure (item)
        }

        d.planetGraphControl.plotGasData ();
    }

    o.setCapiValue = function (data) {
        var name, value;

        name = data.name;
        value = data.value;

        d.simModel.set (name, value)
    }

    o.override ({
        // Individual gases handle their capi properties
        atmosChange: function (original, data) {
            original (data)

            if (d.capiReady && !d.ignoreChange) {
                var absorption, gasPresent, pressure, transmission;

                d.ignoreChange = true;

                pressure = d.atmosControl.getTotalPressure ().toFixed (3);
                absorption = d.planetGraphControl.getTotalAbsorption ().toString ()
                transmission = d.planetGraphControl.getTotalTransmission ().toString ()
                gasPresent = d.simModel.get ('gasesPresent')

                if (!gasPresent) { gasPresent = [] }

                if (typeof gasPresent == 'string') { gasPresent = JSON.parse (gasPresent) }

                if (data.type == 'active') {
                    var item, itemFound, key, list;

                    if (data.active == false) {
                        list = gasPresent
                        for (key in list) {
                            item = list [key];

                            if (item == data.name) {
                                list.splice (key, 1)
                                break;
                            }
                        }
                    }
                    else {
                        gasPresent.push (data.name)
                    }
                }

                d.simModel.set ('gasesPresent', JSON.stringify (gasPresent))
                d.simModel.set ('totalPressure', pressure)
                d.simModel.set ('planetAbsorption', absorption)
                d.simModel.set ('planetTransmission', transmission)
            }

            d.ignoreChange = false;
        },

        planetChange: function (original, data) {
            original (data);

            if (d.capiReady && !d.ignoreChange) {
                var albedo, distance, peakWave, temp;

                d.ignoreChange = true;

                albedo = d.planetControl.getAlbedo ().value;
                distance = d.planetControl.getDistance ().value;
                peakWave = d.planetControl.getPeakWavelength ().value;
                temp = d.planetControl.getTemperature ();


                d.simModel.set ('albedo', albedo)
                d.simModel.set ('distance', distance)
                d.simModel.set ('planetPeakWavelength', peakWave)
                d.simModel.set ('tempEquil', temp)
            }

            d.ignoreChange = false;
        },

        starChange: function (original, data) {
            original (data);

            if (d.capiReady && !d.ignoreChange) {
                var lum, mass, peakWave, temp;

                d.ignoreChange = true;

                lum = d.starControl.getLuminosity ();
                temp = d.starControl.getTemperature ().value;
                mass = d.starControl.getMass ().value;
                peakWave = d.starControl.getPeakWavelength ().value;

                d.simModel.set ('luminosity', lum)
                d.simModel.set ('temp', temp)
                d.simModel.set ('mass', mass)
                d.simModel.set ('starPeakWavelength', peakWave)
            }

            d.ignoreChange = false;
        },
    })
})
