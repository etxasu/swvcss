/*
    A bin that is capable of being connected to another bin.
    Draws a line between connections
*/
'use strict'
tm.add ('sim.geo.chemical.bin.Connector', ['sim.geo.chemical.bin.Base'], function (o, p, d) {
    o.setup = function (config) {
        var boundBox, circle, clip, defs, namespace;
        d.connectionRepo = {}
        d.incomingConnectionCount = 0;
        d.outgoingConnectionCount = 0;
        d.hasOutgoingConnection = false;
        d.hasIncomingConnection = false;

        boundBox = d.svg.getDom ().getBoundingClientRect ()

        d.offset = {
            x: boundBox.left,
            y: boundBox.top
        }

        d.onConnectionRemoved = config.onConnectionRemoved

        // d.clipId = 'clip-' + d.title;
        // namespace = "http://www.w3.org/2000/svg";
        // // defs = document.createElementNS (namespace, 'defs');
        // clip = document.createElementNS (namespace, 'mask');
        // clip.setAttributeNS (null, 'id', d.clipId);
        // circle = document.createElementNS (namespace, 'circle');
        // circle.setAttributeNS (null, 'cx', d.x);
        // circle.setAttributeNS (null, 'cy', d.y);
        // circle.setAttributeNS (null, 'r', d.radius);
        //
        // clip.appendChild (circle)
        // // defs.appendChild (clip)
        // d.svg.getDom ().prepend (clip);
    }

    // o.addIncomingConnection = function (data) {
    //     d.incomingConnectionCount += 1;
    //
    //     // console.log ('Incoming connection:', d.incomingConnectionCount)
    //
    //     if (d.incomingConnectionCount > 0) {
    //         d.hasIncomingConnection = true;
    //         // console.log ('Has incoming connections:', d.hasIncomingConnection)
    //     }
    // }

    // o.addOutgoingConnection = function (data) {
    //     d.outgoingConnectionCount += 1;
    //
    //     // console.log ('Incoming connection:', d.incomingConnectionCount)
    //
    //     if (d.outgoingConnectionCount > 0) {
    //         d.hasOutgoingConnection = true;
    //         // console.log ('Has incoming connections:', d.hasIncomingConnection)
    //     }
    // }

    o.clearSelectionShim = function () {
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

    o.onConnectionRemoved = function (data) {
        // d.connectionRepo [data.connectionKey].endBin.removeIncomingConnection (data);
        delete d.connectionRepo [data.connectionKey];

        if ( Object.keys (d.connectionRepo).length === 0 ) {
            d.hasOutgoingConnection = false

            if (d.onConnectionRemoved) { d.onConnectionRemoved (data); }
        }
    }

    o.onConnectionMade = function (data) {}

    // o.removeIncomingConnection = function () {
    //     d.incomingConnectionCount -= 1;
    //
    //     // console.log ('Incoming connection:', d.incomingConnectionCount)
    //
    //     if (d.incomingConnectionCount < 1) {
    //         d.hasIncomingConnection = false;
    //         // console.log ('Has incoming connections:', d.hasIncomingConnection)
    //     }
    // }

    o.override ({
        onMouseDown: function (original, event) {
            var endX, endY, startX, startY;

            startX = d.x;
            startY = d.y;
            endX = event.pageX - d.offset.x;
            endY = event.pageY - d.offset.y;

            d.connecting = true;

            // Create a line dom
            d.activeLine = tm.new ('sim.geo.chemical.bin.Line', {
                start: { x: startX, y: startY },
                end: { x: endX, y: endY },
                brush: {
                    color: 'transparent',
                    line: {
                        width: 4,
                        color: 'white'
                    }
                }
            })

            // d.activeLine.getDom ().setAttributeNS (null, 'mask', 'url(#' + d.clipId + ')');
            d.svg.add (d.activeLine)
            d.activeLine.start ();
        },

        onMouseMove: function (original, event) {
            if (d.connecting) {
                var endX, endY;

                endX = event.pageX - d.offset.x;
                endY = event.pageY - d.offset.y;

                d.activeLine.update ({
                    end: { x: endX, y: endY }
                })
                // console.log ('Connecting a dom', mouseX, mouseY)

                d.activeLine.updateArrow ()

                o.clearSelectionShim ();
            }
        },

        onMouseUp: function (original, data) {
            var destination, dom, endX, endY, info, nodeName, myPos, offset, target, theirPos;

            if (d.connecting) {
                d.connecting = false;

                if (data.target && data.target.owner && data.target.owner != o) {
                    info = {
                        start: d.dom,
                        startBin: d.dom.owner,
                        end: data.target,
                        endBin: data.target.owner,
                        event: data,
                        connectionKey: d.title + ' to ' + data.target.owner.getTitle (),
                        line: d.activeLine,
                        title: data.target.owner.getTitle (),
                        rate: 1,
                    }

                    if (!d.connectionRepo [info.connectionKey]) {
                        nodeName = data.target.nodeName

                        // ignore failed connections
                        if (nodeName != 'circle') { return; }

                        target = data.target.owner;

                        if (!target) { return; }

                        // Determine the local difference of the two circles with this circle as the origin point
                        myPos = o.getPosition ();
                        theirPos = target.getPosition ();
                        offset = {
                            x: myPos.x - theirPos.x,
                            y: myPos.y - theirPos.y,
                        }

                        info.startPos = myPos;
                        info.endPos = theirPos;
                        info.offset = offset;

                        destination = { x: theirPos.x, y: theirPos.y }

                        d.activeLine.update ({end: destination})
                        d.activeLine.placed ()
                        d.activeLine.setOnDelete (function () { o.onConnectionRemoved (info) })

                        // d.hasOutgoingConnection = true;
                        d.connectionRepo [info.connectionKey] = info
                        // info.endBin.addIncomingConnection (info);
                        o.onConnectionMade (info)

                        if (d.onConnection) { d.onConnection (info); }

                        console.log ('Created connection repo entry:', info.connectionKey)
                    }
                    else {
                        d.activeLine.delete ();
                    }
                }
                else {
                    d.activeLine.delete ();
                }

            }
        },
    })
})
