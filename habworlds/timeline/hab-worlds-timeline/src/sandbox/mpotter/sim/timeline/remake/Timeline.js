tm.add ('app.sim.Timeline', function (o, p, d) {
    o.setup = function (config) {
        var initialDomain, margin, svg_dx, svg_dy, chart_dx, chart_dy, simModel;

        // d.currentYear = Number (new Date().getFullYear ());

        margin = {top: 0, right: 0, bottom: 0, left: 25};
        svg_dx = $ (config.selector.container).width ();

        // if (svg_dx > 749) { svg_dx = 749 }

        svg_dy = 130;
        chart_dx = svg_dx - margin.right - margin.left;
        chart_dy = svg_dy - margin.top - margin.bottom;
        initialDomain = [-15900000000, 15900000000];

        d.initialDomain = initialDomain;
        d.newDomain = initialDomain;

        d.dimension = {
            margin: margin,
            svg: {
                x: svg_dx,
                y: svg_dy,
            },
            chart: {
                x: chart_dx,
                y: chart_dy
            },
            domain: initialDomain
        }

        d.xScale = d3.scaleLinear()
           .domain(initialDomain)
           .range([margin.left, chart_dx]);

        d.xScale2 = d3.scaleLinear()
            .domain(initialDomain)
            .range([margin.left, chart_dx])

        d.xAxis = d3.axisBottom(d.xScale)
            .tickSize (15)

        d.zoomMin = 1;
        d.zoomMax = 1000000000;

        d.zoom = d3.zoom ()
            .scaleExtent([ d.zoomMin, d.zoomMax])
            .translateExtent ([[0, 0], [svg_dx, 0]])
            .on ("zoom", o.handleZoom)

        d.svg = d3.select (config.selector.container)
            .append("svg")
                .attr("width", svg_dx)
                .attr("height", svg_dy)
                .on('mouseover', o.calculateMouseX)
                .on('mouseout', o.calculateMouseX)
                .on('mousemove', o.calculateMouseX)
                .call(d.zoom);

        d.x_axis = d.svg.append("g")
            .attr("id", "x_axis")
            .attr("class", "x-axis")
            .style ('font', '14px')
            .attr("transform", "translate(0, " + (chart_dy - 30) + ")")
            .call(d.xAxis)

        window.timelineApp = o;

        d.mouseX = 0;
        d.mouseY = 0;
        d.domainX = 0;
        d.svg_dy = svg_dy;

        d.zoomDisabled = false;

        // d.currentYearMarker = d.svg.append ('g')
        //     .append("rect")
        //         .attr ('fill', '#f0e442')
        //         .attr ('stroke', 'transparent')
        //         .attr( "x", d.xScale (d.currentYear) )
        //         .attr("y", 85)
        //         .attr("width", 2)
        //         .attr("height", 30)
    }

    o.calculateMouseX = function () {
        var dataList, domainX, item, list, key, mouseX, pos;

        d.mouseX = d3.mouse ( this ) [0];
        d.mouseY = d3.mouse ( this ) [1] - d.svg_dy/2 + 100;
        d.domainX = d.xScale.invert (d.mouseX);

        return [d.mouseX, d.mouseY]
    }

    o.getDimension = function () {
        return d.dimension
    }

    o.getSvg = function () {
        return d.svg;
    }

    o.getXScale = function () {
        return d.xScale;
    }

    o.getZoom = function () {
        return d.zoom;
    }

    o.getZoomDisabled = function () {
        return d.zoomDisabled;
    }

    o.handleZoom = function () {
        var duration, list, item, key, zoomDistance;

        if (!d.zoomDisabled) {
            // Keep track of the original domain, but modify the visible one
            d.xScale.domain ( d3.event.transform.rescaleX (d.xScale2).domain() );

            o.updateZoomTracker (d3.event.transform.k)

            duration = 0;

            if (d.zoomByButton) {
                duration = 350;
                d.zoomByButton = false;
            }

            d.x_axis.transition ()
                .duration( duration )
                .call( d.xAxis.scale ( d3.event.transform.rescaleX (d.xScale2) ) );

            d.currentScale = d3.event.transform;

            // re-draw circles using new x-axis scale; ref [3]
            var new_xScale = d3.event.transform.rescaleX(d.xScale2);

            d.currentXScale = new_xScale;
            // Call the pin objects and pass them new_xScale for their new X position
            list = d.pinList;
            for (key in list) {
                item = list [key];

                if (item) {
                    item.setX ( new_xScale );
                }
            }

            // d.currentYearMarker.attr ('x', d.xScale (d.currentYear));

        }
    }
})
