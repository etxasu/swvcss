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

            d.container.attr ('style', 'left: ' + d.mouse.x + 'px;' + ' top: ' + d.mouse.y + 'px;');
            o.updateData ();
        })
    }

    o.updateData = function () {
        if (window.selectedData) {
            $ (d.selector.container + ' > div > div.particle').html (window.selectedData.name)
            $ (d.selector.container + ' > div > div.wavelength').html ('Wavelength: ' + window.selectedData.wavelength + ' (μm)')
            $ (d.selector.container + ' > div > div.transmission').html (d.type + ': ' + window.selectedData.transmission + '%')
        }
    }
})
