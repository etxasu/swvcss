// Handles which gases are plotted
tm.add ('sim.greenhouse.app.Graph', ['sim.greenhouse.app.Scene'], function (o, p, d) {
    o.setup = function (config) {

        // Set up Constants
        d.CONST = {
            STAR_GRAPH_NAME: 'Star',
            PLANET_GRAPH_NAME: 'Planet'
        }
        // Set up Graph Sidebar
        // Set up content for tabs
        d.starGraphControl = tm.new ('sim.greenhouse.control.graph.Star', {
            selector: 'body',
            // onZoom: function () { o.linkGraphZoom (d.CONST.STAR_GRAPH_NAME) }
        });

        d.planetGraphControl = tm.new ('sim.greenhouse.control.graph.CapiPlanet', {
            selector: 'body',
            // onZoom: function () { o.linkGraphZoom (d.CONST.PLANET_GRAPH_NAME) },
            // onChange: o.onPlanetGraphChange
        });

        d.starGraphControl.setPlanetGasRepo (d.planetGraphControl.getGasRepo ())

        // Create tabs and assign content
        d.graph.tabber.addManyTabs ([
            {
                title: d.CONST.STAR_GRAPH_NAME,
                content: d.starGraphControl.getDom (),
                onActive: function () {
                    o.redrawStarGraph ();
                    window.setTimeout (o.redrawStarGraph, 10)
                }
            },
            {
                title: d.CONST.PLANET_GRAPH_NAME,
                content: d.planetGraphControl.getDom (),
                onActive: function () {
                    o.redrawPlanetGraph ();
                    window.setTimeout (o.redrawPlanetGraph, 10)
                }
            },
        ])

        d.graph.tabber.changeTab (0);
    }

    o.linkGraphZoom = function (name) {
        var values;

        if (d.starGraphControl && d.planetGraphControl) {
            switch (name) {
                case d.CONST.STAR_GRAPH_NAME:
                    values = d.starGraphControl.getGraph ().getValues ();
                    d.planetGraphControl.getGraph ().updateLabelList (values.current.min, values.current.max);
                    break;
                case d.CONST.PLANET_GRAPH_NAME:
                    values = d.planetGraphControl.getGraph ().getValues ();
                    d.starGraphControl.getGraph ().updateLabelList (values.current.min, values.current.max);
                    break;
            }
        }
    }

    o.updatePlanetGraph = function () {
        var kelvin, peak;

        kelvin = d.planetControl.getTemperature ();
        peak = Math.round (d.planetGraphControl.calculatePeakWavelength ().frequency);

        d.planetGraphControl.plotData ( { kelvin: kelvin } );
        d.planetControl.setPeakWavelength (peak)
    }

    o.redrawStarGraph = function () {
        var graph, values;

        graph = d.starGraphControl.getGraph ()
        values = Object.assign ({}, graph.getValues ().current)
        // d.starGraphControl.forcePlanckCurveRedraw ();
        // o.updateStarGraph ();
        // d.starGraphControl.resizeGraph ();
        graph.setZoom (values.min, values.max)
        graph.plotSpectra ()
        o.linkGraphZoom (d.CONST.PLANET_GRAPH_NAME)
        d.starGraphControl.resizeGraph ();
        o.updateStarGraph ();
    }

    o.redrawPlanetGraph = function () {
        var graph, values;

        graph = d.planetGraphControl.getGraph ()
        values = Object.assign ({}, graph.getValues ().current)

        graph.setZoom (values.min, values.max)
        o.linkGraphZoom (d.CONST.STAR_GRAPH_NAME)
        d.planetGraphControl.resizeGraph ();
        o.updatePlanetGraph ();

        graph.plotSpectra ()
    }

    o.updateStarGraph = function () {
        var kelvin, peak;

        kelvin = d.starControl.getEffectiveTemperature ();
        peak = Math.round ( d.starGraphControl.calculatePeakWavelength ().frequency );

        d.starGraphControl.plotData ( { kelvin: kelvin } );
        d.starControl.setPeakWavelength (peak)
    }

    o.onPlanetGraphChange = function (data) {
        var peakWave;

        if (data.type == 'pressureSliderEnabled') {
            d.atmosControl.setGasSliderEnabled (data.name, data.value)
        }
        else if (data.type == 'selected') {
            d.atmosControl.getGasButtonManager ().clickItem (data.name)
        }
    }

    o.override ({
        getControls: function (original) {
            return {
                starControl: d.starControl,
                planetControl: d.planetControl,
                atmosControl: d.atmosControl,
                starGraphControl: d.starGraphControl,
                planetGraphControl: d.planetGraphControl,
            }
        },

        atmosChange: function (original, data) {
            var kelvin, name, lum, pointList, value;

            lum = d.starControl.getLuminosity ()

            data.luminosity = lum;
            // data.pressure = 1 - data.value / 100;
            value = d.planetGraphControl.calculateTotalTransmission ()
            d.atmosControl.setEnergyAbsorbed (value.totalAbsorption, value.totalTransmission)

            kelvin = d.planetControl.getTemperature ()
            d.planetGraphControl.setGasActive (data);
            d.planetGraphControl.setKelvin (kelvin)
            peakWave = d.planetGraphControl.calculatePeakWavelength ().frequency;
            d.planetControl.setPeakWavelength (Math.round (peakWave))

            o.updateStarGraph ();
            o.updatePlanetGraph ();
        },

        planetChange: function (original, data) {
            var kelvin, peakWave;

            original (data);

            kelvin = d.planetControl.getTemperature ()
            d.planetGraphControl.plotData ( { kelvin: kelvin } );
            peakWave = d.planetGraphControl.calculatePeakWavelength ().frequency;
            d.planetControl.setPeakWavelength (Math.round (peakWave))
        },

        starChange: function (original, data) {
            original (data);

            if (d.starGraphControl) {
                d.starControl.setPeakWavelength (d.starGraphControl.calculatePeakWavelength (data.value).frequency)
                d.starGraphControl.plotData ( {kelvin: d.starControl.getEffectiveTemperature ()} )
                // d.planetGraphControl.plotData ( {kelvin: d.planetControl.getEffectiveTemperature ()} )
            }
        },

        onSidebarOut: function () {
            var graph;

            graph = d.starGraphControl.getGraph ()
            graph.plotSpectra ()
            o.updateStarGraph ();

            graph = d.planetGraphControl.getGraph ()
            graph.plotSpectra ()
            o.updatePlanetGraph ();

        }
    })
})
