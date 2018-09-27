tm.add ('app.sim.timeline.event.Pin', ['tm.svg.Group'], function (o, p, d) {
    o.setup = function (config) {
        // Config defaults
        if (config.height === undefined) { config.height = 100 }
        if (config.width === undefined) { config.width = 50 }
        if (!config.event) { config.event = {} }
        if (!config.boundary) { config.boundary = { x: {start: 0, end: 100}, y: {start: 0, end: 100} } }

        d.owner = config.owner;
        d.dragStartEndCallback = config.event.dragStart
        d.dragCallback = config.event.drag
        d.dragEndCallback = config.event.dragEnd
        d.boundary = config.boundary

        // Create visual element
        o.createElement ();

        d.dragArea = tm.new ('sim.timeline.drag.Area', {
            selector: 'svg',
            height: config.height,
            width: config.width,
            x: -config.width / 2,
            y: -config.height,
            brush: {
                color: 'transparent',
                stroke: {
                    color: 'transparent',
                    width: 1
                }
            },
            callback: {
                onDragStart: o.onDragStart,
                onDrag: o.onDrag,
                onDragEnd: o.onDragEnd,
            }
        })

        o.add (d.dragArea);
    }

    o.createElement = function () {
        var height, element, width;

        // Create container for image
        height = 80;
        width = 30;

        element = tm.new ('tm.svg.Circle', {
            x: 0,
            y: -height,
            radius: width,
            brush: {
                color: 'black',
                line: {
                    color: 'black',
                    width: 1
                }
            }
        })

        o.add (element)

        // Create pin point
        height = 70;
        width = 20;

        element = tm.new ('tm.svg.Polygon', {
            points: [
                -width / 2 + ',' + -height,
                width / 2 + ',' + -height,
                '0' + ',' + 0,
            ].join (' ')

        })

        o.add (element);

        // Create image
        height = 50;
        width = 50;

        element = tm.new ('tm.svg.Image', {
            href: 'http://static.tvtropes.org/pmwiki/pub/images/MegaManLegendsSeries_5200.jpg',
            x: -width / 2,
            y: -height * 2,
            width: width,
            height: height
        })

        o.add (element);
    }

    o.getPosition = function () { return { x: d.x, y: d.y } }
    o.getOnViewport = function () { return d.onViewport }

    o.onDragStart = function (data) {
        if (d.dragStartCallback) { d.dragStartCallback (data) }
    }

    o.onDrag = function (data) {
        var boundaryX, boundaryY, mouse, x, y;

        mouse = data.mouse;
        x = mouse.local.x;
        y = mouse.local.y;
        boundaryX = d.boundary.x;
        boundaryY = d.boundary.y;

        // console.log ('x:', x, 'y:', y);
        o.moveBy (mouse.movedBy.x, mouse.movedBy.y, 0, true);

        if (x < boundaryX.start || x > boundaryX.end || y < boundaryY.start || y > boundaryY.end) {
            // console.log ('Pin has moved off of viewport')
            d.onViewport = false
        }
        else {
            // console.log ('Pin is on viewport')
            d.onViewport = true
        }


        if (d.dragCallback) {
            d.dragCallback (data)
        }
    }

    o.onDragEnd = function (data) {
        if (d.dragEndCallback) {
            d.dragEndCallback (data);
        }
    }

    o.show = function () {
        d.dom.classList.remove ('hide')
    }

    o.hide = function () {
        d.dom.classList.add ('hide')
    }
})
