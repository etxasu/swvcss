tm.add ('app.sim.timeline.Minimap', function (o, p, d) {
    o.setup = function (config) {
        var dimension, initialDomain, margin, svg_dx, svg_dy, chart_dx, chart_dy;

        dimension = window.timelineApp.getDimension ();

        margin = {top: 20, right: 0, bottom: 0, left: -5};
        svg_dx = dimension.svg.x;

        svg_dy = 50;
        chart_dx = svg_dx - margin.right - margin.left;
        chart_dy = svg_dy - margin.top - margin.bottom;
        initialDomain = dimension.domain;

        d.timeline = window.timelineApp;
        d.selector = config.selector;
        d.margin = margin;
        d.dimension = dimension;

        d.xScale = d.timeline.getXScale ();
        d.xScale2 = d.timeline.getXScale2 ();

        d.xAxis = d3.axisBottom (d.xScale2)
            .tickFormat (window.timelineApp.formatTick)
            .tickSize (15)

        d.brush = d3.brushX ()
            .extent ([[0, -40], [svg_dx, 40]])
            .on ('brush', o.handleBrush)

        d.zoom = d.timeline.getZoom ();
        d.zoom.on ('zoom', o.handleZoom)

        d.svg = d3.select(config.selector.container)
            .append("svg")
                .attr("width", svg_dx)
                .attr("height", svg_dy)

        d.context = d.svg.append("g")
            .attr("class", "context x-axis")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
            .call (d.xAxis)

        d.contextBrush = d.context.append("g")
            .attr("id", "brush-for-minimap")
            .attr("class", "brush")
            .call(d.brush)
            .call(d.brush.move, d.xScale.range());

        window.minimap = o;
        d.selector = config.selector;

        if (window.simcapi) {
            simModel = new simcapi.CapiAdapter.CapiModel({
                visible: true,
                disabled: false,
            });

            simcapi.CapiAdapter.expose('visible', simModel, {
                alias: 'Timeline.Controls.Minimap.visible'
            });

            simcapi.CapiAdapter.expose('disabled', simModel, {
                alias: 'Timeline.Controls.Minimap.disabled'
            });

            simModel.on ('change:visible', function(model, visible){
                if (visible) {
                    simModel.set ('disable', false)
                    d.svg.attr ('class', '')
                }
                else {
                    simModel.set ('disable', true)
                    d.svg.attr ('class', 'hide')
                }
            });

            simModel.on ('change:disabled', function(model, disabled){
                d.disabled = disabled;

                o.checkBrushVisible ();
            });
        }
    }

    o.checkBrushVisible = function () {
        if ( !d.timeline.getZoomDisabled () && !d.disabled) {
            d3.select ('#brush-for-minimap')
                .attr ('class', 'brush')
        }
        else {
            d3.select ('#brush-for-minimap')
                .attr ('class', 'hide')
        }
    }

    o.handleBrush = function () {
        var selection;

        // ignore brush-by-zoom
        if (d3.event.sourceEvent && d3.event.sourceEvent.type === "zoom") {
            return;
        }

        o.checkBrushVisible ();

        // If no selection was made, show the whole graph;
        selection = d3.event.selection || d.xScale.range ();

        d.timeline.getSvg ().call (
            d.zoom.transform,
            d3.zoomIdentity
            .scale (d.dimension.chart.x / (selection [1] - selection [0]))
            .translate(-selection [0], 0)
        )
    }

    o.handleZoom = function () {
        d.timeline.handleZoom ();

        // ignore zoom-by-brush
        if (d3.event.sourceEvent && d3.event.sourceEvent.type === "brush") {
            return;
        }

        o.checkBrushVisible ();

        var t = d3.event.transform;
        d.context.select(".brush").call(d.brush.move, d.xScale.range().map(t.invertX, t));
    }

    o.updateDomain = function (domain) {
        d.xAxis.scale (d.xScale2)
        d.svg.select ('.x-axis').transition ()
            .duration (0)
            .call (d.xAxis.scale (d.xScale2))
    }
})
