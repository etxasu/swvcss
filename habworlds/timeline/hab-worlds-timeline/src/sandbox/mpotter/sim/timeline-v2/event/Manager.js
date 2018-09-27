// Manages Two pieces:
//  The events listed and a pin that goes on the timeline
tm.add ('app.sim.timeline.Event', function (o, p, d) {
    o.setup = function (config) {
        // Config defaults
        if (!config.color) { config.color = 'gold' }

        // Assign Config Values
        d.image = config.image;
        d.selector = config.selector;
        d.name = config.name;
        d.description = config.description;
        d.content = config.content;
        d.year = config.year;
        d.readableYear = config.readableYear;
        d.uid = config.uid;
        d.timeline = config.timeline

        config.owner = o;

        // Child Objects
        d.card = tm.new ('app.sim.timeline.event.Card', config);
        d.pin = tm.new ('app.sim.timeline.event.Pin', {
            owner: o,
            selector: 'svg',
            height: 100,
            width: 50,
            uid: config.uid,
            event: {
                dragEnd: o.onPinDropped
            },
            boundary: {
                x: {
                    start: 0,
                    end: $ ('svg').width ()
                },
                y: {
                    start: 0,
                    end: $ ('svg').height ()
                }
            }
        });
    }

    o.onDragEnd = function (event) {
        if (d.timeline.getMouseHover ()) {
            d.timeline.placeEventPin (d.pin, event.pageX);
            d.card.hide ();
        }
        else {
            d.card.show ();
        }
    }

    o.onPinDropped = function (data) {
        if (d.pin.getOnViewport ()) {
            // Snaps pin to timeline tick
            d.timeline.placeEventPin (d.pin, data.event.pageX);
        }
        else {
            d.pin.hide ();
            d.card.show ();
        }
    }
})
