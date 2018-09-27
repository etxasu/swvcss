tm.add ('app.Timeline.D3', function (o, p, d) {
    o.setup = function (config) {
        // NOTE: Current timescale idea
        // 1 = 1 billion years
        // 0.001 = 1 million years
        // 0.0000001 = 1 thousand years
        // 0.0000000001 = 1 year
        // I can then translate these decimals into readable dates: Ga (billion), Ma (million), K (thousand), -300,123-12-31
        // Once you are viewing the timespan of a year, I can track a different set of numbers and prefix the current "year" to that number to deterimine where a pin was placed.

        // For example, if I am looking at 1970 to 1971, that would be 0.0000001970 to 0.0000001971.
        // In that, I would create an array of twelve items. Each item would contain the month name and number of days.
        // When a pin is placed it would get something like: "0.0000001970 12 25" which means December 25, 1970.

        // Since zooming is determined in levels, I can determine what each label says at the appropriate zoom level
        // D3 can track where an item belongs so long as I am using their zoom method.

        var navGraph, svg;
        config.data = [30, 86, 103, 167, 189, 210]

        d.container = document.querySelector (config.container);
        data = config.data;

        d.xScale = d3.scaleLinear ()
            // The allowed value range
            .domain ([-7, 7])
            // The allowed area for the graph
            .range ([0, d.container.clientWidth - 30])

        // Calculate where the mouse is as often as possible
        d.container.onmousemove = o.calculateMouseX;
        d.container.onmouseover = o.calculateMouseX;
        d.container.onmouseup = o.calculateMouseX;

        d.zoom = d3.zoom ()
            .scaleExtent ([0, 100])
            .on ('zoom', o.handleZoom)

        // Contact the d3 library
        d.timeline = d3.select (d.container)
        // Create an svg element in our container
            .append ('svg')
                // set SVG container size
                .attr ('width', d.container.clientWidth)
                .attr ('height', d.container.clientHeight)
                .call (d.zoom)
                .append ('g')
                    // Set the position of the timeline within the svg element
                    .attr ('transform', 'translate (0, 130)')
                    // Set the size of the graph
                    .attr ('width', 400)
                    // Limit how far data can go
                    .call (d3.axisBottom (d.xScale))

        d.svg = $ ('#visualization > svg') [0]
        d.svgPoint = d.svg.createSVGPoint ();

        d.xScaleNavGraph = d3.scaleTime ()
            .domain ([0, 2])
            .range ([2, 0])

        navGraph = d3.select ('#visualization')
            .append ('svg')
                .attr ('style', 'background: lightgrey')
                .attr ('width', d.container.clientWidth)
                .attr ('height', 100)

        navGraph.append ('g')
            .append ('rect')
                .attr ('fill', 'white')
                .attr ('width', d.container.clientWidth - 10)
                .attr ('height', 90)
                .attr ('transform', 'translate (5, 5)')
                .call (d.xScaleNavGraph)

        // var viewport = d3.svg.brush ()
        //     .x (d.xScaleNavGraph)
        //     .on ('brush', function () {
        //         d.xScale.domain(viewport.empty() ? d.xScaleNavGraph.domain() : viewport.extent());
        //         o.redrawChart();
        //     })

        d.uid = 0;
        d.mouseX = 0;
        d.mouseYear = 0;
        d.pinList = [];
        window.timelineApp = o;
    }

    o.addItem = function (data) {
        var color, distanceFromBottom, height, newPin, pointList, width;
        // Take the content of the data
        if (data) {
            d.pinList.push (
                tm.new ('app.Timeline.D3.Pin', {
                    color: 'gold',
                    content: data.content,
                    height: 35,
                    distanceFromBottom: 65,
                    owner: data.owner,
                    uid: d.uid,
                    width: 35,
                    xPos: d.mouseX,
                })
            )
            // Increment the unique id
            d.uid++;
        }
    }

    o.calculateMouseX = function (evnt) {
        var offset, width;

        // Get the current offset of the svg element in case the page size changes
        offset = $ ('#visualization > svg').offset ().left;
        width = $ ('#visualization > svg').width ();

        // Where the mouse actually is
        d.mouseX = evnt.clientX - offset;

        // Translating the current X coordinate into the year that mouse is over.
        // If the mouse is in the middle, it is year 0.
        //  The level of zoom also needs ot be taken into account
        d.mouseYear = d.mouseX - (width/2); //NOTE: still needs to be fixed
        // console.log (d.mouseYear)
    }

    o.setMouseX = function (x) {
        d.mouseX = x
    }

    o.redrawChart = function () {
        d.timeline.select ('')
    }

    o.handleZoom = function () {
        console.log ('Zoom bro')
        // d.zoom.translate ([10, 0])
    }

    o.zoom = function (level) {
        var zoom;

        switch (level) {
            case 1:
                console.log ('Zoom out')
                break;
            case 2:
                console.log ('Zoom in')
                break;
        }
    }
})
