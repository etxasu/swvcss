tm.add ('app.sim.timeline.Svg', function (o, p, d) {
    function zoomFun() {
        var canvas, newScale, scale;

        scale = d.axis.getScale ();
        // re-scale y axis during zoom; ref [2]
        d.axis
            .getCanvas ()
            .transition()
            .duration(50)
            .call (d.axis.getD3Axis ().scale (d3.event.transform.rescaleX (scale)));

        // re-draw circles using new y-axis scale; ref [3]
        newScale = d3.event.transform.rescaleX (scale);
        d.ref ['circles'].attr ('cx', function(d) { return newScale (d [1]); });

        o.updateZoomInfo ();
    }

    o.setup = function () {
        var margin;

        margin = 25;

        d.ref = {};
        d.canvas = null;
        d.size = {
            full: {
                width: 800,
                height: 600,
            },
            margin: {
                top: margin,
                right: margin,
                bottom: margin,
                left: margin,
            }
        }
        d.limit = {
            zoomRange: [
                // {zoom: 1, label: {unit: 'yr', info: 'Every Year'}, adjust: 100, format: '0'},
                // {zoom: 0.1, label: {unit: 'yrs', info: 'Every 10 Years'}, adjust: 100, format: '0'},
                // {zoom: 0.01, label: {unit: 'yrs', info: 'Every 100 Years'}, adjust: 100, format: '0'},
                // {zoom: 0.001, label: {unit: 'ka', info: 'Every 1 Thousand Years'}, adjust: 100, format: '0'},
                // {zoom: 0.0001, label: {unit: 'ka', info: 'Every 10 Thousand Years'}, adjust: 100, format: '0'},
                // {zoom: 0.00001, label: {unit: 'ka', info: 'Every 100 Thousand Years'}, adjust: 100, format: '0'},
                // {zoom: 0.000001, label: {unit: 'ma', info: 'Every 1 Million Years'}, adjust: 100, format: '0'},
                // {zoom: 0.0000001, label: {unit: 'ma', info: 'Every 10 Million Years'}, adjust: 100, format: '0'},
                // {zoom: 0.00000001, label: {unit: 'ma', info: 'Every 100 Million Years'}, adjust: 100, format: '0'},
                // {zoom: 0.000000001, label: {unit: 'ba', info: 'Every 1 Billion Years'}, adjust: 100, format: '0'},

                // {zoom: 0.01, label: {unit: 'yrs', info: 'Every 100 Years'}, adjust: 100, format: '0'},
                // {zoom: 0.1, label: {unit: 'yr', info: 'Every Year'}, adjust: (10 * 10000), format: '0'},
                // {zoom: 0.1, label: {unit: 'yr', info: 'Every Year'}, adjust: (10 * 10000), format: '0'},
                // {zoom: 0.1, label: {unit: 'yr', info: 'Every Year'}, adjust: 10000, format: '0'},
                // {zoom: 0.01, label: {unit: 'yr', info: 'Every Year'}, adjust: 1, format: '0'},
                // {zoom: 0.001, label: {unit: 'yr', info: 'Every Year'}, adjust: 1, format: '0'},

                // {zoom: 1, label: {unit: 'yr', info: 'Every Year'}, adjust: 1, format: '0'},
                // {zoom: 10, label: {unit: 'yrs', info: 'Every 10 Years'}, adjust: 1, format: '0'},
                // {zoom: 100, label: {unit: 'yrs', info: 'Every 100 Years'}, adjust: 1, format: '0'},
                // {zoom: 1000, label: {unit: 'ka', info: 'Every 1 Thousand Years'}, adjust: 0.01, format: '0'},
                // {zoom: 10000, label: {unit: 'ka', info: 'Every 10 Thousand Years'}, adjust: 0.01, format: '0'},
                // {zoom: 100000, label: {unit: 'ka', info: 'Every 100 Thousand Years'}, adjust: 0.01, format: '0'},
                // {zoom: 1000000, label: {unit: 'ma', info: 'Every 1 Million Years'}, adjust: 1},
                // {zoom: 10000000, label: {unit: 'ma', info: 'Every 10 Million Years'}, adjust: 0.0000001},
                // {zoom: 100000000, label: {unit: 'ma', info: 'Every 100 Million Years'}, adjust: 0.000001},
                // {zoom: 1000000000, label: {unit: 'ba', info: 'Every 1 Billion Years'}, adjust: 0.00000001},

                // NOTE: Works.
                // {zoom: 1, label: {unit: 'ba', info: 'Every 1 Billion Years'}, adjust: 1, format: '0'},
                // {zoom: 10, label: {unit: 'ma', info: 'Every 100 Million Years'}, adjust: 1, format: '0'},
                // {zoom: 100, label: {unit: 'ma', info: 'Every 10 Million Years'}, adjust: 1, format: '0'},
                // {zoom: 1000, label: {unit: 'ma', info: 'Every 1 Million Years'}, adjust: 0.01, format: '0'},
                // {zoom: 10000, label: {unit: 'ka', info: 'Every 100 Thousand Years'}, adjust: 0.01, format: '0'},
                // {zoom: 100000, label: {unit: 'ka', info: 'Every 10 Thousand Years'}, adjust: 0.01, format: '0'},
                // {zoom: 1000000, label: {unit: 'yrs', info: 'Every 1 Thousand Years'}, adjust: 1},
                // {zoom: 10000000, label: {unit: 'yrs', info: 'Every 100 Years'}, adjust: 0.0000001},
                // {zoom: 100000000, label: {unit: 'yrs', info: 'Every 10 Years'}, adjust: 0.000001},
                // {zoom: 1000000000, label: {unit: 'yr', info: 'Every Year'}, adjust: 0.00000001},

                // NOTE: Works
                {zoom: 1, label: {unit: 'ba', info: 'Every 1 Billion Years'}, adjust: 0.000000001, format: '0,0'},
                {zoom: 1, label: {unit: 'ma', info: 'Every 100 Million Years'}, adjust: 0.0000001, format: '0,0'},
                {zoom: 100, label: {unit: 'ma', info: 'Every 10 Million Years'}, adjust: 0.000001, format: '0,0'},
                {zoom: 1000, label: {unit: 'ma', info: 'Every 1 Million Years'}, adjust: 0.000001, format: '0'},
                {zoom: 10000, label: {unit: 'ka', info: 'Every 100 Thousand Years'}, adjust: 0.01, format: '0'},
                {zoom: 100000, label: {unit: 'ka', info: 'Every 10 Thousand Years'}, adjust: 0.01, format: '0'},
                {zoom: 1000000, label: {unit: 'yrs', info: 'Every 1 Thousand Years'}, adjust: 1},
                {zoom: 10000000, label: {unit: 'yrs', info: 'Every 100 Years'}, adjust: 0.0000001},
                {zoom: 100000000, label: {unit: 'yrs', info: 'Every 10 Years'}, adjust: 0.000001},
                {zoom: 10000000000, label: {unit: 'yr', info: 'Every Year'}, adjust: 0.00000001},
                // {zoom: 10000000000, label: {unit: 'yr', info: 'Every Year'}, adjust: 0.00000001},
            ]
        }

        d.limit.domain = [d.limit.zoomRange [0].zoom, d.limit.zoomRange [d.limit.zoomRange.length - 1].zoom]
        // d.limit.domain = [0, d.limit.zoomRange [d.limit.zoomRange.length - 1].zoom]

        // 1000000000 * 1 Billion Years
        // 100000000 * 100 Million Years
        // 10000000 * 10 Million Years
        // 1000000 * 1 Million Years
        // 100000 * 100 Thousand Years
        // 10000 * 10 Thousand Years
        // 1000 * 1 Thousand Years
        // 100 * 100 Years
        // 10 * 10 Years
        // 1 * 1 Year

        d.zoomIndex = 0;

        d.size.width = d.size.full.width - d.size.margin.left - d.size.margin.right;
        d.size.height = d.size.full.height - d.size.margin.top - d.size.margin.bottom;

        var translateLimit = 1000;
        o.draw ();
        d.zoom = d3
            .zoom()
            // .extent ([[0, 0], [d.size.width, d.size.height]])
            // .scaleExtent ([d.limit.zoomRange [d.limit.zoomRange.length - 1].zoom, d.limit.zoomRange [0].zoom])
            .scaleExtent ([d.limit.zoomRange [0].zoom, d.limit.zoomRange [d.limit.zoomRange.length - 1].zoom])
            // .translateExtent([[0, 0], [d.size.width, d.size.height]])
            // .scaleExtent ([0.001, 100])
            // .scaleExtent ([1, 2])
            // .extent ([1, 1])
            // .scaleExtent ([1, 10])
            // .scaleExtent ([1, 10, 100])
            // .xExtent([-2000,2000])
            // .scaleExtent([1, 1])
            // .translateExtent([[-translateLimit, -translateLimit], [translateLimit, translateLimit]])
            .wheelDelta (function myDelta() {
                var delta, zoom;

                delta = d3.event.deltaY;
                // if (delta < 0) {
                //     d.zoomIndex--;
                //     if (d.zoomIndex < d.limit.zoomRange.length) {
                //         d.zoomIndex = 0;
                //     }
                //
                //     zoom = d.limit.zoomRange [d.zoomIndex].zoom * 1;
                // }
                // else {
                //     d.zoomIndex++;
                //     if (d.zoomIndex >= d.limit.zoomRange.length) {
                //         d.zoomIndex = d.limit.zoomRange.length - 1;
                //     }
                //     zoom = d.limit.zoomRange [d.zoomIndex].zoom * -1;
                // }

                // console.log ('- delta:', delta);


                // d.zoom.scaleTo (d.canvas.transition ().duration (750), zoom);

                // console.log ('- delta:', d3.event.deltaY);
                // return -d3.event.deltaY * (d3.event.deltaMode ? 120 : 1) / 1500;
                // return zoom;
                return false;
            })
        	.on('zoom', zoomFun)
        ;
        d.canvas.call (d.zoom);
        // o.updateZoomInfo ();

        d3.select('#zoom-in').on('click', function() {
            var limit, zoom;

            d.zoomIndex++;
            if (d.zoomIndex >= d.limit.zoomRange.length) {
                d.zoomIndex = d.limit.zoomRange.length - 1;
            }
            limit = d.limit.zoomRange [d.zoomIndex];
            zoom = limit.zoom;

            // o.updateZoomInfo ();

            // limit = d.limit.zoomRange [(d.limit.zoomRange.length - 1) - d.zoomIndex];
            // $('#zoom-info').html ('<b>Zoom:</b> ' + limit.label.info)
            //
            // console.log ('-zoom:', '<b>Zoom:</b> ' + limit.info)
            // console.log ('-zoom:', zoom)
            // zoom = 1.3;
            // Smooth zooming
         	// d.zoom.scaleBy (d.canvas.transition ().duration (750), zoom);
         	d.zoom.scaleTo (d.canvas.transition ().duration (750), zoom);
        });

        d3.select('#zoom-out').on('click', function() {
            var limit, zoom;

            d.zoomIndex--;
            if (d.zoomIndex < 0) {
                d.zoomIndex = 0;
            }

            limit = d.limit.zoomRange [d.zoomIndex];
            zoom = limit.zoom;

            console.log ('- index:', d.zoomIndex)
            console.log ('- zoom:', zoom)
            // d.zoom.scaleBy (d.canvas.transition ().duration (750), zoom * -1);
            d.zoom.scaleTo (d.canvas.transition ().duration (750), zoom);
            // d.zoom.translateTo (d.canvas.transition ().duration (750), 0, 0);

            // Ordinal zooming
            // NOTE: Snapping like zooming in...
            // d.zoom.scaleBy (d.canvas, 1 / 1.3);
        });
    }

    o.draw = function () {
        d.canvas = d3
            .select ('body')
            .append('svg')
            .attr ('width', d.size.full.width)
            .attr ('height', d.size.full.height)
            .call (d3.zoom ().on ('zoom', zoomFun));
        ;
    }

    o.addAxis = function (axis) {
        var limit, zoom;

        d.axis = axis;
        // d.canvas.call (d.zoom);

        limit = d.limit.zoomRange [d.zoomIndex];
        zoom = limit.zoom;

        d.zoom.scaleTo (d.canvas.transition ().duration (750), zoom);
    }

    o.updateZoomInfo = function () {
        var limit;

        limit = d.limit.zoomRange [d.zoomIndex];
        console.log ('- zoom:', limit.zoom)

        // limit = d.limit.zoomRange [(d.limit.zoomRange.length - 1) - d.zoomIndex];
        // limit = d.limit.zoomRange [(d.limit.zoomRange.length - 1) - d.zoomIndex];
        $('#zoom-info').html ('<b>Zoom:</b> ' + limit.label.info)
        // console.log ('-zoom:', limit.zoom)
    }

    o.formatTick = function (value) {
        var index, limit, time;

        // index = (d.limit.zoomRange.length - 1) - d.zoomIndex;
        index = d.zoomIndex;
        limit = d.limit.zoomRange [index];

        // console.log ('----------------------------')
        // console.log ('*** value:', value)
        // console.log ('*** zoom:', limit.zoom)

        time = value
        if (time !== 0) {
            // time = time / (limit.zoom * limit.adjust);
            time = time * limit.adjust;
        }

        time = numeral (time);

        return time.format (limit.format) + ' ' + limit.label.unit;
    }



    o.setRef = function (name, data) { d.ref [name] = data; }
    o.getRef = function (name) { return d.ref [name]; }
    o.get = function (name) { return d [name]; }

    o.getCanvas = function () { return d.canvas; }
    o.getSize = function () { return d.size; }
    o.getWidth = function () { return d.size.width; }
    o.getFullWidth = function () { return d.size.full.width; }
    o.getZoomHandler = function () { return d.zoomHandler; }
});

