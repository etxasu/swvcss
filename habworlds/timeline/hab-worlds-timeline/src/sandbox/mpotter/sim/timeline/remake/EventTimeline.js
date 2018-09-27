tm.add ('app.sim.timeline.Event', ['app.sim.Timeline'], function (o, p, d) {
    o.setup = function (config) {
        d.xAxis.tickFormat (o.formatTick)

        d.SUFFIX = {
            BILLION: 'Billions of Years',
            MILLION: 'Millions of Years',
            THOUSAND: 'Thousands of Years',
            NONE: 'Years',
            SHORT: {
                BILLION: 'Ga',
                MILLION: 'Ma',
                THOUSAND: 'ka',
            }
        }

        d.zoomLevel = {
            farthest: 1,
            closest: 100000,
            current: 1,
        }

        // d.zoomLevelList = [
        //     d.zoomLevel.farthest, // 0 1 Billion year increments
        //     10, // 1 100 Million year increments
        //     50, // 2 10 Million year increments
        //     100, // 3 1 Million year increments
        //     500, // 4 100 Thousand year increments
        //     1000, // 5 10 Thousand year increments
        //     5000, // 6 1 Thousand year increments
        //     10000, // 7 100 year increments
        //     50000, // 8 10 year increments
        //     d.zoomLevel.closest, // 9 1 year increments
        // ]

        d.zoomLevelList = o.generateZoomLevelList (10);

        // console.log ('Hand made zoom level list:', d.zoomLevelList);
        // console.log ('Progammaticaly made:', o.generateZoomLevelList (10))

        d.bisector = d3.bisector (function(d) { return d; }).left;

        d.container = $ (config.selector.container)
        d.uid = 0;
        d.mouseX = 0;
        d.domainX = 0;
        d.pinList = [];
        window.timelineApp = o;
        d.currentScale = {k: 1, x: 0, y: 165}
        d.zoomLabel = $ (config.selector.zoomLabel);
        d.eventLabel = $ (config.selector.eventPlacedLabel);
        d.svg_dy = d.svg_dy*2;
        d.zoomLevelName = d.SUFFIX.BILLION;
        d.eventList = [];
        d.totalEventCount = 0;
        d.currentEventCount = 0;
        d.typeRepo = {};

        o.updateEventCountTracker ();
        o.zoom (1);

        if (window.simcapi) {
            simModel = new simcapi.CapiAdapter.CapiModel({
                showCorrect: false,
                zoomDisabled: false,
                zoomMin: d.initialDomain [0],
                zoomMax: d.initialDomain [1],
                // zoomMin: 1,
                // zoomMax: 1e+9,
                // This can create problems if more items are added in the future
                cosmicEventsToUse: [],
                biologicalEventsToUse: [],
                anthropologicEventsToUse: [],
                geologicalEventsToUse: [],
                specialEventsToUse: []
            });

            simcapi.CapiAdapter.expose('showCorrect', simModel, {
                alias: 'Timeline.Controls.ShowCorrect'
            });

            simcapi.CapiAdapter.expose('zoomDisabled', simModel, {
                alias: 'Timeline.Controls.Zoom.disabled'
            });

            simcapi.CapiAdapter.expose('zoomMin', simModel, {
                alias: 'Timeline.Controls.Zoom.Min Years'
            });

            simcapi.CapiAdapter.expose('zoomMax', simModel, {
                alias: 'Timeline.Controls.Zoom.Max Years'
            });

            simcapi.CapiAdapter.expose('cosmicEventsToUse', simModel, {
                alias: 'Timeline.EventsToUse.Cosmic'
            });

            simcapi.CapiAdapter.expose('biologicalEventsToUse', simModel, {
                alias: 'Timeline.EventsToUse.Biological'
            });

            simcapi.CapiAdapter.expose('anthropologicEventsToUse', simModel, {
                alias: 'Timeline.EventsToUse.Anthropologic'
            });

            simcapi.CapiAdapter.expose('geologicalEventsToUse', simModel, {
                alias: 'Timeline.EventsToUse.Geological'
            });

            simcapi.CapiAdapter.expose('specialEventsToUse', simModel, {
                alias: 'Timeline.EventsToUse.Special'
            });

            simModel.on ('change:cosmicEventsToUse', function(model, eventsToUse){
                o.capiEventToUse ('cosmic', eventsToUse);
            });
            simModel.on ('change:biologicalEventsToUse', function(model, eventsToUse){
                o.capiEventToUse ('biological', eventsToUse);
            });
            simModel.on ('change:anthropologicEventsToUse', function(model, eventsToUse){
                o.capiEventToUse ('anthropologic', eventsToUse);
            });
            simModel.on ('change:geologicalEventsToUse', function(model, eventsToUse){
                o.capiEventToUse ('geological', eventsToUse);
            });
            simModel.on ('change:specialEventsToUse', function(model, eventsToUse){
                o.capiEventToUse ('special', eventsToUse);
            });

            simModel.on ('change:showCorrect', function(model, value) {
                if (value) {
                    o.checkCorrectAnswer ();
                }
                else {
                    console.log ('Hiding answers...')
                    o.hideCorrectAnswer ();
                }
            });

            simModel.on ('change:zoomDisabled', function(model, disabled) {
                d.zoomDisabled = disabled;

                if (window.minimap) {
                    window.minimap.checkBrushVisible ();
                }
            });

            simModel.on ('change:zoomMin', function(model, value) {
                if (!isNaN (value)) {
                    d.newDomain [0] = value
                    d.xScale2.domain (d.newDomain)

                    window.minimap.updateDomain (d.newDomain);
                    // d.zoom.scaleExtent ([ value, d.zoomLevel.closest ]);
                    // d.zoomLevel.farthest = value;
                    // d.zoomLevelList = o.generateZoomLevelList (10);
                    o.zoom (0);
                }
            });

            simModel.on ('change:zoomMax', function(model, value) {
                var minimap;
                if (!isNaN (value)) {
                    d.newDomain [1] = value
                    d.xScale2.domain (d.newDomain);

                    window.minimap.updateDomain (d.newDomain);
                    // d.zoom.scaleExtent ([ d.zoomLevel.farthest, value ]);
                    // d.zoomLevel.closest = value;
                    // d.zoomLevelList = o.generateZoomLevelList (10);
                    o.zoom (0);
                }
            });

            d.simModel = simModel;
        }
    }

    o.capiEventToUse = function (type, eventsToUse, ignoreChange) {
        var item, key, list, subItem, subKey, subList;

        if (d.ignoreChange) { d.ignoreChange = false; return; }

        var enabled = false;

        // Deactivate all active events in this category
        list = d.typeRepo [type];
        for (key in list) {
            item = list [key];

            if (item) {
                item.setEnabled (enabled)
            }
        }

        if (enabled) {return}

        list = eventsToUse;
        subList = d.typeRepo [type];
        for (key in list) {
            item = list [key];

            // console.log ('enabling item with an index of', item)
            o.capiEnableEvent (item, subList)
        }
    }

    o.capiEnableEvent = function (id, repo) {
        var item, key, list;

        // console.log (repo);

        list = repo;
        for (key in list) {
            item = list [key];

            if (item && item.getIndex () == id) {
            // if (key == id) {
                item.setEnabled (true);
                break;
            }
        }
    }

    o.registerEvent = function (evnt) {
        var addType, end, index, item, key, list, simModel, type;

        addType = true;
        type = evnt.getType ();

        list = Object.keys (d.typeRepo);
        for (key in list) {
            item = list [key];

            if (item === type) {
                addType = false;
                break;
            }
        }

        if (addType) {
            d.typeRepo [type] = [];
            end = 30;
            for (key = 0; key <= end; key++) {
                d.typeRepo [type].push ('');
            }
        }

        index = evnt.getIndex ();


        if (window.simcapi) {
            if (addType) {

                simModel = new simcapi.CapiAdapter.CapiModel({
                    enabled: true,
                    type: type
                });

                // Expose the data so teachers can modify it
                simcapi.CapiAdapter.expose('enabled', simModel, {
                    alias: 'Timeline.' + type + '.Enabled'
                });

                simModel.on ('change:enabled', function(model, enabled){
                    var type;

                    type = model.attributes.type;

                    list = d.typeRepo [type];
                    for (key in list) {
                        item = list [key];

                        if (item && item.setEnabled) {
                            item.setEnabled (enabled);
                        }
                    }
                });
            }

        }

        d.typeRepo [type] [index] = evnt;
        d.eventList.push (evnt);
        d.totalEventCount = d.eventList.length;
        o.updateCapiEventsToUse (type)
        o.updateEventCountTracker ();
    }

    o.updateCapiEventsToUse = function (type) {
        var end, int, item, list, modelArray;

        modelArray = []

        list = d.typeRepo [type];
        end = list.length;
        for (int = 1; int < end; int++) {
            item = list [int];

            if (item !== '') {
                // console.log ('Is', item.getName (), 'enabled?', item.getEnabled ())
                if (item.getEnabled () !== false) {
                    modelArray.push (Number (int));
                }
            }
        }

        // console.log ('Active events for', type, modelArray)
        d.ignoreChange = true;
        d.simModel.set (type + 'EventsToUse', modelArray)
    }

    o.checkCorrectAnswer = function () {
        var item, key, list;

        list = d.eventList;
        for (key in list) {
            item = list [key];

            // Make sure the item exists, can check for correct answers, and is even being used.
            if ( item && item.checkCorrectAnswer && item.getEnabled () ) {
                item.checkCorrectAnswer ();
            }
        }
    }

    o.hideCorrectAnswer = function () {
        var item, key, list;

        list = d.eventList;
        for (key in list) {
            item = list [key]

            if ( item && item.hideCorrectAnswer ) {
                item.hideCorrectAnswer ();
            }
        }
    }

    o.addItem = function (data) {
        var color, distanceFromBottom, height, newPin, pointList, type, width, x, xPos;
        // Take the content of the data
        if (data) {

            if (data.setup) {
                newPin = data
            }
            else {
                if (data.x === undefined) { data.x = d.mouseX }
                if (data.xPos === undefined) { data.xPos = d.domainX }

                if (!data.type) {
                    if (typeof data.year == 'object') {
                        type = 'app.sim.timeline.pin.Range'
                    }
                    else {
                        type = 'app.sim.timeline.Pin'
                    }
                }
                else {
                    type = data.type;
                }

                if (data.height === undefined) {data.height = 25}
                if (data.width === undefined) {data.width = 25}

                newPin = tm.new (type, {
                    color: data.color,
                    content: data.content,
                    distanceFromBottom: 55,
                    height: data.height,
                    initialX: d.mouseX,
                    name: data.name,
                    owner: data.owner,
                    timeline: o,
                    uid: d.uid,
                    width: data.width,
                    xPos: data.xPos,
                    xScale: d.xScale2,
                    year: data.year
                })
            }

            d.pinList.push (
                newPin
            )

            // Increment the unique id
            d.uid++;

            return newPin
        }
    }

    o.getEventList = function () {
        return d.eventList;
    }

    o.pinPlaced = function () {
        d.currentEventCount++

        o.updateEventCountTracker ();
    }

    o.pinRemoved = function () {
        d.currentEventCount--

        o.updateEventCountTracker ();
    }

    o.clearTimeline = function () {
        var item, key, list;

        list = d.pinList;
        for (key in list) {
            item = list [key];

            if (item) { item.remove () }
        }

        d.currentEventCount = 0
        o.updateEventCountTracker ();
        // console.log ('Clearing events')
    }

    o.generateZoomLevelList = function (levelCount) {
        var increment, int, end, zoomLevelList;
        if (!levelCount) { levelCount = 10 };

        zoomLevelList = [d.zoomLevel.farthest];
        end = levelCount / 2 - 1;
        for (int = 1; int <= end; int++) {
            zoomLevelList.push (
                d.zoomLevel.farthest * Math.pow (10, int)
            )

            zoomLevelList.push (
                (d.zoomLevel.farthest * Math.pow (10, int + 1) ) / 2
            )
        }

        zoomLevelList.push (d.zoomLevel.closest);

        return zoomLevelList;
    }

    o.getCurrentXScale = function () {
        return d.currentXScale;
    }

    o.getMouseX = function () {
        return d.mouseX;
    }

    o.getMouseY = function () {
        return d.mouseY;
    }

    o.getDomainX = function () {
        return d.domainX
    }

    o.getMargin = function () {
        return d.margin
    }

    o.getXAxis = function () {
        return d.xAxis;
    }

    o.getXScale2 = function () {
        return d.xScale2;
    }

    o.getZoomLevel = function () {
        return d.zoomLevel
    }

    o.getCurrentZoom = function () {
        var item, list, key;

        list = d.zoomLevelList
        for (key in list) {
            item = list [key];

            if (item !== undefined) {
                // console.log (key, ' => ', Math.abs (d.zoomLevel.current), ' : ', item)
                if (Math.abs (d.zoomLevel.current) <= item) {
                    // console.log ('Current zoom level:', key)
                    return Number (key)
                }
            }
        }
    }

    o.getZoomLevelList = function () {
        return d.zoomLevelList
    }

    o.formatTick = function (tick) {
        var abs, difference, item, key, label, lastTick, list, suffix, tickA, tickB, zoom;
        // 1 = 1 year
        tick = Number (tick);
        abs = Math.abs (tick);
        suffix = '';

        // Compare the first two ticks and find the difference between them
        // This will let us know how close we are and what format to display the tick in
        // console.log ('The ticks: ', d.xScale.ticks ())
        tickA = Math.abs (d.xScale.ticks () [0])
        tickB = Math.abs (d.xScale.ticks () [1])

        difference = Math.abs (tickA - tickB);

        if (tick == d.xScale.ticks () [d.xScale.ticks ().length - 1]) {
            lastTick = true;
        }

        // console.log ('The difference between ticks:', difference)

        if (tick !== 0) {
            zoom = o.getCurrentZoom ();

            // console.log (zoom);

            switch (zoom) {
                case 0:
                    d.zoomLevelName = d.SUFFIX.BILLION
                    break;
                case 1:
                    d.zoomLevelName = d.SUFFIX.MILLION
                    break;
                case 2:
                    d.zoomLevelName = d.SUFFIX.MILLION
                    break;
                case 3:
                    d.zoomLevelName = d.SUFFIX.MILLION
                    break;
                case 4:
                    d.zoomLevelName = d.SUFFIX.THOUSAND
                    break;
                case 5:
                    d.zoomLevelName = d.SUFFIX.THOUSAND
                    break;
                case 6:
                    d.zoomLevelName = d.SUFFIX.THOUSAND
                    break;
                case 7:
                    d.zoomLevelName = d.SUFFIX.NONE
                    break;
                case 8:
                    d.zoomLevelName = d.SUFFIX.NONE
                    break;
                case 9:
                    d.zoomLevelName = d.SUFFIX.NONE
                    break;
            }

            label = abs;

            // Show more detailed numbers the closer the ticks are
            if (abs >= 1000000000) {
                suffix = ' ' + d.SUFFIX.SHORT.BILLION

                label /= 1000000000

                if (difference > 500000000) {
                    label = label.toFixed (0)
                }
                if (difference == 500000000) {
                    label = label.toFixed (1)
                }
                // console.log (difference);
            }
            else if (abs >= 1000000) {
                suffix = ' ' + d.SUFFIX.SHORT.MILLION

                label /= 1000000

                if (difference > 50000000) {
                    label = label.toFixed (0)
                }
                else if (difference == 50000000) {
                    label = label.toFixed (1)
                }
            }
            else if (abs >= 100000) {
                suffix = ' ' + d.SUFFIX.SHORT.THOUSAND

                label /= 1000

                if (difference > 50000000) {
                    label = label.toFixed (0)
                }
                else if (difference == 50000000) {
                    label = label.toFixed (1)
                }
            }
            else if (abs >= 10000) {
                suffix = ' ' + d.SUFFIX.SHORT.THOUSAND

                label /= 1000

                if (difference > 50000000) {
                    label = label.toFixed (0)
                }
                else if (difference == 50000000) {
                    label = label.toFixed (1)
                }
            }
            else {
                label = label.toFixed (0)
            }

            if (tick < 1) {
                label *= -1
            }
        }
        else {
            label = tick
        }

        label = label + ' ' + suffix;

        return label
    }

    // o.override ({
    //     handleZoom: function () {
    //         var duration, list, item, key, zoomDistance;
    //
    //         // Keep track of the original domain, but modify the visible one
    //         d.xScale.domain ( d3.event.transform.rescaleX (d.xScale2).domain() );
    //
    //         o.updateZoomTracker (d3.event.transform.k)
    //
    //         duration = 0;
    //
    //         if (d.zoomByButton) {
    //             duration = 350;
    //             d.zoomByButton = false;
    //         }
    //
    //         d.x_axis.transition ()
    //             .duration( duration )
    //             .call( d.xAxis.scale ( d3.event.transform.rescaleX (d.xScale2) ) );
    //
    //         d.currentScale = d3.event.transform;
    //
    //         // re-draw circles using new x-axis scale; ref [3]
    //         var new_xScale = d3.event.transform.rescaleX(d.xScale2);
    //
    //         d.currentXScale = new_xScale;
    //         // Call the pin objects and pass them new_xScale for their new X position
    //         list = d.pinList;
    //         for (key in list) {
    //             item = list [key];
    //
    //             if (item) {
    //                 item.setX ( new_xScale );
    //             }
    //         }
    //     }
    // })

    o.updateZoomTracker = function (zoomLevel) {
        var item, key, list, percent;

        // console.log (zoomLevel);
        d.zoomLevel.current = zoomLevel;

        if (d.zoomTracker) {
            if (zoomLevel == d.zoomLevel.closest) { percent = 100 }
            else if (zoomLevel == d.zoomLevel.farthest) { percent = 0 }
            else {
                list = d.zoomLevelList;
                for (key in list) {
                    item = list [key];

                    // console.log ('Checking if zoom is at', (Number (key)) * 10, '%')
                    // console.log ('Zoomlevel ', zoomLevel, 'is less than zoom of', item, '? ', zoomLevel < item)

                    if (zoomLevel <= item) {
                        percent = Number (key) * 10
                        break;
                    }
                }
            }

            d.zoomTracker.progress ({
                percent: percent
            })
        }

        if (d.zoomLabel) {
            d.zoomLabel.html (d.zoomLevelName);
        }
    }

    o.updateEventCountTracker = function () {
        var html;

        html = Math.ceil (d.currentEventCount / 2) + '/' + d.totalEventCount + ' Events Placed.'

        d.eventLabel.html (html)
    }

    o.zoomOut = function () {
        var zoom;

        zoom = o.getCurrentZoom ();

        if (d.zoomLevelList [zoom - 1] !== undefined) {
            o.zoom (zoom - 1)
        }
    }

    o.zoomIn = function () {
        var zoom;

        zoom = o.getCurrentZoom ();

        if (d.zoomLevelList [zoom + 1] !== undefined) {
            o.zoom (zoom + 1)
        }
    }

    o.zoom = function (level) {
        level = d.zoomLevelList [ level ]
        // console.log ('Zooming to', level)

        d.zoomByButton = true;

        d.svg.call ( d.zoom.scaleTo, level );
    }
})
