'use strict'
// Responsible for plotting and managing data
tm.add ('app.sim.atmos.graph.Spectra', ['app.sim.atmos.graph.Zoom'], function (o, p, d) {
    o.setup = function (config) {
        var height = 150

        d.wavelengthRepo = {
            'uv': {
                start: -10,
                end: 0.40,
                box: tm.new ('tm.svg.Box', {
                    x: 10, y: d.graphArea.top,
                    width: 10, height: height,
                    brush: {
                        color: 'rgba(145, 0, 113, 0.3)',
                        line: {
                            color: 'rgba(238, 88, 207, 0.4)',
                            width: 1
                        }
                    }
                })
            },
            'violet': {
                start: 0.40,
                end: 0.45,
                box: tm.new ('tm.svg.Box', {
                    x: 10, y: d.graphArea.top,
                    width: 10, height: height,
                    brush: {
                        color: 'rgba(90, 0, 145, 0.5)',
                        line: {
                            color: 'rgba(157, 60, 217, 0.6)',
                            width: 1
                        }
                    }
                })
            },
            'blue': {
                start: 0.45,
                end: 0.50,
                box: tm.new ('tm.svg.Box', {
                    x: 10, y: d.graphArea.top,
                    width: 10, height: height,
                    brush: {
                        color: 'rgba(0, 97, 145, 0.5)',
                        line: {
                            color: 'rgba(79, 176, 223, 0.6)',
                            width: 1
                        }
                    }
                })
            },
            'green': {
                start: 0.50,
                end: 0.55,
                box: tm.new ('tm.svg.Box', {
                    x: 10, y: d.graphArea.top,
                    width: 10, height: height,
                    brush: {
                        color: 'rgba(0, 145, 1, 0.5)',
                        line: {
                            color: 'rgba(91, 233, 92, 0.6)',
                            width: 1
                        }
                    }
                })
            },
            'yellow': {
                start: 0.55,
                end: 0.60,
                box: tm.new ('tm.svg.Box', {
                    x: 10, y: d.graphArea.top,
                    width: 10, height: height,
                    brush: {
                        color: 'rgba(145, 131, 0, 0.5)',
                        line: {
                            color: 'rgba(250, 235, 95, 0.6)',
                            width: 1
                        }
                    }
                })
            },
            'orange': {
                start: 0.60,
                end: 0.65,
                box: tm.new ('tm.svg.Box', {
                    x: 10, y: d.graphArea.top,
                    width: 10, height: height,
                    brush: {
                        color: 'rgba(145, 57, 0, 0.5)',
                        line: {
                            color: 'rgba(252, 161, 101, 0.6)',
                            width: 1
                        }
                    }
                })
            },
            'red': {
                start: 0.65,
                end: 0.70,
                box: tm.new ('tm.svg.Box', {
                    x: 10, y: d.graphArea.top,
                    width: 10, height: height,
                    brush: {
                        color: 'rgba(145, 0, 0, 0.5)',
                        line: {
                            color: 'rgba(245, 109, 109, 0.6)',
                            width: 1
                        }
                    }
                })
            },
            'infrared': {
                start: 0.70,
                end: 1.50,
                box: tm.new ('tm.svg.Box', {
                    x: 10, y: d.graphArea.top,
                    width: 10, height: height,
                    brush: {
                        color: 'rgba(145, 0, 35, 0.3)',
                        line: {
                            color: 'rgba(246, 90, 128, 0.4)',
                            width: 1
                        }
                    }
                })
            },
        }

        var item, key, list;
        list = d.wavelengthRepo
        for (key in list) {
            item = list [key];

            d.svg.add (item.box)
        }

        o.plotSpectra ();
    }

    o.plotSpectra = function () {
        var end, endX, item, key, list, start, startX;

        startX = Math.round ( o.findXOfValue (d.lightStartValue) );
        endX = Math.round ( o.findXOfValue (d.lightEndValue) );

        list = d.wavelengthRepo;
        for (key in list) {
            item = list [key];

            start = o.findXOfValue (item.start)
            end = o.findXOfValue (item.end)

            // console.log (key, start, end)

            // Check to see if the box is visible
            // but falls out of bounds
            if (
                (start < 0 && end < 0) ||
                (start == false && end == false)
            ) {
                item.box.getDom ().classList.add ('hide')
            }
            else {
                item.box.getDom ().classList.remove ('hide')

                if (start < 0) { start = 0 }
                if (end === false) { end = endX }

                item.box.update ({
                    x: Math.round ( start + d.graphArea.left ),
                    width: Math.round ( end - start)
                })
            }

        }
    }

    o.override ({
        updateLabelList: function (original, startValue, endValue) {
            original (startValue, endValue);

            o.plotSpectra ();
        }
    })
})