tm.add ('app.sim.timeline.Group', function (o, p, d) {
    o.setup = function (config) {
        d.svg = config.svg;
        d.canvas = d.svg
            .append ('g')
            // .attr("class", "inner_space")
            // .call(zoom)
        ;

        // // Inner Drawing Space
        // var innerSpace = svgViewport.append("g")
        //     .attr("class", "inner_space")
        //     .call(zoom)
        //     // .style("background", 'red')
        //     // .style("stroke", 'green')
        //     // .style("fill", "none")
        //     // .style("stroke-width", 1)
        // ;
    }
})

tm.add ('app.sim.timeline.Axis', function (o, p, d) {
    o.setup = function (config) {
        var size;

        d.svg = config.svg;
        size = d.svg.getSize ();

        // create scale objects
        d.scale = d3
            .scaleLinear ()
            .domain (d.svg.get ('limit').domain)
            .range ([size.margin.left, size.width])
        ;

        // create axis objects
        d.axis = d3
            .axisBottom (d.scale)
            .ticks (10)
            .tickFormat (d.svg.formatTick);
        ;

        d.canvas = d.svg
            .getCanvas ()
            .append ('g')
            .attr ('id', 'x-axis')
            .attr ('transform', 'translate(0,' + size.height + ')')
            .call(d.axis)
        ;
    }

    o.getD3Axis = function () { return d.axis; }
    o.getCanvas = function () { return d.canvas; }
    o.getScale = function () { return d.scale; }
});

