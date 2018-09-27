tm.add ('app.Timeline.Item', function (o, p, d) {
    o.setup = function (config) {
        var card, cardContainer, cardDetail, contentContainer, thumbnail;

        // Store html references
        d.itemHtml = config.itemHtml;
        d.detailHtml = config.detailHtml;
        d.pinImage = config.timelinePinImage;

        // locate the card container and detail container
        d.cardContainer = document.querySelector (config.container);
        d.cardDetail = document.querySelector (config.detailContainer);

        // Create node to store items in
        d.card = document.createElement ('div');
        d.card.classList.add ('item');
        d.card.innerHTML = d.itemHtml;

        // Prevent text inside of list item from being hightlighted because it messes with the click and drag.
        $ (d.card).attr('unselectable', 'on')
                    .css('user-select', 'none')
                    .on('selectstart', false);

        // Display the details of the card when moused over
        $ (d.card).mouseover (function () {
            o.setCardDetailArea ()
        });

        // Hide this dom and create a "push-pin" version of the dom when clicked that stays on the cursor
        $ (d.card).mousedown (function () {
            d.pinPos = {
                x: 0,
                y: 0
            };
            d.pin = d.card.cloneNode (true);
            d.pin.classList.add ('pin');
            document.body.appendChild (d.pin);

            $ (d.card).addClass ('hide');

            $ (document).on ('mousemove', function (evnt) {
                if (d.pin) {
                    d.pinPos.x = evnt.pageX - 30;
                    d.pinPos.y = evnt.pageY - 100;

                    $(d.pin).css({
                        left:  d.pinPos.x,
                        top:   d.pinPos.y 
                    });
                }
            });

            // If the push-pin is over the timeline, contact the timeline and tell it to add an item
            $ (document).on ('mouseup', function (evnt) {
                var myHeight, myLeft, myTop, myLeft;

                if (d.pin) {
                    myTop = $ (d.pin).offset().top,
                    myLeft = $ (d.pin).offset().left,
                    myWidth = $ (d.pin).width (),
                    myHeight = $ (d.pin).height ();

                    $ ('#visualization').each ( function (evnt) {
                        var self, selfHeight, selfLeft, selfTop, selfTop;

                        self = $ (this),
                        selfLeft = self.offset().left;
                        selfTop = self.offset().top;
                        selfWidth = self.width();
                        selfHeight = self.height();

                        if ( (myLeft + myWidth) > selfLeft &&
                            myLeft < (selfLeft + selfWidth) &&
                            (myTop + myHeight) > selfTop &&
                            myTop < (selfTop + selfHeight) ) {
                            // The item was dropped ontop of the timeline
                            // Contact the timeline and add this items information to it
                            window.timelineApp.addItem ({
                                owner: o,
                                content: d.pinImage,
                            })
                        }
                        else {
                            // The item was not dropped onto the timeline
                            // Unhide the list item
                            $ (d.card).removeClass ('hide');
                        }
                    });

                    // Either way, the true pin is removed
                    document.body.removeChild (d.pin)
                    d.pin = null;
                }
            });
        })

        // Add the created timeline item to the page
        d.cardContainer.appendChild (d.card);
    },

    o.setCardDetailArea = function () {
        d.cardDetail.innerHTML = d.detailHtml;
    }
})
