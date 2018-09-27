tm.add ('app.sim.timeline.Pin', function (o, p, d) {
    o.setup = function (config) {
        var color, content, distanceFromBottom, height, myData, name, owner, pointList, tempX, uid, width, xPos;

        color = config.color;
        content = config.content;
        distanceFromBottom = config.distanceFromBottom;
        height = config.height;
        name = config.name;
        owner = config.owner;
        width = config.width;
        xPos = config.initialX;
        uid = config.uid;

        pointList = [
            {x: xPos - width, y: -distanceFromBottom},
            {x: xPos + width, y: -distanceFromBottom},
            {x: xPos, y: 0},
        ]

        // Create a group for the pin and append it
        d.group = d3.select ('#visualization > svg > g')
            .append ('g')
                .attr ('id', 'group' + uid)
                .attr ('class', 'timeline pin')

        // Create the circle behind the image of the pin
        d.circle = d3.select ('#visualization > svg > g > #group' + uid)
            .append ('circle')
                .attr ('r', width)
                .attr ('cx', xPos)
                .attr ('cy', -distanceFromBottom)
                .attr ('fill', color)

        // the tooltip
        d.toolTip = d3.select ('#visualization > svg > g > #group' + uid)
            .append ('rect')
                .attr ('width', width * 6)
                .attr ('height', height * 2)
                .attr ('x', xPos - width * 3)
                .attr ('y', -( distanceFromBottom + ( height * 3 ) ) )
                .attr ('fill', color)
                .attr ('class', 'tool-tip hide')
                .attr ('unselectable', 'on')
                .style ('user-select', 'none')

        d.toolTipName = d3.select ('#visualization > svg > g > #group' + uid)
            .append ('text')
                .attr ('x', xPos)
                .attr ('y', -( distanceFromBottom + ( height * 2.5 ) ) )
                .text (name)
                .attr ('anchor', 'middle')
                .attr ('font-size', '14px')
                .attr ('font-weight', 'bold')
                .attr ('fill', 'black')
                .attr ('class', 'hide')
                .attr ('unselectable', 'on')
                .style ('user-select', 'none')

        d.toolTipYear = d3.select ('#visualization > svg > g > #group' + uid)
            .append ('text')
                .attr ('x', xPos)
                .attr ('y', -( distanceFromBottom + ( height * 2 ) ) )
                .text ('xxxxxx Years Ago')
                .attr ('anchor', 'middle')
                .attr ('font-size', '14px')
                .attr ('font-weight', 'bold')
                .attr ('fill', 'black')
                .attr ('class', 'hide')
                .attr ('unselectable', 'on')
                .style ('user-select', 'none')


        // Create the pointer for the pin
        d.polygon = d3.select ('#visualization > svg > g > #group' + uid)
            .append ('polygon')
                .attr ('points', function () {
                    var pointString;

                    // Create a string formated for the polygon's points attribute
                    // "a,b c,d e,f"
                    pointString = [
                        '' + pointList [0].x + ',' + pointList [0].y,
                        '' + pointList [1].x + ',' + pointList [1].y,
                        '' + pointList [2].x + ',' + pointList [2].y,
                    ].join (' ')

                    return pointString;
                })
                .attr ('fill', color)
                .attr ('unselectable', 'on')
                .attr ('draggable', false)
                .style ('user-select', 'none')


        // Add the image given to us by the timeline item
        d.img = d3.select ('#visualization > svg > g > #group' + uid)
            .append ('svg:image')
                .attr ('anchor', 'middle')
                .attr ('x', xPos - width/2)
                .attr ('y', -distanceFromBottom - height/2)
                .attr ('width', width)
                .attr ('height', height)
                .attr ('xlink:href', content)
                .attr ('id', 'group' + uid + 'Image')
                .attr ('unselectable', 'on')
                .style ('user-select', 'none')

        document.querySelector ('#group' + uid + 'Image').draggable = false
        document.querySelector ('#group' + uid + 'Image').ondragstart = function() { return false; };

        // Store a reference to the newly created pin
        d.dom = $ ('#group' + uid) [0]
        d.owner = owner;
        d.color = color;
        d.content = content;
        d.distanceFromBottom = distanceFromBottom;
        d.height = height;
        d.owner = owner;
        d.width = width;
        d.xPos = config.xPos;
        d.uid = uid;
        d.pointList = pointList;
        d.xScale = config.xScale;
        d.timeline = config.timeline;
        d.middleX = xPos + (width/2);
        d.name = name;
        d.year = new Date().getFullYear ();
        d.year = Number (d.year)

        d.dom.onmousedown = function (event) {
            event.stopPropagation ();

            d.owner.dragItem (event);
        }

        d.dom.onmousemove = function () {
            if (window.getSelection) {
                if (window.getSelection().empty) {  // Chrome
                    // console.log ('Remove any selections')
                    window.getSelection().empty();
                }
                else if (window.getSelection().removeAllRanges) {  // Firefox
                    // console.log ('Remove any selections')
                    window.getSelection().removeAllRanges();
                }
            }
            else if (document.selection) {  // IE?
                // console.log ('Remove any selections')
                document.selection.empty();
            }
        }

        d.dom.onmouseover = o.scaleUp;
        d.dom.onmouseleave = o.scaleRevert;
    }

    o.getDom = function () {
        return d.dom;
    }

    o.getX = function () {
        return d.xPos;
    }

    o.scaleUp = function (event) {
        var boundBox, centerX, centerY, scale, scaleString, translateX, translateY;
        event.stopPropagation ();

        // unhide tooltip
        d.toolTip.attr ('class', 'tool-tip');
        d.toolTipName.attr ('class', '');
        d.toolTipYear.attr ('class', '').text ( o.updateYearText );

        // Scale up whole element
        try {
            boundBox = document.querySelector ('#visualization > svg > g > #group' + d.uid).getBBox();

            centerX = boundBox.x + (boundBox.width/2),
            centerY = boundBox.y + (boundBox.height);
            scale = 1.2;

            translateX = -centerX * (scale - 1);
            translateY = -centerY * (scale - 1);
            translateString = translateX + ',' + translateY;

            d.group.attr ('transform', 'translate(' + translateString + ') scale(' + scale + ')')
        }
        catch (error) {}
    }

    o.scaleRevert = function (event) {
        var boundBox, centerX, centerY, scale, scaleString, translateX, translateY;
        event.stopPropagation ();

        // hide tooltip
        d.toolTip.attr ('class', 'tool-tip hide')
        d.toolTipName.attr ('class', 'hide');
        d.toolTipYear.attr ('class', 'hide');

        // Return scale of whole element to normal
        try {
            boundBox = document.querySelector ('#visualization > svg > g > #group' + d.uid).getBBox();

            centerX = boundBox.x + (boundBox.width/2),
            centerY = boundBox.y + (boundBox.height/2);
            scale = 1;

            translateX = -centerX * (scale - 1);
            translateY = -centerY * (scale - 1);
            translateString = translateX + ',' + translateY;

            d.group.attr ('transform', 'translate(' + translateString + ') scale(' + scale + ')')
        }
        catch (error) {}
    }

    o.updateYearText = function () {
        var roundedPos

        roundedPos = Math.floor (d.xPos);

        if (roundedPos < d.year) {
            return Math.abs (Math.floor (roundedPos - d.year)) + ' Years Ago'
        }
        else if (roundedPos > d.year) {
            return Math.floor (roundedPos - d.year) + ' Years From Now'
        }
        else if (roundedPos == d.year) {
            return 'Current Year'
        }

    }

    o.setX = function (xScale) {
        var newPointList, x;

        x = xScale (d.xPos)

        newPointList = [
            '' + (x - d.width) + ',' + -d.distanceFromBottom,
            '' + (x + d.width) + ',' + -d.distanceFromBottom,
            '' + x + ',' + 0,
        ].join (' ');

        d.circle.attr ('cx', x);
        d.toolTip.attr ('x', x - (d.width * 3));
        d.toolTipName.attr ('x', x);
        d.toolTipYear.attr ('x', x);
        d.img.attr ('x', x - (d.width/2));
        d.polygon.attr ('points', newPointList);
    }

    o.setXToMouse = function (x) {
        var newPointList;

        newPointList = [
            '' + (x - d.width) + ',' + -d.distanceFromBottom,
            '' + (x + d.width) + ',' + -d.distanceFromBottom,
            '' + x + ',' + 0,
        ].join (' ');

        d.xPos = window.timelineApp.getDomainX ()
        d.toolTipYear.text ( o.updateYearText );

        d.circle.attr ('cx', x);
        d.toolTip.attr ('x', x - (d.width * 3));
        d.toolTipName.attr ('x', x);
        d.toolTipYear.attr ('x', x);
        d.img.attr ('x', x - (d.width/2));
        d.polygon.attr ('points', newPointList);

    }
})
