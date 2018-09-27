'use strict'
tm.add ('sim.greenhouse.molecule.view.Base', ['tm.svg.Dom'], function (o, p, d) {
    o.setup = function (config) {
        var clip, item, key, list, namespace, shape;

        // Set up config defaults
        if (config.width === undefined) { config.width = 100 }
        if (config.height === undefined) { config.height = 100 }

        // Store config parameters
        d.selector = config.selector;
        d.height = config.height;
        d.width = config.width;

        // Create an svg element inside of given selector
        d.svg = tm.new ('tm.svg.Svg', {
            appendTo: d.selector,
            // Changing the width seems to not do anything?
            width: d.width,
            height: d.height,
            brush: {
                color: 'white',
                line: {
                    width: 1,
                    color: 'white',
                }
            },
        })

        // Store the dom of the SVG element as our own
        d.dom = $ (d.svg.getDom ())

        // Create the master group for holding all items
        d.masterGroup = tm.new ('tm.svg.Group');

        // Create the clipping path so items are not visible outside of circle
            // Set the namespace
        namespace = "http://www.w3.org/2000/svg";
            // Create the clipping group
        clip = document.createElementNS (namespace, 'clipPath');
        clip.setAttributeNS (null, 'id', 'clip');
            // Create the shape to be cut out
        shape = document.createElementNS (namespace, 'circle');
        shape.setAttributeNS (null, 'cx', 100);
        shape.setAttributeNS (null, 'cy', 100);
        shape.setAttributeNS (null, 'r', 90);
        clip.appendChild (shape);
        d.dom.append (clip);
            // Assign which dom will be in the shape of the clip
        d.masterGroup.getDom ().setAttributeNS (null, 'clip-path', 'url(#clip)')

        // Create the background
        d.background = tm.new ('tm.svg.Box', {
            x: 0,
            y: 0,
            height: 1000,
            width: 1000,
            brush: {
                color: '#1b324a',
                line: {
                    width: 0.5,
                    color: '#5084bb'
                }
            }
        })

        d.masterGroup.add (d.background)

        // Create the border
        clip = document.createElementNS (namespace, 'clipPath');
        clip.setAttributeNS (null, 'id', 'clip-border');
        d.dom.append (clip);
            // Create the shape to be cut out
        shape = document.createElementNS (namespace, 'circle');
        shape.setAttributeNS (null, 'cx', 100);
        shape.setAttributeNS (null, 'cy', 100);
        shape.setAttributeNS (null, 'r', 90);
        clip.appendChild (shape);
            // create the border shape
        shape = document.createElementNS (namespace, 'circle');
        shape.setAttributeNS (null, 'cx', 100);
        shape.setAttributeNS (null, 'cy', 100);
        shape.setAttributeNS (null, 'r', 91);
        shape.setAttributeNS (null, 'file', '#bebbc1');
        d.dom.append (shape);

        d.animateList = [];

        d.svg.add (d.masterGroup);
        d.dom.addClass ('molecule-view');

        // Create the gases that are part of the sim
        d.gasRepo = {}

        list = [
            { name: 'Carbon Monoxide', formula: 'CO' },
            { name: 'Carbon Dioxide', formula: 'CO2' },
            { name: 'Methane', formula: 'CH4' },
            { name: 'Nitrogen', formula: 'N2' },
            { name: 'Nitrogen Monoxide', formula: 'N2O' },
            { name: 'Nitric Oxide', formula: 'NO' },
            { name: 'Nitrogen Dioxide', formula: 'NO2' },
            { name: 'Ammonia', formula: 'NH3' },
            { name: 'Oxygen', formula: 'O2' },
            { name: 'Ozone', formula: 'O3' },
            { name: 'Water', formula: 'H2O' },
            { name: 'Hydrogen Sulfide', formula: 'H2S' },
            { name: 'Sulfur Dioxide', formula: 'SO2' },
            { name: 'Helium', formula: 'He' },
            { name: 'Neon', formula: 'Ne' },
            { name: 'Argon', formula: 'Ar' },
            { name: 'Krypton', formula: 'Kr' },
            { name: 'Xenon', formula: 'Xe' }
        ]

        for (key in list) {
            item = list [key];

            item.width = $ (d.svg.getDom ()).width ();
            item.height = $ (d.svg.getDom ()).height ();
            item.svg = d.masterGroup;
            d.gasRepo [item.formula] = tm.new ('sim.greenhouse.molecule.Gas', item)
        }
    }

    o.animateGasRepo = function () {
        var item, key, list;

        list = d.gasRepo
        for (key in list) {
            item = list [key];

            item.animate ();
        }
    }

    o.hide = function () { d.svg.getDom ().classList.add ('hide') }

    o.onAnimate = function () {
        if (d.gasRepo) { o.animateGasRepo (); }
    }

    o.setGasActive = function (name, active) {
        if (d.gasRepo [name]) {
            d.gasRepo [name].setActive (active)
        }
    }

    o.setGasPressure = function (name, pressure) {
        if (d.gasRepo [name]) {
            d.gasRepo [name].setPressure (pressure)
        }
    }

    o.show = function () { d.svg.getDom ().classList.remove ('hide') }

})
