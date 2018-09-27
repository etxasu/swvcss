tm.add ('app.sim.timeline.event.Card', function (o, p, d) {
    o.setup = function (config) {
        // Creates a visible dom at the area in the given selector
        // Creates an invisible dom with an absolute position that follows the mouse

        // When clicked and dragged: Hides the primary dom and reveals the secondary dom
        // When the mouse is released:
        // Hide secondary dom
        // Check with owner if the primary dom should be revealed

        // Config Defaults
        if (config.offset === undefined) { config.offset = { x: -50, y: -150 } }

        // Assign Config Values
        d.owner = config.owner;
        d.selector = config.selector;
        d.offset = config.offset;

        // Set up dom
        tm.html ('app.sim.timeline.Event', {
            selector: config.selector.event,
            append: true,
            data: config
        });

        d.dom = $ ('#' + config.id);

        // Set up dom that follows mouse
        d.draggableDom = d.dom.clone ();
        d.draggableDom.addClass ('hide');
        d.draggableDom.addClass ('draggable');

        $ (document.body).append (d.draggableDom)

        document.addEventListener ('mousemove', function (event) {
            if (d.draggingDom) { o.drag (event) }
        })

        document.addEventListener ('mouseup', function (event) {
            if (d.draggingDom) { o.dragEnd (event) }
        })

        d.dom.on ('mousedown', o.dragStart)
    }

    o.dragStart = function (event) {
        d.draggingDom = true;
        o.hide ();
        d.draggableDom.removeClass ('hide');
    }

    o.drag = function (event) {
        var x, y

        x = event.pageX;
        y = event.pageY;

        $ (d.draggableDom).css({
            left:  x + d.offset.x,
            top:   y + d.offset.y
        });
    }

    o.dragEnd = function (event) {
        d.draggingDom = false;

        d.draggableDom.addClass ('hide');

        if (d.owner) {
            d.owner.onDragEnd (event);
        }
    }

    o.hide = function () { d.dom.addClass ('hide') }
    o.show = function () { d.dom.removeClass ('hide') }
})
