/*
    Creates space for graphs
*/
'use strict'
tm.add ('sim.geo.chemical.app.Tabber', [], function (o, p, d) {
    o.setup = function (config) {
        d.tabber = tm.new ('component.Tabber', {
            selector: d.selector.sidebar.right,
            id: 'graph-tabber'
        })

        d.graphGroup = tm.new ('component.named.Group', {
            title: 'Temperature',
            id: 'carbon-graph-group',
            selector: d.selector.sidebar.right,
        })

        d.barGraphGroup = tm.new ('component.named.Group', {
            title: 'Cycle',
            id: 'carbon-bar-graph-group',
            selector: d.selector.sidebar.right,
        })

        d.graphGroup.getDom ().addClass ('graph-group')
        d.barGraphGroup.getDom ().addClass ('graph-group')

        d.graphData = {
            start: 0,
            end: 10,
            temperature: {
                start: 200,
                end: 500
            }
        }

        d.carbonGraph = tm.new ('component.graph.Zoom', {
            selector: {
                container: d.graphGroup.getContentSelector (),
            },
            name: 'Temperature vs Atmospheric Carbon Dioxide',
            width: 200,
            height: 200,
            segmentCount: 5,
            precision: 100,
            xAxis: {
                label: 'Time (Ma)',
                maxValue: d.graphData.end
            },
            yAxis: {
                left: {
                    label: 'Temperature (K)',
                    minValue: d.graphData.temperature.start,
                    maxValue: d.graphData.temperature.end
                },
                right: {
                    label: 'Atmospheric CO2 (ppm)',
                    minValue: 0,
                    maxValue: 100
                }
            },
            x: 70, y: 20,
            zoom: {
                disabled: true,
                // onZoom: o.onZoom,
                label: {
                    x: 10,
                    y: 290,
                    hidden: true
                },
            },
        })

        d.carbonBarGraph = tm.new ('component.graph.Zoom', {
            selector: {
                container: d.barGraphGroup.getContentSelector (),
            },
            name: 'Carbon % in Bins',
            width: 200,
            height: 200,
            segmentCount: 5,
            precision: 100,
            xAxis: {
                label: ' ',
                labelList: [
                    'Air',
                    'Rain',
                    'Soil',
                    'River',
                    'Ocean',
                    'Sea Floor',
                    'Volcano',
                ]
            },
            yAxis: {
                left: {
                    label: 'Carbon (%)',
                    minValue: 0,
                    maxValue: 100
                }
            },
            x: 70, y: 20,
            zoom: {
                disabled: true,
                // onZoom: o.onZoom,
                label: {
                    x: 10,
                    y: 290,
                    hidden: true
                },
            },
        })

        // Add graph to my group
        d.carbonGraph.getDom ().attr ('id', 'carbon-graph');
        d.carbonBarGraph.getDom ().attr ('id', 'carbon-bar-graph');

        d.carbonGraph.getDom ().addClass ('graph');
        d.carbonBarGraph.getDom ().addClass ('graph');

        d.graphGroup.addContent (d.carbonGraph.getDom ())
        d.barGraphGroup.addContent (d.carbonBarGraph.getDom ())

        // Add groups to a tab
        d.tabber.addManyTabs ([
            {
                title: 'Cycle',
                content: d.barGraphGroup.getDom ()
            },
            {
                title: 'Temperature',
                content: d.graphGroup.getDom ()
            }
        ])

        d.tabber.changeTab (0)
    }

})
