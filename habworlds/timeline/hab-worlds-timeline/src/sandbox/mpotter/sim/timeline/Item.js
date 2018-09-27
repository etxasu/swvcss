tm.add ('app.sim.timeline.Item', function (o, p, d) {
    o.setup = function (config) {
        var card, cardContainer, cardDetail, contentContainer, data, date, simModel, thumbnail, uid;

        d.index = config.index;

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
        d.year = config.year;
        d.currentYear = Number (new Date().getFullYear ());

        o.makeYearRelative ();

        d.readableYear = config.readableYear;
        d.simModel = config.simModel;
        d.uid = config.uid;
        d.id = config.id;
        d.type = config.type;

        if (!config.color) {
            config.color = 'gold'
        }

        d.color = config.color;

        d.card = document.querySelector ('#' + config.id)

        $ (d.card).attr ('unselectable', 'on')
        .css ('user-select', 'none')
        .on ('selectstart', false);

        if (config.type) {
            $ (d.card).addClass (config.type)
        }

        // Display the details of the card when moused over
        $ (d.card).mouseover (o.setCardDetailArea);

        // Hide this dom and create a "push-pin" version of the dom when clicked that stays on the cursor
        $ (d.card).mousedown (o.dragItem);

        // $(d.card).on ('click', function () {
        //     console.log ('*** bob');
        // })

        if (!config.preventRegister) {
            window.timelineApp.registerEvent (o);

            // Setup CAPI variables
            // simModel = config.simModel;
            uid = config.uid;
            date = d.year;

            if (typeof date == 'object') {
                date = date.earliest
            }

            if (window.simcapi) {
                var item, key, list, simData;

                if (!d.simModel) {
                    simData = {
                        name: d.name,
                        enabled: true,
                        index: d.index,
                        discrepency: 0,
                        date: date,
                        userDate: 0,
                        showCorrect: false,
                        isCorrect: false,
                        forceCorrect: false,
                        isPlaced: false,
                        // isSelected: false,
                        showRanges: true,
                        locked: false,
                    }

                    d.simData = simData;

                    // The available data on the sim model
                    // Make a duplicate of the object so our object can be compared as a default
                    simModel = new simcapi.CapiAdapter.CapiModel(
                        Object.assign ({}, simData)
                    );

                    d.simModel = simModel

                    var namespace;

                    namespace = 'Timeline.' + d.type + '.' + d.type + 'Events.Event' + d.type [0].toUpperCase () + d.index;

                    simcapi.CapiAdapter.expose('name', simModel, {
                        alias: namespace + '.name'
                    });
                    simcapi.CapiAdapter.expose('enabled', simModel, {
                        alias: namespace + '.enabled'
                    });
                    simcapi.CapiAdapter.expose('discrepency', simModel, {
                        alias: namespace + '.discrepancy '
                    });
                    simcapi.CapiAdapter.expose('index', simModel, {
                        alias: namespace + '.index'
                    });
                    simcapi.CapiAdapter.expose('isCorrect', simModel, {
                        alias: namespace + '.isCorrect'
                    });
                    simcapi.CapiAdapter.expose('showCorrect', simModel, {
                        alias: namespace + '.showCorrect'
                    });
                    simcapi.CapiAdapter.expose('forceCorrect', simModel, {
                        alias: namespace + '.forceCorrect'
                    });
                    simcapi.CapiAdapter.expose('isPlaced', simModel, {
                        alias: namespace + '.isPlaced'
                    });
                    simcapi.CapiAdapter.expose('date', simModel, {
                        alias: namespace + '.date'
                    });
                    simcapi.CapiAdapter.expose('userDate', simModel, {
                        alias: namespace + '.userDate'
                    });
                    // simcapi.CapiAdapter.expose('isSelected', simModel, {
                    //     alias: namespace + '.isSelected'
                    // });
                    simcapi.CapiAdapter.expose('showRanges', simModel, {
                        alias: namespace + '.showRanges'
                    });
                    simcapi.CapiAdapter.expose('locked', simModel, {
                        alias: namespace + '.locked'
                    });

                    // Set listeners for when data is changed so the sim is actually updated
                    d.simModel.on ('change:name', function(model, name) {
                        $ ('#' + config.id + ' > div > .header').html (name)
                    });

                    d.simModel.on ('change:enabled', function(model, enabled) {
                        o.setEnabled (enabled);

                        if (enabled) {
                            document.querySelector ('#' + config.id).classList.remove ('hide')
                        }
                        else {
                            document.querySelector ('#' + config.id).classList.add ('hide')
                        }

                        window.timelineApp.updateCapiEventsToUse (d.type);
                    });

                    d.simModel.on ('change:isPlaced', function(model, placed) {
                        p.capiIsPlaced (placed);
                        if (d.correctPin) { d.correctPin.setStudentAnswer ( d.svgPin.getX () ) }
                    });

                    d.simModel.on ('change:userDate', function(model, year) {
                        if (isNaN (year)) {
                            document.querySelector ('#' + config.id).classList.remove ('hide')
                            if (d.svgPin) {
                                d.svgPin.hide ();
                            }
                            // simModel.set ('isPlaced', false)
                        }
                        else {

                            document.querySelector ('#' + config.id).classList.add ('hide')

                            if (!d.svgPin) {
                                o.createDraggablePin ();
                            }

                            // d.svgPin.setXPos (year)
                            // d.svgPin.setX (window.timelineApp.getCurrentXScale ());
                            if (d.correctPin) { d.correctPin.setStudentAnswer (d.svgPin.getX ()) }

                            // Do not uncomment this. The pin needs to update the userDate as it moves.
                            // d.svgPin.setXPos (year)
                            // d.svgPin.setX (window.timelineApp.getCurrentXScale ());
                            // simModel.set ('isPlaced', true)
                        }
                    });

                    d.simModel.on ('change:showCorrect', function (model, showCorrect) {
                        if (d.svgPin) {
                            if ( !isNaN (d.year) ) {
                                if (showCorrect) {
                                    o.checkCorrectAnswer ();
                                }
                                else {
                                    if (d.correctPin) { d.correctPin.hide () }
                                }

                                if (d.correctPin) { d.correctPin.setStudentAnswer ( d.svgPin.getX () ) }
                            }
                            else {
                                d.svgPin.markAsCorrect ();
                            }


                            o.togglePinMovement (!showCorrect);
                        }
                    })

                    d.simModel.on ('change:forceCorrect', function(model, isCorrect){
                        var year

                        o.updateSimModel ({
                            isCorrect: isCorrect
                        })

                            // console.log ('Place pin on timeline')
                            if (isCorrect) {
                                if ( !isNaN (d.year) ) {
                                    if (!d.svgPin) {
                                        o.createDraggablePin ();
                                    }

                                    year = d.year

                                    if (typeof year == 'object') {
                                        year = year.canon;
                                    }


                                    d.svgPin.setPosToMouse (0, 0);
                                    d.svgPin.setXPos (year)
                                    d.svgPin.setX (window.timelineApp.getCurrentXScale ());

                                    o.updateSimModel ({
                                        isPlaced: true,
                                        userDate: year
                                    })

                                    o.checkCorrectAnswer ();
                                }

                            o.togglePinMovement (!isCorrect);

                            if (d.correctPin) { d.correctPin.setStudentAnswer (d.svgPin.getX ()) }
                        }
                    });

                    d.simModel.on ('change:showRanges', function(model, show){
                        if (d.svgPin && d.svgPin.setRangeViewable) {
                            try {
                                d.svgPin.setRangeViewable (show)
                            }
                            catch (error) {}
                        }
                    });

                    d.simModel.on ('change:locked', function (model, locked) {
                        if (d.svgPin) {
                            if (locked) {
                                d.svgPin.disable ();
                            }
                            else {
                                d.svgPin.enable ();
                            }
                        }
                    })
                }
            }
            // ---
        }
    },

    p.capiIsPlaced = function (placed) {
        if (d.svgPin) {
            if (placed) {
                document.querySelector ('#' + d.id).classList.add ('hide')
                window.timelineApp.pinPlaced ();
                d.svgPin.unhide ();
            }
            if (!placed) {
                document.querySelector ('#' + d.id).classList.remove ('hide')
                window.timelineApp.pinRemoved ();
                d.svgPin.hide ();
            }
        }
    }

    o.enforceCapi = function () {
        var item, key, list, myValue, simValue;

        list = Object.keys (d.simData)
        for (key in list) {
            item = list [key];

            simValue = d.simModel.get (item);
            myValue = d.simData [item]
            if (simValue !== myValue) {
                d.simModel.set (item, myValue)
                d.simModel.set (item, simValue)
            }
        }
    }

    o.getEnabled = function (data) {
        if (d.simModel) {
            return d.simModel.enabled
        }
    }

    o.getName = function () {
        return d.name;
    }

    o.getUid = function () {
        return d.uid;
    }

    o.getIndex = function () {
        return d.index;
    }

    o.getType = function () {
        return d.type;
    }

    o.updateSimModel = function (data) {
        var item, list, key;

        // console.log ('The sim model', d.simModel);

        list = data
        for (key in list) {
            item = list [key];

            // console.log ('Updating', key, 'to', item)
            // Check to make sure that the sim
            if (d.simModel) {
                d.simModel [key] = item;
            }
        }
    }

    o.checkCorrectAnswer = function () {
        var correctAnswer, isCorrect, roundedAnswer, roundedStudentAnswer, studentAnswer;
        // Check if forceCorrect is true, if so, automatically mark this as correct

        if ( !isNaN (d.year) ) {
            correctAnswer = d.year;
            if (typeof correctAnswer == 'object') { correctAnswer = d.year.canon }

            if (d.svgPin) {
                studentAnswer = Math.round (d.svgPin.getX ());

                d.svgPin.disable ();
            }
            else {
                studentAnswer = 20000000000 + Math.abs (correctAnswer)
            }

            roundedAnswer = o.roundLocation (correctAnswer);
            roundedStudentAnswer = o.roundLocation (studentAnswer);

            // Accounting for possible rounding errors
            // ---
            // console.log ('---')
            // console.log (d.name)
            // console.log ('The student answer:', roundedStudentAnswer)
            // console.log ('The correct answer:', roundedAnswer)
            // console.log ('Was there a rounding error?')
            if (roundedStudentAnswer == (roundedAnswer + 0.01)) {
                isCorrect = true
            }

            if (roundedStudentAnswer == (roundedAnswer - 0.01)) {
                isCorrect = true
            }
            // ---

            if (roundedStudentAnswer == roundedAnswer || d.year === 'special') {
                isCorrect = true;
            }

            o.updateSimModel ({
                discrepency: Math.abs ( Math.abs (studentAnswer) - Math.abs (correctAnswer) )
            })

            // Determine if the pin was accurately enough placed to be correct
            // update the isCorrect simModel variable

            // console.log ('Pin was placed at:', studentAnswer, ' and should go on the year:', correctAnswer);
            // console.log (isCorrect);
            if (!isCorrect) {
                if (d.svgPin) {
                    if (!d.correctPin) {
                        o.createCorrectAnswerPin ();
                    }
                    else {
                        d.correctPin.unhide ();
                    }
                    // console.log ('Placing correct answer...');
                    d.svgPin.markAsWrong (d.correctPin);
                    // d.correctPin.setStudentAnswer (d.svgPin.getX ())
                    var correctYear

                    if (d.year.canon !== undefined) {
                        correctYear = d.year.canon
                    }
                    else {
                        correctYear = d.year
                    }

                    d.correctPin.setXPos (correctYear)
                    d.correctPin.setX (window.timelineApp.getCurrentXScale ());
                }
            }
            else {
                o.updateSimModel ({
                    isCorrect: true
                })

                if (d.svgPin) {
                    d.svgPin.markAsCorrect ();
                }
            }
        }
        else {
            if (d.svgPin) {
                d.svgPin.markAsCorrect ();
            }
        }

    }

    o.roundLocation = function (value) {
        var originalValue;

        originalValue = value;
        value = Math.abs (value);

        if (value >= 1000000000) {
            value /= 1000000000
            value = value.toFixed (1)
        }
        else if (value >= 1000000) {
            value /= 1000000
            value = value.toFixed (1)
        }
        else if (value >= 100000) {
            value /= 1000
            value = value.toFixed (1)
        }
        else if (value >= 10000) {
            value /= 1000
            value = value.toFixed (1)
        }
        else {
            value = value.toFixed (0)
        }

        if (originalValue < 1) {
            value *= -1
        }

        return value
    }

    o.hideCorrectAnswer = function () {
        if (d.correctPin) {
            d.correctPin.hide ();
        }

        if (d.svgPin) {
            d.svgPin.enable ();
        }
    }

    o.createCorrectAnswerPin = function () {
        console.log (d.year, 'is a number?', !isNaN (d.year));

        pinPos = d.svgPin.getX ();
        console.log (pinPos)

        if ( !isNaN (d.year) ) {
            var pinPos, year;
            // console.log ('Pin was incorrectly placed, creating where it should go');
            if (!d.correctPin) {
                year = d.year;

                if (typeof d.year == 'object') {
                    year = d.year.canon;
                }
                else if (typeof year != 'number' || isNaN (year)) {
                    year = d.simModel.get ('userDate');

                    if (typeof year != 'number' || isNaN (year)) {
                        year = 0;
                    }
                }


                d.correctPin = window.timelineApp.addItem ({
                    owner: o,
                    content: d.image.pin,
                    name: d.name,
                    year: d.year,
                    color: 'green',
                    xPos: year,
                    type: 'app.sim.timeline.pin.Correction',
                    width: 35,
                    height: 25
                })


                if (d.svgPin) {
                    d.correctPin.setStudentAnswer (d.svgPin.getX ())
                }
                d.correctPin.setXPos (year);
                d.correctPin.setX (window.timelineApp.getCurrentXScale ());
                d.correctPin.updateYearText ();
                d.correctPin.setYearLabel ( d.correctPin.getYearLabel () );

                o.updateSimModel ({
                    userDate: pinPos
                })
            }
        }
    }

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

    o.setEnabled = function (enabled) {
        if (d.simModel) {
            d.simModel.set('enabled', enabled);

            if (!enabled) {
                if (d.svgPin) {
                    d.svgPin.hide ()
                }
            }
        }
    }

    o.setIndex = function (index) {
        d.index = index;
    }

    o.dragItem = function (event) {
        event.stopPropagation ();

        // If the pin was created and is visible (meaning it is on the timeline)
        if (d.svgPin && !d.svgPin.getDom ().classList.contains ('hide')) {
            window.timelineApp.pinRemoved ();
        }

        d.pinPos = {
            x: 0,
            y: 0
        };

        o.createDraggableCard ();

        // Draw the hover pin item.
        d.pinPos.x = event.pageX - d.pinCenter.x;
        d.pinPos.y = event.pageY - d.pinCenter.y;

        $(d.pin).css({
            left:  d.pinPos.x,
            top:   d.pinPos.y
        });

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

                    if (!d.timeout) {
                        d.timeout = setInterval (function () {
                            // console.log ('here')
                            d.svgPin.setPosToMouse (
                                window.timelineApp.getMouseX (),
                                // window.timelineApp.getMouseY ()
                                0
                            )
                        }, 1000 / 60)
                    }

                    if (!d.pin.classList.contains ('hide')) {
                        d.pin.classList.add ('hide');
                    }
                    if (d.svgPin.getDom ().classList.contains ('hide')) {
                        d.svgPin.unhide ();
                    }

                }
                else {
                    if (d.svgPin) {
                        if (!d.svgPin.getDom ().classList.contains ('hide')) {
                            d.svgPin.hide ();
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
        var card, container, parent, listArea;
        if (!d.pin) {
            $ (d.card).removeClass ('hide');

            d.pin = document.createElement ('div')
            d.pin.classList.add ('asu-sese-etx')

            parent = document.createElement ('div');
            d.pin.appendChild (parent);

            listArea = document.createElement ('div')
            listArea.classList.add ('ui', 'list')

            card = d.card.cloneNode (true)
            listArea.appendChild (card);
            parent.appendChild (listArea);

            // console.log ('*** card:', d.card);
            d.pin.className = 'event-item-dragbox';
            d.pin.children [0].children [0].children [0].className = '';

            // console.log ('*** card:', d.pin);
            // console.log ('*** card:', );

            // d.pin = document.createElement ('div')
            // d.pin.classList.add ('ui', 'divided', 'link', 'items')
            // d.pin.classList.add ('pin');
            document.body.appendChild (d.pin);

            $ (d.pin).css ({
                position: 'absolute',
            });


            d.pinHeight = $ (d.pin).outerHeight ();
            d.pinWidth = $ (d.pin).outerWidth ();

            // $ (parent).css ({
            //     width: d.pinWidth,
            //     height: d.pinHeight,
            // });

            $ (card).css ({
                width: d.pinWidth,
            });

            // $ (listArea).css ({
            //     'margin-top': 0
            // });

            d.pinCenter = {
                x: Math.ceil (d.pinWidth/2),
                y: Math.ceil (d.pinHeight/2),
            }

            // console.log ('*** here:', d.pinCenter)

            $ (d.card).addClass ('hide');
        }
    }

    o.createDraggablePin = function () {
        if (!d.svgPin) {
            d.svgPin = window.timelineApp.addItem ({
                owner: o,
                content: d.image.pin,
                name: d.name,
                year: d.year,
                color: d.color,
                width: 35,
                height: 25,
            })
        }
    }

    o.togglePinMovement = function (enabled) {
        if (d.svgPin) {
            if (enabled) {
                d.svgPin.enable ();
            }
            else {
                d.svgPin.disable ();
            }
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

        self = $ (d.selector.timeline + ' > svg'),
        selfLeft = -110; //self.offset().left/2;
        selfTop = self.offset().top;
        selfWidth = self.width();
        selfHeight = self.height();

        // console.log ('left:', selfLeft);
        // console.log ('width:', (myLeft + myWidth));

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

            clearTimeout (d.timeout);
            d.timeout = null;

            myTop = d.pinPos.y,
            myLeft = d.pinPos.x,
            myWidth = 50,
            myHeight = 50;

            // Check if the pin was dropped within the timeline
            self = $ (d.selector.timeline + ' > svg');
            selfLeft = self.offset().left/2;
            selfTop = self.offset().top;
            selfWidth = self.width();
            selfHeight = self.height();

            if ( (myLeft + myWidth) > selfLeft &&
                myLeft < (selfLeft + selfWidth) &&
                (myTop + myHeight) > selfTop &&
                myTop < (selfTop + selfHeight) ) {

                // The item was dropped ontop of the timeline
                // Contact the timeline and add this items information to it
                // console.log ('Pin placed on timeline.')
                // window.timelineApp.pinPlaced ();
                // console.log ('Pin is on the timeline')
                window.timelineApp.pinPlaced ();
                d.svgPin.setPosToMouse (window.timelineApp.getMouseX (), 0);
                d.svgPin.setX (window.timelineApp.getCurrentXScale ());

                o.updateSimModel ({
                    isPlaced: true
                })
            }
            else {
                // The item was not dropped onto the timeline
                // Unhide the list item
                if (!d.svgPin || d.svgPin.getDom ().classList.contains ('hide')) {
                    $ (d.card).removeClass ('hide');

                    o.updateSimModel ({
                        isPlaced: false
                    })
                }
                // Otherwise the pin is still on the timeline
                else if (d.svgPin) {
                    window.timelineApp.pinPlaced ();

                    o.updateSimModel ({
                        isPlaced: true
                    })
                }
            }
        });
    }

    o.unhide = function () {
        $ (d.card).removeClass ('hide');
    }

    o.makeYearRelative = function () {
        if (typeof d.year == 'object') {

            if (d.year.latest < d.currentYear) { d.year.latest = Math.abs (d.currentYear - Math.abs (d.year.latest)) * -1 }
            else { d.year.latest -= d.currentYear; }

            if (d.year.earliest < d.currentYear) { d.year.earliest =  Math.abs ( d.currentYear - Math.abs (d.year.earliest)) * -1 }
            else { d.year.earliest -= d.currentYear; }

            if (d.year.canon < d.currentYear) { d.year.canon =  Math.abs ( d.currentYear - Math.abs (d.year.canon)) * -1 }
            else { d.year.canon -= d.currentYear; }

        }
        else {
            if (d.year < d.currentYear) {
                d.year =  Math.abs ( d.currentYear - Math.abs (d.year)) * -1;
            }
            else {
                d.year -= d.currentYear;
            }
        }
    }
})
