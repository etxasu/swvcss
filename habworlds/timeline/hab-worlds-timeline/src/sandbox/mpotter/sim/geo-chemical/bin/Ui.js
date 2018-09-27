/*
    Creates its ui within the given selector
*/
'use strict'
tm.add ('sim.geo.chemical.bin.Ui', ['sim.geo.chemical.bin.Connector'], function (o, p, d) {
    o.setup = function (config) {
        d.selector = config.selector;
        d.targetDom = $ (d.selector);
        d.sliderRepo = {};
        d.id = d.title.replace(/\s/g, '-');
    }

    o.onSliderChange = function (data) {
        // console.log (data, d.connectionRepo)

        d.connectionRepo [data.name].rate = data.value
    }

    o.override ({
        onConnectionMade: function (original, data) {
            var name, info;
            original (data)

            // Create UI for the given connection
            name = data.connectionKey;

            if (!d.sliderRepo [name]) {
                d.sliderRepo [name] = tm.new ('component.property.input.Slider', {
                    min: 1,
                    max: 10,
                    step: 1,
                    decimals: 0,
                    id: 'slider-' + d.id + Object.keys (d.sliderRepo).length,
                    selector: d.selector,
                    title: name,
                    name: name,
                    onChange: o.onSliderChange
                })
            }
            else {
                // move slider to bottom  and unhide it
                d.targetDom.append (d.sliderRepo [name].getDom ())
                d.sliderRepo [name].setVisible (true);
            }
        },

        onConnectionRemoved: function (original, data) {
            var name;
            original (data)

            // Remove UI for the given connection
            name = data.connectionKey;

            d.sliderRepo [name].setVisible (false);
        }
    })
})
