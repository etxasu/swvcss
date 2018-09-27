'use strict'
tm.add ('app.sim.atmos.quiz.app.Base', function (o, p, d) {
    o.setup = function (config) {
        d.selector = config.selector
        // Set up needed objects and pass in functions to call when changes happen

        // Create buttons for selecting gases
        d.gasControl = tm.new ('app.sim.atmos.quiz.control.Gas', {
            selector: d.selector.control.gas,
            onChange: o.onGasSelect
        })

        // Create switch for changing between Absorption/Transmission
        d.graphTypeSwitch = tm.new ('sim.atmos.quiz.input.Switch', {
            selector: d.selector.control.graphType,
            id: 'switch-gas-type',
            option: {
                one: 'Transmission',
                two: 'Absorbtion'
            },
            onChange: o.onSwitch
        })

        var height, padding, segmentCount, width;

        height = 200,
        width = 200,
        padding = {
            top: 20,
            bottom: 80,
            left: 75,
            right: 25
        }
        segmentCount = 4;

        // Create teacher graph
        d.graph = tm.new ('sim.greenhouse.graph.Wavelength', {
            selector: {
                container: d.selector.control.teacherGraph,
            },
            name: 'Teacher',
            width: width,
            height: height,
            padding: padding,
            segmentCount: segmentCount,
            precision: 100,
            xAxis: {
                label: 'Wavelength of Light (nm)',
                maxValue: 50,
                x: 75, y: 160
            },
            yAxis: {
                label: 'Transmission %',
                maxValue: 100,
                x: -160, y: 5,
            },
            onZoom: function () { o.onZoom ('teacher') },
            hack: {
                xAxis: {
                    postCaluclationLabelModifier: 1000
                },
                // yAxis: {
                //     maxLabelLength: 4
                // }
            }
        })

        // Create student graph
        d.studentGraph = tm.new ('sim.greenhouse.graph.Wavelength', {
            selector: {
                container: d.selector.control.studentGraph,
            },
            name: 'Student',
            width: width,
            height: height,
            padding: padding,
            segmentCount: segmentCount,
            precision: 100,
            xAxis: {
                label: 'Wavelength of Light (nm)',
                maxValue: 50,
                x: 75, y: 160
            },
            yAxis: {
                label: 'Transmission %',
                maxValue: 100,
                x: -160, y: 5,
            },
            onZoom: function () { o.onZoom ('student') },
            hack: {
                xAxis: {
                    postCaluclationLabelModifier: 1000
                },
                // yAxis: {
                //     maxLabelLength: 4
                // }
            }
        })

        // Applying xAxis hack
        o.resetZoom ();

        // Create zoom controls
        d.resetZoom = tm.new ('sim.atmos.quiz.input.Button', {
            selector: d.selector.control.zoom,
            id: 'zoom-reset',
            label: 'Reset Zoom',
            onClick: o.resetZoom
        })

        // Create pressure controls
        d.pressureSlider = tm.new ('sim.greenhouse.property.input.Slider', {
            selector: d.selector.control.zoom,
            id: 'pressure-slider',
            title: 'Pressure (atm)',
            min: 0.01,
            max: 3.721,
            step: 0.001,
            mid: 1,
            value: 0.01,
            onChange: o.setPressure,
        })

        d.pressureSlider.getDom ().addClass ('pressure-slider')
    }

    o.onSwitch = function (data) { console.log ('Changing graph types', data) }

    o.onGasSelect = function (data) {}

    o.onZoom = function (graph) {
        var coordinates

        switch (graph) {
            case 'student':
                coordinates = d.studentGraph.getValues ().current;
                d.graph.updateLabelList (coordinates.min, coordinates.max)
                break;
            case 'teacher':
                coordinates = d.graph.getValues ().current;
                d.studentGraph.updateLabelList (coordinates.min, coordinates.max)
                break;
        }
    }

    o.resetZoom = function () {
        d.graph.resetZoom ();
        d.studentGraph.resetZoom ();
    }

    o.setPressure = function (value) {
        var val

        val = value;

        if (val.value) { val = val.value }

        d.pressure = val
    }
})
