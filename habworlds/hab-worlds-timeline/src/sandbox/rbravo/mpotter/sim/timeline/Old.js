
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


tm.add ('app.sim.Timeline', function (o, p, d) {
    o.setup = function () {
        // demo1 ();
        demo2 ();
        // demo3 ();
        // demo4 ();
    }

    function demoWorking1 () {
        // dimensions
        var margin = {top: 20, right: 20, bottom: 30, left: 40},
            svg_dx = 800,
            svg_dy = 500
            chart_dx = svg_dx - margin.right - margin.left,
            chart_dy = svg_dy - margin.top - margin.bottom;

        // data
        var y = d3.randomNormal(400, 100);
        var x_jitter = d3.randomUniform(-100, 100);

        var d = d3.range(750)
                  .map(function() {
                      return [x_jitter(), y()];
                  });

        // fill
        var colorScale = d3.scaleLinear()
                           .domain(d3.extent(d, function(d) { return d[1]; }))
                           .range([0, 1]);


        // y position
        var xScale = d3.scaleLinear()
                       .domain(d3.extent(d, function(d) { return d[1]; }))
                       .range([chart_dx, margin.top]);

        // y-axis
        var xAxis = d3.axisBottom(xScale);

        var zoom = d3.zoom()
    	.on('zoom', zoomFun)

        // zoom
        var svg = d3.select("body")
                    .append("svg")
                    .attr("width", svg_dx)
                    .attr("height", svg_dy)
                    .call(d3.zoom().on("zoom", zoomFun));      // ref [1]

       // plot data
       var circles = svg.append("g")
                        .attr("id", "circles")
                        .attr("transform", "translate(200, 0)")
                        .selectAll("circle")
                        .data(d)
                        .enter()
                        .append("circle")
                        .attr("r", 4)
                        // .attr("cx", function(d) { return d[0]; })
                        .attr("cy", function(d) { return d[0]; })
                        .attr("cx", function(d) { return xScale(d[1]); })
                        .style("fill", function(d) {
                            var norm_color = colorScale(d[1]);
                            return d3.interpolateInferno(norm_color)
                        });

       // add y-axis
       var x_axis = svg.append("g")
                       .attr("id", "x_axis")
                       .attr("transform", "translate(0,300)")
                       .call(xAxis)

       function zoomFun() {

           // canvas.attr('transform', d3.event.transform);

           // re-scale y axis during zoom; ref [2]
           x_axis.transition()
                 .duration(50)
                 .call(xAxis.scale(d3.event.transform.rescaleX(xScale)));

           // re-draw circles using new y-axis scale; ref [3]
           var new_xScale = d3.event.transform.rescaleX(xScale);
           circles.attr("cx", function(d) { return new_xScale(d[1]); });
       }

       d3.select('#zoom-in').on('click', function() {
          // Smooth zooming
        	zoom.scaleBy(svg.transition().duration(750), 1.3);
        });

        d3.select('#zoom-out').on('click', function() {
          // Ordinal zooming
          zoom.scaleBy(svg, 1 / 1.3);
        });

    }

    function demo () {
        var
        width = 800,
        height = 400;

        var data = [10, 15, 20, 25, 30];

        // Append SVG
        var svg = d3
        .select ("body")
        .append ("svg")
        .attr ("width", width)
        .attr ("height", height);

        // Create scale
        var scale = d3
        .scaleLinear ()
        .domain ([0, 100])
        .range ([0, width - 100]);

        // Add scales to axis
        var xAxis = d3
        .axisBottom ()
        .scale (scale);

        // Append group and insert axis
        svg
        .append ("g")
        // Move the axis object.
        .attr("transform", "translate(0," + 300 + ")")
        .call (xAxis);

        // Zoom Function
        var zoom = d3.zoom()
            .on("zoom", zoomFunction);

        // Append zoom area.
        var view = svg.append("rect")
        .attr("class", "zoom")
        .attr("width", width)
        .attr("height", height)
        .call(zoom)

        function zoomFunction(){
          // create new scale ojects based on event
          var new_xScale = d3.event.transform.rescaleX(xAxis)

          // update axes
          gX.call(xAxis.scale(new_xScale));

          // update circle
          circles.attr("transform", d3.event.transform)
        };

    }s

    function demo4 () {
        data = demo3 ();
        // return;

        // var svgWidth = 800;
        // var svgHeight = 300;
        var svgWidth = data.width;
        var svgHeight = data.height;

        var margin = {top: 30, right: 40, bottom: 50, left: 60};

        var width = svgWidth - margin.left - margin.right;
        var height = 100; svgHeight - margin.top - margin.bottom;

        var originalCircle = {"cx" : 5,
                              "cy" : 5,
                              "r"  : 10};

        // var svg = d3.select("body")
        //   .append('svg')
        //   .attr('width', svgWidth)
        //   .attr('height', svgHeight)
          // .style("background", "red");
        var svg = data.svg;

        var timeline = {
            domain: [0, 100],
            scale: {
                index: 0,
                range: [
                    1,
                    10,
                ]
            }
            // domain: [0, 1000000000],
            // scale: {
            //     index: 0,
            //     range: [
            //         1,
            //         10,
            //         100,
            //         1000,
            //         10000,
            //         100000,
            //         1000000,
            //         10000000,
            //         100000000
            //     ]
            // }
        }

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

        // create scale objects
        var xAxisScale =d3.scaleLinear()
          .domain(timeline.domain)
          .range([0,width]);

        // create axis objects
        var xAxis =
            d3.axisBottom(xAxisScale)
            .ticks(10)      // <--- number of ticks to show.
            .tickSize (15)
            // .tickSubdivide(5)
            // .tickPadding(5)

            // .tickPadding(5)
            // .tickFormat (function (d) { return d + ' bob'})

        // create scale objects
        var xAxisScale2 =d3.scaleLinear()
          .domain([0, 100])
          .range([0,width]);


        var xAxis2 =
            d3.axisBottom(xAxisScale2)
            .ticks(100)
            .tickFormat (function (d) { return ''})
        //     .tickSize(14)
        //     .tickFormat("");

            // .tickSize (10)
            // .tickPadding(5)
            // .tickFormat (function (d) { return d + ' bob'})

        // Zoom Function
        var zoom = d3.zoom()
            .scaleExtent ([1, 10])
            .on("zoom", zoomFunction);

        // Inner Drawing Space
        var innerSpace = svg.append("g")
            .attr("class", "inner_space")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
            // .call(zoom);

        // Draw Axis
        var gX = innerSpace.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)

        // // Draw Axis
        // var gX = innerSpace.append("g")
        //     .attr("class", "axis axis--x")
        //     .attr("transform", "translate(0," + height + ")")
        //     .call(xAxis2)


        // append some dummy data
        var circles = innerSpace.append('circle')
            .attr("id","circles")
            .attr("cx", xAxisScale(originalCircle.cx))
            .attr('r', originalCircle.r)

        // append zoom area
        var view = innerSpace.append("rect")
          .attr("class", "zoom")
          .attr("width", width)
          .attr("height", height)
          .call(zoom)

        //   // .call(zoom.transform, d3.zoomIdentity.scale(2,2));
        //
        // function zoomFunction(){
        //   // create new scale ojects based on event
        //   var new_xScale = d3.event.transform.rescaleX(xAxisScale)
        //   // var new_yScale = d3.event.transform.rescaleY(yAxisScale)
        //   // console.log(d3.event.transform)
        //
        //   // update axes
        //   gX.call(xAxis.scale(new_xScale));
        //   // gY.call(yAxis.scale(new_yScale));
        //
        //   // update circle
        //   // circles.attr("transform", d3.event.transform)
        // };
        //
        // function zoomFunction(){
        //   // create new scale ojects based on event
        //   var new_xScale = d3.event.transform.rescaleX(xAxisScale)
        //
        //   // update axes
        //   gX.call (xAxis.scale(new_xScale));
        // };
        //
        // var btnZoomIn = document.querySelector ('#zoom-in')
        // var btnZoomOut = document.querySelector ('#zoom-out')
        //
        // // var zoom = d3.zoom ()
        // //     .on ('zoom', function () {
        // //         // console.log ('bob', arguments);
        // //         // g.attr("transform", d3.event.transform);
        // //     })
        // // svg = d3.select("svg")
        // // .call (d3.zoom().on("zoom", function () {
        // //       svg.attr("transform", d3.event.transform)
        // //  }))
        // // .append("g");
        //
        // function transition(zoomLevel) {
        //   svg.transition()
        //       .delay(100)
        //       .duration(700)
        //       .call(zoom.scaleBy, zoomLevel);
        //       //.call(zoom.transform, transform);
        //       //.on("end", function() { canvas.call(transition); });
        // }
        //
        // d3.select ('#zoom-in').on ('click', function() {
        //     console.log ('zooming in...')
        //     // scale = scale + 1;
        //     var scale;
        //
        //     timeline.scale.index++;
        //     if (timeline.scale.index >= timeline.scale.range.length) {
        //         timeline.scale.index = timeline.scale.range.length - 1;
        //     }
        //
        //     scale = timeline.scale.range [timeline.scale.index];
        //
        //     transition (scale);
        //
        //     // svg
        //     // .transition ()
        //     // .call (zoom.scaleTo, scale);
        //
        //     // // create new scale ojects based on event
        //     // var new_xScale = d3.event.transform.rescaleX(xAxisScale)
        //     //
        //     // // update axes
        //     // gX.call (xAxis.scale(new_xScale));
        // });
        //
        // d3.select ('#zoom-out').on ('click', function() {
        //     console.log ('zooming out...')
        //     var scale;
        //
        //     timeline.scale.index--;
        //     if (timeline.scale.index < 0) {
        //         timeline.scale.index = 0;
        //     }
        //
        //     scale = timeline.scale.range [timeline.scale.index];
        //
        //     svg
        //     .transition ()
        //     .call (zoom.scaleTo, scale); // return to initial state
        // });
        // return {
        //     width,
        //     height,
        // }
    }

    function demo3 () {
        // var data = demo1 ();

        // var svg = d3.select("#svg");
        //
        // svg.append("rect")
        //     .attr("class", "overlay")
        //     .attr("width", data.width)
        //     .attr("height", data.height);
        //
        // svg.selectAll("circle")
        //     .data(data)
        //     .enter().append("circle")
        //     .attr("r", 2.5)
        //     .attr("transform", function(d) { return "translate(" + d + ")"; });


        // var width = data.width,
        //     height = data.height;
        var width = 960,
            height = 500;

        var randomX = d3.randomUniform(width / 2, 80),
            randomY = d3.randomUniform(height / 2, 80);
        // var randomX = d3.randomUniform(width / 2, 80),
        //     randomY = d3.randomUniform(height / 2, 80);

        var data = d3.range(2000).map(function() {
            return [randomX(), randomY() ];
        });


        // var svg = d3.select("body")
        // 		.append("svg")
        // 			.attr('id', 'svg')
        //     	.attr("width", width)
        //     	.attr("height", height)
        //   	.append("g")
        //   	.append("g")
        //   	.attr('id', 'g');
        // var svg = d3.select("body")
        var svg = d3.select("body")
        		.append("svg")
        			.attr('id', 'svg')
            	.attr("width", width)
            	.attr("height", height)
          	.append("g")
          	.append("g")
          	.attr('id', 'g');

        svg.append("rect")
            .attr("class", "overlay")
            .attr("width", width)
            .attr("height", height);

            svg.selectAll("circle")
                .data(data)
              .enter().append("circle")
                .attr("r", 2.5)
                .attr("transform", function(d) { return "translate(" + d + ")"; });


        //****************** ZOOM IMPLEMENTATION ********************
        var g = d3.select("#g");
        var svg = d3.select('#svg');

        var zoom = d3.zoom()
            .scaleExtent([1/2, 4])
            .on("zoom", zoomed);

        svg.call(zoom);

        function zoomed() {
          g.attr('transform', `translate(${d3.event.transform.x},  	 ${d3.event.transform.y}) scale(${d3.event.transform.k})`);
        };

        // this function need to be called if we need zoom to center of the picture
        /*function transform() {
          return d3.zoomIdentity
              .translate(width / 2.75, height / 2.75)
              .scale(zoomLevel)
              .translate(-width/2.75, -height/2.75);
        }*/

        function transition(zoomLevel) {
          svg.transition()
              .delay(100)
              .duration(700)
              .call(zoom.scaleBy, zoomLevel);
              //.call(zoom.transform, transform);
              //.on("end", function() { canvas.call(transition); });
        }

        d3.selectAll('button').on('click', function() {
            console.log ('bob')
          if (this.id === 'zoom_in') {
            transition(1.2); // increase on 0.2 each time
          }
          if (this.id === 'zoom_out') {
            transition(0.8); // deacrease on 0.2 each time
          }
          if (this.id === 'zoom_init') {
            svg.transition()
                .delay(100)
                .duration(700)
                .call(zoom.scaleTo, 1); // return to initial state
          }
        });

        return {
            width,
            height,
            svg
        }


        //     svg.selectAll("circle")
        //         .data(data)
        //       .enter().append("circle")
        //         .attr("r", 2.5)
        //         .attr("transform", function(d) { return "translate(" + d + ")"; });

        // var width = 960,
        //     height = 500;
        //
        // var randomX = d3.randomUniform(width / 2, 80),
        //     randomY = d3.randomUniform(height / 2, 80);
        //
        // var data = d3.range(2000).map(function() {
        //     return [randomX(), randomY() ];
        // });
        //
        //
        // var svg = d3.select("body")
        // 		.append("svg")
        // 			.attr('id', 'svg')
        //     	.attr("width", width)
        //     	.attr("height", height)
        //   	.append("g")
        //   	.append("g")
        //   	.attr('id', 'g');
        //
        // svg.append("rect")
        //     .attr("class", "overlay")
        //     .attr("width", width)
        //     .attr("height", height);
        //
        //     svg.selectAll("circle")
        //         .data(data)
        //       .enter().append("circle")
        //         .attr("r", 2.5)
        //         .attr("transform", function(d) { return "translate(" + d + ")"; });
        //
        //
        //     //****************** ZOOM IMPLEMENTATION ********************
        //     var g = d3.select("#g");
        //     var svg = d3.select('#svg');
        //
        //     var zoom = d3.zoom()
        //         .scaleExtent([1/2, 4])
        //         .on("zoom", zoomed);
        //
        //     svg.call(zoom);
        //
        //     function zoomed() {
        //       g.attr('transform', `translate(${d3.event.transform.x},  	 ${d3.event.transform.y}) scale(${d3.event.transform.k})`);
        //     };
        //
        //     // this function need to be called if we need zoom to center of the picture
        //     /*function transform() {
        //       return d3.zoomIdentity
        //           .translate(width / 2.75, height / 2.75)
        //           .scale(zoomLevel)
        //           .translate(-width/2.75, -height/2.75);
        //     }*/
        //
        //     function transition(zoomLevel) {
        //       svg.transition()
        //           .delay(100)
        //           .duration(700)
        //           .call(zoom.scaleBy, zoomLevel);
        //           //.call(zoom.transform, transform);
        //           //.on("end", function() { canvas.call(transition); });
        //     }
        //
        //     d3.selectAll('button').on('click', function() {
        //       if (this.id === 'zoom_in') {
        //         transition(1.2); // increase on 0.2 each time
        //       }
        //       if (this.id === 'zoom_out') {
        //         transition(0.8); // deacrease on 0.2 each time
        //       }
        //       if (this.id === 'zoom_init') {
        //         svg.transition()
        //             .delay(100)
        //             .duration(700)
        //             .call(zoom.scaleTo, 1); // return to initial state
        //       }
        //     });
    }

    function demo1 () {
        var svgWidth = 800;
        var svgHeight = 300;

        var margin = {top: 30, right: 40, bottom: 50, left: 60};

        var width = svgWidth - margin.left - margin.right;
        var height = 100; svgHeight - margin.top - margin.bottom;

        var originalCircle = {"cx" : 5,
                              "cy" : 5,
                              "r"  : 10};

        var svg = d3.select("body")
          .append('svg')
          .attr('width', svgWidth)
          .attr('height', svgHeight)
          // .style("background", "red");

        var timeline = {
            domain: [0, 100],
            scale: {
                index: 0,
                range: [
                    1,
                    10,
                ]
            }
            // domain: [0, 1000000000],
            // scale: {
            //     index: 0,
            //     range: [
            //         1,
            //         10,
            //         100,
            //         1000,
            //         10000,
            //         100000,
            //         1000000,
            //         10000000,
            //         100000000
            //     ]
            // }
        }

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

        // create scale objects
        var xAxisScale =d3.scaleLinear()
          .domain(timeline.domain)
          .range([0,width]);

        // create axis objects
        var xAxis =
            d3.axisBottom(xAxisScale)
            .ticks(10)      // <--- number of ticks to show.
            .tickSize (15)
            // .tickSubdivide(5)
            // .tickPadding(5)

            // .tickPadding(5)
            // .tickFormat (function (d) { return d + ' bob'})

        // create scale objects
        var xAxisScale2 =d3.scaleLinear()
          .domain([0, 100])
          .range([0,width]);


        var xAxis2 =
            d3.axisBottom(xAxisScale2)
            .ticks(100)
            .tickFormat (function (d) { return ''})
        //     .tickSize(14)
        //     .tickFormat("");

            // .tickSize (10)
            // .tickPadding(5)
            // .tickFormat (function (d) { return d + ' bob'})

        // Zoom Function
        var zoom = d3.zoom()
            .scaleExtent ([1, 10])
            .on("zoom", zoomFunction);

        // Inner Drawing Space
        var innerSpace = svg.append("g")
            .attr("class", "inner_space")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
            // .call(zoom);

        // Draw Axis
        var gX = innerSpace.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)

        // // Draw Axis
        // var gX = innerSpace.append("g")
        //     .attr("class", "axis axis--x")
        //     .attr("transform", "translate(0," + height + ")")
        //     .call(xAxis2)


        // append some dummy data
        var circles = innerSpace.append('circle')
            .attr("id","circles")
            .attr("cx", xAxisScale(originalCircle.cx))
            .attr('r', originalCircle.r)

        // append zoom area
        var view = innerSpace.append("rect")
          .attr("class", "zoom")
          .attr("width", width)
          .attr("height", height)
          .call(zoom)

          // .call(zoom.transform, d3.zoomIdentity.scale(2,2));

        function zoomFunction(){
          // create new scale ojects based on event
          var new_xScale = d3.event.transform.rescaleX(xAxisScale)
          // var new_yScale = d3.event.transform.rescaleY(yAxisScale)
          // console.log(d3.event.transform)

          // update axes
          gX.call(xAxis.scale(new_xScale));
          // gY.call(yAxis.scale(new_yScale));

          // update circle
          // circles.attr("transform", d3.event.transform)
        };

        function zoomFunction(){
          // create new scale ojects based on event
          var new_xScale = d3.event.transform.rescaleX(xAxisScale)

          // update axes
          gX.call (xAxis.scale(new_xScale));
        };

        var btnZoomIn = document.querySelector ('#zoom-in')
        var btnZoomOut = document.querySelector ('#zoom-out')

        // var zoom = d3.zoom ()
        //     .on ('zoom', function () {
        //         // console.log ('bob', arguments);
        //         // g.attr("transform", d3.event.transform);
        //     })
        // svg = d3.select("svg")
        // .call (d3.zoom().on("zoom", function () {
        //       svg.attr("transform", d3.event.transform)
        //  }))
        // .append("g");

        function transition(zoomLevel) {
          svg.transition()
              .delay(100)
              .duration(700)
              .call(zoom.scaleBy, zoomLevel);
              //.call(zoom.transform, transform);
              //.on("end", function() { canvas.call(transition); });
        }

        d3.select ('#zoom-in').on ('click', function() {
            console.log ('zooming in...')
            // scale = scale + 1;
            var scale;

            timeline.scale.index++;
            if (timeline.scale.index >= timeline.scale.range.length) {
                timeline.scale.index = timeline.scale.range.length - 1;
            }

            scale = timeline.scale.range [timeline.scale.index];

            transition (scale);

            // svg
            // .transition ()
            // .call (zoom.scaleTo, scale);

            // // create new scale ojects based on event
            // var new_xScale = d3.event.transform.rescaleX(xAxisScale)
            //
            // // update axes
            // gX.call (xAxis.scale(new_xScale));
        });

        d3.select ('#zoom-out').on ('click', function() {
            console.log ('zooming out...')
            var scale;

            timeline.scale.index--;
            if (timeline.scale.index < 0) {
                timeline.scale.index = 0;
            }

            scale = timeline.scale.range [timeline.scale.index];

            svg
            .transition ()
            .call (zoom.scaleTo, scale); // return to initial state
        });

        // btnZoomIn.addEventListener ('click', function () {
        //     console.log ('zooming in...')
        //     // svg.call (zoom)
        //
        //
        //     svg
        //     .transition ()
        //     .call (zoom.scaleTo, 10); // return to initial state
        //
        //     // zoom.scaleBy(svg, 0.5);
        //
        //     //
        //     // // create new scale ojects based on event
        //     // var new_xScale = d3.event.transform.rescaleX(xAxisScale)
        //     //
        //     // // update axes
        //     // gX.call (xAxis.scale(new_xScale));
        //
        //     // scale = scale + 1;
        //     // // zoomFunction ();
        //     //
        //     // var new_xScale = d3.event.transform.rescaleX(xAxisScale)
        //     // // var new_yScale = d3.event.transform.rescaleY(yAxisScale)
        //     // console.log(d3.event.transform)
        //     //
        //     // // update axes
        //     // gX.call(xAxis.scale(scale));
        //
        //     // svgViewport
        //     //     .transition()
        //     //     // .delay(100)
        //     //     // .duration(700)
        //     //     .call(zoom.scaleTo, 1); // return to initial state
        // })

        // btnZoomOut.addEventListener ('click', function () {
        //     scale = scale - 1;
        // })

        return {
            width,
            height,
        }
    }

    function demo2 () {
        var width = 960,
            height = 500;

        var randomX = d3.randomUniform(width / 2, 80),
            randomY = d3.randomUniform(height / 2, 80);

        var data = d3.range(2000).map(function() {
            return [randomX(), randomY() ];
        });


        var svg = d3.select("body")
        		.append("svg")
        			.attr('id', 'svg')
            	.attr("width", width)
            	.attr("height", height)
          	.append("g")
          	.append("g")
          	.attr('id', 'g');

        svg.append("rect")
            .attr("class", "overlay")
            .attr("width", width)
            .attr("height", height);

        svg.selectAll("circle")
            .data(data)
          .enter().append("circle")
            .attr("r", 2.5)
            .attr("transform", function(d) { return "translate(" + d + ")"; });


        //****************** ZOOM IMPLEMENTATION ********************
        var g = d3.select("#g");
        var svg = d3.select('#svg');

        var zoom = d3.zoom()
            .scaleExtent([1/2, 4])
            .on("zoom", zoomed);

        svg.call(zoom);

        function zoomed() {
          g.attr('transform', `translate(${d3.event.transform.x},  	 ${d3.event.transform.y}) scale(${d3.event.transform.k})`);
        };

        // this function need to be called if we need zoom to center of the picture
        /*function transform() {
          return d3.zoomIdentity
              .translate(width / 2.75, height / 2.75)
              .scale(zoomLevel)
              .translate(-width/2.75, -height/2.75);
        }*/

        function transition(zoomLevel) {
          svg.transition()
              .delay(100)
              .duration(700)
              .call(zoom.scaleBy, zoomLevel);
              //.call(zoom.transform, transform);
              //.on("end", function() { canvas.call(transition); });
        }

        d3.selectAll('button').on('click', function() {
          if (this.id === 'zoom_in') {
            transition(1.2); // increase on 0.2 each time
          }
          if (this.id === 'zoom_out') {
            transition(0.8); // deacrease on 0.2 each time
          }
          if (this.id === 'zoom_init') {
            svg.transition()
                .delay(100)
                .duration(700)
                .call(zoom.scaleTo, 1); // return to initial state
          }
        });
    }
});


/*
ref:

d3 v3 -> v4
https://keithpblog.org/post/upgrading-d3-from-v3-to-v4/

axis ticks
http://katieleonard.ca/blog/2014/scales-and-ticks/
https://bl.ocks.org/erikvullings/41be28677574fd484b43e91413a7e45d

tick format
https://bl.ocks.org/mbostock/9764126

panning and zooming
http://emptypipes.org/2016/07/03/d3-panning-and-zooming/
https://stackoverflow.com/questions/8681607/how-do-i-specify-the-initial-zoom-level-in-d3

https://stackoverflow.com/questions/39932579/d3-js-zoom-on-click-event
https://jsfiddle.net/vbabenko/jcsqqu6j/9/

https://stackoverflow.com/questions/42612798/d3-js-v4-programmatic-panzoom-how
https://jsfiddle.net/zeleniy/4sgqgcx0/7/


http://bl.ocks.org/feyderm/03602b83146d69b1b6993e5f98123175
https://bl.ocks.org/rutgerhofste/5bd5b06f7817f0ff3ba1daa64dee629d
*/
