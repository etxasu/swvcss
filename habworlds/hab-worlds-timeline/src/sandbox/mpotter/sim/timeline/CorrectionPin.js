'use strict'
tm.add ('app.sim.timeline.pin.Correction', ['app.sim.timeline.Pin'], function (o, p, d) {

    o.setup = function (config) {
        var size;

        d.dom.onmousedown = null;
        d.line.attr ('class', 'hide')
        d.line.attr ('fill', 'green')

        d.polygon.attr ('fill', 'green')
        d.polygon.attr ('strike', 'black')
        d.polygon.attr ('strike-width', '1')

        d.distanceFromBottom = 30;

        size = 30;
        d.width = size;
        d.height = size;
        d.imgSize = size;

        d.img
            .attr ('y', -d.distanceFromBottom - size/2)
            .attr ('width', size)
            .attr ('x', d.xPos - d.width/2)
            .attr ('height', size)

        d.circle
            .attr ('r', 20)
    }

    o.setStudentAnswer = function (xPos) {
        d.studentAnswer = xPos;
    }

    o.override ({
        setPosToMouse: function (original, x, y) {},

        setX: function (original, xScale) {
            var distanceModifier, linePointList, newPointList, studentAnswer, x, y;

            original (xScale);

            x = xScale (d.xPos)
            distanceModifier = -40;
            y = d.distanceFromBottom + distanceModifier;
            //
            if (d.studentAnswer === undefined) {
                d.studentAnswer = d.xPos;
            }
            //
            studentAnswer = xScale (d.studentAnswer)
            //
            // newPointList = [
            //     '' + (x - (d.width / 2)) + ',' + (y + d.height),
            //     '' + (x + (d.width / 2)) + ',' + (y + d.height),
            //     '' + x + ',' + distanceModifier,
            // ].join (' ');
            //
            linePointList = [
                // '' + x + ',' + (y - 15),
                '' + x + ',' + (y - d.distanceFromBottom),
                // '' + x + ',' + (y + 15),
                '' + x + ',' + (y - (d.distanceFromBottom + 15)),
                // '' + studentAnswer + ',' + (y + 15),
                '' + studentAnswer + ',' + (y - (d.distanceFromBottom + 15)),
                // '' + studentAnswer + ',' + (y - (d.distanceFromBottom + 30)),
                '' + studentAnswer + ',' + (y - d.distanceFromBottom),
            ].join (' ');

            d.line.attr ('points', linePointList);
        },

        scaleUp: function (original, event) {
            var boundBox, centerX, centerY, scale, translateString, translateX, translateY;

            original (event);
            d.line.attr ('class', '')
        },

        scaleRevert: function (original, event) {
            var boundBox, centerX, centerY, scale, translateString, translateX, translateY;

            original (event);
            d.line.attr ('class', 'hide')
        }
    })
})
