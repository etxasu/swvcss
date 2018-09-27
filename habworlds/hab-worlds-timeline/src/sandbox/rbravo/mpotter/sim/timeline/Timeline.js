'use strict';
tm.add ('app.sim.Timeline', function (o, p, d) {
    o.setup = function () {
        var app, circle, svg;

        svg = tm.new ('tm.svg.Svg', {
            appendTo: '#app',
            width: '500',
            height: '500',
            brush: {
                color: 'red',
                line: {
                    width: 1,
                    color: 'blue',
                }
            },
        })
        .add (
            tm.new ('tm.svg.Text', {
                x: 20,
                y: 280,
                text: 'Sample Text',
                font: {
                    family: '"Arial Black", Gadget, sans-serif',
                    size: 48,
                    weight: 'bold',
                },
                brush: {
                    color: 'red',
                    line: {
                        width: 3,
                        color: 'blue',
                    }
                },
            })
        )
        .add (
            tm.new ('tm.svg.Line', {
                start: {x: 10, y: 10},
                end: {x: 100, y: 10},
                brush: {
                    line: {
                        width: 1,
                        color: '#0f0',
                        cap: 'square', //'butt | round | square | inherit'
                    }
                },
            })
        )
        .add (
            tm.new ('tm.svg.Circle', {
                x: 100,
                y: 100,
                radius: 50,
                brush: {
                    color: 'red',
                    line: {
                        width: 5,
                        color: 'green',
                    }
                }
            })
        )
    }
});
