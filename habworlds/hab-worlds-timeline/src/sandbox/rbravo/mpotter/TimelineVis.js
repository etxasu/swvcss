tm.add ('app.Timeline.Vis', function (o, p, d) {
    o.setup = function (config) {
        var card, cardContainer, dataSet, itemList, item, key, list, option, timelineContainer;

        window.timelineApp = o;

        // DOM element where the Timeline will be attached
        timelineContainer = document.getElementById ('visualization');

        // Create a DataSet (allows two way data-binding)
        // Vis needs at least one item for initial draw
        d.timelineItemList = [
            {id: 0, content: 'item 1', start: '2013-04-20'}
        ]

        d.visDataSet = new vis.DataSet( d.timelineItemList );

        d.uid = 0

        // Configuration for the Timeline
        if (!config.option) { config.option = {} }
        option = config.option;

        // 1 Ga = 1 Billion years
        // 1 Ma = 1 Million years

        // Create a Timeline
        d.timeline = new vis.Timeline(timelineContainer, d.visDataSet, option);
        // d.timeline.setWindow (-1000, 1000)
        d.timeline.on ('itemover', o.onItemDragged);
        d.timeline.on ('itemout', o.onItemDragged);

        // Capture the date the mouse is over as often as possible
        d.timeline.on ('mouseOver', o.onMouseOver);
        d.timeline.on ('mouseDown', o.onMouseOver);
        d.timeline.on ('mouseUp', o.onMouseOver);
        d.timeline.on ('mouseMove', o.onMouseOver);
        d.timeline.on ('drop', o.onMouseOver);

        // Unhide a list item when a timeline item is removed
        d.timeline.on ('remove', o.onItemRemoved);

        // Create a date just in case to prevent possible errors
        d.selectedTime = new Date ();

        // Remove item that was used to get timeline to do initial draw.
        o.clearTimeline ();

        // Setup shortcuts
        listener = new window.keypress.Listener();
        listener.register_combo ({
            'keys': '+',
            'on_keydown': function () {
                if (!d.animating) {
                    d.animating = true
                    d.timeline.zoomIn (1, {duration: 9, easingFunction: 'linear'}, function () { d.animating = false })
                }
            }
        })

        listener.register_combo ({
            'keys': '-',
            'on_keydown': function () {
                if (!d.animating) {
                    d.animating = true
                    d.timeline.zoomOut (1, {duration: 9, easingFunction: 'linear'}, function () { d.animating = false })
                }
            },
        })
    }

    o.onItemRemoved = function (data) {
        console.log ('Removing item:', data)
    }

    o.onMouseOver = function (data) {
        d.timeline.redraw ();
        d.selectedTime = data.time;
    }

    o.getSelectedTime = function () {
        return d.selectedTime;
    }

    o.onItemDragged = function (data) {
        var newStartDate, targetDom, targetId;
        targetDom = data.event.target;

        // Keep the saved timelineItems up-to-date with the ones stored by the app when possible.
        if (targetDom.parentNode.dataset.start) {
            newStartDate = targetDom.parentNode.dataset.start;
            targetId = targetDom.parentNode.dataset.id;

            d.timelineItemList = Object.values (d.visDataSet._data);
        }
    }

    o.addItemToTimeline = function (data) {
        var item;

        item = {}
        item.content = data.content;
        item.start = d.selectedTime;
        item.id = d.uid + '';

        d.uid++;

        // Make sure the dates of the current items are saved.
        d.timelineItemList = Object.values (d.visDataSet._data);
        // Add the new item.
        d.timelineItemList.push (item);
        // Render the new item.
        o.updateTimeline ();
    }

    o.clearTimeline = function () {
        d.uid = 0;
        d.timelineItemList = [];
        o.updateTimeline ();

        // Contact the card items and tell them to unhide themselves
    }

    o.removeItemFromTimeline = function (id) {
        // Remove given item from timeline
        o.updateTimeline ();
    }

    o.updateTimeline = function () {
        d.visDataSet = new vis.DataSet (d.timelineItemList)
        d.timeline.setItems ( d.visDataSet );
    }

    o.zoom = function (level) {
        console.log ('Zooming to level:', level)
        switch (level) {
            case 1:
                d.timeline.setWindow (1, 1.1556952E+1)
                break;
        }
    }
})
