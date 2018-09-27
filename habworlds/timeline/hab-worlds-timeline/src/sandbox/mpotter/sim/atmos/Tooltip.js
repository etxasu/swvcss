tm.add ('app.sim.atmos.Tooltip', function (o, p, d) {
    o.setup = function (config) {
        if (config.offset === undefined) { config.offset = {x: -50, y: 10} }

        d.selector = config.selector;
        d.type = config.type;
        d.container = $ (d.selector.container);
        d.target = $ (d.selector.target);
        d.mouse = {
            x: 0,
            y: 0
        }
        d.id = 'tooltip-' + Math.random ();
        d.offset = config.offset;
        d.graph = config.graph;
        d.graphDom = $ ( d.graph.getSvg ().getDom () )

        tm.html ('app.sim.atmos.Tooltip', {
            selector: d.selector.container,
            append: true,
            data: {
                name: config.name,
                id: d.id
            }
        })

        d.container.width (config.width + 'px');
        d.container.height (config.height + 'px');
        d.container.addClass ('hide');

        d.target.mouseenter (function () {
            d.container.removeClass ('hide')
        })

        d.target.mouseleave (function () {
            d.container.addClass ('hide')
        })

        d.target.on ('mousemove', function (event) {
            d.mouse.x = event.pageX + d.offset.x;
            d.mouse.x -= d.container.width ();
            d.mouse.x = Math.round (d.mouse.x);
            d.mouse.y = event.pageY + d.offset.y;

            d.mouse.relativeX = event.pageX - d.graphDom.offset().left;

            d.container.attr ('style', 'left: ' + d.mouse.x + 'px;' + ' top: ' + d.mouse.y + 'px;');
            o.updateData ();
        })
    }

    o.updateData = function () {
        var data, graphArea, item, key, list, transmission, variance, wavelength, x, zoom;

        graphArea = d.graph.getGraphArea ();
        x = d.mouse.relativeX;

        if (x > graphArea.left && x < graphArea.right && window.currentGas) {
            wavelength = d.graph.findValueOfX (x).toFixed (4);
            data = window.gasRepo [window.currentGas].getPressuredWavelengthTransmission ();
            transmission = 100;
            
            // As the user zooms in, reduce the vairance
            zoom = d.graph.getZoomPercent ();
            variance = 0.4 / (zoom / 100)

            if (data [ wavelength ]) { transmission = data [ wavelength ].transmission }
            else {
                wavelength = Number (wavelength);
                list = data;
                for (key in list) {
                    key = Number (key);

                    if (key <= wavelength + variance && key >= wavelength - variance && data [key]) {
                        item = data [key];

                        if (item.transmission < transmission) {
                            transmission = item.transmission;
                        }
                    }
                }
            }

            if (d.type == 'Absorption') { transmission = 100 - transmission }

            transmission = transmission.toFixed (3)
            $ (d.selector.container + ' > div > div.particle').html (window.currentGas)
            $ (d.selector.container + ' > div > div.wavelength').html ('Wavelength: ' + wavelength + ' (μm)')
            $ (d.selector.container + ' > div > div.transmission').html (d.type + ': ' + transmission + '%')
        }

    }
})
