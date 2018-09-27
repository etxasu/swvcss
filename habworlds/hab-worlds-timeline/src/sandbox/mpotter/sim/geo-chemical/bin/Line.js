'use strict'
tm.add ('sim.geo.chemical.bin.Line', ['tm.svg.Line'], function (o, p, d) {
    o.setup = function (config) {
        $ (d.dom).css ({
            'pointer-events': 'none'
        })

        $ (d.dom).on ( 'mouseover', function () { o.onMouseOver () } )
        $ (d.dom).on ( 'click', function () { o.onMouseDown () } )
        $ (d.dom).on ( 'mouseleave', function () { o.onMouseLeave () } )

        d.arrow = {
            width: 15,
            height: 15
        }

        d.arrow.object = tm.new ('sim.geo.chemical.bin.Polygon', {
            x: d.end.x,
            y: d.end.y,
            points: [
                0 + ',' + 0,
                -d.arrow.width/2 + ',' + d.arrow.height,
                d.arrow.width/2 + ',' + d.arrow.height,
            ].join (' '),
            brush: {
                fill: 'white',
                line: {
                    width: 3,
                    fill: 'white'
                }
            }
        })

        d.arrow.dom = d.arrow.object.getDom ()

        $ (d.arrow.dom).on ( 'mouseover', function () { o.onMouseOver () } )
        $ (d.arrow.dom).on ( 'click', function () { o.onMouseDown () } )
        $ (d.arrow.dom).on ( 'mouseleave', function () { o.onMouseLeave () } )

        $ (d.arrow.dom).css ({
            fill: 'white',
            stroke: 'white'
        })
    }

    o.start = function () {
        $ (d.dom).css ({
            'pointer-events': 'none'
        })
        $ (d.arrow.dom).css ({
            'pointer-events': 'none'
        })

        d.dom.parentNode.appendChild (d.arrow.dom)
    }

    o.delete = function () {
        var item, key, list;

        // remove element from dom
        d.dom.parentNode.removeChild (d.dom);

        // cleanup events
        $ (d.dom).off ('mouseover click mouseleave')

        // cleanup arrow object
        d.arrow.object.delete ();

        // remove data
        list = d
        for (key in list) {
            delete d [key]
        }
    }

    o.onMouseDown = function () {
        if (d.onDelete) { d.onDelete () }
        o.delete ()
    }

    o.onMouseLeave = function () {
        o.update ({
            brush: {
                fill: 'transparent',
                line: {
                    width: 4,
                    color: 'white'
                }
            }
        })

        $ (d.arrow.dom).css ({
            fill: 'white',
            stroke: 'white'
        })
    }

    o.onMouseOver = function () {
        o.update ({
            brush: {
                fill: 'transparent',
                line: {
                    width: 4,
                    color: 'red'
                }
            }
        })

        $ (d.arrow.dom).css ({
            fill: 'red',
            stroke: 'red'
        })
    }

    o.placed = function () {
        $ (d.dom).css ({
            'pointer-events': 'all'
        })
        $ (d.arrow.dom).css ({
            'pointer-events': 'all'
        })

        o.updateArrow ();
    }

    o.setOnDelete = function (callback) { d.onDelete = callback }

    o.updateArrow = function () {
        var angle, offset;

        angle = Math.atan2 (
            d.end.x - d.start.x,
            - (d.end.y - d.start.y)
        ) * ( 180 / Math.PI );

        $ (d.arrow.dom).css ({
            transform: 'translate(' + d.end.x + 'px,' + d.end.y + 'px)  rotate(' + angle + 'deg)'
        })
    }
})