tm.add ('app.sim.timeline.TestPlots', function (o, p, d) {
    o.setup = function (config) {
        var canvas, range, size, scale;

        d.svg = config.svg;
        d.axis = config.axis;

        size = d.svg.get ('size');
        canvas = d.svg.getCanvas ();
        scale = d.axis.getScale ();
        range = d.svg.get ('limit').domain;

        // data
        // var y = d3.randomNormal(400, 100);
        // var x_jitter = d3.randomUniform(-100, 100);
        // var y = d3.randomNormal(400, 100);
        var y = d3.randomNormal(range [0], range [1]);
        var x_jitter = d3.randomUniform(range [0], (size.height - 20));

        var dt = d3.range(750)
        .map(function() {
            return [x_jitter(), y()];
        });

        // fill
        var colorScale = d3.scaleLinear()
        .domain(d3.extent(dt, function(a) { return a[1]; }))
        .range([0, 1]);

        // plot data
        var circles = canvas.append("g")
        .attr("id", "circles")
        .attr("transform", "translate(0, 0)")
        .selectAll("circle")
        .data(dt)
        .enter()
        .append("circle")
        .attr("r", 4)
        // .attr("cx", function(d) { return d[0]; })
        .attr("cy", function(a) { return a[0]; })
        .attr("cx", function(a) { return scale(a[1]); })
        .style("fill", function(a) {
            var norm_color = colorScale(a[1]);
            return d3.interpolateInferno(norm_color)
        });

        d.svg.setRef ('circles', circles);
    }
})

tm.add ('app.sim.Timeline', function (o, p, d) {
    o.setup = function () {
        var axis, group, svg;

        svg = tm.new ('app.sim.timeline.Svg');
        axis = tm.new ('app.sim.timeline.Axis', {svg: svg});
        svg.addAxis (axis);

        tm.new ('app.sim.timeline.TestPlots', {svg: svg, axis: axis});
    }
});
