tm.add ('app.Timeline.D3.Pin', function (o, p, d) {
    o.setup = function (config) {
        var color, content, distanceFromBottom, height, myData, owner, pointList, tempX, uid, width, xPos;

        color = config.color;
        content = config.content;
        distanceFromBottom = config.distanceFromBottom;
        height = config.height;
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

        // Create the circle behind the image of the pin
        d.circle = d3.select ('#visualization > svg > g > #group' + uid)
            .append ('circle')
                .attr ('r', width)
                .attr ('cx', xPos)
                .attr ('cy', -distanceFromBottom)
                .attr ('fill', color)

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

        // Add the image given to us by the timeline item
        d.img = d3.select ('#visualization > svg > g > #group' + uid)
            .append ('svg:image')
                .attr ('anchor', 'middle')
                .attr ('x', xPos - width/2)
                .attr ('y', -distanceFromBottom - height/2)
                .attr ('width', width)
                .attr ('height', height)
                .attr ('xlink:href', content)

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
    }

    o.getX = function () {
        return d.xPos;
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
        d.img.attr ('x', x - (d.width/2));
        d.polygon.attr ('points', newPointList);
    }
})
