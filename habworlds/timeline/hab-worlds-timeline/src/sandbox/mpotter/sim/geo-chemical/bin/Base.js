/*
    Creates a circle dom element with mouse events
*/
'use strict'
tm.add ('sim.geo.chemical.bin.Base', ['tm.svg.Dom'], function (o, p, d) {
    o.setup = function (config) {
        d.x = config.x;
        d.y = config.y;
        d.radius = config.radius;
        d.title = config.title;

        // Create dom and listeners
        d.circle = tm.new ('tm.svg.Circle', {
            x: d.x, y: d.y,
            radius: d.radius,
            brush: {
                color: 'transparent',
                line: {
                    width: 6,
                    color: 'white'
                }
            }
        })

        d.dom = d.circle.getDom ();
        d.dom.owner = o;
        d.circleDom = $ (d.dom);
        d.circleDom.css ({'fill-opacity': 0.5});
        d.circleDom.on ('mouseover',  o.onMouseOver);
        d.circleDom.on ('mouseleave', o.onMouseLeave )
        d.circleDom.on ('mousedown', o.onMouseDown )

        $ (document).on ('mouseup', o.onMouseUp )
        $ (document).on ('mousemove', o.onMouseMove )

        d.onConnection = config.onConnection

        d.fontSize = 20

        d.label = tm.new ('tm.svg.Text', {
            x: d.x + d.radius + 10,
            y: d.y + (d.fontSize / 2),
            text: d.title,
            font: { size: d.fontSize },
            brush: {
                color: '#bebbc1',
                line: {
                    width: 0.5,
                    color: '#bebbc1'
                }
            }
        })

        d.labelDom = d.label.getDom ();

        d.labelDom.unselectable = 'on'

        d.svg = config.svg;
        d.svg.add (o)

        d.svg.getDom ().append (d.labelDom)
    }

    o.getTitle = function () { return d.title }
    o.getRadius = function () { return d.radius }

    o.onMouseLeave = function () {
        d.circleDom.css ({
            fill: 'transparent',
        })
    }

    o.onMouseOver = function () {
        d.circleDom.css ({
            fill: 'white',
        })
    }

    o.onMouseUp = function () {}
    o.onMouseDown = function () {}
    o.onMouseMove = function () {}
})
