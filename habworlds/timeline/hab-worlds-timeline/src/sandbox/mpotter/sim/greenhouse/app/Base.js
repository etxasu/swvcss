'use strict'
tm.add ('sim.greenhouse.app.Base', function (o, p, d) {
    o.setup = function (config) {
        var namedGroup, propLabel, slider;
        d.selector = config.selector;

        d.objectSettings = { id: 'object-settings' }

        d.objectSettings.tabber = tm.new ('sim.greenhouse.Tabber', {
            id: d.objectSettings.id + '-tabber-left',
            selector: d.selector.sidebar.left
        })

        d.graph = { id: 'graph' }

        d.graph.tabber = tm.new ('sim.greenhouse.Tabber', {
            id: d.graph.id + '-tabber-right',
            selector: d.selector.sidebar.right
        })

        // Set up Object settings sidebar
        // Set up content for tabs
        d.starControl = tm.new ('sim.greenhouse.control.Star', {
            selector: 'body',
            onChange: o.starChange
        })

        d.planetControl = tm.new ('sim.greenhouse.control.Planet', {
            selector: 'body',
            onChange: o.planetChange
        })

        d.atmosControl = tm.new ('sim.greenhouse.control.Atmosphere', {
            selector: 'body',
            onChange: o.atmosChange,
        })

        // Create tabs and assign content
        d.objectSettings.tabber.addManyTabs ([
            {
                title: 'Star',
                content: d.starControl.getDom ()
            },
            {
                title: 'Planet',
                content: d.planetControl.getDom ()
            },
            {
                title: 'Atmosphere',
                content: d.atmosControl.getDom ()
            },
        ])

        d.objectSettings.tabber.changeTab (0);
    }

    o.getObjectSettings = function () { return d.objectSettings }

    o.getControls = function () {
        return {
            starControl: d.starControl,
            planetControl: d.planetControl,
            atmosControl: d.atmosControl
        }
    }

    // Placeholder built to be overridden
    o.atmosChange = function (data) { }
    o.planetChange = function (data) { }
    o.starChange = function (data) { }
    o.onSidebarOut = function () {}
})
