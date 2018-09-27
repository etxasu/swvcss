'use strict'
tm.add ('app.sim.timeline.Tooltip', function (o, p, d) {
    o.setup = function (config) {
        var simModel;

        if (config.width === undefined) { config.width = 150 }
        if (config.height === undefined) { config.height = 50 }

        window.tooltip = o;

        tm.html ('app.sim.timeline.Tooltip', {
            selector: document.body,
            append: true,
        })

        d.dom = document.getElementById ('tooltip');
        d.image = document.getElementById ('tooltip-image');
        d.title = document.getElementById ('tooltip-name');
        d.year = document.getElementById ('tooltip-year');
        d.enabled = true;

        $ (document).on ('mousemove', o.handleMouseMove)

        d.dom.style ['position'] = 'absolute';

        d.width = config.width;
        d.height = config.height;

        // $ (d.dom).css ({
        //     height: d.height,
        //     width: d.width
        // })

        if (window.simcapi) {
            // The available data on the sim model
            simModel = new simcapi.CapiAdapter.CapiModel({
                name: 'Tooltip',
                enabled: true,
            });

            d.simModel = simModel;

            // Expose the data so teachers can modify it
            simcapi.CapiAdapter.expose('enabled', simModel, {
                alias: 'Timeline.Controls.Tooltip'
            });

            simModel.on ('change:enabled', function( model, enabled ){
                if (enabled) {
                    d.enabled = true;
                    $ (d.dom).class.remove ('hide')
                }
                else {
                    d.enabled = false;
                    $ (d.dom).class.add ('hide')
                }
            });
        }
    }

    o.handleMouseMove = function (event) {
        var x, y, maxWidth;

        maxWidth = 950
        d.width = d.dom.offsetWidth;

        x = event.pageX - (d.width / 2);
        y = event.pageY - (d.height + 15);

        if (x < 10) {
            x = 10;
        }
        else if ((x + d.width) > maxWidth) {
            x = (maxWidth - d.width) - 10;
        }

        $ (d.dom).css ({
            left: x,
            top: y
        })

        // console.log ('Moving dom to x:', event.pageX, ' y:', event.pageY)
    }

    o.hide = function () {
        if (d.enabled) {
            d.dom.classList.add ('hide');
        }
    }

    o.unhide = function () {
        if (d.enabled) {
            d.dom.classList.remove ('hide');
        }
    }

    o.updateText = function (data) {
        $ (d.image).attr ('src', data.image);
        $ (d.title).html (data.name);
        $ (d.year).html (data.year);
    }
})
