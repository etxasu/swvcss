'use strict'
tm.add ('app.sim.timeline.Pin', function (o, p, d) {
    o.setup = function (config) {
        var color, content, distanceFromBottom, height, myData, name, owner, pointList, tempX, uid, width, xPos;

        // console.log ('Pin created with', config)

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
            {x: xPos - (width /2), y: -distanceFromBottom},
            {x: xPos + (width /2), y: -distanceFromBottom},
            {x: xPos, y: 0},
        ]

        // Create a group for the pin and append it
        d.group = d3.select ('#visualization > svg > g')
            .append ('g')
                .attr ('id', 'group' + uid)
                .attr ('class', 'timeline pin')

        // This is for the ranged pin.
        d.line = d3.select ('#visualization > svg > g')
            .append("polyline")      // attach a polyline
                // .style("stroke", "black")  // colour the line
                .style("stroke", "#FFFFFF")  // colour the line
                .style("fill", "none")     // remove any fill colour
                .style ('stroke-width', '5px')
                .attr("points", "0,0 1,1")  // x,y points
                .attr ('id', 'line' + uid)

        d.lineDom = document.querySelector ('#line' + uid);
        d.lineDomParent = d.lineDom.parentNode;
        d.lineDomParent.prepend (d.lineDom)

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
                .attr ('fill', 'black')
                .attr ('stroke', '#FFFFFF')
                .attr ('stroke-width', '1')
                .attr ('unselectable', 'on')
                .attr ('draggable', false)
                .style ('user-select', 'none')

        // Create the circle behind the image of the pin
        d.circle = d3.select ('#visualization > svg > g > #group' + uid)
            .append ('circle')
                .attr ('r', width)
                .attr ('cx', xPos)
                .attr ('cy', -distanceFromBottom)
                .attr ('fill', color)
                .attr ('stroke', 'black')
                .attr ('stroke-width', '1')

        d.backgroundWidth = width * 2;
        d.backgroundHeight = height * 3;
        d.backgroundRadius = d.backgroundWidth / 5;
        
        // Add the image given to us by the timeline item
        var imageSize;

        imageSize = width;

        if (height > width) {
            imageSize = height;
        }

        // imageSize = imageSize * 2;
        imageSize = 60;

        d.img = d3.select ('#visualization > svg > g > #group' + uid)
            .append ('svg:image')
                .attr ('anchor', 'middle')
                .attr ('x', xPos - width/2)
                .attr ('y', -distanceFromBottom - height/2)
                .attr ('width', imageSize)
                .attr ('height', imageSize)
                .attr ('xlink:href', content)
                .attr ('id', 'group' + uid + 'Image')
                .attr ('class', 'pin')
                .attr ('unselectable', 'on')
                .attr ('clip-path', 'url(#clipPath' + uid +')')
                .style ('user-select', 'none')

        d.imgSize = imageSize;
        d.imgDom = document.querySelector ('#group' + uid + 'Image');
        d.imgDom.draggable = false
        d.imgDom.ondragstart = function() { return false; };

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
        d.year = 0;
        d.currentYear = Number (new Date().getFullYear ());
        // d.year = 0
        d.myYear = config.year;

        d.minimap = window.minimap;
        d.color = color;
        d.tooltip = window.tooltip;
        d.imgSrc = content;

        d.dom.onmousedown = o.mouseDownListener;
        d.dom.onmousemove = o.mouseMoveListener;
        d.dom.onmouseover = o.mouseOverListener;
        d.dom.onmouseleave = o.scaleRevert;
    }

    o.enable = function () {
        d.disabled = false;
    }

    o.disable = function () {
        d.disabled = true;
    }

    o.mouseOverListener = function (event) {
        d.owner.setCardDetailArea (event);
        o.scaleUp (event);
    }

    o.mouseDownListener = function (event) {
        event.stopPropagation ();
        d.owner.dragItem (event);
    }

    o.mouseMoveListener = function (event) {
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

    o.getDom = function () {
        return d.dom;
    }

    o.getX = function () {
        return d.xPos;
    }

    o.getScaledX = function () {
        return d.timeline.getCurrentXScale (d.xPos)
    }

    o.getUid = function () {
        return d.uid;
    }

    o.markAsCorrect = function () {
        // d.circle.attr ('fill', 'green')
        // d.background.attr ('fill', 'green')
        d.polygon.attr ('fill', 'green')
    }

    o.markAsWrong = function (correctPin) {
        d.correctPin = correctPin
        // d.circle.attr ('fill', 'red')
        // d.background.attr ('fill', 'red')
        d.polygon.attr ('fill', 'red')
    }

    o.remove = function () {
        // console.log (d.dom)
        d.dom.classList.add ('hide');
        d.owner.unhide ();
    }

    o.scaleUp = function (event) {
        var boundBox, centerX, centerY, scale, translateString, translateX, translateY;

        if (event) {
            event.stopPropagation ();
        }

        // unhide tooltip
        // d.tooltip.attr ('class', 'tool-tip');
        // d.tooltipName.attr ('class', '');
        // d.tooltipYear.attr ('class', '')
        // document.querySelector ('#year' + d.uid).innerHTML = o.updateYearText ();
        d.tooltip.updateText ({
            image: d.imgSrc,
            name: d.name,
            year: o.updateYearText ()
        });
        d.tooltip.unhide ();

        // Scale up whole element
        try {
            // d.lineParent.removeChild (d.lineDom);

            // Do the math for scaling the image directly up
            boundBox = document.querySelector ('#visualization > svg > g > #group' + d.uid).getBBox();

            centerX = boundBox.x + (boundBox.width/2),
            centerY = boundBox.y + (boundBox.height);
            scale = 1.2;

            translateX = -centerX * (scale - 1);
            translateY = -centerY * (scale - 1);
            translateString = translateX + ',' + translateY;
            // d.translateString = translateString;

            // Scales item up
            // d.group.attr ('transform', 'translate(' + translateString + ') scale(' + scale + ')')

            // Re-add line
            // document.querySelector ('#visualization > svg > g').prepend (d.lineDom);

            if (d.correctPin) {
                d.correctPin.scaleUp ();
            }
        }
        catch (error) {
            // console.log (error)
        }
    }

    o.scaleRevert = function (event) {
        var boundBox, centerX, centerY, scale, translateString, translateX, translateY;

        if (event) {
            event.stopPropagation ();
        }

        // hide tooltip
        // d.tooltip.attr ('class', 'tool-tip hide')
        // d.tooltipName.attr ('class', 'hide');
        // d.tooltipYear.attr ('class', 'hide');
        d.tooltip.hide ();

        // Return scale of whole element to normal
        try {
            // Remove line from bounding box to prevent it from messing with the scale
            // document.querySelector ('#visualization > svg > g').removeChild (d.lineDom);

            boundBox = document.querySelector ('#visualization > svg > g > #group' + d.uid).getBBox();

            centerX = boundBox.x + (boundBox.width/2),
            centerY = boundBox.y + (boundBox.height/2);
            scale = 1;

            translateX = -centerX * (scale - 1);
            translateY = -centerY * (scale - 1);
            translateString = translateX + ',' + translateY;
            // d.translateString = translateString;

            // Scales item back down
            // d.group.attr ('transform', 'translate(' + translateString + ') scale(' + scale + ')')

            // Re-add line
            // d.lineParent.prepend (d.lineDom);
            if (d.correctPin) {
                d.correctPin.scaleRevert ();
            }
        }
        catch (error) {
            // console.log (error)
        }
    }

    o.updateYearText = function () {
        var absPos, label, roundedPos, suffix, text, year;

        text = '';
        suffix = '';
        absPos = Math.floor (Math.abs (d.xPos));
        roundedPos = Math.abs (Math.floor (d.xPos));
        year = d.year

        if (roundedPos - year > 1000000000) {
            roundedPos = ( (roundedPos - year) / 1000000000).toFixed (2)
            suffix = 'Billion';
            text = roundedPos + ' ' + suffix;
        }
        else if (roundedPos - year > 1000000) {
            roundedPos = ( (roundedPos - year) / 1000000).toFixed (2)
            suffix = 'Million';
            text = roundedPos + ' ' + suffix;
        }
        else if (roundedPos - year > 10000) {
            roundedPos = ( (roundedPos - year) / 1000).toFixed (2)
            suffix = 'Thousand';
            text = roundedPos + ' ' + suffix;
        }
        else {
            if (d.xPos < 0) {
                roundedPos += year;
            }
            else {
                roundedPos -= year;
            }

            text = Math.abs (roundedPos);
        }

        if (d.xPos < year) {
            label = '<b>' + text + '</b>' + ' Years Ago'
        }
        else if (absPos > year) {
            label = '<b>' + text + '</b>' + ' Years From Now'
        }
        else if (absPos == year) {
            label = '<b>0</b> Years'
        }

        d.yearLabel = label;

        return label;
    }

    o.getYearLabel = function () {
        return d.yearLabel;
    }

    o.setYearLabel = function (label) {
        // d.tooltipYear.text ( o.updateYearText () );
    }

    o.setX = function (xScale) {
        var linePointList, newPointList, x;

        x = xScale (d.xPos)

        newPointList = [
            '' + (x - (d.width / 2)) + ',' + -d.distanceFromBottom,
            '' + (x + (d.width / 2)) + ',' + -d.distanceFromBottom,
            '' + x + ',' + 0,
        ].join (' ');

        linePointList = [
            '' + x + ',' + -d.distanceFromBottom,
            // '' + x + ',' + -d.distanceFromBottom,
        ].join (' ');

        d.circle.attr ('cx', x);
        d.circle.attr ('cy', -d.distanceFromBottom);
        // d.background.attr ('x', x - (d.backgroundWidth / 2));
        // d.background.attr ('y', -d.distanceFromBottom - (d.backgroundHeight/2))
        // d.clipPath.attr ('x', x - (d.backgroundWidth / 2) + 5);
        // d.clipPath.attr ('y', -d.distanceFromBottom - (d.backgroundHeight/2) + 5)
        // d.tooltip.attr ('x', x - (d.width * 5));
        // d.tooltip.attr ('y', -( d.distanceFromBottom + ( d.height * 3 ) ));
        // d.tooltipName.attr ('x', x);
        // d.tooltipName.attr ('y', -( d.distanceFromBottom + ( d.height * 2.5 ) ));
        // d.tooltipYear.attr ('x', x);
        // d.tooltipYear.attr ('y', -( d.distanceFromBottom + ( d.height * 2 ) ));
        d.img.attr ('x', x - (d.imgSize/2));
        d.img.attr ('y', -d.distanceFromBottom - d.imgSize/2);
        d.polygon.attr ('points', newPointList);
        d.line.attr ('points', linePointList);

        // This fixes a weird issue with the grey pin being incorrectly offset when placed without moving the mouse.
        o.scaleUp ()
        o.scaleRevert ();

        d.owner.updateSimModel ({
            userDate: d.xPos
        })

        if (!d.minimapPin) {
            d.minimapPin = d.minimap.addPin (d.xPos, d.color);
        }
        else {
            d.minimap.updatePin (d.minimapPin, d.xPos)
        }
    }

    o.setXPos = function (xPos) {
        d.xPos = xPos;
    }

    o.setPosToMouse = function (x, y) {
        if (!d.disabled) {
            var coordinates, linePointList, newPointList;

            if (Number.isNaN (x) || !x) { x = 0 }
            if (Number.isNaN (y) || !y) { y = 0 }

            // Offsetting to prevent weird issues when mousing over an image

            // console.log ('x:', x, ', y:', y)

            newPointList = [
                '' + (x - (d.width / 2)) + ',' + (y - d.distanceFromBottom),
                '' + (x + (d.width / 2)) + ',' + (y - d.distanceFromBottom),
                '' + x + ',' + y,
            ].join (' ');

            linePointList = [
                '' + x + ',' + -d.distanceFromBottom,
                // '' + x + ',' + -d.distanceFromBottom,
            ].join (' ');

            d.xPos = window.timelineApp.getDomainX ()
            // d.tooltipYear.text ( o.updateYearText () );
            d.tooltip.updateText ({
                image: d.imgSrc,
                name: d.name,
                year: o.updateYearText ()
            });

            d.circle.attr ('cx', x);
            d.circle.attr ('cy', -d.distanceFromBottom + y);
            // d.background.attr ('x', x - (d.backgroundWidth / 2));
            // d.background.attr ('y', (-d.distanceFromBottom - (d.backgroundHeight/2)) + y);
            // d.clipPath.attr ('x', x - (d.backgroundWidth / 2) + 5);
            // d.clipPath.attr ('y', (-d.distanceFromBottom - (d.backgroundHeight/2)) + y + 5);
            // d.tooltip.attr ('x', x - (d.width * 5));
            // d.tooltip.attr ('y', -( d.distanceFromBottom + ( d.height * 3 ) ) + y);
            // d.tooltipName.attr ('x', x);
            // d.tooltipName.attr ('y',-( d.distanceFromBottom + ( d.height * 2.5 ) ) + y);
            // d.tooltipYear.attr ('x', x);
            // d.tooltipYear.attr ('y', -( d.distanceFromBottom + ( d.height * 2 ) ) + y);
            d.img.attr ('x', x - (d.imgSize/2));
            d.img.attr ('y', y + (-d.distanceFromBottom - d.imgSize/2));
            d.polygon.attr ('points', newPointList);
            d.line.attr ('points', linePointList);
        }
    }

    o.hide = function () {
        d.dom.classList.add ('hide');
        d.line.style("stroke", "transparent")  // colour the line
        if (d.minimapPin) {
            d.minimap.hidePin (d.minimapPin)
        }
    }

    o.unhide = function () {
        d.dom.classList.remove ('hide');
        d.line.style("stroke", "#FFFFFF")  // colour the line
        if (d.minimapPin) {
            d.minimap.showPin (d.minimapPin)
        }
    }
})
