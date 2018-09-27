tm.add ('app.Timeline.D3', function (o, p, d) {
    o.setup = function (config) {
        var initialDomain, margin, svg_dx, svg_dy, chart_dx, chart_dy;

        margin = {top: 20, right: 20, bottom: 30, left: 40};
        svg_dx = $ (config.container).width ();
        svg_dy = 330;
        chart_dx = svg_dx - margin.right - margin.left;
        chart_dy = svg_dy - margin.top - margin.bottom;
        initialDomain = [-100000, 100000];

        d.xScale = d3.scaleLinear()
           .domain(initialDomain)
           .range([margin.left, chart_dx]);

        d.xScale2 = d3.scaleLinear()
            .domain(initialDomain)
            .range([margin.left, chart_dx])

        d.xAxis = d3.axisBottom(d.xScale)
            // .ticks (d3.timeYear)
            .tickFormat (o.formatTick)

        // console.log (d.xAxis)

        d.zoom = d3.zoom ()
            // Lets you see from increments of 1b to 0.1 year
            .scaleExtent([0.000019, 10000])
            .on ("zoom", o.handleZoom)

        d.svg = d3.select(config.container)
            .append("svg")
            .attr("width", svg_dx)
            .attr("height", svg_dy)
            .on('mouseover', o.calculateMouseX)
            .on('mouseout', o.calculateMouseX)
            .on('mousemove', o.calculateMouseX)
            .call(d.zoom);

        d.x_axis = d.svg.append("g")
            .attr("id", "x_axis")
            .attr("transform", "translate(0, " + (chart_dy - 30) + ")")
            .call(d.xAxis);

        d.bisector = d3.bisector (function(d){ return d; }).left;

        d.container = $ (config.container)
        d.uid = 0;
        d.mouseX = 0;
        d.domainX = 0;
        d.pinList = [];
        window.timelineApp = o;
    }

    o.addItem = function (data) {
        var color, distanceFromBottom, height, newPin, pointList, width, x, xPos;
        // Take the content of the data
        if (data) {

            if (!data.x) { data.x = d.mouseX }
            if (!data.xPos) { data.xPos = d.domainX }

            d.pinList.push (
                tm.new ('app.Timeline.D3.Pin', {
                    color: 'gold',
                    content: data.content,
                    height: 35,
                    distanceFromBottom: 65,
                    owner: data.owner,
                    uid: d.uid,
                    width: 35,
                    xPos: d.domainX,
                    initialX: d.mouseX
                })
            )

            // Increment the unique id
            d.uid++;
        }
    }

    o.calculateMouseX = function () {
        var dataList, domainX, item, list, key, mouseX, pos;

        d.mouseX = d3.mouse ( this ) [0];
        d.domainX = d.xScale.invert (d.mouseX);

        // console.log (d.mouseX, d.domainX);
    }

    o.formatTick = function (tick) {
        var abs, difference, label, tickA, tickB;
        // 1 = 1 year
        tick = Number (tick)
        abs = Math.abs (tick);
        label = ''

        // Compare the first two ticks and find the difference between them
        // This will let us know how close we are and what format to display the tick in
        // console.log ('The ticks: ', d.xScale.ticks ())
        tickA = Math.abs (d.xScale.ticks () [0])
        tickB = Math.abs (d.xScale.ticks () [1])

        difference = Math.abs (tickA - tickB);

        // console.log ('The difference between ticks:', difference)

        if (tick !== 0) {
            if (difference >= 1000000000) {
                label = abs/1000000000 + 'b'
            }
            else if (difference >= 1000000) {
                label = abs/1000000 + 'm'
            }
            else if (difference >= 1000) {
                label = abs/1000 + 'k'
            }
            else if (difference < 1) {
                // figure out the month
                label = tick
            }
            else {
                label = abs
            }

            if (tick < 0) {
                label = '-' + label
            }
        }
        else {
            label = tick
        }

        // Look at all the labels. to determine the zoom level

        return label
    }

    o.handleZoom = function () {
        var list, item, key, zoomDistance;

        // Keep track of the original domain, but modify the visible one
        d.xScale.domain ( d3.event.transform.rescaleX (d.xScale2).domain() );

        // console.log (d3.event.transform);

        // Prevent zooming out too far
        // Prevent zooming in too close

        d.x_axis.transition ()
            .duration(50)
            .call( d.xAxis.scale ( d3.event.transform.rescaleX (d.xScale2) ) );

        // re-draw circles using new x-axis scale; ref [3]
        var new_xScale = d3.event.transform.rescaleX(d.xScale2);

        // Call the pin objects and pass them new_xScale for their new X position
        list = d.pinList;
        for (key in list) {
            item = list [key];

            if (item) {
                item.setX ( new_xScale );
            }
        }
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
