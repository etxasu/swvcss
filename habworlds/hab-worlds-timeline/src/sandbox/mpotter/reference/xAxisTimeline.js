tm.add ('app.Timeline.Stolen', function (o, p, d) {
    o.setup = function () {
        // dimensions
        var margin = {top: 20, right: 20, bottom: 30, left: 40},
            svg_dx = $ ('#block').width (),
            svg_dy = 330
            chart_dx = svg_dx - margin.right - margin.left,
            chart_dy = svg_dy - margin.top - margin.bottom;

        // data
        var x = d3.randomNormal(-chart_dx, chart_dx);
        var y_jitter = d3.randomUniform(0, chart_dy - 30);

        var d = d3.range(750)
                  .map(function() {
                      return [x(), y_jitter()];
                  });

        // fill
        var colorScale = d3.scaleLinear()
                           .domain(d3.extent(d, function(d) { return d[0]; }))
                           .range([0, 1]);


        // x position
        var xScale = d3.scaleLinear()
                       .domain(d3.extent(d, function(d) { return d[0]; }))
                       .range([margin.left, chart_dx]);

        // y-axis
        var xAxis = d3.axisBottom(xScale);

        // zoom
        var svg = d3.select("#block")
                    .append("svg")
                    .attr("width", svg_dx)
                    .attr("height", svg_dy)
                    .call(d3.zoom().on("zoom", zoom));      // ref [1]

       // plot data
       var circles = svg.append("g")
                        .attr("id", "circles")
                        .attr("transform", "translate(200, 0)")
                        .selectAll("circle")
                        .data(d)
                        .enter()
                        .append("circle")
                        .attr("r", 4)
                        .attr("cx", function(d) { return xScale(d[0]); })
                        .attr("cy", function(d) { return d[1]; })
                        .style("fill", function(d) {
                            var norm_color = colorScale(d[0]);
                            return d3.interpolateInferno(norm_color)
                        });

       // add x-axis
       var x_axis = svg.append("g")
                       .attr("id", "x_axis")
                       .attr("transform", "translate(0, " + (chart_dy - 30) + ")")
                       .call(xAxis)

       function zoom() {

           // re-scale x axis during zoom; ref [2]
           x_axis.transition()
                 .duration(50)
                 .call(xAxis.scale(d3.event.transform.rescaleX(xScale)));

           // re-draw circles using new y-axis scale; ref [3]
           var new_xScale = d3.event.transform.rescaleX(xScale);

           console.log (d[0])

           circles.attr("cx", function(d) { return new_xScale(d[0]); });
       }
    }
})
