/*
    Creates and manages carbon
    Only handles out-going carbon animation

    Creates as many carbon molecule doms as could exist
    and hides/shows them as needed
*/
'use strict'
tm.add ('sim.geo.chemical.bin.Carbon', ['sim.geo.chemical.bin.Ui'], function (o, p, d) {
    o.setup = function (config) {
        if (config.carbon === undefined) { config.carbon = 50 }
        if (config.maxCarbon === undefined) { config.maxCarbon = 100 }
        if (config.outgoingCarbonRate === undefined) { config.outgoingCarbonRate = 10 }

        d.respectCarbonLimit = false;
        d.carbon = config.carbon;
        d.maxCarbon = config.maxCarbon;
        d.outgoingCarbonRate = config.outgoingCarbonRate;
        d.onCarbonChange = config.onCarbonChange;

        // Create as many carbon molecules as this object
        // could ever need

        d.carbonLabel = tm.new ('tm.svg.Text', {
            x: d.x + d.radius + 10,
            y: d.y + d.fontSize + (d.fontSize/2),
            text: d.carbon + ' / ' + d.maxCarbon,
            font: { size: d.fontSize / 2 },
            brush: {
                color: '#bebbc1',
                line: {
                    width: 0.5,
                    color: '#bebbc1'
                }
            }
        })

        d.carbonLabelDom = d.carbonLabel.getDom ();

        d.svg.getDom ().append (d.carbonLabelDom)
    }

    o.addCarbon = function (amount) {
        d.carbon += amount;

        // console.log (d.title, 'got', amount, 'carbon', '(', d.maxCarbon, '/', d.carbon, ')')

        d.carbonLabel.update ({
            text: d.carbon + ' / ' + d.maxCarbon,
        })

        o.onCarbonChange ();
     }

    // Override this later
    o.carbonSentAnimation = function (data) {}

    o.getCarbonData = function () { return {current: d.carbon, max: d.maxCarbon} }

    o.onCarbonChange = function () {
        if (d.onCarbonChange) {
            d.onCarbonChange ({
                carbon: d.carbon,
                title: d.title
            });
        }
    }

    o.sendCarbon = function (data) {
        var amount, canSend, delay, target, theirCarbon;

        amount = data.amount;
        delay = data.delay;
        target = data.target;

        window.setTimeout (function () {
            // Do fancy animation here
            canSend = false

            theirCarbon = target.getCarbonData ();

            // Make sure adding this carbon doesn't overflow their bin
            if (d.respectCarbonLimit === false && d.carbon > 0) {
                canSend = true
            }
            else if ((theirCarbon.current + amount) <= theirCarbon.max && d.carbon > 0) {
                canSend = true
            }

            if (canSend) {
                // console.log ('>', d.title, 'sent', amount, 'carbon', '(', d.maxCarbon, '/', d.carbon, ')')+++++++++
                o.carbonSentAnimation (data);
                d.carbon -= amount;

                d.carbonLabel.update ({
                    text: d.carbon + ' / ' + d.maxCarbon,
                })

                o.onCarbonChange ();
            }

        }, delay)
    }

    o.startSendProcess = function (data) {
        var amount, delay, end, int, target;

        amount = data.amount;
        delay = 50;
        target = data.target;

        // For each carbon molecule, add the carbon after a delay
        int = 0;
        end = amount;
        while (int < end) {
            o.sendCarbon ({
                delay: int * delay,
                target: target,
                amount: 1
            })

            int++
        }
    }

    o.onTimeEvent = function () {
        var canSend, item, key, list, sendAmount, theirCarbon;

        // Set out as much carbon as you are allowed to every connection until there are
        // no more connections or unti you run out of carbon
        list = d.connectionRepo
        for (key in list) {
            item = list [key];

            canSend = false;

            // Make sure the target still exists and we have carbon to send
            if (item && item.endBin && d.carbon > 0) {
                sendAmount = d.outgoingCarbonRate - item.rate;
                theirCarbon = item.endBin.getCarbonData ();

                if (d.respectCarbonLimit === false) {
                    canSend = true
                }
                else if (theirCarbon.current < theirCarbon.max) {
                    canSend = true
                }

                // Make sure they have room to accept the carbon before hand
                if (canSend) {
                    // console.log ('----------')
                    // console.log (d.title, 'is starting the send process to', item.title)
                    o.startSendProcess ({
                        target: item.endBin,
                        amount: sendAmount
                    })
                }
            }
        }
    }
})
