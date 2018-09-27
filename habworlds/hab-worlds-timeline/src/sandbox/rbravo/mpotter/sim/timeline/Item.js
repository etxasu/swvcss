tm.add ('app.sim.timeline.Item', function (o, p, d) {
    o.setup = function (config) {
        var card, cardContainer, cardDetail, contentContainer, data, thumbnail;

        tm.html ('app.sim.timeline.Item', {
            selector: config.selector.event,
            append: true,
            data: config
        })

        // locate the card container and detail container
        d.cardContainer = document.querySelector (config.selector.event);
        d.timelineContainer = document.querySelector (config.selector.timeline);

        d.image = config.image;
        d.selector = config.selector;
        d.name = config.name;
        d.description = config.description;
        d.content = config.content;

        d.card = document.querySelector ('#' + config.id)

        $ (d.card).attr ('unselectable', 'on')
                    .css ('user-select', 'none')
                    .on ('selectstart', false);

        // Display the details of the card when moused over
        $ (d.card).mouseover (o.setCardDetailArea);

        // Hide this dom and create a "push-pin" version of the dom when clicked that stays on the cursor
        $ (d.card).mousedown (o.dragItem);
    },

    o.setCardDetailArea = function (event) {
        event.stopPropagation ();

        document.querySelector (d.selector.detail).innerHTML = '';

        tm.html ('app.sim.timeline.Detail', {
            selector: d.selector.detail,
            append: true,
            data: {
                name: d.name,
                description: d.description,
                content: d.content,
                image: d.image.full
            }
        })
    }

    o.dragItem = function (event) {
        event.stopPropagation ();

        d.pinPos = {
            x: 0,
            y: 0
        };

        o.createDraggableCard ();

        $ (document).on ('mousemove', function (event) {
            event.stopPropagation ();

            if (d.pin) {

                d.pinPos.x = event.pageX - d.pinCenter.x;
                d.pinPos.y = event.pageY - d.pinCenter.y;

                if (o.checkOverTimeline ()) {
                    // console.log ('creating pin')
                    if (!d.svgPin) {
                        o.createDraggablePin ();
                    }

                    d.svgPin.setXToMouse (window.timelineApp.getMouseX ())

                    if (!d.pin.classList.contains ('hide')) {
                        d.pin.classList.add ('hide');
                    }
                    if (d.svgPin.getDom ().classList.contains ('hide')) {
                        d.svgPin.getDom ().classList.remove ('hide');
                    }

                }
                else {
                    if (d.svgPin) {
                        if (!d.svgPin.getDom ().classList.contains ('hide')) {
                            d.svgPin.getDom ().classList.add ('hide');
                        }

                    }

                    if (d.pin.classList.contains ('hide')) {
                        d.pin.classList.remove ('hide');
                    }

                    $(d.pin).css({
                        left:  d.pinPos.x,
                        top:   d.pinPos.y
                    });
                }

            }
        });

        // If the push-pin is over the timeline, contact the timeline and tell it to add an item
        $ (document).on ('mouseup', function (event) {
            event.stopPropagation ();

            if (d.pin) {
                // See where the pin was dropped
                o.dropPin ();

                // Remove the cloned dom
                document.body.removeChild (d.pin)
                d.pin = null;
            }
        });
    }

    o.createDraggableCard = function () {
        if (!d.pin) {
            $ (d.card).removeClass ('hide');

            d.pin = document.createElement ('div')
            d.pin.classList.add ('ui', 'divided', 'link', 'items')
            d.pin.appendChild (d.card.cloneNode (true));
            d.pin.classList.add ('pin');
            document.body.appendChild (d.pin);

            d.pinHeight = $ (d.pin).outerHeight ();
            d.pinWidth = $ (d.pin).outerWidth ();

            d.pinCenter = {
                x: Math.ceil (d.pinWidth/2),
                y: Math.ceil (d.pinHeight/2),
            }

            $ (d.card).addClass ('hide');
        }
    }

    o.createDraggablePin = function () {
        if (!d.svgPin) {
            d.svgPin = window.timelineApp.addItem ({
                owner: o,
                content: d.image.pin,
                name: d.name,
            })
        }
    }

    // Check if the middle of the pin is within the timeline
    // This ensures that the mouseX has been updated by the timeline
    o.checkOverTimeline = function () {
        var myHeight, myLeft, myTop, myLeft, self, selfHeight, selfLeft, selfTop, selfTop;


        myTop = d.pinPos.y,
        myLeft = d.pinPos.x,
        myWidth = 50,
        myHeight = 50;

        self = $ (d.selector.timeline),
        selfLeft = -self.offset().left;
        selfTop = self.offset().top;
        selfWidth = self.width();
        selfHeight = self.height();

        if ( (myLeft + myWidth) > selfLeft &&
            myLeft < (selfLeft + selfWidth) &&
            (myTop + myHeight) > selfTop &&
            myTop < (selfTop + selfHeight) ) {
            return true
        }
        else {
            // The item was not dropped onto the timeline
            // Unhide the list item
            return false
        }
    }

    o.dropPin = function () {
        $ (d.timelineContainer).each ( function (event) {
            var myHeight, myLeft, myTop, myLeft, self, selfHeight, selfLeft, selfTop, selfTop;

            myTop = d.pinPos.y,
            myLeft = d.pinPos.x,
            myWidth = 50,
            myHeight = 50;

            // Check if the pin was dropped within the timeline
            self = $ (d.selector.timeline),
            selfLeft = -self.offset().left;
            selfTop = self.offset().top;
            selfWidth = self.width();
            selfHeight = self.height();

            if ( (myLeft + myWidth) > selfLeft &&
                myLeft < (selfLeft + selfWidth) &&
                (myTop + myHeight) > selfTop &&
                myTop < (selfTop + selfHeight) ) {
                // The item was dropped ontop of the timeline
                // Contact the timeline and add this items information to it
                if (!d.svgPin) {
                    window.timelineApp.addItem ({
                        owner: o,
                        content: d.image.pin,
                        name: d.name,
                    })
                }
            }
            else {
                // The item was not dropped onto the timeline
                // Unhide the list item
                if (!d.svgPin || d.svgPin.getDom ().classList.contains ('hide')) {
                    $ (d.card).removeClass ('hide');
                }
            }
        });
    }
})
