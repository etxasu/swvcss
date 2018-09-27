'use strict'
tm.add ('app.sim.timeline.pin.Range', ['app.sim.timeline.Pin'], function (o, p, d) {
    o.setup = function (config) {
        // Create the second pin using a given offset

        // Create the line between the two pins

        var color, content, distanceFromBottom, height, myData, name, owner, pointList, tempX, uid, width, xPos;

        color = 'grey';
        content = config.content;
        distanceFromBottom = config.distanceFromBottom;
        height = config.height;
        name = config.name;
        owner = config.owner;
        width = config.width;
        xPos = config.initialX;
        uid = config.uid;
        // d.imgDom.onmouseup = function (event) { console.log ('here.') };

        pointList = [
            {x: xPos - (width / 2), y: -distanceFromBottom},
            {x: xPos + (width / 2), y: -distanceFromBottom},
            {x: xPos, y: 0},
        ]

        // Add a second label to the first tooltip item
        // d.tooltipYear2 = d3.select ('#visualization > svg > g > #group' + uid)
        //     .append ('text')
        //         .attr ('anchor', 'middle')
        //         .attr ('x', xPos)
        //         .attr ('y', -( distanceFromBottom + ( height * 1.5 ) ) )
        //         .text ('to xxxxxx Years Ago')
        //         .attr ('font-size', '14px')
        //         .attr ('font-weight', 'bold')
        //         .attr ('fill', 'black')
        //         .attr ('class', 'hide')
        //         .attr ('unselectable', 'on')
        //         .attr ('id', 'year2' + uid)
        //         .style ('user-select', 'none')
        //
        // d.tooltipYearDom2 = document.querySelector ('#year2' + uid);

        // Create a group for the pin and append it
        d.group2 = d3.select ('#visualization > svg > g')
            .append ('g')
                .attr ('id', 'group' + uid + 'Range')
                .attr ('class', 'timeline pin')

        // Moved the line to the base pin so it will draw behind it

        // Create the pointer for the pin
        // d.polygon2 = d3.select ('#visualization > svg > g > #group' + uid + 'Range')
        //     .append ('polygon')
        //         .attr ('points', function () {
        //             var pointString;
        //
        //             // Create a string formated for the polygon's points attribute
        //             // "a,b c,d e,f"
        //             pointString = [
        //                 '' + pointList [0].x + ',' + pointList [0].y,
        //                 '' + pointList [1].x + ',' + pointList [1].y,
        //                 '' + pointList [2].x + ',' + pointList [2].y,
        //             ].join (' ')
        //
        //             return pointString;
        //         })
        //         .attr ('fill', 'black')
        //         .attr ('stroke', 'white')
        //         .attr ('stroke-width', '1')
        //         .attr ('unselectable', 'on')
        //         .attr ('draggable', false)
        //         .style ('user-select', 'none')

        // Create the circle behind the image of the pin
        // d.circle2 = d3.select ('#visualization > svg > g > #group' + uid + 'Range')
        //     .append ('circle')
        //         .attr ('r', width)
        //         .attr ('cx', xPos)
        //         .attr ('cy', -distanceFromBottom)
        //         .attr ('fill', color)
        //         .attr ('stroke', 'black')
        //         .attr ('stroke-width', '1')

        d.backgroundWidth2 = width * 2;
        d.backgroundHeight2 = height * 3;
        d.backgroundRadius2 = d.backgroundWidth / 5;

        // d.background2 = d3.select ('#visualization > svg > g > #group' + uid + 'Range')
        //     .append("rect")
        //         .attr ('fill', color)
        //         .attr ('stroke', 'black')
        //         .attr("x", xPos)
        //         .attr("y", -distanceFromBottom - d.backgroundHeight)
        //         .attr("width", d.backgroundWidth)
        //         .attr("height", d.backgroundHeight)
        //         .attr("rx", d.backgroundRadius)
        //         .attr("ry", d.backgroundRadius)
        //
        // d.clipPath2 = d3.select ('#visualization > svg > g > #group' + uid + 'Range')
        //     .append ('clipPath')
        //         .attr ('id', 'clipPath' + uid + 'Range')
        //         .append("rect")
        //             .attr("x", xPos)
        //             .attr("y", -distanceFromBottom - d.backgroundHeight)
        //             .attr("width", d.backgroundWidth - 10)
        //             .attr("height", d.backgroundHeight - 10)
        //             .attr("rx", d.backgroundRadius)
        //             .attr("ry", d.backgroundRadius)

        // Add the image given to us by the timeline item
        // d.img2 = d3.select ('#visualization > svg > g > #group' + uid + 'Range')
        //     .append ('svg:image')
        //         .attr ('anchor', 'middle')
        //         .attr ('x', xPos - width/2)
        //         .attr ('y', -distanceFromBottom - height/2)
        //         .attr ('width', d.imgSize)
        //         .attr ('height', d.imgSize)
        //         .attr ('xlink:href', content)
        //         .attr ('id', 'group' + uid + 'Image')
        //         .attr ('class', 'pin')
        //         .attr ('unselectable', 'on')
        //         .attr ('clip-path', 'url(#clipPath' + uid +'Range)')
        //         .style ('user-select', 'none')

        d.boxWidth = 100;
        d.boxHeight = 20;

        d.box = d3.select ('#visualization > svg > g > #group' + uid + 'Range')
            .append("rect")
                .attr ('fill', 'rgba(255,255,255,0.4)')
                .attr ('stroke', 'white')
                .attr ("x", xPos)
                .attr ("y", 0)
                .attr ("width", d.boxWidth)
                .attr ("height", d.boxHeight)

        d.dom2 = $ ('#group' + uid + 'Range') [0]

        // Keep the yellow pin on top since that is what gets dragged.
        d.dom2.parentNode.insertBefore (d.dom2, d.dom)
    }

    o.setRangeViewable = function (viewable) {
        d.rangeViewable = viewable;

        if (viewable) {
            d.box.attr ('class', '');
        }
        else {
            d.box.attr ('class', 'hide');
        }
    }

    o.override ({
        setPosToMouse: function (original, x, y) {
            original (x, y);

            d.tooltip.updateText ({
                image: d.imgSrc,
                name: d.name,
                year: o.updateYearText () //+ d.yearLabel2
            });
            // d.tooltipYear2.attr ('x', x);

            x = x //+ d.width*2.3;
            y = y

            // d.tooltipYear2.attr ('y', -( d.distanceFromBottom + ( d.height * 1.5 ) ) + y);

            o.updateYearText ();
            // d.tooltipYearDom2.innerHTML = d.yearLabel2;

            // set the second pins position
            var linePointList, newPointList;

            if (Number.isNaN (x) || !x) { x = 0 }
            if (Number.isNaN (y) || !y) { y = 0 }

            newPointList = [
                '' + (x - d.width) + ',' + (y - d.distanceFromBottom),
                '' + (x + d.width) + ',' + (y - d.distanceFromBottom),
                '' + x + ',' + y,
            ].join (' ');

            linePointList = [
                '' + x - 50 + ',' + (y - d.distanceFromBottom),
                '' + x + ',' + (y - d.distanceFromBottom),
            ].join (' ');

            var xScale;
            xScale = window.timelineApp.getCurrentXScale ()

            // d.xPos = window.timelineApp.getDomainX ()
            d.boxWidth = xScale (d.xPos + Math.abs (d.myYear.earliest - d.myYear.latest)) - xScale (d.xPos)

            d.box.attr ('width', d.boxWidth)
            var boxX, distance;

            boxX = xScale (d.xPos) - d.boxWidth;
            distance = Math.abs (xScale (d.myYear.latest) - xScale (d.myYear.canon))

            // console.log (distance)
            // console.log ('Box placement:', boxX);
            // console.log ('Distance offset:', distance)

            d.box.attr ('x', boxX + distance);
            d.box.attr ('y', -d.boxHeight / 2);

            // d.circle2.attr ('cx', x);
            // d.circle2.attr ('cy', -d.distanceFromBottom + y);
            // d.background2.attr ('x', x - (d.backgroundWidth2 / 2));
            // d.background2.attr ('y', (-d.distanceFromBottom - (d.backgroundHeight2/2)) + y);
            // d.clipPath2.attr ('x', x - (d.backgroundWidth2 / 2) + 5);
            // d.clipPath2.attr ('y', (-d.distanceFromBottom - (d.backgroundHeight2/2)) + y + 5);
            // d.img2.attr ('x', x - (d.imgSize/2));
            // d.img2.attr ('y', y + (-d.distanceFromBottom - d.imgSize/2));
            // d.polygon2.attr ('points', newPointList);
            // d.line.attr ('points', linePointList);
            // d.tooltipYearDom.innerHTML = d.yearLabel;
        },

        setX: function (original, xScale) {
            var linePointList, newPointList, x, yearDistance;

            // set the first pin's position
            original (xScale);

            // d.tooltipYear2.attr ('x', xScale (d.xPos) );
            // d.tooltipYear2.attr ('y', -( d.distanceFromBottom + ( d.height * 1.5 ) ));

            // set the second pins position
            x = window.timelineApp.getCurrentXScale () (d.xPos + Math.abs (d.myYear.earliest - d.myYear.latest))

            d.xPos2 = x;

            o.updateYearText ();
            // d.tooltipYearDom2.innerHTML = d.yearLabel2;

            newPointList = [
                '' + (x - (d.width / 2)) + ',' + -d.distanceFromBottom,
                '' + (x + (d.width / 2)) + ',' + -d.distanceFromBottom,
                '' + x + ',' + 0,
            ].join (' ');

            linePointList = [
                '' + xScale (d.xPos) + ',' + -d.distanceFromBottom,
                '' + x + ',' + -d.distanceFromBottom,
            ].join (' ');

            d.boxWidth = x - xScale (d.xPos)

            d.box.attr ('width', d.boxWidth)

            var boxX, distance;

            boxX = xScale (d.xPos) - d.boxWidth;
            distance = Math.abs (xScale (d.myYear.latest) - xScale (d.myYear.canon))

            // console.log (distance)
            // console.log ('Box placement:', boxX);
            // console.log ('Distance offset:', distance)

            d.box.attr ('x', boxX + distance);
            d.box.attr ('y', -d.boxHeight / 2);

            // d.circle2.attr ('cx', x);
            // d.circle2.attr ('cy', -d.distanceFromBottom)
            // d.background2.attr ('x', x - (d.backgroundWidth2 / 2));
            // d.background2.attr ('y', (-d.distanceFromBottom - (d.backgroundHeight2/2)));
            // d.clipPath2.attr ('x', x - (d.backgroundWidth2 / 2) + 5);
            // d.clipPath2.attr ('y', -d.distanceFromBottom - (d.backgroundHeight2/2) + 5)
            // d.img2.attr ('x', x - (d.imgSize/2));
            // d.img2.attr ('y', -d.distanceFromBottom - d.imgSize/2);
            // d.polygon2.attr ('points', newPointList);
            // d.line.attr ('points', linePointList);
            // d.tooltipYearDom.innerHTML = d.yearLabel;
        },

        unhide: function (original) {
            original ();
            d.dom2.classList.remove ('hide');
            d.lineDom.classList.remove ('hide');
        },

        hide: function (original) {
            original ();
            d.dom2.classList.add ('hide');
            d.lineDom.classList.add ('hide')
        },

        scaleUp: function (original, event) {
            var boundBox, centerX, centerY, scale, translateString, translateX, translateY;

            original (event);

            d.tooltip.updateText ({
                image: d.imgSrc,
                name: d.name,
                year: o.updateYearText ()// + d.yearLabel2
            });
            // d.tooltipYearDom.innerHTML = d.yearLabel;
            // d.tooltipYear2.attr ('class', '');
            // d.tooltipYearDom2.innerHTML = d.yearLabel2;

            // Scale up the pin
            try {
                boundBox = document.querySelector ('#visualization > svg > g > #group' + d.uid + 'Range').getBBox();

                centerX = boundBox.x + (boundBox.width/2),
                centerY = boundBox.y + (boundBox.height/2);
                scale = 1.2;

                translateX = -centerX * (scale - 1);
                translateY = -centerY * (scale - 1);
                translateY -= 10;
                translateString = translateX + ',' + translateY;
                // d.translateString = translateString;

                // d.group2.attr ('transform', 'translate(' + translateString + ') scale(' + scale + ')')
            }
            catch (error) {}
        },

        scaleRevert: function (original, event) {
            var boundBox, centerX, centerY, scale, translateString, translateX, translateY;

            original (event);

            d.tooltip.updateText ({
                image: d.imgSrc,
                name: d.name,
                year: o.updateYearText () //+ d.yearLabel2
            });
            // d.tooltipYear2.attr ('class', 'hide');

            // Return scale of whole element to normal
            try {
                // Remove line from bounding box to prevent it from messing with the scale
                // d.lineParent.removeChild (d.lineDom);

                boundBox = document.querySelector ('#visualization > svg > g > #group' + d.uid + 'Range').getBBox();

                centerX = boundBox.x + (boundBox.width/2),
                centerY = boundBox.y + (boundBox.height/2);
                scale = 1;

                translateX = -centerX * (scale - 1);
                translateY = -centerY * (scale - 1);
                translateString = translateX + ',' + translateY;
                // d.translateString = translateString;

                // d.group2.attr ('transform', 'translate(' + translateString + ') scale(' + scale + ',1)')
            }
            catch (error) {}
        },

        // updateYearText: function (original) {
        //     var firstLabel, secondLabel;
        //
        //     firstLabel = original ();
        //
        //     d.yearLabel = 'From ' + d.yearLabel;
        //
        //     var absPos, label, roundedPos, suffix, text, xPos2;
        //
        //     xPos2 = d.xPos + Math.abs (d.myYear.earliest - d.myYear.latest)
        //     text = '';
        //     suffix = '';
        //     absPos = Math.floor (Math.abs (xPos2));
        //     roundedPos = Math.abs (Math.floor (xPos2));
        //
        //     if (roundedPos - d.year > 1000000000) {
        //         roundedPos = ( (roundedPos - d.year) / 1000000000).toFixed (2)
        //         suffix = 'Billion';
        //         text = roundedPos + ' ' + suffix;
        //     }
        //     else if (roundedPos - d.year > 1000000) {
        //         roundedPos = ( (roundedPos - d.year) / 1000000).toFixed (2)
        //         suffix = 'Million';
        //         text = roundedPos + ' ' + suffix;
        //     }
        //     else if (roundedPos - d.year > 10000) {
        //         roundedPos = ( (roundedPos - d.year) / 10000).toFixed (2)
        //         suffix = 'Thousand';
        //         text = roundedPos + ' ' + suffix;
        //     }
        //     else {
        //         if (xPos2 < 0) {
        //             roundedPos += d.year;
        //         }
        //         else {
        //             roundedPos -= d.year;
        //         }
        //
        //         text = Math.abs (roundedPos);
        //     }
        //
        //     if (xPos2 < d.year) {
        //         secondLabel ='to ' + text + ' Years Ago'
        //     }
        //     else if (absPos > d.year) {
        //         secondLabel = 'to ' + text + ' Years From Now'
        //     }
        //     else if (absPos == d.year) {
        //         secondLabel = 'to ' + 'Current Year'
        //     }
        //
        //     d.yearLabel2 = '\n' + secondLabel;
        //     // d.tooltipYearDom2.innerHTML = d.yearLabel2;
        //
        //     return firstLabel
        // },

        remove: function (original) {
            original ();
            // console.log (d.dom)
            d.line.attr ('class', 'hide')
            d.dom2.classList.add ('hide');
        }
    })
})
